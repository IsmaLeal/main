/* fourier · Sonido y ondas — interactive figures.
   Plain script, no build step. Every English string in T.en is a translation
   of the Spanish script and is marked for the author's review. */
(() => {
'use strict';

/* ======================================================================
   Palette ("classic isma") and fonts
   ====================================================================== */
const C = {
  bg: '#002147', ink: '#F4EFE6', curve: '#CDC87A',
  a1: '#FEAC9E', a2: '#9BD69C', a3: '#E1AFED',
};
const TEXT = '"Berenis ADF Pro", Georgia, serif';
const MATH_I = 'KaTeX_Math, "Latin Modern Math", "Times New Roman", serif';
const MATH_R = 'KaTeX_Main, "Latin Modern Roman", "Times New Roman", serif';
const TAU = 2 * Math.PI;

/* ======================================================================
   Text, Spanish (default) and English (REVIEW: all of T.en)
   ====================================================================== */
const T = {
  es: {
    home: '← divulgación', back: '← volver a divulgación',
    s0h: 'Sonido y ondas',
    s0q: 'Mandar un audio es mandar sonido. Para enviarlo por internet hay que convertirlo en números. ¿Cómo?',
    s0hint: '↓ desliza o usa las flechas del teclado',
    s1h: 'El aire vibra',
    s1p1: 'El sonido es aire que vibra. Las cuerdas vocales vibran y golpean las moléculas de aire, que golpean a sus vecinas. El aire oscila en su sitio; lo que viaja es la onda. Llega al oído, que la convierte en una señal eléctrica.',
    s1p2: 'Pausa el aire: unas partículas quedan a la izquierda de su posición de reposo, otras a la derecha, otras justo en ella. Dibuja el desplazamiento de cada una frente a su posición: sale una curva, una onda. Vuelve a darle al play a cámara lenta: la onda viaja.',
    s1p3: 'Ondas así de perfectas son notas puras: senos o cosenos.',
    pause: '⏸ pausar', play: '▶ seguir', slow: 'cámara lenta',
    position: 'posición', displacement: 'desplazamiento', time: 'tiempo', right: 'derecha', left: 'izquierda',
    vocal: 'cuerdas vocales', ear: 'oído', pausehint: 'pausa el aire para dibujar la gráfica',
    rest: 'resto',
    s2h: 'Una nota es una frecuencia',
    s2p1: 'Cuanto más rápido vibra el aire, más aguda es la nota. Una nota musical se define por su frecuencia: 440 vibraciones por segundo es un La.',
    s2p2: 'A la velocidad real del sonido, 343 m/s, no se ve nada.',
    freq: 'frecuencia', listen: '▶ escuchar', stop: '■ parar',
    realspeed: 'velocidad real', realon: 'velocidad real: no se ve nada', slowmo: 'cámara lenta',
    s3h: 'Un micrófono',
    s3p1: 'Un micrófono mide el desplazamiento del aire en un solo punto a lo largo del tiempo. La gráfica se parece.',
    s3p2: 'Mi voz grabada es esa gráfica, y es mucho menos perfecta que una nota pura. Prueba con la tuya.',
    mic: '🎙 tu voz', micoff: '🎙 apagar micrófono', rec: '● grabar 2 s', recording: '● grabando…', playrec: '▶ escuchar grabación',
    micask: 'pidiendo permiso para el micrófono…', micon: 'micrófono encendido: habla o canta',
    micno: 'sin micrófono: la etapa 6 usará una señal de ejemplo', recok: 'grabado: la etapa 6 usará tu voz',
    recno: 'este navegador no permite grabar', atmic: 'desplazamiento en el micrófono', yourvoice: 'tu voz',
    s4h: 'Una cuerda de guitarra',
    s4p1: 'Una nota de guitarra tampoco es un seno puro. La cuerda está atada por los dos extremos, así que solo persisten las ondas que caben.',
    s4p2: 'Cada onda que cabe es una nota pura: la fundamental (Mi), la misma nota una octava más arriba (Mi), luego un Si, y más. Todas sonando a la vez: un Mi con timbre de guitarra.',
    pluck: 'pulsar', all: 'todas', onlyfund: 'solo la fundamental', sum: 'suma',
    s5h: 'El timbre',
    s5p1: 'Qué frecuencias vibran y con qué fuerza es lo que el cerebro oye como una guitarra, o como la voz de una persona.',
    s5p2: 'Todo sonido es una suma de frecuencias puras. Arrastra las barras: la nota es la misma, el sonido no.',
    pure: 'nota pura', likestring: 'como la cuerda', amplitude: 'amplitud', frequency: 'frecuencia',
    s6h: 'Cómo viaja tu audio',
    s6p1: 'Un móvil encuentra las frecuencias y las amplitudes de una grabación, envía eso como datos comprimidos, y el otro móvil lo vuelve a reproducir.',
    s6p2: 'Basta con las frecuencias más fuertes. Quédate con pocas y escucha.',
    keep: 'frecuencias que se conservan', playorig: '▶ original', playrecon: '▶ reconstruida',
    srcvoice: 'Grabación: tu voz (etapa 3).', srcsample: 'Grabación: señal de ejemplo sintética. Graba tu voz en la etapa 3 para usarla aquí.',
    numbers: (k, m) => `${k} frecuencias · ${3 * k} números (frecuencia, amplitud, fase) en lugar de ${m} muestras`,
    spectrum: 'frecuencias de la grabación', original: 'original', recon: 'reconstruida',
    s7h: 'Las mareas',
    s7p1: 'La marea sube y baja; a lo largo de un día dibuja una onda. La mueven fuerzas periódicas: la gravedad de la Luna, la del Sol, y más. Cada una es un seno puro.',
    s7p2: 'Basta con conocer las causas dominantes: la Luna sola, el Sol solo, el resto; se suman con sus amplitudes y la marea futura queda predicha.',
    moon: 'Luna', sun: 'Sol', today: 'hoy', advance: '▶ avanzar', halt: '⏸ parar',
    tide: 'marea', predicted: 'predicción', day: 'día', days: 'días',
    s8h: 'El vídeo', soon: 'Vídeo próximamente.',
    notes: ['La', 'La♯', 'Si', 'Do', 'Do♯', 'Re', 'Re♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯'],
    stages: 'Etapas', stage: 'etapa',
  },
  en: {
    home: '← outreach', back: '← back to outreach',
    s0h: 'Sound and waves',
    s0q: 'Sending a voice message is sending sound. To send it over the internet it has to become numbers. How?',
    s0hint: '↓ scroll, swipe or use the arrow keys',
    s1h: 'Air vibrates',
    s1p1: 'Sound is vibrating air. The vocal cords vibrate and hit the air molecules, which hit their neighbours. The air oscillates in place; what travels is the wave. It reaches the ear, which turns it into an electric signal.',
    s1p2: 'Pause the air: some particles are left of their rest position, some right, some exactly on it. Plot the displacement of each one against its position: you get a curve, a wave. Press play again in slow motion: the wave travels.',
    s1p3: 'Waves this perfect are pure notes: sines or cosines.',
    pause: '⏸ pause', play: '▶ play', slow: 'slow motion',
    position: 'position', displacement: 'displacement', time: 'time', right: 'right', left: 'left',
    vocal: 'vocal cords', ear: 'ear', pausehint: 'pause the air to draw the graph',
    rest: 'the rest',
    s2h: 'A note is a frequency',
    s2p1: 'The faster the air vibrates, the higher the note. A musical note is defined by its frequency: 440 vibrations per second is an A.',
    s2p2: 'At the real speed of sound, 343 m/s, nothing can be seen.',
    freq: 'frequency', listen: '▶ listen', stop: '■ stop',
    realspeed: 'real speed', realon: 'real speed: nothing can be seen', slowmo: 'slow motion',
    s3h: 'A microphone',
    s3p1: 'A microphone measures the displacement of the air at one single point over time. The graph looks alike.',
    s3p2: 'My recorded voice is that graph, and it is much less perfect than a pure note. Try yours.',
    mic: '🎙 your voice', micoff: '🎙 microphone off', rec: '● record 2 s', recording: '● recording…', playrec: '▶ play recording',
    micask: 'asking for microphone permission…', micon: 'microphone on: speak or sing',
    micno: 'no microphone: stage 6 will use an example signal', recok: 'recorded: stage 6 will use your voice',
    recno: 'this browser cannot record', atmic: 'displacement at the microphone', yourvoice: 'your voice',
    s4h: 'A guitar string',
    s4p1: 'A guitar note is not a pure sine either. The string is tied at both ends, so only the waves that fit can persist.',
    s4p2: 'Each wave that fits is a pure note: the fundamental (E), the same note an octave up (E), then a B, and more. All sounding at once: an E with the timbre of a guitar.',
    pluck: 'pluck', all: 'all', onlyfund: 'fundamental only', sum: 'sum',
    s5h: 'Timbre',
    s5p1: 'Which frequencies vibrate, and how strongly, is what the brain hears as a guitar, or as one person’s voice.',
    s5p2: 'Every sound is a sum of pure frequencies. Drag the bars: the note stays the same, the sound does not.',
    pure: 'pure note', likestring: 'like the string', amplitude: 'amplitude', frequency: 'frequency',
    s6h: 'How your voice message travels',
    s6p1: 'A phone finds the frequencies and amplitudes of a recording, sends those as compressed data, and the other phone plays them back.',
    s6p2: 'The strongest frequencies alone are enough. Keep only a few and listen.',
    keep: 'frequencies kept', playorig: '▶ original', playrecon: '▶ rebuilt',
    srcvoice: 'Recording: your voice (stage 3).', srcsample: 'Recording: a synthetic example signal. Record your voice in stage 3 to use it here.',
    numbers: (k, m) => `${k} frequencies · ${3 * k} numbers (frequency, amplitude, phase) instead of ${m} samples`,
    spectrum: 'frequencies in the recording', original: 'original', recon: 'rebuilt',
    s7h: 'Tides',
    s7p1: 'The tide goes up and down; over a day it draws a wave. It is driven by periodic forces: the Moon’s gravity, the Sun’s, and more. Each one is a pure sine.',
    s7p2: 'Knowing the dominant causes is enough: the Moon alone, the Sun alone, the rest; add them with their amplitudes and the future tide is predicted.',
    moon: 'Moon', sun: 'Sun', today: 'today', advance: '▶ run', halt: '⏸ stop',
    tide: 'tide', predicted: 'prediction', day: 'day', days: 'days',
    s8h: 'The video', soon: 'Video coming soon.',
    notes: ['A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯'],
    stages: 'Stages', stage: 'stage',
  },
};

let lang = 'es';
try { const s = localStorage.getItem('isma-lang'); if (s === 'es' || s === 'en') lang = s; } catch (e) { /* storage unavailable */ }
const t = (k) => T[lang][k];

/* note name of a frequency, equal temperament with A = 440 Hz */
function noteName(f) {
  const n = Math.round(12 * Math.log2(f / 440));
  return T[lang].notes[((n % 12) + 12) % 12];
}

/* ======================================================================
   Small helpers
   ====================================================================== */
const $ = (id) => document.getElementById(id);
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
function tex(el, s) {
  if (!el) return;
  if (window.katex) window.katex.render(s, el, { throwOnError: false, displayMode: false });
  else el.textContent = s;
}
function rng(seed) { // deterministic pseudo-random numbers in [0, 1)
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

/* canvas with device-pixel-ratio handling; size read in CSS pixels as cv.W, cv.H */
function canvas(id) {
  const c = $(id);
  const ctx = c.getContext('2d');
  const fit = () => {
    const r = c.getBoundingClientRect();
    const d = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.max(1, Math.round(r.width * d));
    c.height = Math.max(1, Math.round(r.height * d));
    ctx.setTransform(d, 0, 0, d, 0, 0);
    c.W = r.width; c.H = r.height;
    c.dirty = true;
  };
  if (window.ResizeObserver) new ResizeObserver(fit).observe(c);
  window.addEventListener('resize', fit);
  fit();
  ctx.cv = c;
  return ctx;
}
function clear(ctx) { ctx.clearRect(0, 0, ctx.cv.W, ctx.cv.H); }

/* Broad-nib pen: the stroke is the path swept by a flat nib held at a fixed angle,
   so the width changes with the direction of the stroke. */
const NIB = { ang: -Math.PI / 4 };
function nib(ctx, xs, ys, color, w = 3.4, alpha = 1) {
  const n = xs.length; if (n < 2) return;
  const vx = Math.cos(NIB.ang) * w / 2, vy = Math.sin(NIB.ang) * w / 2;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < n - 1; i++) {
    const x0 = xs[i], y0 = ys[i], x1 = xs[i + 1], y1 = ys[i + 1];
    const cr = (x1 - x0) * vy - (y1 - y0) * vx; // orientation of the quad
    if (cr >= 0) {
      ctx.moveTo(x0 + vx, y0 + vy); ctx.lineTo(x1 + vx, y1 + vy); ctx.lineTo(x1 - vx, y1 - vy); ctx.lineTo(x0 - vx, y0 - vy);
    } else {
      ctx.moveTo(x0 - vx, y0 - vy); ctx.lineTo(x1 - vx, y1 - vy); ctx.lineTo(x1 + vx, y1 + vy); ctx.lineTo(x0 + vx, y0 + vy);
    }
    ctx.closePath();
  }
  ctx.fill('nonzero');
  ctx.strokeStyle = color; ctx.lineWidth = Math.max(0.8, w * 0.28); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(xs[0], ys[0]);
  for (let i = 1; i < n; i++) ctx.lineTo(xs[i], ys[i]);
  ctx.stroke();
  ctx.restore();
}
/* nib stroke of y = f(x) for x in [x0, x1] */
function nibFn(ctx, x0, x1, f, color, w, alpha, step = 2) {
  const xs = [], ys = [];
  for (let x = x0; x <= x1 + 0.01; x += step) { xs.push(x); ys.push(f(x)); }
  nib(ctx, xs, ys, color, w, alpha);
}
/* dash-dot pencil construction line */
function pencil(ctx, x0, y0, x1, y1, color = C.ink, alpha = 0.5) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.strokeStyle = color; ctx.lineWidth = 1;
  ctx.setLineDash([7, 4, 1.4, 4]); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore();
}
/* ink arrow (axes) */
function arrow(ctx, x0, y0, x1, y1, color = C.ink, w = 1.4) {
  const a = Math.atan2(y1 - y0, x1 - x0), L = 9;
  ctx.save(); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - Math.cos(a) * 3, y1 - Math.sin(a) * 3); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x1, y1);
  ctx.lineTo(x1 - L * Math.cos(a - 0.32), y1 - L * Math.sin(a - 0.32));
  ctx.quadraticCurveTo(x1 - L * 0.6 * Math.cos(a), y1 - L * 0.6 * Math.sin(a), x1 - L * Math.cos(a + 0.32), y1 - L * Math.sin(a + 0.32));
  ctx.closePath(); ctx.fill(); ctx.restore();
}
function label(ctx, s, x, y, { size = 14, color = C.ink, align = 'left', base = 'alphabetic', alpha = 0.9, italic = false } = {}) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = color;
  ctx.font = `${italic ? 'italic ' : ''}${size}px ${TEXT}`; ctx.textAlign = align; ctx.textBaseline = base;
  ctx.fillText(s, x, y); ctx.restore();
}
/* maths label made of parts: ['f','i'] italic, ['= 1','r'] roman, ['1','s'] subscript */
function mlabel(ctx, parts, x, y, { size = 15, color = C.ink, align = 'left', alpha = 0.95 } = {}) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = color; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
  const font = (p) => p[1] === 'i' ? `italic ${size}px ${MATH_I}` : p[1] === 's' ? `${size * 0.7}px ${MATH_R}` : `${size}px ${MATH_R}`;
  let w = 0; for (const p of parts) { ctx.font = font(p); w += ctx.measureText(p[0]).width; }
  let cx = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  for (const p of parts) { ctx.font = font(p); ctx.fillText(p[0], cx, p[1] === 's' ? y + size * 0.22 : y); cx += ctx.measureText(p[0]).width; }
  ctx.restore();
}
/* axes: origin (ox, oy), x to x1, y from oy+h/2 (bottom) to oy-h/2 (top) */
function axes(ctx, ox, oy, x1, hTop, hBot, xl, yl) {
  arrow(ctx, ox, oy, x1, oy);
  arrow(ctx, ox, oy + hBot, ox, oy - hTop);
  if (xl) label(ctx, xl, x1, oy + 18, { size: 13, align: 'right', alpha: 0.75, italic: true });
  if (yl) label(ctx, yl, ox + 8, oy - hTop + 4, { size: 13, alpha: 0.75, base: 'top', italic: true });
}
/* y-axis meaning for displacement plots: up = to the right, down = to the left */
function dirLabels(ctx, ox, oy, hTop, hBot) {
  const yT = oy - hTop + 8, yB = oy + hBot - 6;
  arrow(ctx, ox + 10, yT, ox + 30, yT, C.a1, 1.3);
  label(ctx, t('right'), ox + 36, yT, { size: 13, base: 'middle', italic: true, alpha: 0.85 });
  arrow(ctx, ox + 30, yB, ox + 10, yB, C.a1, 1.3);
  label(ctx, t('left'), ox + 36, yB, { size: 13, base: 'middle', italic: true, alpha: 0.85 });
}
function dot(ctx, x, y, r, color, alpha = 1) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore();
}
function setBtn(el, key) { el.dataset.i18n = key; el.textContent = t(key); }

