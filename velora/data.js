/* ═══════════════════════════════════════════
   VELORA — STATIC DATA
   ═══════════════════════════════════════════ */
const cache = {};

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

REAL_SONGS.forEach(s => {
  s.download_url = [{ quality:'320kbps', link: s.url }];
  s.downloadUrl  = [{ quality:'320kbps', url:  s.url }];
  s.image = [{ quality:'500x500', link: s.img, url: s.img }];
  s.artists = { primary: [{ name: s.artist }] };
  cache[s.id] = s;
});

const MOODS = ['Chill 🌊','Focus 🔮','Energy ⚡','Sleep 🌙','Happy 🌸','Romance ❤️','Morning ☀️','Bollywood 🎬'];

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

const ARTISTS = [
  { n:'Arijit Singh',   g:'Bollywood · Romantic', e:'🎤', f:'38.4M' },
  { n:'AP Dhillon',     g:'Punjabi · Pop',         e:'🎧', f:'12.8M' },
  { n:'Shreya Ghoshal', g:'Bollywood · Classical', e:'🎶', f:'24.6M' },
  { n:'Diljit Dosanjh', g:'Punjabi · Pop',         e:'🎺', f:'18.2M' },
];

const CHAT_SEED = [
  { u:'Tanvi', av:'T', bg:'#f0c040', tc:'#000', txt:'anyone else obsessed with Kesariya?? 🌅', t:'2:14 PM', me:false },
  { u:'Jay',   av:'J', bg:'#e8607a', tc:'#fff', txt:"yes it's been on loop all day 😭",          t:'2:15 PM', me:false },
  { u:'Harini',av:'H', bg:'#5ab4e8', tc:'#fff', txt:'the new AP Dhillon drop is 🔥🔥',          t:'2:17 PM', me:false },
  { u:'Jay',   av:'J', bg:'#e8607a', tc:'#fff', txt:'AP always delivers fr fr',                  t:'2:18 PM', me:false },
];

const ONLINE = [
  { n:'Tanvi', av:'T', bg:'#f0c040', tc:'#000', s:'Listening now',   dot:'on' },
  { n:'Jay',   av:'J', bg:'#e8607a', tc:'#fff', s:'Vibing to Lo-fi', dot:'on' },
  { n:'Harini',av:'H', bg:'#5ab4e8', tc:'#fff', s:'Away',            dot:'aw' },
  { n:'Priya', av:'P', bg:'#5dbf8a', tc:'#000', s:'In a playlist',   dot:'on' },
  { n:'Karan', av:'K', bg:'#9b8fd4', tc:'#fff', s:'Using Velora',    dot:'on' },
];

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

const LYRICS = [
  '"Tere bina zindagi se koi shikwa toh nahi…"',
  '"Kesariya tera ishq hai piya…"',
  '"Raataan lambiyan, tere bina kaisi raataan…"',
  '"Jo bhi main kehna chahun, barbaad karein alfaaz mere…"',
  '"Tum hi ho, ab tum hi ho…"',
  '"The art of vibes, alive in every note…"',
];

const NOTIFS = [
  { text:'Arijit Singh just dropped a new album — "Tere Baad"',          time:'2 min ago',  read:false },
  { text:'Your friend Tanvi liked your playlist "Late Night"',             time:'14 min ago', read:false },
  { text:'New trending: "Dildarian" by AP Dhillon is 🔥',                 time:'1 hr ago',   read:false },
  { text:'Jay started following you on Velora',                            time:'3 hr ago',   read:true  },
  { text:'Your Weekly Mix is ready — 18 fresh picks',                      time:'Yesterday',  read:true  },
  { text:'Shreya Ghoshal released "Teri Yaad" (Live Sessions)',            time:'2 days ago', read:true  },
];

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

/* ═══════════════════════════════════════════
   VELORA — APP LOGIC
   ═══════════════════════════════════════════ */

const STORED_API  = (() => { try { return localStorage.getItem('vl-api'); }  catch(e) { return null; } })();
const audio = document.getElementById('audio');

let SAAVN = STORED_API ? STORED_API.replace(/\/+$/, '') : '';

let queue = [], qIdx = -1, curSong = null;
let playing = false, shuffle = false, repeat = false, liked = false, premium = false;
let vol = 0.7, muted = false;
let likedIds = new Set();
let historyArr = [];
let qOpen = false, sbCollapsed = false;
let ctxId = null, sleepTmr = null;
let vizFrame = null, vizPhase = 0;
let lyricTmr = null, lyricIdx = 0;
let searchTmr = null;
let dragging = false;

