/* ═══════════════════════════════════════════
   VELORA — The Art of Vibes
   data.js  —  Static data & embedded songs
   ═══════════════════════════════════════════ */

// ── SONG CACHE (populated at startup and during use) ──
const cache = {};

// ── REAL EMBEDDED SONGS (always work, no server needed) ──
const REAL_SONGS = [
  { id:'s1', name:'Golden Dusk', artist:'Raya & The Wave', album:'Solstice', year:'2024',
    language:'English', duration:'214', genre:'Ambient',
    url:'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/master/music-player/music/ukulele.mp3',
    img:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZjBjMDQwO3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZThhODIwO3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZykiLz48dGV4dCB4PSIyMDAiIHk9IjIzMCIgZm9udC1zaXplPSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPvCfjIU8L3RleHQ+PC9zdmc+',
    emoji:'🌅', color:'linear-gradient(135deg,#2a1f05,#1e1808)' },
  { id:'s2', name:'Midnight Drift', artist:'SolCave', album:'Dark Hours', year:'2024',
    language:'English', duration:'198', genre:'Lo-fi',
    url:'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/master/music-player/music/summer.mp3',
    img:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNWFiNGU4O3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMzA5MGM4O3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZykiLz48dGV4dCB4PSIyMDAiIHk9IjIzMCIgZm9udC1zaXplPSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPvCfjJk8L3RleHQ+PC9zdmc+',
    emoji:'🌙', color:'linear-gradient(135deg,#0d0f1a,#181830)' },
  { id:'s3', name:'Velvet Crush', artist:'NOIR', album:'Shadows', year:'2024',
    language:'Hindi', duration:'187', genre:'R&B',
    url:'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/master/music-player/music/hey.mp3',
    img:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZTg2MDdhO3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojYzA0MDYwO3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZykiLz48dGV4dCB4PSIyMDAiIHk9IjIzMCIgZm9udC1zaXplPSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPvCflqQ8L3RleHQ+PC9zdmc+',
    emoji:'🖤', color:'linear-gradient(135deg,#160d1f,#200e2c)' },
  { id:'s4', name:'Cobalt Sea', artist:'Drift Pool', album:'Depth', year:'2024',
    language:'English', duration:'203', genre:'Electronic',
    url:'https://raw.githubusercontent.com/goldfire/howler.js/master/tests/audio/sound2.mp3',
    img:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNWRiZjhhO3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojM2E5YTZhO3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZykiLz48dGV4dCB4PSIyMDAiIHk9IjIzMCIgZm9udC1zaXplPSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPvCfjIo8L3RleHQ+PC9zdmc+',
    emoji:'🌊', color:'linear-gradient(135deg,#091520,#0d2030)' },
  { id:'s5', name:'Smoke & Silk', artist:'Celestine', album:'Dusk', year:'2024',
    language:'Hindi', duration:'222', genre:'Jazz',
    url:'https://raw.githubusercontent.com/katspaugh/wavesurfer.js/main/examples/audio/audio.wav',
    img:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOWI4ZmQ0O3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNzA2MGIwO3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZykiLz48dGV4dCB4PSIyMDAiIHk9IjIzMCIgZm9udC1zaXplPSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPvCfla/vuI88L3RleHQ+PC9zdmc+',
    emoji:'🕯️', color:'linear-gradient(135deg,#180e1a,#24102a)' },
  { id:'s6', name:'Petal Rain', artist:'Maira Bloom', album:'Bloom', year:'2024',
    language:'Hindi', duration:'231', genre:'Indie',
    url:'https://raw.githubusercontent.com/katspaugh/wavesurfer.js/main/examples/audio/demo.wav',
    img:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZjA3YTkyO3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZDA1MDcwO3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZykiLz48dGV4dCB4PSIyMDAiIHk9IjIzMCIgZm9udC1zaXplPSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPvCfjLg8L3RleHQ+PC9zdmc+',
    emoji:'🌸', color:'linear-gradient(135deg,#1a0d12,#281016)' },
  { id:'s7', name:'Desert Glass', artist:'Asha Mehta', album:'Dunes', year:'2024',
    language:'Hindi', duration:'256', genre:'World',
    url:'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/master/music-player/music/ukulele.mp3',
    img:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZjBhMDQwO3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZDA4MDIwO3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZykiLz48dGV4dCB4PSIyMDAiIHk9IjIzMCIgZm9udC1zaXplPSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPvCfj5zvuI88L3RleHQ+PC9zdmc+',
    emoji:'🏜️', color:'linear-gradient(135deg,#1a1209,#281a08)' },
  { id:'s8', name:'Neon Bloom', artist:'FlareCat', album:'UV', year:'2024',
    language:'English', duration:'175', genre:'Pop',
    url:'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/master/music-player/music/summer.mp3',
    img:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNDBkMGYwO3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMjA5MGM4O3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZykiLz48dGV4dCB4PSIyMDAiIHk9IjIzMCIgZm9udC1zaXplPSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPvCfjLo8L3RleHQ+PC9zdmc+',
    emoji:'🌺', color:'linear-gradient(135deg,#0d1808,#121f08)' },
  { id:'s9', name:'Ivory Storm', artist:'BLANC', album:'Blanche', year:'2024',
    language:'English', duration:'196', genre:'Cinematic',
    url:'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/master/music-player/music/hey.mp3',
    img:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZTBlOGY4O3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojYTBiOGQ4O3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZykiLz48dGV4dCB4PSIyMDAiIHk9IjIzMCIgZm9udC1zaXplPSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPuKdhO+4jzwvdGV4dD48L3N2Zz4=',
    emoji:'❄️', color:'linear-gradient(135deg,#0a0f1e,#101528)' },
  { id:'s10', name:'Saffron Tape', artist:'Ira & Prism', album:'Rewind', year:'2024',
    language:'Hindi', duration:'241', genre:'Dream Pop',
    url:'https://raw.githubusercontent.com/goldfire/howler.js/master/tests/audio/sound2.mp3',
    img:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZjBkMDgwO3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZDBhMDQwO3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZykiLz48dGV4dCB4PSIyMDAiIHk9IjIzMCIgZm9udC1zaXplPSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPvCfjp7vuI88L3RleHQ+PC9zdmc+',
    emoji:'🎞️', color:'linear-gradient(135deg,#1f1208,#2a1a08)' },
  { id:'s11', name:'Glass Garden', artist:'Prism Lake', album:'Prismatic', year:'2024',
    language:'Hindi', duration:'227', genre:'Indie',
    url:'https://raw.githubusercontent.com/katspaugh/wavesurfer.js/main/examples/audio/audio.wav',
    img:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojODBlMGEwO3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNDBjMDcwO3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZykiLz48dGV4dCB4PSIyMDAiIHk9IjIzMCIgZm9udC1zaXplPSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPvCfqp48L3RleHQ+PC9zdmc+',
    emoji:'🪞', color:'linear-gradient(135deg,#0d1812,#10201a)' },
  { id:'s12', name:'Tangerine Hours', artist:'Kalinda', album:'Morning', year:'2024',
    language:'English', duration:'209', genre:'Soul',
    url:'https://raw.githubusercontent.com/katspaugh/wavesurfer.js/main/examples/audio/demo.wav',
    img:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZjA4MDYwO3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZDA1MDMwO3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZykiLz48dGV4dCB4PSIyMDAiIHk9IjIzMCIgZm9udC1zaXplPSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPvCfjYo8L3RleHQ+PC9zdmc+',
    emoji:'🍊', color:'linear-gradient(135deg,#1e1108,#2a1a08)' },
];