/* ======================================================================
   Audio: one context, created on the first press of a sound control
   ====================================================================== */
let AC = null, master = null, outEl = null;
/* iPhone/iPad: Web Audio sent to the speakers directly can stay silent (silent switch,
   audio session). There, the sound is routed through an HTML <audio> element instead,
   which iOS always treats as media playback. Elsewhere it goes straight to the speakers. */
const IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
function audio() {
  try { if (navigator.audioSession && navigator.audioSession.type !== 'play-and-record') navigator.audioSession.type = 'playback'; } catch (e) { /* not supported */ }
  if (!AC) {
    const A = window.AudioContext || window.webkitAudioContext;
    if (!A) return null;
    AC = new A(); master = AC.createGain(); master.gain.value = 0.35;
    if (IOS && AC.createMediaStreamDestination) {
      const dest = AC.createMediaStreamDestination();
      master.connect(dest);
      outEl = document.createElement('audio');
      outEl.setAttribute('playsinline', ''); outEl.autoplay = true;
      outEl.srcObject = dest.stream;
      document.body.appendChild(outEl);
    } else {
      master.connect(AC.destination);
    }
  }
  if (AC.state !== 'running') AC.resume();
  if (outEl && outEl.paused) { const pr = outEl.play(); if (pr && pr.catch) pr.catch(() => {}); }
  return AC;
}
const voices = new Set();
function stopSounds() { for (const v of [...voices]) v.stop(); voices.clear(); }

