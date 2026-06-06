/* ═══════════════════════════════════════════
   VELORA — The Art of Vibes
   app.js  —  All application logic
   ═══════════════════════════════════════════ */

// ── API CONFIG ──
const STORED_API  = (() => { try { return localStorage.getItem('vl-api'); }  catch(e) { return null; } })();
const audio = document.getElementById('audio');

let SAAVN = STORED_API ? STORED_API.replace(/\/+$/, '') : '';

// ── RUNTIME STATE ──
let queue = [], qIdx = -1, curSong = null;
let playing = false, shuffle = false, repeat = false, liked = false, premium = false;
let vol = 0.7, muted = false;
let likedIds = new Set();
let history = [];
let qOpen = false, sbCollapsed = false;
let ctxId = null, sleepTmr = null;
let vizFrame = null, vizPhase = 0;
let lyricTmr = null, lyricIdx = 0;
let searchTmr = null;
let dragging = false;

// ── PLAYLISTS STATE ──
let playlists = [
  { id:'pl1', name:'Liked Songs', emoji:'❤️', songs:[] },
  { id:'pl2', name:'Arijit Hits', emoji:'🌅', songs:[] },
  { id:'pl3', name:'Late Night',  emoji:'🌙', songs:[] },
  { id:'pl4', name:'Workout',     emoji:'⚡', songs:[] },
];
let pmodalSongId = null;
let shareSongId  = null;
let searchHistory = JSON.parse((() => { try { return localStorage.getItem('vl-srch') || '[]'; } catch(e) { return '[]'; } })());

// ═══════════════════════════════════════════
// API HELPERS
// ═══════════════════════════════════════════
function getUrl(song) {
  if (song.url && typeof song.url === 'string') return song.url;
  const urls = song.download_url || song.downloadUrl || [];
  if (!Array.isArray(urls) || !urls.length) return null;
  for (const q of ['320kbps','160kbps','96kbps','128kbps']) {
    const u = urls.find(x => x.quality === q);
    if (u) return u.link || u.url || null;
  }
  const last = urls[urls.length - 1];
  return last?.link || last?.url || null;
}

function getImg(song) {
  if (song.img && typeof song.img === 'string') return song.img;
  if (typeof song.image === 'string') return song.image;
  const imgs = song.image || [];
  if (!Array.isArray(imgs) || !imgs.length) return null;
  for (const q of ['500x500','150x150','50x50']) {
    const img = imgs.find(i => i.quality === q);
    if (img) return img.link || img.url || null;
  }
  const last = imgs[imgs.length - 1];
  return last?.link || last?.url || null;
}

function getArtist(song) {
  if (song.artist && typeof song.artist === 'string') return song.artist;
  const primary = song.artists?.primary || song.artists || [];
  if (Array.isArray(primary) && primary.length) return primary.map(a => a.name || a).join(', ');
  if (typeof primary === 'string') return primary;
  return song.label || song.subtitle || '—';
}

async function apiSearch(q, n = 8) {
  if (!SAAVN) throw new Error('No API configured');
  const base = SAAVN.replace(/\/api$/, '').replace(/\/$/, '');
  const endpoints = [
    `${base}/search/songs?q=${encodeURIComponent(q)}&n=${n}`,
    `${base}/search?q=${encodeURIComponent(q)}&n=${n}`,
    `${base}/api/search/songs?query=${encodeURIComponent(q)}&page=1&limit=${n}`,
    `${base}/search/songs?query=${encodeURIComponent(q)}&page=1&limit=${n}`,
  ];
  for (const url of endpoints) {
    try {
      const r = await fetch(url, { method:'GET', headers:{ 'Accept':'application/json' }, mode:'cors' });
      if (!r.ok) continue;
      const d = await r.json();
      const results = d.data?.results || d.results || d.songs?.results || (Array.isArray(d.data) ? d.data : null) || [];
      const arr = Array.isArray(results) ? results : [];
      if (arr.length > 0) return arr;
    } catch(e) { continue; }
  }
  throw new Error('All endpoints failed');
}

async function wakeApi() {
  if (!SAAVN) return;
  try {
    await fetch(SAAVN.replace(/\/+$/, '') + '/search/songs?q=test&n=1', { mode:'cors' });
    const q = document.getElementById('sinp')?.value;
    if (q) doSearch(q);
  } catch(e) {}
}

// ═══════════════════════════════════════════
// RENDER HELPERS
// ═══════════════════════════════════════════
function imgEl(src, fb, cls = 'ef') {
  return src
    ? `<img src="${src}" loading="lazy" onerror="this.style.display='none';this.nextSibling.style.display='block'"><span class="${cls}" style="display:none">${fb}</span>`
    : `<span class="${cls}">${fb}</span>`;
}

function renderCards(elId, songs) {
  const el = document.getElementById(elId);
  if (!el) return;
  songs.forEach(s => cache[s.id] = s);
  el.innerHTML = songs.map(s => {
    const img = getImg(s), art = getArtist(s), isNow = curSong?.id === s.id;
    return `<div class="card${isNow ? ' now-playing-card' : ''}" onclick="play('${s.id}')" oncontextmenu="openCtx(event,'${s.id}')">
      <div class="cart">${imgEl(img, '🎵')}
        <div class="card-dur">${fmtDur(s.duration)}</div>
        <button class="cpb" onclick="event.stopPropagation();play('${s.id}')"><svg width="13" height="13" viewBox="0 0 24 24" fill="#000"><path d="M8 5v14l11-7z"/></svg></button>
      </div>
      <div class="cbody">
        <div class="ctitle">${isNow ? '▶ ' : ''}${s.name || '—'}</div>
        <div class="csub">${art}</div>
      </div>
    </div>`;
  }).join('');
}

function trkRow(s, i) {
  const img = getImg(s), art = getArtist(s), lk = likedIds.has(s.id), isNow = curSong?.id === s.id;
  return `<div class="trk${isNow ? ' pl' : ''}" id="trk-${s.id}" onclick="play('${s.id}')" oncontextmenu="openCtx(event,'${s.id}')">
    <div class="trk-n"><span class="nn">${i + 1}</span><div class="eq"><div class="eqb"></div><div class="eqb"></div><div class="eqb"></div></div></div>
    <div class="ti">
      <div class="tthumb">${imgEl(img, '🎵')}</div>
      <div><div class="tname">${s.name || '—'}</div><div class="tart">${art}</div></div>
    </div>
    <div class="tmeta">
      <button class="lbtn${lk ? ' on' : ''}" onclick="event.stopPropagation();toggleLikeId('${s.id}',this)">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="${lk ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
      <span>${fmtDur(s.duration)}</span>
    </div>
  </div>`;
}