// Pre-load real songs into cache with normalized fields
REAL_SONGS.forEach(s => {
  s.download_url = [{ quality:'320kbps', link: s.url }];
  s.downloadUrl  = [{ quality:'320kbps', url:  s.url }];
  s.image = [{ quality:'500x500', link: s.img, url: s.img }];
  s.artists = { primary: [{ name: s.artist }] };
  cache[s.id] = s;
});

// ── MOOD CHIPS ──
const MOODS = [
  'Chill 🌊','Focus 🔮','Energy ⚡','Sleep 🌙',
  'Happy 🌸','Romance ❤️','Morning ☀️','Bollywood 🎬'
];

// ── GENRE GRID ──
const GENRES = [
  { n:'Bollywood', c:'2.1M', e:'🎬', bg:'linear-gradient(135deg,#1a1208,#2a1c08)' },
  { n:'Lo-fi',     c:'480K', e:'🎧', bg:'linear-gradient(135deg,#0d0f1a,#181830)' },
  { n:'Punjabi',   c:'1.4M', e:'🎺', bg:'linear-gradient(135deg,#1a0812,#2a1020)' },
  { n:'Romantic',  c:'960K', e:'❤️', bg:'linear-gradient(135deg,#1a0d10,#281016)' },
  { n:'Devotional',c:'820K', e:'🪔', bg:'linear-gradient(135deg,#1a1808,#281e08)' },
  { n:'Indie',     c:'340K', e:'🎸', bg:'linear-gradient(135deg,#0d1812,#10201a)' },
  { n:'Electronic',c:'560K', e:'⚡', bg:'linear-gradient(135deg,#091520,#0d2030)' },
  { n:'Classical', c:'280K', e:'🎻', bg:'linear-gradient(135deg,#180e1a,#24102a)' },
  { n:'Pop',       c:'1.8M', e:'🌟', bg:'linear-gradient(135deg,#0d1808,#121f08)' },
  { n:'R&B',       c:'420K', e:'🖤', bg:'linear-gradient(135deg,#160d1f,#200e2c)' },
  { n:'Hip-Hop',   c:'680K', e:'🎤', bg:'linear-gradient(135deg,#18100a,#201608)' },
  { n:'World',     c:'310K', e:'🌍', bg:'linear-gradient(135deg,#0a1020,#0d1830)' },
];