/* sustained tone; wave = null (sine) or array of harmonic amplitudes a[1..] */
function tone(freq, amps) {
  const ac = audio(); if (!ac) return null;
  const osc = ac.createOscillator(), g = ac.createGain();
  g.gain.value = 0; osc.connect(g); g.connect(master);
  const v = {
    setFreq(f) { osc.frequency.setTargetAtTime(f, ac.currentTime, 0.02); },
    setAmps(a) {
      const n = a.length, re = new Float32Array(n + 1), im = new Float32Array(n + 1);
      let s = 0; for (let i = 0; i < n; i++) { im[i + 1] = a[i]; s += Math.abs(a[i]); }
      if (s < 1e-6) { g.gain.setTargetAtTime(0, ac.currentTime, 0.02); return; }
      osc.setPeriodicWave(ac.createPeriodicWave(re, im));
      g.gain.setTargetAtTime(1, ac.currentTime, 0.03);
    },
    stop() { g.gain.setTargetAtTime(0, ac.currentTime, 0.03); setTimeout(() => { try { osc.stop(); } catch (e) {} }, 200); voices.delete(v); },
  };
  osc.frequency.value = freq;
  if (amps) v.setAmps(amps); else g.gain.setTargetAtTime(1, ac.currentTime, 0.03);
  osc.start(); voices.add(v);
  return v;
}
/* play a mono Float32Array */
function playBuffer(data, sr, gain = 1) {
  const ac = audio(); if (!ac) return null;
  let peak = 1e-9; for (let i = 0; i < data.length; i++) peak = Math.max(peak, Math.abs(data[i]));
  const buf = ac.createBuffer(1, data.length, sr), ch = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) ch[i] = data[i] / peak * 0.9 * gain;
  const src = ac.createBufferSource(), g = ac.createGain();
  src.buffer = buf; src.connect(g); g.connect(master); g.gain.value = 1.6; src.start();
  const v = { stop() { try { src.stop(); } catch (e) {} voices.delete(v); } };
  src.onended = () => voices.delete(v);
  voices.add(v);
  return v;
}

/* ======================================================================
   Air particles shared by stages 1–3
   ====================================================================== */
function makeAir(cols, rows, seed) {
  const r = rng(seed), ps = [];
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    ps.push({ u: (i + 0.5 + (r() - 0.5) * 0.55) / cols, v: (j + 0.5 + (r() - 0.5) * 0.6) / rows, s: 1.6 + r() * 1.2, few: r() < 0.5 });
  }
  return ps;
}

/* ======================================================================
   Stage registry, navigation, language
   ====================================================================== */
const deck = $('deck');
const sections = [...document.querySelectorAll('.stage')];
const S = {};               // stage objects by index
let active = 0;
const visible = new Set();

function go(i) {
  i = clamp(i, 0, sections.length - 1);
  sections[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const dotsEl = document.querySelector('.dots');
sections.forEach((s, i) => {
  const li = document.createElement('li'), b = document.createElement('button');
  b.type = 'button'; b.addEventListener('click', () => go(i));
  li.appendChild(b); dotsEl.appendChild(li);
});
const counter = document.querySelector('.counter');
function updateDots() {
  [...dotsEl.querySelectorAll('button')].forEach((b, i) => {
    b.setAttribute('aria-current', i === active ? 'true' : 'false');
    b.setAttribute('aria-label', `${t('stage')} ${i}`);
  });
  dotsEl.setAttribute('aria-label', t('stages'));
  counter.textContent = `${active} / ${sections.length - 1}`;
}

function setActive(i) {
  if (i === active) return;
  stopSounds();
  if (S[active] && S[active].leave) S[active].leave();
  active = i;
  if (S[active] && S[active].enter) S[active].enter();
  updateDots();
}

const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    const i = sections.indexOf(e.target);
    if (e.isIntersecting) visible.add(i); else visible.delete(i);
    if (e.intersectionRatio >= 0.55) setActive(i);
  }
}, { root: deck, threshold: [0, 0.55] });
sections.forEach((s) => io.observe(s));

document.addEventListener('keydown', (e) => {
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  const k = e.key;
  if (k === 'ArrowDown' || k === 'PageDown') { e.preventDefault(); go(active + 1); }
  else if (k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); go(active - 1); }
  else if (k === 'Home' && e.target.tagName !== 'INPUT') { e.preventDefault(); go(0); }
  else if (k === 'End' && e.target.tagName !== 'INPUT') { e.preventDefault(); go(sections.length - 1); }
});

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const v = T[lang][el.dataset.i18n]; if (typeof v === 'string') el.textContent = v;
  });
  document.querySelectorAll('.lang button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false'));
  document.title = `${t('s0h')} | Isma Leal`;
  for (const k in S) if (S[k].lang) S[k].lang();
  for (const k in S) if (S[k].ctx) S[k].ctx.cv.dirty = true;
  updateDots();
}
document.querySelectorAll('.lang button').forEach((b) => b.addEventListener('click', () => {
  lang = b.dataset.lang;
  try { localStorage.setItem('isma-lang', lang); } catch (e) { /* storage unavailable */ }
  applyLang();
}));