function renderTrkList(elId, songs) {
  const el = document.getElementById(elId);
  if (!el) return;
  songs.forEach(s => cache[s.id] = s);
  el.innerHTML = songs.map((s, i) => trkRow(s, i)).join('');
}

function renderTrending(elId, songs, full) {
  const el = document.getElementById(elId);
  if (!el) return;
  songs.forEach(s => cache[s.id] = s);
  const dirs = ['up','sm','up','dn','up','up','dn','up'];
  el.innerHTML = songs.slice(0, full ? 999 : 6).map((s, i) => {
    const img = getImg(s), art = getArtist(s), lk = likedIds.has(s.id);
    const dir = dirs[i] || 'sm';
    return `<div class="trnd" onclick="play('${s.id}')" oncontextmenu="openCtx(event,'${s.id}')">
      <div class="trnd-r${i < 3 ? ' t3' : ''}">${i + 1}</div>
      <div class="trnd-c ${dir}">${dir === 'up' ? '↑' : dir === 'dn' ? '↓' : '—'}</div>
      <div class="ti" style="flex:1">
        <div class="tthumb">${imgEl(img, '🎵')}</div>
        <div><div class="tname">${s.name || '—'}</div><div class="tart">${art}</div></div>
      </div>
      <div class="tmeta">
        <button class="lbtn${lk ? ' on' : ''}" onclick="event.stopPropagation();toggleLikeId('${s.id}',this)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="${lk ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <span>${fmtDur(s.duration)}</span>
      </div>
    </div>`;
  }).join('');
}

function renderQueueList() {
  const el = document.getElementById('ql');
  if (!el) return;
  el.innerHTML = queue.map((s, i) => {
    const img = getImg(s), art = getArtist(s);
    return `<div class="qi${i === qIdx ? ' cur' : ''}" onclick="playQi(${i})">
      <div class="qi-t">${imgEl(img, '🎵')}</div>
      <div class="qi-i"><div class="qi-n">${s.name || '—'}</div><div class="qi-a">${art}</div></div>
      <div class="qi-d">${fmtDur(s.duration)}</div>
    </div>`;
  }).join('') || '<div class="lstate" style="padding:20px">Queue is empty</div>';
}

function renderFavsList() {
  const favs = [...likedIds].map(id => cache[id]).filter(Boolean);
  document.getElementById('fav-count').textContent = favs.length;
  const sl = document.getElementById('stat-liked');
  if (sl) sl.textContent = favs.length;
  const el = document.getElementById('favs-list');
  if (!el) return;
  el.innerHTML = favs.length
    ? favs.map((s, i) => trkRow(s, i)).join('')
    : '<div class="lstate">No liked songs yet — ❤ a track to save it here</div>';
}

function renderMoodChips() {
  document.getElementById('mchips').innerHTML = MOODS.map(m =>
    `<div class="mchip" onclick="sPlay('${m.replace(/[^\w ]/g, '')} songs');this.closest('.mchips').querySelectorAll('.mchip').forEach(c=>c.classList.remove('on'));this.classList.add('on')">${m}</div>`
  ).join('');
}

function renderArtists() {
  document.getElementById('artists-list').innerHTML = ARTISTS.map(a =>
    `<div class="arow">
      <div class="aav">${a.e}</div>
      <div class="ainfo"><div class="aname">${a.n}</div><div class="asub">${a.g} · ${a.f} followers</div></div>
      <button class="fbtn" onclick="sPlay('${a.n}');this.textContent='Following ✓';this.style.background='rgba(240,192,64,.15)'">Follow</button>
    </div>`
  ).join('');
}

function renderGenreGrid() {
  document.getElementById('genre-grid').innerHTML = GENRES.map(g =>
    `<div class="gc" style="background:${g.bg}" onclick="sPlay('${g.n} songs')">
      <div class="gc-em">${g.e}</div>
      <div class="gc-nm">${g.n}</div>
      <div class="gc-cnt">${g.c}</div>
    </div>`
  ).join('');
}

function renderChat() {
  document.getElementById('chat-msgs').innerHTML = CHAT_SEED.map(m =>
    `<div class="msg${m.me ? ' me' : ''}">
      <div class="mav" style="background:${m.bg};color:${m.tc}">${m.av}</div>
      <div>
        ${!m.me ? `<div style="font-size:10px;color:var(--tx3);margin-bottom:2px;padding-left:2px">${m.u}</div>` : ''}
        <div class="mbub">${m.txt}</div>
        <div class="mtime">${m.t}</div>
      </div>
    </div>`
  ).join('');
  const el = document.getElementById('chat-msgs');
  setTimeout(() => el.scrollTop = el.scrollHeight, 50);
}

function renderOnlineUsers() {
  document.getElementById('online-users').innerHTML = ONLINE.map(u =>
    `<div class="ou">
      <div class="oav" style="background:${u.bg};color:${u.tc}">${u.av}<div class="dot ${u.dot}"></div></div>
      <div><div style="font-size:12.5px;font-weight:500">${u.n}</div><div style="font-size:10.5px;color:var(--tx3)">${u.s}</div></div>
    </div>`
  ).join('');
}

function renderFAQs() {
  document.getElementById('faq-list').innerHTML = FAQS.map((f, i) =>
    `<div class="faq-item" id="fq${i}">
      <div class="faq-q" onclick="togFaq(${i})">
        <span>${f.q}</span>
        <svg class="fchev" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="faq-a" id="fqa${i}">${f.a}</div>
    </div>`
  ).join('');
}

function renderNotifs() {
  document.getElementById('notif-list').innerHTML = NOTIFS.map((n, i) =>
    `<div class="notif-item" onclick="readNotif(${i})">
      <div class="notif-dot2${n.read ? ' read' : ''}"></div>
      <div><div class="notif-text">${n.text}</div><div class="notif-time">${n.time}</div></div>
    </div>`
  ).join('');
}

function renderPlModal() {
  document.getElementById('pl-list-el').innerHTML = playlists.map(pl =>
    `<div class="pl-item" onclick="addToPlaylist('${pl.id}')">
      <div class="pl-item-art">${pl.emoji}</div>
      <div><div class="pl-item-name">${pl.name}</div><div class="pl-item-cnt">${pl.songs.length} songs</div></div>
    </div>`
  ).join('');
}

function renderSearchRecent() {
  const el = document.getElementById('srch-recent');
  if (!el || !searchHistory.length) return;
  el.innerHTML = `<div class="srch-rec-ttl">Recent Searches</div>
    <div class="srch-rec-chips">${searchHistory.map(q =>
      `<div class="srch-rec-chip" onclick="document.getElementById('sinp').value='${q}';doSearch('${q}')">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>${q}
      </div>`
    ).join('')}</div>`;
}