// ── TOP ARTISTS ──
const ARTISTS = [
  { n:'Arijit Singh',   g:'Bollywood · Romantic', e:'🎤', f:'38.4M' },
  { n:'AP Dhillon',     g:'Punjabi · Pop',         e:'🎧', f:'12.8M' },
  { n:'Shreya Ghoshal', g:'Bollywood · Classical', e:'🎶', f:'24.6M' },
  { n:'Diljit Dosanjh', g:'Punjabi · Pop',         e:'🎺', f:'18.2M' },
];

// ── LIVE CHAT SEED MESSAGES ──
const CHAT_SEED = [
  { u:'Tanvi', av:'T', bg:'#f0c040', tc:'#000', txt:'anyone else obsessed with Kesariya?? 🌅', t:'2:14 PM', me:false },
  { u:'Jay',   av:'J', bg:'#e8607a', tc:'#fff', txt:"yes it's been on loop all day 😭",          t:'2:15 PM', me:false },
  { u:'Harini',av:'H', bg:'#5ab4e8', tc:'#fff', txt:'the new AP Dhillon drop is 🔥🔥',          t:'2:17 PM', me:false },
  { u:'Jay',   av:'J', bg:'#e8607a', tc:'#fff', txt:'AP always delivers fr fr',                  t:'2:18 PM', me:false },
];

// ── ONLINE USERS ──
const ONLINE = [
  { n:'Tanvi', av:'T', bg:'#f0c040', tc:'#000', s:'Listening now',   dot:'on' },
  { n:'Jay',   av:'J', bg:'#e8607a', tc:'#fff', s:'Vibing to Lo-fi', dot:'on' },
  { n:'Harini',av:'H', bg:'#5ab4e8', tc:'#fff', s:'Away',            dot:'aw' },
  { n:'Priya', av:'P', bg:'#5dbf8a', tc:'#000', s:'In a playlist',   dot:'on' },
  { n:'Karan', av:'K', bg:'#9b8fd4', tc:'#fff', s:'Using Velora',    dot:'on' },
];

// ── FAQS ──
const FAQS = [
  { q:'What is Velora Premium?',
    a:'Velora Premium gives you unlimited offline downloads, lossless HiFi audio (up to 24-bit/192kHz), Dolby Atmos, zero ads, and exclusive Velora Originals — from just ₹100/month.' },
  { q:'How do I download songs for offline listening?',
    a:'Upgrade to Premium, then tap the download icon on any track or playlist. Downloads sync across all devices automatically.' },
  { q:'What audio quality does Velora stream?',
    a:'Free users get standard quality. Premium gets High (320kbps) or Lossless HiFi (FLAC, 24-bit/192kHz), configurable in Settings → Audio.' },
  { q:'Does Velora use JioSaavn?',
    a:'Yes! Velora streams real music through the JioSaavn database — 80M+ tracks in 15+ languages, free to search and play.' },
  { q:'Can I share music in Live Chat?',
    a:'Yes! Use the Live Chat to share tracks in real-time with friends who are online.' },
  { q:'How do I cancel Premium?',
    a:'Go to Settings → Account → Manage Subscription. Cancel anytime — access continues until end of billing period.' },
];

// ── LYRIC CAROUSEL ──
const LYRICS = [
  '"Tere bina zindagi se koi shikwa toh nahi…"',
  '"Kesariya tera ishq hai piya…"',
  '"Raataan lambiyan, tere bina kaisi raataan…"',
  '"Jo bhi main kehna chahun, barbaad karein alfaaz mere…"',
  '"Tum hi ho, ab tum hi ho…"',
  '"The art of vibes, alive in every note…"',
];

// ── NOTIFICATIONS ──
const NOTIFS = [
  { text:'Arijit Singh just dropped a new album — "Tere Baad"',          time:'2 min ago',  read:false },
  { text:'Your friend Tanvi liked your playlist "Late Night"',             time:'14 min ago', read:false },
  { text:'New trending: "Dildarian" by AP Dhillon is 🔥',                 time:'1 hr ago',   read:false },
  { text:'Jay started following you on Velora',                            time:'3 hr ago',   read:true  },
  { text:'Your Weekly Mix is ready — 18 fresh picks',                      time:'Yesterday',  read:true  },
  { text:'Shreya Ghoshal released "Teri Yaad" (Live Sessions)',            time:'2 days ago', read:true  },
];