/* ======================================================================
   Stage 0 · title wave
   ====================================================================== */
{
  const ctx = canvas('c0'); let ph = 0;
  S[0] = {
    ctx,
    draw(dt) {
      const { W, H } = ctx.cv; clear(ctx); ph += dt * 1.2;
      pencil(ctx, 0, H / 2, W, H / 2, C.ink, 0.35);
      nibFn(ctx, 4, W - 4, (x) => H / 2 - H * 0.32 * Math.sin(TAU * x / (W / 3) - ph) * Math.sin(Math.PI * x / W), C.curve, 3.6);
    },
  };
}

/* ======================================================================
   Stage 1 · vibrating air, pause, displacement against position
   ====================================================================== */
{
  const ctx = canvas('c1');
  const air = makeAir(46, 7, 7);
  const HL = [0.21, 0.43, 0.65].map((u) => ({ u, v: 0.5 }));
  let tm = 0, playing = true, shown = false;
  const btn = $('s1play'), sp = $('s1speed');
  btn.addEventListener('click', () => {
    playing = !playing; if (!playing) shown = true;
    setBtn(btn, playing ? 'pause' : 'play');
  });
  S[1] = {
    ctx,
    draw(dt) {
      const { W, H } = ctx.cv; clear(ctx);
      if (playing) tm += dt * (1 - parseFloat(sp.value));
      const L = 70, R = W - 34;                    // air spans [L, R]
      const lam = (R - L) * 0.42, k = TAU / lam, w = TAU * 0.55;
      const A = 0.55 / k;                           // displacement amplitude in px (A k = 0.55)
      const xi = (x) => A * Math.sin(k * (x - L) - w * tm);
      const top = 16, airH = H * 0.42, mid = top + airH / 2;
      // vocal cords: a plate at x = L that moves with the air next to it
      const px = L - 16 + xi(L);
      ctx.save(); ctx.strokeStyle = C.a1; ctx.lineWidth = 3; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(px, top + 6); ctx.lineTo(px, top + airH - 6); ctx.stroke(); ctx.restore();
      label(ctx, t('vocal'), L - 20, top + airH + 16, { size: 12, color: C.a1, align: 'center', alpha: 0.85 });
      label(ctx, t('ear') + ' →', R, top + airH + 16, { size: 12, align: 'right', alpha: 0.7 });
      // particles
      ctx.save(); ctx.fillStyle = C.ink;
      for (const p of air) {
        if (W < 600 && !p.few) continue;
        const x0 = L + p.u * (R - L), y = top + p.v * airH;
        ctx.globalAlpha = 0.78; ctx.beginPath(); ctx.arc(x0 + xi(x0), y, p.s, 0, TAU); ctx.fill();
      }
      ctx.restore();
      // highlighted particles: rest position (pencil) and displacement (accent arrow)
      for (const h of HL) {
        const x0 = L + h.u * (R - L), y = mid;
        pencil(ctx, x0, top, x0, top + airH, C.ink, 0.45);
        const d = xi(x0);
        if (Math.abs(d) > 3) arrow(ctx, x0, y - 13, x0 + d, y - 13, C.a1, 1.2);
        dot(ctx, x0 + d, y, 4.2, C.a1);
      }
      // displacement against position
      const py = top + airH + 34 + (H - top - airH - 34) / 2, ph = (H - top - airH - 34) * 0.38;
      if (!shown) { label(ctx, t('pausehint'), (L + R) / 2, py, { size: 15, align: 'center', alpha: 0.6, italic: true }); return; }
      axes(ctx, L, py, R + 8, ph * 1.25, ph * 1.15, t('position'), null);
      dirLabels(ctx, L, py, ph * 1.25, ph * 1.15);
      const gy = ph / A;
      nibFn(ctx, L, R, (x) => py - xi(x) * gy, C.curve, 3.6);
      for (const h of HL) {
        const x0 = L + h.u * (R - L), d = xi(x0);
        pencil(ctx, x0, top + airH, x0, py - d * gy, C.ink, 0.4);
        // the same displacement as the arrow in the air, turned upright: right = up, left = down
        if (Math.abs(d * gy) > 6) arrow(ctx, x0, py, x0, py - d * gy, C.a1, 1.4);
        dot(ctx, x0, py - d * gy, 4, C.a1);
      }
    },
    lang() { setBtn(btn, playing ? 'pause' : 'play'); },
  };
}

/* ======================================================================
   Stage 2 · a note is a frequency
   ====================================================================== */
{
  const ctx = canvas('c2');
  const air = makeAir(54, 5, 21);
  const sl = $('s2f'), out = $('s2fv'), bs = $('s2snd'), br = $('s2real'), eq = $('s2eq');
  const c = 343;
  let f = 440, ph = 0, real = false, snd = null;
  const fromSlider = () => { let v = 110 * Math.pow(2, 4 * sl.value / 1000); if (Math.abs(v - 440) < 3) v = 440; return v; };
  const show = () => {
    out.textContent = `${Math.round(f)} Hz · ${noteName(f)}`;
    const lam = c / f;
    tex(eq, `\\begin{gathered} f = ${Math.round(f)}\\ \\mathrm{Hz} \\\\ \\lambda = \\dfrac{c}{f} = \\dfrac{343\\ \\mathrm{m/s}}{${Math.round(f)}\\ \\mathrm{Hz}} = ${lam.toFixed(2)}\\ \\mathrm{m} \\end{gathered}`);
  };
  sl.addEventListener('input', () => { f = fromSlider(); show(); if (snd) snd.setFreq(f); });
  bs.addEventListener('click', () => {
    if (snd) { snd.stop(); snd = null; } else snd = tone(f);
    bs.setAttribute('aria-pressed', snd ? 'true' : 'false'); setBtn(bs, snd ? 'stop' : 'listen');
  });
  br.addEventListener('click', () => {
    real = !real; br.setAttribute('aria-pressed', real ? 'true' : 'false'); setBtn(br, real ? 'slowmo' : 'realspeed');
  });
  S[2] = {
    ctx,
    draw(dt) {
      const { W, H } = ctx.cv; clear(ctx);
      const L = 24, R = W - 24, metres = 3;          // the row shows 3 m of air
      const pxm = (R - L) / metres, lamPx = (c / f) * pxm, k = TAU / lamPx;
      ph += dt * TAU * 0.5 * (f / 440);              // slow motion: 440 Hz shown as 0.5 Hz
      const A = Math.min(0.5 / k, 14);
      const top = 14, airH = H * 0.46;
      ctx.save(); ctx.fillStyle = C.ink;
      for (const p of air) {
        if (W < 600 && !p.few) continue;
        const x0 = L + p.u * (R - L), y = top + p.v * airH;
        if (real) {        // the eye only sees the blur of the vibration
          ctx.globalAlpha = 0.28; ctx.fillRect(x0 - A, y - p.s * 0.8, 2 * A, p.s * 1.6);
          ctx.globalAlpha = 0.25; ctx.beginPath(); ctx.arc(x0, y, p.s, 0, TAU); ctx.fill();
        } else {
          ctx.globalAlpha = 0.8; ctx.beginPath(); ctx.arc(x0 + A * Math.sin(k * (x0 - L) - ph), y, p.s, 0, TAU); ctx.fill();
        }
      }
      ctx.restore();
      // scale bar: 1 m
      const sy = top + airH + 14;
      ctx.save(); ctx.strokeStyle = C.ink; ctx.globalAlpha = 0.7; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(L, sy); ctx.lineTo(L + pxm, sy); ctx.moveTo(L, sy - 4); ctx.lineTo(L, sy + 4); ctx.moveTo(L + pxm, sy - 4); ctx.lineTo(L + pxm, sy + 4); ctx.stroke(); ctx.restore();
      label(ctx, '1 m', L + pxm / 2, sy + 16, { size: 12, align: 'center', alpha: 0.75 });
      if (real) label(ctx, t('realon'), R, sy + 16, { size: 13, align: 'right', color: C.a1, alpha: 0.9, italic: true });
      // displacement against position
      const py = sy + 30 + (H - sy - 30) / 2, phh = (H - sy - 30) * 0.36;
      axes(ctx, L, py, R + 6, phh * 1.25, phh * 1.15, t('position'), null);
      dirLabels(ctx, L, py, phh * 1.25, phh * 1.15);
      if (real) {
        for (let j = 0; j < 10; j++) nibFn(ctx, L, R, (x) => py - phh * Math.sin(k * (x - L) - j * TAU / 10), C.curve, 2.4, 0.16, 3);
      } else {
        nibFn(ctx, L, R, (x) => py - phh * Math.sin(k * (x - L) - ph), C.curve, 3.6);
        // one wavelength, marked with pencil
        let x1 = L + ((ph / k) % lamPx + lamPx * 0.25); if (x1 < L + 110) x1 += lamPx; const x2 = x1 + lamPx;
        if (x2 < R) {
          pencil(ctx, x1, py - phh * 1.15, x1, py + phh * 1.05, C.ink, 0.45);
          pencil(ctx, x2, py - phh * 1.15, x2, py + phh * 1.05, C.ink, 0.45);
          arrow(ctx, (x1 + x2) / 2, py - phh * 1.12, x2, py - phh * 1.12, C.ink, 1); arrow(ctx, (x1 + x2) / 2, py - phh * 1.12, x1, py - phh * 1.12, C.ink, 1);
          mlabel(ctx, [['λ', 'i']], (x1 + x2) / 2, py - phh * 1.12 - 6, { align: 'center', size: 16 });
        }
      }
    },
    leave() { snd = null; bs.setAttribute('aria-pressed', 'false'); setBtn(bs, 'listen'); },
    lang() { show(); setBtn(bs, snd ? 'stop' : 'listen'); setBtn(br, real ? 'slowmo' : 'realspeed'); },
    init() { sl.value = 500; f = 440; show(); },
  };
  S[2].init();
}