// ═══════════════════════════════════════════
// INITIALISATION
// ═══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', async () => {
  // Greeting
  const h = new Date().getHours();
  const g = h < 12 ? '☀️ Good morning' : h < 17 ? '🌤️ Good afternoon' : '🌙 Good evening';
  document.getElementById('h-lbl').textContent = '✦ ' + g;

  // Static renders
  renderMoodChips(); renderArtists(); renderGenreGrid();
  renderChat(); renderOnlineUsers(); renderFAQs();
  loadSettings('audio');

  // Volume restore
  try {
    const sv = localStorage.getItem('vl-vol');
    if (sv) {
      vol = parseFloat(sv);
      audio.volume = vol;
      document.getElementById('pl-vf').style.width = (vol * 100) + '%';
      document.getElementById('np-vol').value = vol * 100;
    }
  } catch(e) {}
  audio.volume = vol;
  document.getElementById('pl-vf').style.width = (vol * 100) + '%';

  // Audio events
  audio.addEventListener('ended', onEnd);
  audio.addEventListener('timeupdate', onTime);
  audio.addEventListener('error', () => {
    const isLocal = audio.src?.includes('githubusercontent.com') || audio.src?.includes('wavesurfer');
    if (isLocal) { toast('⚠️ Local audio error — check connection'); return; }
    setTimeout(() => { toast('⏭ Stream error — skipping'); nextTrk(); }, 800);
  });

  setupDrag();
  document.addEventListener('click', () => closeCtx());
  document.addEventListener('contextmenu', onRightClick, true);
  document.addEventListener('keydown', onKey);

  // Notification button
  document.querySelector('.nbtn').onclick = toggleNotifPanel;
  document.addEventListener('click', e => {
    const panel = document.getElementById('notif-panel');
    if (!panel.contains(e.target) && !e.target.closest('.nbtn')) panel.classList.remove('open');
  });

  // Mini EQ
  addMiniEq();

  // Load home content
  loadHome();

  // API setup check
  setTimeout(initSetup, 300);

  // Welcome toast (first visit)
  setTimeout(() => {
    const seen = (() => { try { return localStorage.getItem('vl-seen'); } catch(e) { return null; } })();
    if (!seen) {
      toast('🎵 Click any song card to start playing!');
      try { localStorage.setItem('vl-seen', '1'); } catch(e) {}
    }
  }, 1200);
});

async function loadHome() {
  // Immediately show local songs
  renderCards('fy-cards', REAL_SONGS.slice(0, 7));
  queue = [...REAL_SONGS];
  renderQueueList();
  renderTrending('trend-home', REAL_SONGS.slice(0, 8), false);
  renderTrending('trend-full', REAL_SONGS, true);
  renderCards('nr-cards', REAL_SONGS.slice(5));
  renderTrkList('prof-trks', REAL_SONGS.slice(0, 6));

  // Then try to enrich with live data
  tryLoadLive();
}

async function tryLoadLive() {
  const tryFetch = async (q, n) => {
    return Promise.race([
      apiSearch(q, n),
      new Promise((_, r) => setTimeout(() => r(new Error('timeout')), 4000))
    ]);
  };
  try {
    const fy = await tryFetch('arijit singh 2024', 7);
    if (fy?.length) {
      fy.forEach(s => cache[s.id] = s);
      renderCards('fy-cards', fy);
      queue = [...fy, ...REAL_SONGS.filter(s => !fy.find(x => x.id === s.id))];
      renderQueueList();
      showBanner('✨ Live music loaded from JioSaavn!');
    }
  } catch(e) {}
  try {
    const tr = await tryFetch('top hindi hits india 2024', 8);
    if (tr?.length) { renderTrending('trend-home', tr, false); renderTrending('trend-full', tr, true); }
  } catch(e) {}
  try {
    const nr = await tryFetch('new hindi songs 2024', 7);
    if (nr?.length) renderCards('nr-cards', nr);
  } catch(e) {}
}

// ═══════════════════════════════════════════
// PLAYBACK
// ═══════════════════════════════════════════
async function play(id) {
  let song = cache[id];
  if (!song) {
    toast('⏳ Loading…');
    try {
      const r = await fetch(`${SAAVN}/songs?id=${id}`);
      const d = await r.json();
      song = d.data?.[0];
      if (song) cache[song.id] = song;
    } catch(e) {
      try {
        const results = await apiSearch(id, 1);
        if (results[0]) { song = results[0]; cache[song.id] = song; }
      } catch(e2) {}
    }
  }
  if (!song) { toast('⚠️ Song not found'); return; }

  const url = getUrl(song);
  if (!url) { toast('⚠️ No stream URL — skipping'); setTimeout(nextTrk, 500); return; }

  curSong = song;
  const qi = queue.findIndex(s => s.id === id);
  if (qi >= 0) qIdx = qi; else { queue.push(song); qIdx = queue.length - 1; }

  audio.pause();
  audio.src = url;
  audio.volume = muted ? 0 : vol;

  try {
    await audio.play();
    playing = true;
  } catch(e) {
    playing = false;
    toast('⏸ Click ▶ to start playing');
  }

  updatePlayerUI(song);
  updatePlayBtns();
  updateTrkHighlight(id);
  renderQueueList();
  updateHero(song);
  updateMiniEq();
  if (playing) toast(`▶ ${song.name} — ${getArtist(song)}`);

  if (!history.find(s => s.id === id)) history.unshift(song);
  if (history.length > 12) history.pop();

  if (document.getElementById('np').classList.contains('open')) updateNPUI();
}

function updatePlayerUI(s) {
  const img = getImg(s), art = getArtist(s);
  const thumb = document.getElementById('pl-thumb');
  thumb.innerHTML = img
    ? `<img src="${img}" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" onerror="this.style.display='none'"><span class="ef" style="display:none">🎵</span>`
    : `<span class="ef">🎵</span>`;
  document.getElementById('pl-track').textContent = s.name || '—';
  document.getElementById('pl-artist').textContent = art;
  liked = likedIds.has(s.id);
  updateHeartUI();
  thumb.classList.add('playing');
}

function updateTrkHighlight(id) {
  document.querySelectorAll('.trk').forEach(r => r.classList.remove('pl'));
  document.querySelectorAll(`#trk-${id}`).forEach(r => r.classList.add('pl'));
  document.querySelectorAll('.qi').forEach((r, i) => r.classList.toggle('cur', i === qIdx));
}

function updatePlayBtns() {
  document.getElementById('ico-play').style.display = playing ? 'none' : 'block';
  document.getElementById('ico-pause').style.display = playing ? 'block' : 'none';
  document.getElementById('np-ico-play').style.display = playing ? 'none' : 'block';
  document.getElementById('np-ico-pause').style.display = playing ? 'block' : 'none';
  document.getElementById('np-art').classList.toggle('sp', playing);
  document.getElementById('pl-thumb').classList.toggle('playing', playing && !!curSong);
}