let playlists = [
  { id:'pl1', name:'Liked Songs', emoji:'❤️', songs:[] },
  { id:'pl2', name:'Arijit Hits', emoji:'🌅', songs:[] },
  { id:'pl3', name:'Late Night',  emoji:'🌙', songs:[] },
  { id:'pl4', name:'Workout',     emoji:'⚡', songs:[] },
];
let pmodalSongId = null;
let shareSongId  = null;
let searchHistory = JSON.parse((() => { try { return localStorage.getItem('vl-srch') || '[]'; } catch(e) { return '[]'; } })());

function getUrl(song) {
  const urls = song.download_url || song.downloadUrl || [];
  if (Array.isArray(urls) && urls.length > 0) {
    for (const q of ['320kbps','160kbps','128kbps','96kbps']) {
      const u = urls.find(x => x.quality === q || x.quality?.includes(q.replace('kbps','')));
      if (u && (u.link || u.url)) return u.link || u.url;
    }
    const last = urls[urls.length - 1];
    return last?.link || last?.url || null;
  }
  if (song.media_url && typeof song.media_url === 'string') return song.media_url;
  if (song.url && typeof song.url === 'string') {
    if (!song.url.includes('jiosaavn.com/song/') && !song.url.includes('saavn.com/song/')) {
      return song.url;
    }
  }
  return null;
}

function getImg(song) {
  const imgs = song.image || song.img || [];
  if (Array.isArray(imgs) && imgs.length > 0) {
    for (const q of ['500x500','150x150','50x50']) {
      const img = imgs.find(i => i.quality === q);
      if (img && (img.link || img.url)) return img.link || img.url;
    }
    const last = imgs[imgs.length - 1];
    return last?.link || last?.url || null;
  }
  if (typeof song.image === 'string') return song.image;
  if (typeof song.img === 'string') return song.img;
  return null;
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
    `${base}/api/search/songs?query=${encodeURIComponent(q)}&limit=${n}`,
    `${base}/search/songs?q=${encodeURIComponent(q)}&limit=${n}`,
    `${base}/search?q=${encodeURIComponent(q)}&n=${n}`
  ];
  for (const url of endpoints) {
    try {
      const r = await fetch(url, { method:'GET', headers:{ 'Accept':'application/json' }, mode:'cors' });
      if (!r.ok) continue;
      const d = await r.json();
      const results = d.data?.results || d.results || d.songs?.results || d.data?.songs || d.songs || (Array.isArray(d.data) ? d.data : null) || [];
      const arr = Array.isArray(results) ? results : [];
      if (arr.length > 0) return arr;
    } catch(e) { continue; }
  }
  throw new Error('All endpoints failed');
}

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
      <div class="trnd-c ${dir}">${dir === 'up' ? '↑' : dir === 'dn' ? '—' : '—'}</div>
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

document.addEventListener('DOMContentLoaded', async () => {
  const h = new Date().getHours();
  const g = h < 12 ? '☀️ Good morning' : h < 17 ? '🌤️ Good afternoon' : '🌙 Good evening';
  document.getElementById('h-lbl').textContent = '✦ ' + g;

  renderMoodChips(); renderArtists(); renderGenreGrid();
  renderChat(); renderOnlineUsers(); renderFAQs();
  loadSettings('audio');

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

  audio.addEventListener('ended', onEnd);
  audio.addEventListener('timeupdate', onTime);
  audio.addEventListener('error', () => {
    const isLocal = audio.src?.includes('githubusercontent.com') || audio.src?.includes('wavesurfer');
    if (isLocal) { toast('⚠️ Local audio error — check connection'); return; }
    setTimeout(() => { toast('⏭ Stream error — skipping to next...'); nextTrk(); }, 800);
  });

  setupDrag();
  document.addEventListener('click', () => closeCtx());
  document.addEventListener('contextmenu', onRightClick, true);
  document.addEventListener('keydown', onKey);

  document.querySelector('.nbtn').onclick = toggleNotifPanel;
  document.addEventListener('click', e => {
    const panel = document.getElementById('notif-panel');
    if (!panel.contains(e.target) && !e.target.closest('.nbtn')) panel.classList.remove('open');
  });

  addMiniEq();
  loadHome();
  setTimeout(initSetup, 300);

  setTimeout(() => {
    const seen = (() => { try { return localStorage.getItem('vl-seen'); } catch(e) { return null; } })();
    if (!seen) {
      toast('🎵 Click any song card to start playing!');
      try { localStorage.setItem('vl-seen', '1'); } catch(e) {}
    }
  }, 1200);
});