/* ======================================================================
   Shared voice recording (stage 3 → stage 6)
   ====================================================================== */
const shared = { voice: null, sample: null };
function makeSample(sr) { // synthetic example signal (not a real voice): harmonics of a gliding pitch
  const n = Math.round(sr * 1.4), out = new Float32Array(n), H = 28;
  let phase = 0;
  for (let i = 0; i < n; i++) {
    const tt = i / sr;
    const f0 = 135 + 18 * Math.sin(TAU * 0.6 * tt) + 2.2 * Math.sin(TAU * 5.3 * tt);
    phase += TAU * f0 / sr;
    let s = 0;
    for (let h = 1; h <= H; h++) {
      const fh = h * f0;
      const env = Math.exp(-Math.pow((fh - 650) / 230, 2)) + 0.6 * Math.exp(-Math.pow((fh - 1150) / 260, 2)) + 0.25 / h;
      s += env * Math.sin(h * phase + h * h * 0.37);
    }
    const syl = 0.55 + 0.45 * Math.pow(Math.sin(Math.PI * clamp(tt / 1.4, 0, 1) * 3), 2);
    const fade = Math.min(1, tt / 0.05, (1.4 - tt) / 0.08);
    out[i] = s * syl * fade;
  }
  return { data: out, sr };
}

/* ======================================================================
   Stage 3 · microphone at one point
   ====================================================================== */
{
  const ctx = canvas('c3');
  const air = makeAir(46, 4, 33);
  const bm = $('s3mic'), brc = $('s3rec'), bp = $('s3play'), st = $('s3st');
  let tm = 0, stream = null, an = null, buf = null, peak = 0.05, recState = null;
  const status = (k) => { st.dataset.k = k || ''; st.textContent = k ? t(k) : ''; };
  async function micOn() {
    const ac = audio();
    if (!ac || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { status('micno'); return; }
    status('micask');
    try { if (navigator.audioSession) navigator.audioSession.type = 'play-and-record'; } catch (e) { /* not supported */ }
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
    } catch (e) { stream = null; status('micno'); return; }
    if (active !== 3) { micOff(); return; }
    const src = ac.createMediaStreamSource(stream);
    an = ac.createAnalyser(); an.fftSize = 2048; buf = new Float32Array(an.fftSize);
    src.connect(an);                       // not connected to the speakers: no feedback
    bm.setAttribute('aria-pressed', 'true'); setBtn(bm, 'micoff');
    brc.disabled = !window.MediaRecorder;
    status(window.MediaRecorder ? 'micon' : 'recno');
  }
  function micOff() {
    if (recState) { try { recState.stop(); } catch (e) {} recState = null; }
    if (stream) stream.getTracks().forEach((tr) => tr.stop());
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) { /* not supported */ }
    stream = null; an = null;
    bm.setAttribute('aria-pressed', 'false'); setBtn(bm, 'mic'); setBtn(brc, 'rec');
    brc.disabled = true;
  }
  bm.addEventListener('click', () => { if (stream) { micOff(); status(''); } else micOn(); });
  brc.addEventListener('click', () => {
    if (!stream || recState) return;
    const chunks = []; let rec;
    try { rec = new MediaRecorder(stream); } catch (e) { status('recno'); return; }
    rec.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
    rec.onstop = async () => {
      recState = null; setBtn(brc, 'rec'); brc.disabled = !stream;
      try {
        const ab = await new Blob(chunks, { type: rec.mimeType }).arrayBuffer();
        const ab2 = await audio().decodeAudioData(ab);
        shared.voice = { data: new Float32Array(ab2.getChannelData(0)), sr: ab2.sampleRate };
        bp.disabled = false; status('recok');
        if (S[6]) S[6].invalidate();
      } catch (e) { status('recno'); }
    };
    recState = rec; rec.start(); setBtn(brc, 'recording'); brc.disabled = true;
    setTimeout(() => { if (rec.state === 'recording') rec.stop(); }, 2000);
  });
  bp.addEventListener('click', () => { if (shared.voice) playBuffer(shared.voice.data, shared.voice.sr); });
  S[3] = {
    ctx,
    draw(dt) {
      const { W, H } = ctx.cv; clear(ctx); tm += dt;
      const L = 24, R = W - 24, lam = (R - L) * 0.45, k = TAU / lam, w = TAU * 0.5, A = 0.5 / k;
      const xi = (x, tt) => A * Math.sin(k * (x - L) - w * tt);
      const top = 26, airH = H * 0.3;
      ctx.save(); ctx.fillStyle = C.ink; ctx.globalAlpha = 0.78;
      for (const p of air) {
        if (W < 600 && !p.few) continue;
        const x0 = L + p.u * (R - L); ctx.beginPath(); ctx.arc(x0 + xi(x0, tm), top + p.v * airH, p.s, 0, TAU); ctx.fill();
      }
      ctx.restore();
      // microphone at x = xm
      const xm = R;                         // microphone at the right end, above the newest point of the plot
      ctx.save(); ctx.strokeStyle = C.a1; ctx.fillStyle = C.a1; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.ellipse(xm, top - 14, 5, 7.5, 0, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(xm, top - 14, 9, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); ctx.restore();
      dot(ctx, xm + xi(xm, tm), top + airH / 2, 4.5, C.a1);
      // displacement at the microphone against time
      const py = top + airH + 30 + (H - top - airH - 30) / 2, ph = (H - top - airH - 30) * 0.38;
      axes(ctx, L, py, R + 6, ph * 1.25, ph * 1.15, t('time'), null);
      dirLabels(ctx, L, py, ph * 1.25, ph * 1.15);
      if (an) {
        an.getFloatTimeDomainData(buf);
        let i0 = 1; for (let i = 1; i < 1024; i++) { if (buf[i - 1] < 0 && buf[i] >= 0) { i0 = i; break; } }
        let m = 0; for (let i = 0; i < buf.length; i++) m = Math.max(m, Math.abs(buf[i]));
        peak = Math.max(0.02, peak * 0.96, m);
        const n = 1000, xs = [], ys = [];
        for (let i = 0; i < n; i++) { xs.push(L + (R - L) * i / (n - 1)); ys.push(py - ph * buf[i0 + i] / peak); }
        nib(ctx, xs, ys, C.curve, 2.6);
        label(ctx, t('yourvoice'), R, py - ph * 1.2, { size: 13, align: 'right', color: C.curve });
        label(ctx, `${Math.round(1000 * n / AC.sampleRate)} ms`, L + 8, py + 18, { size: 12, alpha: 0.6 });
      } else {
        const Tw = 4;  // seconds of history; newest on the right
        nibFn(ctx, L, R, (x) => py - ph * xi(xm, tm - Tw + Tw * (x - L) / (R - L)) / A, C.curve, 3.4);
        const yd = py - ph * xi(xm, tm) / A;
        pencil(ctx, xm, top - 4, xm, yd, C.a1, 0.7);
        if (Math.abs(yd - py) > 6) arrow(ctx, xm, py, xm, yd, C.a1, 1.4);
        dot(ctx, R, yd, 4.5, C.a1);
      }
    },
    leave() { micOff(); if (st.dataset.k === 'micon' || st.dataset.k === 'micask') status(''); },
    lang() { setBtn(bm, stream ? 'micoff' : 'mic'); setBtn(brc, recState ? 'recording' : 'rec'); setBtn(bp, 'playrec'); if (st.dataset.k) status(st.dataset.k); },
  };
}