function togglePlay() {
  if (!curSong) { playFirst(); return; }
  if (playing) { audio.pause(); playing = false; }
  else { audio.play(); playing = true; }
  updatePlayBtns();
  updateMiniEq();
}

function nextTrk() {
  if (!queue.length) return;
  qIdx = shuffle ? Math.floor(Math.random() * queue.length) : (qIdx + 1) % queue.length;
  play(queue[qIdx].id);
}

function prevTrk() {
  if (!queue.length) return;
  if (audio.currentTime > 3) { audio.currentTime = 0; return; }
  qIdx = (qIdx - 1 + queue.length) % queue.length;
  play(queue[qIdx].id);
}

function onEnd() { repeat ? (audio.currentTime = 0, audio.play()) : nextTrk(); }

function onTime() {
  const cur = audio.currentTime, tot = audio.duration || 0;
  const pct = tot > 0 ? (cur / tot) * 100 : 0;
  document.getElementById('pfill').style.width = pct + '%';
  document.getElementById('t-cur').textContent = fmtSec(cur);
  document.getElementById('t-tot').textContent = fmtSec(tot);
  if (document.getElementById('np').classList.contains('open')) {
    document.getElementById('np-pf').style.width = pct + '%';
    document.getElementById('np-cur').textContent = fmtSec(cur);
    document.getElementById('np-tot').textContent = fmtSec(tot);
  }
}

function seekBar(e) {
  if (!audio.duration) return;
  const r = document.getElementById('ptrack').getBoundingClientRect();
  audio.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * audio.duration;
}

function seekNP(e) {
  if (!audio.duration) return;
  const r = document.getElementById('np-pt').getBoundingClientRect();
  audio.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * audio.duration;
}

function setupDrag() {
  ['ptrack', 'np-pt'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('mousedown', () => dragging = true);
  });
  document.addEventListener('mousemove', e => {
    if (!dragging || !audio.duration) return;
    const npOpen = document.getElementById('np').classList.contains('open');
    const el = document.getElementById(npOpen ? 'np-pt' : 'ptrack');
    const r = el.getBoundingClientRect();
    audio.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * audio.duration;
  });
  document.addEventListener('mouseup', () => dragging = false);
}

function toggleShuf() {
  shuffle = !shuffle;
  document.getElementById('pc-shuf').classList.toggle('on', shuffle);
  document.getElementById('np-shuf').classList.toggle('on', shuffle);
  toast(shuffle ? '🔀 Shuffle on' : '🔀 Shuffle off');
}

function toggleRep() {
  repeat = !repeat;
  document.getElementById('pc-rep').classList.toggle('on', repeat);
  document.getElementById('np-rep').classList.toggle('on', repeat);
  toast(repeat ? '🔁 Repeat on' : '🔁 Repeat off');
}

function setVol(e) {
  const r = document.getElementById('pl-vt').getBoundingClientRect();
  vol = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
  audio.volume = vol; muted = false;
  document.getElementById('pl-vf').style.width = (vol * 100) + '%';
  document.getElementById('np-vol').value = vol * 100;
  try { localStorage.setItem('vl-vol', vol); } catch(e2) {}
}

function setVolSl(v) {
  vol = v / 100; audio.volume = vol; muted = false;
  document.getElementById('pl-vf').style.width = v + '%';
  try { localStorage.setItem('vl-vol', vol); } catch(e) {}
}

function toggleMute() {
  muted = !muted;
  audio.volume = muted ? 0 : vol;
  toast(muted ? '🔇 Muted' : '🔊 Unmuted');
}

// ═══════════════════════════════════════════
// SEARCH & PLAYLIST PLAY
// ═══════════════════════════════════════════
async function sPlay(q) {
  toast('🔍 Searching: ' + q);
  try {
    const songs = await Promise.race([
      apiSearch(q, 10),
      new Promise((_, r) => setTimeout(() => r(new Error('timeout')), 5000))
    ]);
    if (songs?.length) {
      songs.forEach(s => cache[s.id] = s);
      queue = songs; qIdx = 0; renderQueueList();
      play(songs[0].id);
      return;
    }
  } catch(e) {}
  // Local fallback
  const lq = q.toLowerCase();
  const matches = REAL_SONGS.filter(s =>
    s.name.toLowerCase().includes(lq) || s.artist.toLowerCase().includes(lq) ||
    s.genre.toLowerCase().includes(lq) || s.language.toLowerCase().includes(lq)
  );
  const src = matches.length ? matches : REAL_SONGS;
  queue = src; qIdx = 0; renderQueueList();
  play(src[0].id);
  toast(matches.length ? '▶ Playing from local library' : '▶ Playing from local library (live search unavailable)');
}

function playFirst() {
  if (queue.length) { play(queue[0].id); return; }
  queue = [...REAL_SONGS]; qIdx = 0; renderQueueList(); play(REAL_SONGS[0].id);
}

function playQi(i) { qIdx = i; if (queue[i]) play(queue[i].id); }

function playFavs() {
  const favs = [...likedIds].map(id => cache[id]).filter(Boolean);
  if (!favs.length) { toast('❤ Like some songs first!'); return; }
  queue = [...favs].sort(() => Math.random() - 0.5);
  qIdx = 0; renderQueueList(); play(queue[0].id);
}

// ═══════════════════════════════════════════
// SEARCH OVERLAY
// ═══════════════════════════════════════════
function openSearch() {
  document.getElementById('sol').classList.add('open');
  setTimeout(() => { document.getElementById('sinp').focus(); renderSearchRecent(); }, 80);
}

function closeSearch() {
  document.getElementById('sol').classList.remove('open');
  document.getElementById('sinp').value = '';
  document.getElementById('sres').classList.remove('show');
  document.getElementById('sldr').classList.remove('show');
}

function addToSearchHistory(q) {
  searchHistory = [q, ...searchHistory.filter(x => x !== q)].slice(0, 8);
  try { localStorage.setItem('vl-srch', JSON.stringify(searchHistory)); } catch(e) {}
}