async function loadHome() {
  renderCards('fy-cards', REAL_SONGS.slice(0, 7));
  queue = [...REAL_SONGS];
  renderQueueList();
  renderTrending('trend-home', REAL_SONGS.slice(0, 8), false);
  renderTrending('trend-full', REAL_SONGS, true);
  renderCards('nr-cards', REAL_SONGS.slice(5));
  renderTrkList('prof-trks', REAL_SONGS.slice(0, 6));
  tryLoadLive();
}

async function tryLoadLive() {
  if (!SAAVN) return;
  const tryFetch = async (q, n) => {
    return Promise.race([
      apiSearch(q, n),
      new Promise((_, r) => setTimeout(() => r(new Error('timeout')), 4000))
    ]);
  };
  try {
    const fy = await tryFetch('arijit singh', 7);
    if (fy?.length) {
      fy.forEach(s => cache[s.id] = s);
      renderCards('fy-cards', fy);
      queue = [...fy, ...REAL_SONGS.filter(s => !fy.find(x => x.id === s.id))];
      renderQueueList();
      showBanner('✨ Live music loaded from JioSaavn!');
    }
  } catch(e) {}
  try {
    const tr = await tryFetch('top hindi hits', 8);
    if (tr?.length) { renderTrending('trend-home', tr, false); renderTrending('trend-full', tr, true); }
  } catch(e) {}
  try {
    const nr = await tryFetch('new hindi songs', 7);
    if (nr?.length) renderCards('nr-cards', nr);
  } catch(e) {}
}