/* ======================================================================
   Stage 4 · guitar string: only the waves that fit
   ====================================================================== */
const STRING_AMPS = [1, 0.55, 0.4, 0.26, 0.18, 0.12];   // illustrative amplitudes, chosen by eye
const MODE_COL = [C.a1, C.a2, C.a3, C.a1, C.a2, C.a3];
const F1_STRING = 440 * Math.pow(2, -17 / 12);           // E, 164.81 Hz
{
  const ctx = canvas('c4');
  const N = 6, on = Array(N).fill(true), amp = STRING_AMPS.slice();
  const box = $('s4modes'), bs = $('s4snd'), eq = $('s4eq');
  let tm = 0, snd = null;
  const sliders = [], checks = [], names = [];
  for (let n = 1; n <= N; n++) {
    const lab = document.createElement('label');
    const sw = document.createElement('span'); sw.className = 'sw'; sw.style.background = MODE_COL[n - 1];
    const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = true; cb.setAttribute('aria-label', `n = ${n}`);
    const nm = document.createElement('span');
    const r = document.createElement('input'); r.type = 'range'; r.min = 0; r.max = 100; r.value = Math.round(amp[n - 1] * 100); r.setAttribute('aria-label', `a${n}`);
    cb.addEventListener('change', () => { on[n - 1] = cb.checked; sync(); });
    r.addEventListener('input', () => { amp[n - 1] = r.value / 100; sync(); });
    lab.append(sw, cb, nm, r); box.appendChild(lab);
    sliders.push(r); checks.push(cb); names.push(nm);
  }
  const eff = () => amp.map((a, i) => (on[i] ? a : 0));
  function sync() { if (snd) snd.setAmps(eff()); }
  function setAll(arr, onArr) {
    for (let i = 0; i < N; i++) { amp[i] = arr[i]; on[i] = onArr[i]; sliders[i].value = Math.round(arr[i] * 100); checks[i].checked = onArr[i]; }
    sync();
  }
  $('s4all').addEventListener('click', () => setAll(STRING_AMPS, Array(N).fill(true)));
  $('s4one').addEventListener('click', () => setAll(STRING_AMPS, [true, false, false, false, false, false]));
  bs.addEventListener('click', () => {
    if (snd) { snd.stop(); snd = null; } else snd = tone(F1_STRING, eff());
    bs.setAttribute('aria-pressed', snd ? 'true' : 'false'); setBtn(bs, snd ? 'stop' : 'listen');
  });
  $('s4pluck').addEventListener('click', () => {   // each mode decays; higher modes decay faster
    const ac = audio(); if (!ac) return;
    const sr = ac.sampleRate, n = Math.round(sr * 2.6), d = new Float32Array(n), a = eff();
    for (let i = 0; i < n; i++) {
      const tt = i / sr; let s = 0;
      for (let m = 1; m <= N; m++) if (a[m - 1]) s += a[m - 1] * Math.exp(-tt * (0.9 + 0.55 * m)) * Math.sin(TAU * m * F1_STRING * tt);
      d[i] = s * Math.min(1, tt / 0.004);
    }
    playBuffer(d, sr, 0.8);
  });
  const show = () => {
    for (let n = 1; n <= N; n++) names[n - 1].textContent = `n=${n} · ${noteName(n * F1_STRING)}`;
    tex(eq, `\\begin{gathered} f_n = n\\,f_1,\\quad n = 1, 2, 3, \\dots \\\\ f_1 = ${F1_STRING.toFixed(1)}\\ \\mathrm{Hz}\\ (\\text{${noteName(F1_STRING)}}) \\end{gathered}`);
  };
  show();
  S[4] = {
    ctx,
    draw(dt) {
      const { W, H } = ctx.cv; clear(ctx); tm += dt;
      const nu = 0.32, a = eff();
      const L = 34, R = W - 34;
      const y = (n, x) => Math.sin(n * Math.PI * (x - L) / (R - L)) * Math.cos(TAU * n * nu * tm);
      // the string: sum of the modes that are on
      const sy = H * 0.2, sh = H * 0.15;
      let amax = 0; for (let i = 0; i < N; i++) amax += STRING_AMPS[i];
      pencil(ctx, L, sy, R, sy, C.ink, 0.45);
      nibFn(ctx, L, R, (x) => { let s = 0; for (let n = 1; n <= N; n++) s += a[n - 1] * y(n, x); return sy - sh * s / amax * 1.25; }, C.curve, 3.8);
      for (const x of [L, R]) { dot(ctx, x, sy, 5, C.ink); }
      label(ctx, t('sum'), L - 4, sy - sh - 6, { size: 13, alpha: 0.7, italic: true });
      // each wave that fits
      const top = H * 0.42, rowH = (H - top - 6) / N;
      for (let n = 1; n <= N; n++) {
        const cy = top + rowH * (n - 0.5), hh = rowH * 0.38, xl = L + 88;
        pencil(ctx, xl, cy, R, cy, C.ink, 0.35);
        dot(ctx, xl, cy, 2.5, C.ink, 0.8); dot(ctx, R, cy, 2.5, C.ink, 0.8);
        mlabel(ctx, [['n', 'i'], [` = ${n}`, 'r']], L - 10, cy + 5, { size: 14, alpha: on[n - 1] ? 0.9 : 0.35 });
        label(ctx, noteName(n * F1_STRING), L + 46, cy + 5, { size: 13, alpha: on[n - 1] ? 0.9 : 0.35, color: MODE_COL[n - 1] });
        if (on[n - 1] && a[n - 1] > 0) {
          const yy = (x) => Math.sin(n * Math.PI * (x - xl) / (R - xl)) * Math.cos(TAU * n * nu * tm);
          nibFn(ctx, xl, R, (x) => cy - hh * a[n - 1] * yy(x), MODE_COL[n - 1], 2.6);
        }
      }
    },
    leave() { snd = null; bs.setAttribute('aria-pressed', 'false'); setBtn(bs, 'listen'); },
    lang() { show(); setBtn(bs, snd ? 'stop' : 'listen'); },
  };
}