function doSearch(q) {
  clearTimeout(searchTmr);
  const res = document.getElementById('sres');
  const ldr = document.getElementById('sldr');
  if (!q.trim()) { res.classList.remove('show'); ldr.classList.remove('show'); return; }
  if (q.trim().length > 2) addToSearchHistory(q.trim());
  ldr.classList.add('show');
  res.classList.remove('show');

  searchTmr = setTimeout(async () => {
    try {
      const lq = q.toLowerCase();
      const localMatches = REAL_SONGS.filter(s =>
        s.name.toLowerCase().includes(lq) || s.artist.toLowerCase().includes(lq) ||
        s.genre.toLowerCase().includes(lq)
      );
      let liveSongs = [];
      if (SAAVN) {
        try {
          liveSongs = await Promise.race([
            apiSearch(q, 10),
            new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 8000))
          ]);
          if (!Array.isArray(liveSongs)) liveSongs = [];
        } catch(e) {}
      }
      ldr.classList.remove('show');
      const liveNames = new Set(liveSongs.map(s => (s.name || '').toLowerCase()));
      const uniqueLocal = localMatches.filter(s => !liveNames.has(s.name.toLowerCase()));
      const songs = [...liveSongs, ...uniqueLocal];

      if (!songs.length) {
        res.innerHTML = `<div class="sri" style="padding:16px;justify-content:center"><div style="color:var(--tx3);text-align:center">No results for "<b style='color:var(--tx)'>${q}</b>"${!SAAVN ? '<br><small>Connect JioSaavn API to search 80M+ songs</small>' : ''}</div></div>`;
        res.classList.add('show'); return;
      }
      songs.forEach(s => { if (s.id) cache[s.id] = s; });
      res.innerHTML = songs.map(s => {
        const img = getImg(s), art = getArtist(s);
        const isLocal = REAL_SONGS.find(r => r.id === s.id);
        return `<div class="sri" onclick="play('${s.id}');closeSearch()">
          <div class="sri-a">${imgEl(img, '🎵')}</div>
          <div style="flex:1;overflow:hidden"><div class="sri-n">${s.name || '—'}</div><div class="sri-m">${art}</div></div>
          <div class="sri-t">${isLocal ? '📁 local' : (s.language || 'Hindi')}</div>
        </div>`;
      }).join('');
      res.classList.add('show');
    } catch(e) {
      document.getElementById('sldr').classList.remove('show');
      res.innerHTML = `<div class="sri"><div style="color:var(--rose2)">Search error: ${e.message}</div></div>`;
      res.classList.add('show');
    }
  }, 350);
}

// ═══════════════════════════════════════════
// LIKES
// ═══════════════════════════════════════════
function toggleHeart() {
  if (!curSong) return;
  if (likedIds.has(curSong.id)) likedIds.delete(curSong.id);
  else { likedIds.add(curSong.id); toast('❤ Added to Liked Songs'); }
  liked = likedIds.has(curSong.id);
  updateHeartUI(); renderFavsList();
}

function toggleLikeId(id, btn) {
  if (likedIds.has(id)) likedIds.delete(id);
  else { likedIds.add(id); toast('❤ Added to Liked Songs'); }
  const on = likedIds.has(id);
  btn.classList.toggle('on', on);
  btn.querySelector('svg').setAttribute('fill', on ? 'currentColor' : 'none');
  if (curSong?.id === id) { liked = on; updateHeartUI(); }
  renderFavsList();
}

function updateHeartUI() {
  const h = document.getElementById('pl-heart');
  h.classList.toggle('on', liked);
  h.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="${liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
  const nla = document.getElementById('np-like-act');
  if (nla) nla.classList.toggle('on', liked);
}

// ═══════════════════════════════════════════
// NOW PLAYING OVERLAY
// ═══════════════════════════════════════════
function openNP() {
  document.getElementById('np').classList.add('open');
  updateNPUI(); startViz(); startLyrics();
}

function closeNP() {
  document.getElementById('np').classList.remove('open');
  stopViz(); stopLyrics();
}

function updateNPUI() {
  if (!curSong) return;
  const img = getImg(curSong), art = getArtist(curSong);
  const npArt = document.getElementById('np-art');
  npArt.innerHTML = img
    ? `<img src="${img}" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" onerror="this.style.display='none'"><span class="ef" style="display:none">🎵</span>`
    : `<span class="ef">🎵</span>`;
  npArt.classList.toggle('sp', playing);
  document.getElementById('np-badge').textContent = `✦ Now Playing · ${curSong.language || 'Hindi'}`;
  document.getElementById('np-title').textContent = curSong.name || '—';
  document.getElementById('np-artist').textContent = art;
  document.getElementById('np-album').textContent = (curSong.album?.name || curSong.album || '—') + (curSong.year ? ' · ' + curSong.year : '');
  document.getElementById('np-shuf').classList.toggle('on', shuffle);
  document.getElementById('np-rep').classList.toggle('on', repeat);
  updatePlayBtns();
}

// ═══════════════════════════════════════════
// VISUALIZER
// ═══════════════════════════════════════════
function startViz() {
  cancelAnimationFrame(vizFrame);
  const canvas = document.getElementById('viz');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  function draw() {
    vizFrame = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, W, H);
    vizPhase += 0.05;
    const bars = 44, bw = W / bars - 1;
    for (let i = 0; i < bars; i++) {
      const x = i * (bw + 1);
      const h = playing
        ? Math.max(3, H * (0.12 + 0.44 * Math.abs(Math.sin(i * 0.42 + vizPhase)) + 0.2 * Math.abs(Math.sin(i * 0.71 + vizPhase * 1.3)) + 0.08 * Math.random()))
        : 2 + 2 * Math.abs(Math.sin(i * 0.3 + Date.now() / 1000));
      const g = ctx.createLinearGradient(0, H - h, 0, H);
      g.addColorStop(0, 'rgba(240,192,64,.9)');
      g.addColorStop(1, 'rgba(232,96,122,.35)');
      ctx.fillStyle = g;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, H - h, bw, h, 2);
      else ctx.rect(x, H - h, bw, h);
      ctx.fill();
    }
  }
  draw();
}

function stopViz() { cancelAnimationFrame(vizFrame); }

// ═══════════════════════════════════════════
// LYRICS
// ═══════════════════════════════════════════
function startLyrics() { stopLyrics(); updateLyric(); lyricTmr = setInterval(updateLyric, 3500); }
function stopLyrics()  { clearInterval(lyricTmr); }
function updateLyric() {
  const el = document.getElementById('lyric');
  el.style.opacity = '0';
  setTimeout(() => { el.textContent = LYRICS[lyricIdx % LYRICS.length]; el.style.opacity = '1'; lyricIdx++; }, 300);
}

// ═══════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════
function goV(name) {
  ['artist', 'album'].forEach(v => {
    const el = document.getElementById('view-' + v);
    if (el && name !== v) el.style.display = 'none';
  });
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const v = document.getElementById('view-' + name);
  if (v) { v.classList.add('active'); if (name === 'artist' || name === 'album') v.style.display = 'block'; }
  document.querySelectorAll('.sb-item[id^="nav-"]').forEach(n => n.classList.remove('on'));
  const n = document.getElementById('nav-' + name);
  if (n) n.classList.add('on');
  document.getElementById('main').scrollTop = 0;
  if (name === 'favs') renderFavsList();
  if (name === 'profile' && history.length) renderTrkList('prof-trks', history);
}