// ── SETTINGS PAGE HTML ──
const SET_HTML = {
  audio: `<div class="stitle">Audio & Playback</div>
    <div class="ssub">Control how Velora sounds</div>
    <div class="sgrp">
      <div class="srow"><div><div class="slbl">Stream Quality</div><div class="sdesc">Current playback quality</div></div><select class="selinp" onchange="toast('🎵 Quality: '+this.value)"><option>Standard</option><option>High (320kbps)</option><option selected>Lossless HiFi ✦</option></select></div>
      <div class="srow"><div><div class="slbl">Crossfade</div><div class="sdesc">Smooth track transitions</div></div><button class="tog on" onclick="togS(this)"></button></div>
      <div class="srow"><div><div class="slbl">Equalizer</div><div class="sdesc">Custom bass &amp; treble</div></div><button class="tog" onclick="togS(this)"></button></div>
      <div class="srow"><div><div class="slbl">Normalize Volume</div><div class="sdesc">Consistent across songs</div></div><button class="tog on" onclick="togS(this)"></button></div>
      <div class="srow"><div><div class="slbl">Autoplay</div><div class="sdesc">Keep playing similar music</div></div><button class="tog on" onclick="togS(this)"></button></div>
    </div>`,
  account: `<div class="stitle">Account</div>
    <div class="ssub">Manage your Velora account</div>
    <div class="sgrp">
      <div class="srow"><div><div class="slbl">Display Name</div><div class="sdesc">Velora User</div></div><button class="btn-o" style="padding:6px 13px;font-size:11.5px" onclick="toast('✏️ Edit coming soon')">Edit</button></div>
      <div class="srow"><div><div class="slbl">Plan</div><div class="sdesc">Free — upgrade for lossless</div></div><button class="btn-g" style="padding:6px 13px;font-size:11.5px" onclick="goV('app')">Upgrade ✦</button></div>
    </div>`,
  privacy: `<div class="stitle">Privacy &amp; Data</div>
    <div class="ssub">Control your data</div>
    <div class="sgrp">
      <div class="srow"><div><div class="slbl">Public Profile</div><div class="sdesc">Others see your activity</div></div><button class="tog on" onclick="togS(this)"></button></div>
      <div class="srow"><div><div class="slbl">Listening History</div><div class="sdesc">Used for recommendations</div></div><button class="tog on" onclick="togS(this)"></button></div>
      <div class="srow"><div><div class="slbl">Data Export</div><div class="sdesc">Download your Velora data</div></div><button class="btn-o" style="padding:6px 13px;font-size:11.5px" onclick="toast('📦 Export requested')">Export</button></div>
    </div>`,
  notifs: `<div class="stitle">Notifications</div>
    <div class="ssub">What you hear from Velora</div>
    <div class="sgrp">
      <div class="srow"><div><div class="slbl">New Releases</div><div class="sdesc">Artists you follow drop music</div></div><button class="tog on" onclick="togS(this)"></button></div>
      <div class="srow"><div><div class="slbl">Friend Activity</div><div class="sdesc">Friends share tracks in chat</div></div><button class="tog on" onclick="togS(this)"></button></div>
      <div class="srow"><div><div class="slbl">Weekly Digest</div><div class="sdesc">Your personalised report</div></div><button class="tog" onclick="togS(this)"></button></div>
    </div>`,
  appear: `<div class="stitle">Appearance</div>
    <div class="ssub">Make Velora yours</div>
    <div class="sgrp">
      <div class="srow">
        <div><div class="slbl">Accent Colour</div><div class="sdesc">Highlight colour throughout</div></div>
        <div style="display:flex;gap:8px">
          ${['#f0c040','#e8607a','#5dbf8a','#5ab4e8','#9b8fd4'].map(c =>
            `<div onclick="setAccent('${c}')" style="width:20px;height:20px;border-radius:50%;background:${c};cursor:pointer;border:2px solid rgba(255,255,255,.15);transition:transform .18s" onmouseover="this.style.transform='scale(1.25)'" onmouseout="this.style.transform='scale(1)'"></div>`
          ).join('')}
        </div>
      </div>
      <div class="srow"><div><div class="slbl">Compact Mode</div><div class="sdesc">Smaller cards, tighter layout</div></div><button class="tog" onclick="togS(this)"></button></div>
    </div>`,
};