/* ======================================================================
   Stage 5 · timbre: drag the amplitude of each frequency
   ====================================================================== */
{
  const ctx = canvas('c5');
  const N = 8, F1 = 220, amp = [1, 0, 0, 0, 0, 0, 0, 0];
  const bs = $('s5snd'), eq = $('s5eq');
  let snd = null, drag = false, sel = 0, geo = null;
  tex(eq, `p(t) = \\sum_{n=1}^{8} a_n \\sin(2\\pi\\, n f_1 t), \\qquad f_1 = ${F1}\\ \\mathrm{Hz}`);
  const sync = () => { if (snd) snd.setAmps(amp); ctx.cv.dirty = true; };
  $('s5pure').addEventListener('click', () => { amp.fill(0); amp[0] = 1; sync(); });
  $('s5str').addEventListener('click', () => { amp.fill(0); STRING_AMPS.forEach((a, i) => { amp[i] = a; }); sync(); });
  bs.addEventListener('click', () => {
    if (snd) { snd.stop(); snd = null; } else snd = tone(F1, amp);
    bs.setAttribute('aria-pressed', snd ? 'true' : 'false'); setBtn(bs, snd ? 'stop' : 'listen');
  });
  const hit = (e) => {
    if (!geo) return;
    const r = ctx.cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    const i = Math.floor((x - geo.x0) / geo.bw);
    if (i < 0 || i >= N) return;
    sel = i; amp[i] = clamp((geo.base - y) / geo.bh, 0, 1); if (amp[i] < 0.03) amp[i] = 0; sync();
  };
  const cv = ctx.cv;
  cv.tabIndex = 0;
  cv.addEventListener('pointerdown', (e) => { drag = true; cv.setPointerCapture(e.pointerId); hit(e); });
  cv.addEventListener('pointermove', (e) => { if (drag) hit(e); });
  cv.addEventListener('pointerup', () => { drag = false; });
  cv.addEventListener('pointercancel', () => { drag = false; });
  cv.addEventListener('keydown', (e) => {   // keyboard: ← → choose a bar, + − change it
    if (e.key === 'ArrowLeft') sel = (sel + N - 1) % N;
    else if (e.key === 'ArrowRight') sel = (sel + 1) % N;
    else if (e.key === '+' || e.key === '=') amp[sel] = clamp(amp[sel] + 0.1, 0, 1);
    else if (e.key === '-') amp[sel] = clamp(amp[sel] - 0.1, 0, 1);
    else return;
    e.preventDefault(); sync();
  });
  S[5] = {
    ctx,
    draw() {
      const { W, H } = ctx.cv; clear(ctx);
      const L = 40, R = W - 24;
      // bars
      const base = H * 0.44, bh = H * 0.34, x0 = L + 6, bw = (R - x0) / N;
      geo = { x0, bw, base, bh };
      arrow(ctx, L, base, R + 6, base); arrow(ctx, L, base + 4, L, base - bh - 18);
      label(ctx, t('amplitude'), L + 8, base - bh - 14, { size: 13, alpha: 0.75, italic: true, base: 'top' });
      for (let i = 0; i < N; i++) {
        const cx = x0 + bw * (i + 0.5), h = amp[i] * bh, w = Math.min(bw * 0.42, 30);
        pencil(ctx, cx, base, cx, base - bh, C.ink, 0.25);
        ctx.save(); ctx.fillStyle = C.curve; ctx.globalAlpha = 0.9; ctx.fillRect(cx - w / 2, base - h, w, h); ctx.restore();
        if (document.activeElement === cv && i === sel) { ctx.save(); ctx.strokeStyle = C.a1; ctx.setLineDash([3, 3]); ctx.strokeRect(cx - w / 2 - 4, base - bh - 4, w + 8, bh + 8); ctx.restore(); }
        const parts = i === 0 ? [['f', 'i'], ['1', 's']] : [[`${i + 1}`, 'r'], ['f', 'i'], ['1', 's']];
        mlabel(ctx, parts, cx, base + 20, { align: 'center', size: 14 });
      }
      // resulting wave, three periods of the fundamental
      const py = H * 0.79, ph = H * 0.16;
      axes(ctx, L, py, R + 6, ph * 1.2, ph * 1.1, t('time'), null);
      let m = 1e-9; const fn = (u) => { let s = 0; for (let n = 1; n <= N; n++) s += amp[n - 1] * Math.sin(TAU * n * u); return s; };
      for (let u = 0; u < 1; u += 0.002) m = Math.max(m, Math.abs(fn(u)));
      nibFn(ctx, L, R, (x) => py - ph * fn(3 * (x - L) / (R - L)) / m, C.curve, 3.2, 1, 1.5);
      ctx.cv.dirty = false;
    },
    leave() { snd = null; bs.setAttribute('aria-pressed', 'false'); setBtn(bs, 'listen'); },
    lang() { setBtn(bs, snd ? 'stop' : 'listen'); },
  };
}

/* ======================================================================
   Stage 6 · keep the N strongest frequencies
   ====================================================================== */
function fft(re, im, inverse) {     // in-place radix-2 complex FFT, length a power of two
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1; for (; j & bit; bit >>= 1) j ^= bit; j ^= bit;
    if (i < j) { let tr = re[i]; re[i] = re[j]; re[j] = tr; tr = im[i]; im[i] = im[j]; im[j] = tr; }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = (inverse ? 2 : -2) * Math.PI / len, wr = Math.cos(ang), wi = Math.sin(ang), h = len >> 1;
    for (let i = 0; i < n; i += len) {
      let cr = 1, ci = 0;
      for (let k = 0; k < h; k++) {
        const ar = re[i + k + h] * cr - im[i + k + h] * ci, ai = re[i + k + h] * ci + im[i + k + h] * cr;
        re[i + k + h] = re[i + k] - ar; im[i + k + h] = im[i + k] - ai; re[i + k] += ar; im[i + k] += ai;
        const t2 = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = t2;
      }
    }
  }
  if (inverse) for (let i = 0; i < n; i++) { re[i] /= n; im[i] /= n; }
}
{
  const ctx = canvas('c6');
  const sl = $('s6k'), out = $('s6kv'), src = $('s6src'), st = $('s6st');
  const NF = 65536, KMAX = 3000;
  let D = null;                      // analysed clip
  let K = 0, rec = null, need = true, needK = true;
  const kFrom = () => Math.max(1, Math.round(Math.exp(Math.log(KMAX) * sl.value / 1000)));
  function analyse() {
    let clip;
    if (shared.voice) clip = shared.voice;
    else { if (!shared.sample) shared.sample = makeSample(44100); clip = shared.sample; }
    const x = clip.data; let m = 0; for (let i = 0; i < x.length; i++) m = Math.max(m, Math.abs(x[i]));
    let s0 = 0; while (s0 < x.length && Math.abs(x[s0]) < 0.08 * m) s0++;
    s0 = Math.max(0, s0 - Math.round(0.02 * clip.sr));
    const M = Math.min(NF, x.length - s0);
    const re = new Float64Array(NF), im = new Float64Array(NF);
    for (let i = 0; i < M; i++) re[i] = x[s0 + i];
    const orig = Float32Array.from(re.subarray(0, M));
    fft(re, im, false);
    const mag = new Float64Array(NF / 2);
    for (let k = 1; k < NF / 2; k++) mag[k] = Math.hypot(re[k], im[k]);
    const order = Array.from({ length: NF / 2 - 1 }, (_, i) => i + 1).sort((a, b) => mag[b] - mag[a]);
    // zoom window: the 40 ms of highest energy
    const win = Math.round(0.04 * clip.sr); let best = 0, bi = 0, e = 0;
    for (let i = 0; i < M; i++) { e += orig[i] * orig[i]; if (i >= win) e -= orig[i - win] * orig[i - win]; if (i >= win && e > best) { best = e; bi = i - win; } }
    let mmax = 0; for (let k = 1; k < NF / 2; k++) mmax = Math.max(mmax, mag[k]);
    D = { re, im, mag, mmax, order, orig, M, sr: clip.sr, z0: bi, zw: win, voice: !!shared.voice };
    src.textContent = t(D.voice ? 'srcvoice' : 'srcsample');
  }
  function rebuild() {
    const re = new Float64Array(NF), im = new Float64Array(NF);
    for (let j = 0; j < K; j++) {
      const k = D.order[j];
      re[k] = D.re[k]; im[k] = D.im[k]; re[NF - k] = D.re[k]; im[NF - k] = -D.im[k];
    }
    fft(re, im, true);
    rec = Float32Array.from(re.subarray(0, D.M));
    D.kept = new Uint8Array(NF / 2); for (let j = 0; j < K; j++) D.kept[D.order[j]] = 1;
  }
  sl.addEventListener('input', () => { needK = true; });
  $('s6orig').addEventListener('click', () => { if (D) { stopSounds(); playBuffer(D.orig, D.sr); } });
  $('s6rec').addEventListener('click', () => { if (rec) { stopSounds(); playBuffer(rec, D.sr); } });
  S[6] = {
    ctx,
    invalidate() { need = true; },
    enter() { if (need) { analyse(); need = false; needK = true; } },
    draw() {
      if (need) { analyse(); need = false; needK = true; }
      if (needK) {
        K = kFrom(); rebuild(); needK = false; ctx.cv.dirty = true;
        out.textContent = `${K}`;
        st.textContent = T[lang].numbers(K, D.M);
      }
      if (!ctx.cv.dirty) return;
      const { W, H } = ctx.cv; clear(ctx);
      const L = 40, R = W - 24;
      // spectrum, 0 to 4 kHz
      const sb = H * 0.4, shh = H * 0.32, fmax = 4000, kmax = Math.round(fmax / D.sr * NF);
      arrow(ctx, L, sb, R + 6, sb); arrow(ctx, L, sb + 4, L, sb - shh - 14);
      label(ctx, t('spectrum'), L + 8, sb - shh - 10, { size: 13, alpha: 0.75, italic: true, base: 'top' });
      const g = (k) => Math.sqrt(D.mag[k] / D.mmax);
      for (const keep of [0, 1]) {
        ctx.save(); ctx.strokeStyle = keep ? C.a2 : C.ink; ctx.globalAlpha = keep ? 0.95 : 0.25; ctx.lineWidth = keep ? 1.4 : 1;
        ctx.beginPath();
        for (let k = 1; k < kmax; k++) {
          if ((D.kept[k] === 1) !== !!keep) continue;
          const x = L + (R - L) * k / kmax; ctx.moveTo(x, sb); ctx.lineTo(x, sb - shh * g(k));
        }
        ctx.stroke(); ctx.restore();
      }
      for (const fk of [1000, 2000, 3000, 4000]) label(ctx, `${fk / 1000} kHz`, L + (R - L) * fk / fmax, sb + 16, { size: 12, align: 'center', alpha: 0.6 });
      // waveform, zoom of 40 ms: original (ink) and rebuilt (curve)
      const py = H * 0.77, ph = H * 0.17;
      axes(ctx, L, py, R + 6, ph * 1.25, ph * 1.15, t('time'), null);
      let m = 1e-9; for (let i = 0; i < D.zw; i++) m = Math.max(m, Math.abs(D.orig[D.z0 + i]));
      const xs = [], yo = [], yr = [];
      for (let i = 0; i < D.zw; i += 2) { xs.push(L + (R - L) * i / D.zw); yo.push(py - ph * D.orig[D.z0 + i] / m); yr.push(py - ph * rec[D.z0 + i] / m); }
      ctx.save(); ctx.strokeStyle = C.ink; ctx.globalAlpha = 0.45; ctx.lineWidth = 1.2; ctx.beginPath();
      xs.forEach((x, i) => (i ? ctx.lineTo(x, yo[i]) : ctx.moveTo(x, yo[i]))); ctx.stroke(); ctx.restore();
      nib(ctx, xs, yr, C.curve, 2.6);
      label(ctx, t('original'), R, py - ph * 1.25, { size: 13, align: 'right', alpha: 0.6 });
      label(ctx, t('recon'), R, py - ph * 1.25 + 16, { size: 13, align: 'right', color: C.curve });
      label(ctx, '40 ms', L + 8, py + 18, { size: 12, alpha: 0.6 });
      ctx.cv.dirty = false;
    },
    lang() { if (D) { src.textContent = t(D.voice ? 'srcvoice' : 'srcsample'); st.textContent = T[lang].numbers(K, D.M); } },
  };
}