function toggleSb() {
  sbCollapsed = !sbCollapsed;
  document.getElementById('app').classList.toggle('collapsed', sbCollapsed);
}

function setPTab(el) {
  el.closest('.ptabs').querySelectorAll('.ptab').forEach(t => t.classList.remove('on'));
  el.classList.add('on');
}

// ═══════════════════════════════════════════
// QUEUE PANEL
// ═══════════════════════════════════════════
function toggleQ() {
  qOpen = !qOpen;
  document.getElementById('qpanel').classList.toggle('open', qOpen);
  document.getElementById('main').style.marginRight = qOpen ? '290px' : '0';
}

// ═══════════════════════════════════════════
// CONTEXT MENU
// ═══════════════════════════════════════════
function onRightClick(e) {
  const trk = e.target.closest('[oncontextmenu]');
  if (!trk) return;
  const m = trk.getAttribute('oncontextmenu') || '';
  const id = m.match(/openCtx\(event,'([^']+)'\)/)?.[1];
  if (id) openCtx(e, id);
}

function openCtx(e, id) {
  e.preventDefault(); ctxId = id;
  const ctx = document.getElementById('ctx');
  ctx.style.left = Math.min(e.clientX, window.innerWidth - 190) + 'px';
  ctx.style.top  = Math.min(e.clientY, window.innerHeight - 260) + 'px';
  ctx.classList.add('open');
}

function closeCtx() { document.getElementById('ctx').classList.remove('open'); }
function ctxPlay()  { if (ctxId) play(ctxId); closeCtx(); }
function ctxQ() {
  if (ctxId && cache[ctxId]) { queue.push(cache[ctxId]); renderQueueList(); toast('➕ Added to queue'); }
  closeCtx();
}
function ctxLike() {
  if (ctxId) {
    if (likedIds.has(ctxId)) likedIds.delete(ctxId);
    else { likedIds.add(ctxId); toast('❤ Added to Liked Songs'); }
    renderFavsList();
  }
  closeCtx();
}

// ═══════════════════════════════════════════
// SLEEP TIMER
// ═══════════════════════════════════════════
function openTimer()  { document.getElementById('tmodal').classList.add('open'); }
function closeTimer() { document.getElementById('tmodal').classList.remove('open'); }
function setTimer(mins, el) {
  document.querySelectorAll('.topt').forEach(t => t.classList.remove('on'));
  el.classList.add('on');
  clearTimeout(sleepTmr);
  sleepTmr = setTimeout(() => {
    audio.pause(); playing = false; updatePlayBtns();
    toast('😴 Sleep timer — music stopped');
  }, mins * 60000);
  document.getElementById('t-status').textContent = `⏱ Stops in ${mins} min`;
  setTimeout(closeTimer, 1100);
  toast(`⏱ Sleep timer: ${mins} min`);
}

// ═══════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════
function setTab(el, tab) {
  document.querySelectorAll('.sni').forEach(i => i.classList.remove('on'));
  el.classList.add('on');
  loadSettings(tab);
}

function loadSettings(tab) {
  const el = document.getElementById('set-content');
  if (el && SET_HTML[tab]) el.innerHTML = SET_HTML[tab];
}

function togS(btn) { btn.classList.toggle('on'); toast(btn.classList.contains('on') ? '✓ Enabled' : '✗ Disabled'); }

function setAccent(c) {
  document.documentElement.style.setProperty('--gold', c);
  document.documentElement.style.setProperty('--gold2', c + 'cc');
  toast('🎨 Accent colour updated');
}

// ═══════════════════════════════════════════
// PREMIUM
// ═══════════════════════════════════════════
function selPlan(el) { document.querySelectorAll('.plan').forEach(p => p.classList.remove('sel')); el.classList.add('sel'); }
function doPrem() {
  premium = true;
  toast('✦ Welcome to Velora Premium! Lossless audio activated.');
  document.querySelector('.subbtn').textContent = '✓ Premium Active';
  document.querySelector('.subbtn').style.background = 'var(--sage)';
}

// ═══════════════════════════════════════════
// PLAYLIST MODAL
// ═══════════════════════════════════════════
function openPModal(songId) {
  pmodalSongId = songId;
  renderPlModal();
  document.getElementById('pmodal').classList.add('open');
}
function closePModal() {
  document.getElementById('pmodal').classList.remove('open');
  document.getElementById('create-pl-form').style.display = 'none';
}
function addToPlaylist(plId) {
  const pl = playlists.find(p => p.id === plId);
  if (pl && pmodalSongId && !pl.songs.includes(pmodalSongId)) {
    pl.songs.push(pmodalSongId);
    toast(`✓ Added to "${pl.name}"`);
  } else if (pl) {
    toast(`Already in "${pl.name}"`);
  }
  closePModal();
}
function showCreatePl() {
  const f = document.getElementById('create-pl-form');
  f.style.display = f.style.display === 'none' ? 'block' : 'none';
  if (f.style.display !== 'none') document.getElementById('pl-name-inp').focus();
}
function confirmCreatePl() {
  const name = document.getElementById('pl-name-inp').value.trim();
  if (!name) return;
  const emojis = ['🎵','🌟','🎸','🎺','🎻','🥁','🎹','🎤'];
  playlists.push({ id: 'pl' + Date.now(), name, emoji: emojis[Math.floor(Math.random() * emojis.length)], songs: [] });
  document.getElementById('pl-name-inp').value = '';
  document.getElementById('create-pl-form').style.display = 'none';
  toast(`✓ Playlist "${name}" created`);
  renderPlModal();
}

