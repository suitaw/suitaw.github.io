/* ============================================================
 * audio.js — WebAudio 程序化芯片音乐与音效（无音频文件）
 * ============================================================ */
const Sound = (function () {
  let ctx = null, master = null, musicGain = null, sfxGain = null;
  let curTrack = null, timer = null, step = 0;
  const S = {
    on: localStorage.getItem('mq_sfx') !== '0',
    music: localStorage.getItem('mq_bgm') !== '0',
  };

  function init() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0.5; master.connect(ctx.destination);
    musicGain = ctx.createGain(); musicGain.gain.value = S.music ? 0.16 : 0; musicGain.connect(master);
    sfxGain = ctx.createGain(); sfxGain.gain.value = S.on ? 0.5 : 0; sfxGain.connect(master);
  }
  function resume() { init(); if (ctx && ctx.state === 'suspended') ctx.resume(); }

  /* ---------- 单音 ---------- */
  function tone(freq, dur, type, gainNode, vol, slideTo) {
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type || 'square';
    o.frequency.setValueAtTime(freq, ctx.currentTime);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), ctx.currentTime + dur);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(vol || 0.3, ctx.currentTime + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    o.connect(g); g.connect(gainNode || sfxGain);
    o.start(); o.stop(ctx.currentTime + dur + 0.02);
  }
  function noise(dur, vol, filterFreq) {
    if (!ctx) return;
    const len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = filterFreq || 1800;
    const g = ctx.createGain(); g.gain.value = vol || 0.25;
    src.connect(f); f.connect(g); g.connect(sfxGain);
    src.start();
  }

  const N = (n) => 440 * Math.pow(2, (n - 69) / 12); // MIDI -> Hz

  /* ---------- 音效 ---------- */
  const SFX = {
    select: () => tone(N(84), 0.06, 'square', null, 0.22),
    cancel: () => tone(N(72), 0.08, 'square', null, 0.2, N(60)),
    step: () => tone(N(55), 0.04, 'triangle', null, 0.08),
    hit: () => { noise(0.16, 0.3, 2400); tone(N(48), 0.12, 'square', null, 0.18, N(36)); },
    superHit: () => { noise(0.26, 0.4, 3600); tone(N(55), 0.2, 'sawtooth', null, 0.22, N(38)); },
    weakHit: () => { noise(0.1, 0.16, 900); },
    faint: () => { tone(N(72), 0.5, 'square', null, 0.25, N(40)); },
    heal: () => [0, 4, 7, 12].forEach((k, i) => setTimeout(() => tone(N(72 + k), 0.16, 'triangle', null, 0.26), i * 90)),
    levelup: () => [0, 4, 7, 12, 16].forEach((k, i) => setTimeout(() => tone(N(69 + k), 0.14, 'square', null, 0.24), i * 70)),
    ball: () => { tone(N(76), 0.1, 'square', null, 0.2, N(88)); },
    shake: () => tone(N(64), 0.07, 'square', null, 0.18),
    catch: () => [0, 5, 9, 12, 17, 21].forEach((k, i) => setTimeout(() => tone(N(65 + k), 0.18, 'square', null, 0.24), i * 100)),
    encounter: () => { [0, 3, 6, 9].forEach((k, i) => setTimeout(() => tone(N(60 + k), 0.1, 'sawtooth', null, 0.22), i * 80)); },
    money: () => [0, 7].forEach((k, i) => setTimeout(() => tone(N(84 + k), 0.09, 'square', null, 0.2), i * 80)),
    door: () => tone(N(60), 0.12, 'triangle', null, 0.2, N(72)),
    badge: () => [0, 4, 7, 12, 7, 12, 16].forEach((k, i) => setTimeout(() => tone(N(69 + k), 0.2, 'square', null, 0.26), i * 130)),
  };
  function play(name) { if (!S.on || !ctx) return; const f = SFX[name]; if (f) f(); }

  /* ---------- BGM ----------
   * 每首曲子 = { bpm, mel: [[midi|null, 长度], ...], bass: [...] }
   */
  const TRACKS = {
    town: {
      bpm: 132,
      mel: [[72, 1], [76, 1], [79, 1], [76, 1], [74, 1], [77, 1], [81, 1], [77, 1],
            [72, 1], [76, 1], [79, 2], [77, 1], [76, 1], [74, 2],
            [71, 1], [74, 1], [79, 1], [78, 1], [76, 2], [72, 2]],
      bass: [[48, 2], [55, 2], [50, 2], [57, 2], [48, 2], [55, 2], [43, 2], [50, 2],
             [48, 2], [55, 2], [50, 2], [57, 2], [47, 2], [43, 2]],
    },
    field: {
      bpm: 146,
      mel: [[76, 1], [79, 1], [83, 1], [79, 1], [81, 1], [78, 1], [76, 2],
            [74, 1], [77, 1], [81, 1], [77, 1], [79, 1], [76, 1], [74, 2],
            [72, 1], [76, 1], [79, 1], [84, 1], [83, 2], [79, 2]],
      bass: [[52, 2], [59, 2], [50, 2], [57, 2], [48, 2], [55, 2], [53, 2], [60, 2],
             [52, 2], [59, 2], [45, 2], [52, 2]],
    },
    cave: {
      bpm: 108,
      mel: [[62, 2], [65, 2], [67, 2], [70, 2], [69, 2], [65, 2], [62, 4],
            [60, 2], [63, 2], [67, 2], [63, 2], [62, 4]],
      bass: [[38, 4], [41, 4], [36, 4], [43, 4], [38, 4], [33, 4]],
    },
    battle: {
      bpm: 168,
      mel: [[76, 1], [76, 1], [79, 1], [76, 1], [83, 1], [81, 1], [79, 1], [76, 1],
            [74, 1], [74, 1], [77, 1], [74, 1], [81, 1], [79, 1], [77, 1], [74, 1],
            [72, 1], [76, 1], [79, 1], [83, 1], [86, 2], [83, 1], [79, 1]],
      bass: [[40, 1], [40, 1], [47, 1], [40, 1], [40, 1], [40, 1], [47, 1], [40, 1],
             [38, 1], [38, 1], [45, 1], [38, 1], [38, 1], [38, 1], [45, 1], [38, 1],
             [36, 1], [36, 1], [43, 1], [36, 1], [43, 1], [36, 1], [43, 1], [43, 1]],
    },
    gym: {
      bpm: 152,
      mel: [[69, 1], [72, 1], [76, 1], [72, 1], [77, 2], [76, 2],
            [69, 1], [72, 1], [76, 1], [79, 1], [81, 2], [79, 2],
            [77, 1], [76, 1], [74, 1], [72, 1], [71, 4]],
      bass: [[45, 2], [52, 2], [45, 2], [52, 2], [43, 2], [50, 2], [41, 2], [48, 2]],
    },
  };

  function stopMusic() { if (timer) { clearInterval(timer); timer = null; } curTrack = null; }

  function playMusic(name) {
    if (!ctx) return;
    if (curTrack === name) return;
    stopMusic();
    curTrack = name;
    if (!S.music) return;
    const t = TRACKS[name];
    if (!t) return;
    const beat = 60 / t.bpm / 2; // 八分音符
    let mi = 0, bi = 0, mLeft = 0, bLeft = 0;
    step = 0;
    timer = setInterval(() => {
      if (!S.music) return;
      if (mLeft <= 0) {
        const note = t.mel[mi % t.mel.length];
        mi++;
        mLeft = note[1];
        if (note[0]) tone(N(note[0]), beat * note[1] * 0.85, 'square', musicGain, 0.3);
      }
      if (bLeft <= 0) {
        const note = t.bass[bi % t.bass.length];
        bi++;
        bLeft = note[1];
        if (note[0]) tone(N(note[0]), beat * note[1] * 0.9, 'triangle', musicGain, 0.42);
      }
      mLeft--; bLeft--;
      step++;
    }, beat * 1000);
  }

  function setSfx(v) { S.on = v; localStorage.setItem('mq_sfx', v ? '1' : '0'); if (sfxGain) sfxGain.gain.value = v ? 0.5 : 0; }
  function setMusic(v) {
    S.music = v; localStorage.setItem('mq_bgm', v ? '1' : '0');
    if (musicGain) musicGain.gain.value = v ? 0.16 : 0;
    if (!v) stopMusic();
    else if (curTrack) { const t = curTrack; curTrack = null; playMusic(t); }
  }

  return {
    init, resume, play, playMusic, stopMusic, setSfx, setMusic,
    get sfxOn() { return S.on; },
    get musicOn() { return S.music; },
  };
})();