/* ======================================================================
   Stage 7 · tides: three sines and their sum
   Periods and amplitudes as in the "mareas" animation; phases set to 0.
   ====================================================================== */
{
  const ctx = canvas('c7');
  const TI = [12.42, 12.00, 25.82], AI = [1, 0.46, 0.42], COL = [C.a1, C.a2, C.a3], KEY = ['moon', 'sun', 'rest'];
  const cb = [$('s7m1'), $('s7m2'), $('s7m3')], sl = $('s7t'), br = $('s7run'), eq = $('s7eq');
  let running = false;
  tex(eq, '\\begin{gathered} h(t) = \\sum_{i=1}^{3} A_i \\cos\\!\\left(\\frac{2\\pi t}{T_i}\\right) \\\\ T_i = 12.42,\\ 12.00,\\ 25.82\\ \\mathrm{h} \\\\ A_i = 1,\\ 0.46,\\ 0.42 \\end{gathered}');
  br.addEventListener('click', () => { running = !running; br.setAttribute('aria-pressed', running ? 'true' : 'false'); setBtn(br, running ? 'halt' : 'advance'); });
  const comp = (i, hours) => AI[i] * Math.cos(TAU * hours / TI[i]);
  S[7] = {
    ctx,
    draw(dt) {
      const { W, H } = ctx.cv; clear(ctx);
      if (running) { let v = parseFloat(sl.value) + dt * 0.8; if (v > 60) v = 0; sl.value = v; }
      const today = parseFloat(sl.value), d0 = today - 4, d1 = today + 8;   // window in days
      const L = 92, R = W - 24, X = (d) => L + (R - L) * (d - d0) / (d1 - d0), Dd = (x) => d0 + (d1 - d0) * (x - L) / (R - L);
      const xt = X(today);
      // the three causes
      const rowH = H * 0.13, top = 6;
      for (let i = 0; i < 3; i++) {
        const cy = top + rowH * (i + 0.5), hh = rowH * 0.36, onI = cb[i].checked;
        pencil(ctx, L, cy, R, cy, C.ink, 0.3);
        label(ctx, t(KEY[i]), 4, cy - 2, { size: 13, color: COL[i], alpha: onI ? 0.95 : 0.35 });
        label(ctx, `${TI[i].toFixed(2)} h`, 4, cy + 13, { size: 11, alpha: onI ? 0.7 : 0.3 });
        if (onI) nibFn(ctx, L, R, (x) => cy - hh * comp(i, Dd(x) * 24) / AI[0], COL[i], 2.2, 1, 1.5);
      }
      pencil(ctx, xt, top, xt, H - 20, C.ink, 0.55);
      // the tide: their sum, before today (measured past) and after (prediction)
      const py = top + rowH * 3 + (H - top - rowH * 3 - 26) / 2, ph = (H - top - rowH * 3 - 26) * 0.4;
      axes(ctx, L, py, R + 6, ph * 1.2, ph * 1.15, t('days'), t('tide'));
      const sum = (x) => { let s = 0; for (let i = 0; i < 3; i++) if (cb[i].checked) s += comp(i, Dd(x) * 24); return py - ph * s / 1.9; };
      nibFn(ctx, L, xt, sum, C.curve, 3.2, 1, 1.5);
      nibFn(ctx, xt, R, sum, C.curve, 3.2, 0.42, 1.5);
      label(ctx, t('today'), xt, H - 6, { size: 13, align: 'center', alpha: 0.85 });
      label(ctx, `${t('predicted')} →`, Math.min(R, xt + 12), py - ph * 1.15, { size: 13, alpha: 0.7, italic: true });
      for (let d = Math.ceil(d0); d <= d1; d++) {
        const x = X(d); if (x < L + 4) continue;
        ctx.save(); ctx.strokeStyle = C.ink; ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.moveTo(x, py - 3); ctx.lineTo(x, py + 3); ctx.stroke(); ctx.restore();
        if (d % 2 === 0) label(ctx, `${d}`, x, py + 16, { size: 11, align: 'center', alpha: 0.55 });
      }
      label(ctx, t('sum'), 4, py, { size: 13, color: C.curve });
    },
    leave() { running = false; br.setAttribute('aria-pressed', 'false'); setBtn(br, 'advance'); },
    lang() { setBtn(br, running ? 'halt' : 'advance'); },
  };
}

/* ======================================================================
   Stage 8 · YouTube video (set data-youtube in the HTML)
   ====================================================================== */
{
  const v = $('video'), id = (v.dataset.youtube || '').trim();
  if (id) {
    v.innerHTML = '';
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;
    f.title = 'YouTube'; f.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen'; f.allowFullscreen = true;
    f.loading = 'lazy';
    v.appendChild(f);
  }
}

/* ======================================================================
   Animation loop: draw only the stages on screen
   ====================================================================== */
let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  for (const i of visible) if (S[i] && S[i].draw) S[i].draw(dt);
  requestAnimationFrame(frame);
}
applyLang();
updateDots();
requestAnimationFrame(frame);
document.fonts && document.fonts.ready.then(() => { for (const k in S) if (S[k].ctx) S[k].ctx.cv.dirty = true; });
})();