// ═══════════════════════════════════════════
// SHARE MODAL
// ═══════════════════════════════════════════
function openShare(songId) {
  shareSongId = songId || curSong?.id;
  const song = cache[shareSongId] || curSong;
  if (!song) { toast('No song to share'); return; }
  const img = getImg(song), art = getArtist(song);
  const artEl = document.getElementById('share-art-el');
  artEl.innerHTML = img
    ? `<img src="${img}" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" onerror="this.style.display='none'"><span style="display:none;position:relative;z-index:1">🎵</span>`
    : '🎵';
  document.getElementById('share-title-el').textContent = song.name || '—';
  document.getElementById('share-artist-el').textContent = art;
  document.getElementById('share-link-inp').value = `https://velora.app/song/${song.id || ''}`;
  document.getElementById('share-modal').classList.add('open');
}
function closeShare() { document.getElementById('share-modal').classList.remove('open'); }
function copyShareLink() {
  const val = document.getElementById('share-link-inp').value;
  navigator.clipboard?.writeText(val).catch(() => {});
  toast('🔗 Link copied to clipboard!');
}
function shareToChat() {
  if (!curSong) { toast('No song playing'); return; }
  closeShare();
  goV('chat');
  setTimeout(() => {
    const msgs = document.getElementById('chat-msgs');
    const art = getArtist(curSong), img = getImg(curSong);
    msgs.innerHTML += `<div class="msg me">
      <div class="mav" style="background:linear-gradient(135deg,#f0c040,#e8607a);color:#000">V</div>
      <div><div class="mbub">Check this out! 🎵
        <div class="scrd" onclick="play('${curSong.id}')">
          <div style="width:32px;height:32px;border-radius:6px;flex-shrink:0;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;background:var(--bg5)">${img ? `<img src="${img}" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0">` : '🎵'}</div>
          <div><div style="font-size:12px;font-weight:600">${curSong.name}</div><div style="font-size:10px;color:var(--tx3)">${art}</div></div>
          <div style="margin-left:auto;color:var(--gold2)">▶</div>
        </div>
      </div><div class="mtime">just now</div></div>
    </div>`;
    msgs.scrollTop = msgs.scrollHeight;
    toast('🎵 Shared to Velora Chat!');
  }, 300);
}

// ═══════════════════════════════════════════
// NOTIFICATIONS
// ═══════════════════════════════════════════
function readNotif(i) { NOTIFS[i].read = true; renderNotifs(); }
function markAllRead() { NOTIFS.forEach(n => n.read = true); renderNotifs(); toast('✓ All notifications read'); }
function toggleNotifPanel() {
  const panel = document.getElementById('notif-panel');
  panel.classList.toggle('open');
  if (panel.classList.contains('open')) renderNotifs();
}

// ═══════════════════════════════════════════
// KEYBOARD SHORTCUTS MODAL
// ═══════════════════════════════════════════
function openKbd()  { document.getElementById('kbd-modal').classList.add('open'); }
function closeKbd() { document.getElementById('kbd-modal').classList.remove('open'); }

// ═══════════════════════════════════════════
// ARTIST PAGE
// ═══════════════════════════════════════════
async function openArtist(artistName) {
  document.getElementById('artist-name-el').textContent = artistName;
  document.getElementById('artist-meta-el').textContent = 'Loading…';
  document.getElementById('artist-tracks').innerHTML = '<div class="lstate"><span class="spinner"></span> Loading tracks…</div>';
  goV('artist');
  try {
    const songs = await apiSearch(artistName, 10);
    renderTrkList('artist-tracks', songs);
    const followerCounts = ['38.4M','12.8M','24.6M','18.2M','9.1M','6.3M'];
    document.getElementById('artist-meta-el').textContent = `${followerCounts[Math.floor(Math.random() * followerCounts.length)]} followers · Artist`;
    if (songs[0]) {
      const img = getImg(songs[0]);
      if (img) document.getElementById('artist-av-lg').innerHTML =
        `<img src="${img}" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" onerror="this.style.display='none'"><span style="display:none;position:relative;z-index:1">🎤</span>`;
    }
  } catch(e) {
    document.getElementById('artist-tracks').innerHTML = '<div class="lstate">⚠️ Could not load — check connection</div>';
  }
}

function toggleArtistFollow(btn) {
  const following = btn.textContent.includes('Following');
  btn.textContent = following ? 'Follow' : 'Following ✓';
  btn.style.background = following ? '' : 'rgba(240,192,64,.15)';
  toast(following ? 'Unfollowed' : `✓ Following ${document.getElementById('artist-name-el').textContent}`);
}

// ═══════════════════════════════════════════
// ALBUM PAGE
// ═══════════════════════════════════════════
async function openAlbum(albumName, artistName) {
  document.getElementById('album-name-el').textContent = albumName;
  document.getElementById('album-meta-el').textContent = `By ${artistName} · Loading…`;
  document.getElementById('album-tracks').innerHTML = '<div class="lstate"><span class="spinner"></span> Loading tracks…</div>';
  goV('album');
  try {
    const songs = await apiSearch(`${albumName} ${artistName}`, 10);
    renderTrkList('album-tracks', songs);
    document.getElementById('album-meta-el').textContent = `By ${artistName} · ${songs.length} tracks`;
    if (songs[0]) {
      const img = getImg(songs[0]);
      if (img) document.getElementById('album-art-el').innerHTML =
        `<img src="${img}" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" onerror="this.style.display='none'"><span style="display:none">💿</span>`;
    }
    document.getElementById('album-play-btn').onclick = () => {
      if (songs.length) { queue = songs; qIdx = 0; renderQueueList(); play(songs[0].id); }
    };
  } catch(e) {
    document.getElementById('album-tracks').innerHTML = '<div class="lstate">⚠️ Could not load</div>';
  }
}

// ═══════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════
function togFaq(i) {
  const item = document.getElementById('fq' + i), ans = document.getElementById('fqa' + i);
  const wasOpen = ans.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-item').forEach(a => a.classList.remove('open'));
  if (!wasOpen) { ans.classList.add('open'); item.classList.add('open'); }
}