async function play(id) {
  let song = cache[id];
  if (!song) {
    toast('⏳ Loading…');
    try {
      const base = SAAVN.replace(/\/api$/, '').replace(/\/$/, '');
      const endpoints = [
        `${base}/api/songs/${id}`,
        `${base}/api/songs?ids=${id}`,
        `${base}/songs?id=${id}`
      ];
      let found = false;
      for (const url of endpoints) {
        try {
          const r = await fetch(url, { headers: { 'Accept': 'application/json' }, mode:'cors' });
          if (!r.ok) continue;
          const d = await r.json();
          song = (Array.isArray(d.data) ? d.data[0] : (d.data?.songs?.[0] || d.data)) || (Array.isArray(d) ? d[0] : d);
          if (song && song.id) { cache[song.id] = song; found = true; break; }
        } catch(e) {}
      }
      if(!found) throw new Error();
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

  if (!historyArr.find(s => s.id === id)) historyArr.unshift(song);
  if (historyArr.length > 12) historyArr.pop();

  if (document.getElementById('np').classList.contains('open')) updateNPUI();
}

function updateHero(song) {
  // placeholder — hero stays static unless overridden
}

function showBanner(msg) {
  toast(msg);
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

function sendMsg() {
  const inp = document.getElementById('chat-inp');
  const txt = inp.value.trim();
  if (!txt) return;
  const msgs = document.getElementById('chat-msgs');
  msgs.innerHTML += `<div class="msg me">
    <div class="mav" style="background:linear-gradient(135deg,#f0c040,#e8607a);color:#000">V</div>
    <div><div class="mbub">${txt}</div><div class="mtime">just now</div></div>
  </div>`;
  inp.value = '';
  msgs.scrollTop = msgs.scrollHeight;
}

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

function startLyrics() { stopLyrics(); updateLyric(); lyricTmr = setInterval(updateLyric, 3500); }
function stopLyrics()  { clearInterval(lyricTmr); }
function updateLyric() {
  const el = document.getElementById('lyric');
  el.style.opacity = '0';
  setTimeout(() => { el.textContent = LYRICS[lyricIdx % LYRICS.length]; el.style.opacity = '1'; lyricIdx++; }, 300);
}

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
  if (name === 'profile' && historyArr.length) renderTrkList('prof-trks', historyArr);
}

function toggleSb() {
  sbCollapsed = !sbCollapsed;
  document.getElementById('app').classList.toggle('collapsed', sbCollapsed);
}

function setPTab(el) {
  el.closest('.ptabs').querySelectorAll('.ptab').forEach(t => t.classList.remove('on'));
  el.classList.add('on');
}

function toggleQ() {
  qOpen = !qOpen;
  document.getElementById('qpanel').classList.toggle('open', qOpen);
  document.getElementById('main').style.marginRight = qOpen ? '290px' : '0';
}

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

function selPlan(el) { document.querySelectorAll('.plan').forEach(p => p.classList.remove('sel')); el.classList.add('sel'); }
function doPrem() {
  premium = true;
  toast('✦ Welcome to Velora Premium! Lossless audio activated.');
  document.querySelector('.subbtn').textContent = '✓ Premium Active';
  document.querySelector('.subbtn').style.background = 'var(--sage)';
}

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

function readNotif(i) { NOTIFS[i].read = true; renderNotifs(); }
function markAllRead() { NOTIFS.forEach(n => n.read = true); renderNotifs(); toast('✓ All notifications read'); }
function toggleNotifPanel() {
  const panel = document.getElementById('notif-panel');
  panel.classList.toggle('open');
  if (panel.classList.contains('open')) renderNotifs();
}

function openKbd()  { document.getElementById('kbd-modal').classList.add('open'); }
function closeKbd() { document.getElementById('kbd-modal').classList.remove('open'); }

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

function togFaq(i) {
  const item = document.getElementById('fq' + i), ans = document.getElementById('fqa' + i);
  const wasOpen = ans.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-item').forEach(a => a.classList.remove('open'));
  if (!wasOpen) { ans.classList.add('open'); item.classList.add('open'); }
}

function handleDownload(songId, btn) {
  if (!premium) { openPModal(songId); toast('✦ Premium required for downloads'); return; }
  if (btn) {
    btn.classList.remove('free', 'premium');
    btn.classList.add('downloading');
    btn.innerHTML = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-.18-4.5"/></svg> Downloading…`;
    setTimeout(() => {
      btn.innerHTML = `✓ Downloaded`;
      btn.style.background = 'var(--sage)';
      btn.style.color = '#000';
      toast('📥 Download complete');
    }, 1500);
  }
}

function toast(msg) {
  const el = document.getElementById('toast-el');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3000);
}

function fmtDur(secStr) {
  if (!secStr) return '0:00';
  const sec = parseInt(secStr, 10);
  return fmtSec(sec);
}

function fmtSec(sec) {
  if (isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function addMiniEq() {
  const eqHTML = '<div class="player-eq"><div class="peqb"></div><div class="peqb"></div><div class="peqb"></div></div>';
  document.getElementById('pl-track').insertAdjacentHTML('afterend', eqHTML);
}

function updateMiniEq() {
  document.querySelectorAll('.peqb').forEach(e => {
    if(playing) e.classList.add('show');
    else e.classList.remove('show');
  });
}

function onKey(e) {
  if (e.target.tagName === 'INPUT') return;
  if (e.key === ' ') { e.preventDefault(); togglePlay(); }
  if (e.key === 'ArrowRight') { e.preventDefault(); if(audio.duration) audio.currentTime = Math.min(audio.currentTime+5, audio.duration); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); if(audio.duration) audio.currentTime = Math.max(audio.currentTime-5, 0); }
  if (e.key === 'ArrowUp') { e.preventDefault(); setVolSl(Math.min(100, vol * 100 + 5)); }
  if (e.key === 'ArrowDown') { e.preventDefault(); setVolSl(Math.max(0, vol * 100 - 5)); }
  if (e.key === '/') { e.preventDefault(); openSearch(); }
  if (e.key.toLowerCase() === 'n') { nextTrk(); }
  if (e.key.toLowerCase() === 'p') { prevTrk(); }
  if (e.key.toLowerCase() === 'l') { toggleHeart(); }
  if (e.key.toLowerCase() === 'q') { toggleQ(); }
  if (e.key === '?') { openKbd(); }
  if (e.key === 'Escape') { closeNP(); closeSearch(); closeCtx(); closePModal(); closeShare(); closeTimer(); closeKbd(); }
}

function initSetup() {
  if (!SAAVN) {
    document.getElementById('setup-modal').classList.remove('hidden');
    updateApiChip(false, '');
  } else {
    document.getElementById('setup-modal').classList.add('hidden');
    updateApiChip(true, SAAVN);
  }
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
    chip.title = 'API Connected: ' + url;
  } else {
    dot.style.background = 'var(--tx3)';
    txt.textContent = 'Setup API';
    chip.title = 'Configure JioSaavn API';
  }
}