// ═══════════════════════════════════════════
// DOWNLOAD SIMULATION
// ═══════════════════════════════════════════
function handleDownload(songId, btn) {
  if (!premium) { openPModal(songId); toast('✦ Premium required for downloads'); return; }
  if (btn) {
    btn.classList.remove('free', 'premium');
    btn.classList.add('downloading');
    btn.innerHTML = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-.18-4.5"/></svg> Downloading…`;
    setTimeout(() => {
      btn.innerHTML = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Downloaded`;
      btn.style.background = 'rgba(93,191,138,.1)';
      btn.style.color = 'var(--sage)';
    }, 2200);
  }
  toast('📥 Downloading for offline…');
}

// ═══════════════════════════════════════════
// HERO DYNAMIC BACKGROUND
// ═══════════════════════════════════════════
function updateHero(song) {
  if (!song) return;
  const colors = ['#1a1508,#0f1618','#0f1618,#130f1e','#1a0812,#130f1e','#0d1812,#0f1618','#1a1208,#1a0d10'];
  const idx = Math.abs(song.name?.charCodeAt(0) || 0) % colors.length;
  const hero = document.querySelector('.hero');
  if (hero) hero.style.background = `linear-gradient(135deg,${colors[idx]})`;
}

// ═══════════════════════════════════════════
// MINI EQ IN PLAYER BAR
// ═══════════════════════════════════════════
function addMiniEq() {
  const bar = document.querySelector('.pl-center .pl-ctrls');
  if (!bar || document.querySelector('.player-eq')) return;
  const eq = document.createElement('div');
  eq.className = 'player-eq';
  eq.innerHTML = '<div class="peqb"></div><div class="peqb"></div><div class="peqb"></div>';
  bar.parentNode.insertBefore(eq, bar.nextSibling);
}

function updateMiniEq() {
  document.querySelectorAll('.peqb').forEach(b => b.classList.toggle('show', playing && !!curSong));
}

// ═══════════════════════════════════════════
// LIVE BANNER
// ═══════════════════════════════════════════
let bannerTmr;
function showBanner(msg) {
  let b = document.getElementById('live-banner');
  if (!b) {
    b = document.createElement('div');
    b.id = 'live-banner';
    b.style.cssText = 'position:fixed;top:64px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--gold),#e8a820);color:#000;padding:8px 20px;border-radius:40px;font-size:12px;font-weight:700;z-index:200;transition:opacity .5s;white-space:nowrap;box-shadow:0 4px 20px rgba(240,192,64,.4)';
    document.body.appendChild(b);
  }
  b.textContent = msg; b.style.opacity = '1';
  clearTimeout(bannerTmr);
  bannerTmr = setTimeout(() => b.style.opacity = '0', 3500);
}

// ═══════════════════════════════════════════
// SEND CHAT MESSAGE
// ═══════════════════════════════════════════
function sendMsg() {
  const inp = document.getElementById('chat-inp');
  const txt = inp.value.trim();
  if (!txt) return;
  const msgs = document.getElementById('chat-msgs');
  const now = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
  msgs.innerHTML += `<div class="msg me">
    <div class="mav" style="background:linear-gradient(135deg,#f0c040,#e8607a);color:#000">V</div>
    <div><div class="mbub">${txt}</div><div class="mtime">${now}</div></div>
  </div>`;
  msgs.scrollTop = msgs.scrollHeight;
  inp.value = '';
  const replies = ['🔥🔥🔥','vibes fr','drop the playlist!','what song??','🎵✨','adds to queue rn'];
  const u = ONLINE.filter(x => x.dot === 'on')[Math.floor(Math.random() * 3)];
  setTimeout(() => {
    msgs.innerHTML += `<div class="msg">
      <div class="mav" style="background:${u.bg};color:${u.tc}">${u.av}</div>
      <div>
        <div style="font-size:10px;color:var(--tx3);margin-bottom:2px;padding-left:2px">${u.n}</div>
        <div class="mbub">${replies[Math.floor(Math.random() * replies.length)]}</div>
        <div class="mtime">just now</div>
      </div>
    </div>`;
    msgs.scrollTop = msgs.scrollHeight;
  }, 1000 + Math.random() * 800);
}

// ═══════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════
function onKey(e) {
  const tag = document.activeElement.tagName;
  if (tag === 'INPUT' || tag === 'SELECT') return;
  if (e.key === '/') { e.preventDefault(); openSearch(); }
  if (e.key === 'Escape') { closeSearch(); closeNP(); closeCtx(); closeTimer(); closeKbd(); }
  if (e.key === ' ')          { e.preventDefault(); togglePlay(); }
  if (e.key === 'ArrowRight' && audio.duration) audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
  if (e.key === 'ArrowLeft')  audio.currentTime = Math.max(audio.currentTime - 10, 0);
  if (e.key === 'ArrowUp')    { vol = Math.min(vol + 0.1, 1); audio.volume = vol; document.getElementById('pl-vf').style.width = (vol * 100) + '%'; }
  if (e.key === 'ArrowDown')  { vol = Math.max(vol - 0.1, 0); audio.volume = vol; document.getElementById('pl-vf').style.width = (vol * 100) + '%'; }
  if (e.key === 'n' || e.key === 'N') nextTrk();
  if (e.key === 'p' || e.key === 'P') prevTrk();
  if (e.key === 'l' || e.key === 'L') toggleHeart();
  if (e.key === 'q' || e.key === 'Q') toggleQ();
  if (e.key === '?') openKbd();
}

// ═══════════════════════════════════════════
// UTILITY
// ═══════════════════════════════════════════
function fmtSec(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  return m + ':' + (Math.floor(s % 60) < 10 ? '0' : '') + Math.floor(s % 60);
}
function fmtDur(s) { return s ? fmtSec(parseInt(s)) : '—'; }

let toastT;
function toast(msg) {
  const el = document.getElementById('toast-el');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove('show'), 2800);
}

// ═══════════════════════════════════════════
// API SETUP & CONFIG
// ═══════════════════════════════════════════
function initSetup() {
  const modal = document.getElementById('setup-modal');
  if (window.location.protocol === 'file:') {
    if (SAAVN) { modal.classList.add('hidden'); updateApiChip(true, SAAVN); toast('⚠️ Open via HTTP server or Netlify for live search'); return; }
    const noteEl = document.querySelector('.setup-note');
    if (noteEl) noteEl.innerHTML += '<br><br><strong style="color:#f0c040">⚠️ You opened this as a file. For live search to work, deploy to <a href="https://app.netlify.com/drop" target="_blank">Netlify</a> first, then enter your API URL.</strong>';
    modal.classList.remove('hidden'); return;
  }
  if (SAAVN) {
    modal.classList.add('hidden');
    updateApiChip(true, SAAVN);
    toast('✦ JioSaavn API connected — search any song!');
  } else {
    modal.classList.remove('hidden');
    updateApiChip(false, '');
  }
}

function openSetup() {
  document.getElementById('setup-modal').classList.remove('hidden');
  if (SAAVN) document.getElementById('setup-inp').value = SAAVN;
}

function skipSetup() {
  document.getElementById('setup-modal').classList.add('hidden');
  updateApiChip(false, '');
  toast('▶ Playing 12 local songs — add your API anytime from the header');
}

async function testAndSaveAPI() {
  const inp = document.getElementById('setup-inp');
  const res = document.getElementById('api-res');
  let url = inp.value.trim().replace(/\/$/, '');
  if (!url) { res.style.color = 'var(--rose2)'; res.textContent = '⚠️ Please enter your Vercel URL'; return; }
  if (!url.startsWith('http')) url = 'https://' + url;

  SAAVN = url;
  try { localStorage.setItem('vl-api', url); } catch(e) {}
  res.style.color = 'var(--sage)';
  res.textContent = '✅ API URL saved! Velora will use it for all searches.';
  updateApiChip(true, url);
  setTimeout(() => {
    document.getElementById('setup-modal').classList.add('hidden');
    toast('🎵 API connected! Search any song now.');
    loadHome();
  }, 1000);
}

function updateApiChip(connected, url) {
  const chip = document.getElementById('api-chip');
  const dot  = document.getElementById('api-dot');
  const txt  = document.getElementById('api-chip-txt');
  if (connected) {
    dot.style.background = 'var(--sage)';
    const domain = url.replace('https://', '').split('/')[0].split('.')[0];
    txt.textContent = '● Live: ' + domain;
    chip.style.borderColor = 'rgba(93,191,138,.3)';
    chip.style.color = 'var(--sage)';
  } else {
    dot.style.background = 'var(--tx3)';
    txt.textContent = '+ Connect API';
    chip.style.borderColor = '';
    chip.style.color = '';
  }
}
