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
    s1c0: '¿Cómo se describe esta onda?',
    s1c1: 'Fíjate en unas pocas columnas de aire. Las rayas marcan sus posiciones de equilibrio: donde están cuando no suena nada.',
    s1c2: 'Para describir la onda, necesito decir cuánto se ha movido cada una. Lo apunto justo debajo, en una gráfica. Aquí todas se han movido 0.',
    s1c3: 'Si desplazo esta columna hacia su derecha, la gráfica queda así: su punto sube.',
    s1c4: 'Ahora tú: arrastra la columna marcada hacia los lados, con el ratón o con el dedo.',
    s1c4r: 'A la derecha, su punto sube. Ahora llévala a la izquierda.',
    s1c4l: 'A la izquierda, su punto baja. Ahora llévala a la derecha.',
    s1c4ok: 'Eso es: derecha, arriba; izquierda, abajo. Y cuanto más se aleja la columna de su sitio, más se aleja su punto de la línea.',
    s1c5: (n) => `Ahora coloca tú cada columna para que su punto caiga en su círculo. ${n === 1 ? 'Falta 1' : `Faltan ${n}`}.`,
    s1c5up: 'Al revés: para que su punto suba, muévela a la derecha.',
    s1c5down: 'Al revés: para que su punto baje, muévela a la izquierda.',
    s1c5ok: '¡Eso es!',
    s1c6: 'Así está el aire en un instante mientras suena una nota. Con muchas columnas, los puntos forman una curva: la onda.',
    s1c7: 'Ahora en movimiento: la onda viaja. Ondas así de perfectas son notas puras: senos o cosenos.',
    dragme: 'arrástrame', prev: '← atrás',
    next: 'siguiente →', again: '↻ otra vez',
    pause: '⏸ pausar', play: '▶ seguir', slow: 'cámara lenta',
    position: 'posición', displacement: 'desplazamiento', time: 'tiempo', right: 'derecha', left: 'izquierda',
    vocal: 'cuerdas vocales', ear: 'oído',
    rest: 'resto',
    s2h: 'Una nota es una frecuencia',
    s2p1: 'Una nota musical se define por su frecuencia: cuántas veces por segundo vibra el aire. 440 veces es un La.',
    s2k: 'Cuanto más rápido vibra el aire, más aguda es la nota.',
    freq: 'frecuencia', listen: '▶ escuchar', stop: '■ parar',
    realspeed: 'velocidad real', realon: 'velocidad real: no se ve nada', slowmo: 'cámara lenta',
    s3h: 'Un micrófono',
    s3p1: 'Un micrófono mide el desplazamiento del aire en un solo punto, a lo largo del tiempo.',
    s3c0: 'Un micrófono escucha en un solo punto del aire. Ahí, la partícula que tiene delante va a la derecha y a la izquierda, y nada más.',
    s3c1: 'El micrófono apunta cuánto se ha movido a cada instante: derecha arriba, izquierda abajo. El eje horizontal ya no es la posición: es el tiempo.',
    s3c2: 'Una nota pura da un seno perfecto. ¿Y una voz de verdad? Graba la tuya, hablando o cantando, o usa la grabación de ejemplo.',
    s3crec: (n) => `Grabando: habla o canta… ${n}`,
    s3c3: 'Así se ve la grabación entera: el aire va y viene tan rápido que solo se distinguen las sílabas. Toca la gráfica donde quieras para verla a cámara lenta.',
    s3c4: 'A cámara lenta, 150 veces más despacio: el aire va y viene como con la nota pura, pero con una forma mucho menos perfecta.',
    recvoice: '🎙 grabar mi voz', recagain: '🎙 grabar otra vez', example: '▶ grabación de ejemplo', micro: 'micrófono', tapme: 'tócame',
    micask: 'pidiendo permiso para el micrófono…', micno: 'no hay micrófono, o no hay permiso: usa la grabación de ejemplo',
    recok: 'grabado: la etapa 6 usará tu voz', recno: 'este navegador no permite grabar: usa la grabación de ejemplo',
    exsynth: 'de momento, la grabación de ejemplo es una señal sintética',
    s4h: 'Una cuerda de guitarra',
    s4p1: 'Una nota de guitarra tampoco es un seno puro. ¿Por qué?',
    s4c0: 'La cuerda está atada por los dos extremos. Arrastra el botón para estirar o encoger la onda: ¿consigues que acabe justo en el extremo derecho?',
    s4cno: 'No cabe: acaba fuera del extremo derecho, y ese extremo está atado.',
    s4cnear: (r) => `Casi: un poco más a la ${r ? 'derecha' : 'izquierda'}.`,
    s4cmore: 'Busca otra.',
    s4cfit: (n) => `¡Cabe! n = ${n}: ${n === 1 ? 'media onda justa' : `${n} medias ondas justas`}.`,
    s4cok: 'Solo caben las ondas con un número entero de medias ondas: 1, 2, 3, 4…',
    s4c1: 'Cada onda que cabe es una nota pura. Toca cada una para escucharla, o pulsa la cuerda: suenan todas a la vez.',
    s4hear: (n, x, e) => [`n = 1, la fundamental: ${x}, la nota que tocas.`, `n = 2: ${x} otra vez, una octava más aguda.`, `n = 3: ¡${x}! Tocas un ${e} y también suena un ${x}.`, `n = 4: ${x}, dos octavas más aguda que la fundamental.`, `n = 5: ${x}, otra nota más.`, `n = 6: ${x} otra vez, una octava más aguda que el de n = 3.`][n - 1],
    s4c2ok: (e) => `Todas a la vez: un ${e} con timbre de guitarra.`,
    s4c2: 'Elige con las casillas qué ondas suenan, y pulsa otra vez.',
    s4only: 'Solo la fundamental: un seno puro. Suena a pitido, no a guitarra.',
    s4six6: 'Las 6 primeras: ya suena a cuerda, pero más apagada: le faltan las más agudas.',
    s4all: (e) => `Las 100 primeras: un ${e} con timbre de guitarra.`,
    s4mix: 'Otra mezcla de ondas, otro sonido.',
    s4c3: 'Cada onda suena con su propia fuerza, su amplitud: cámbiala con su barra y pulsa. Qué ondas suenan y con qué fuerza: eso es el timbre.',
    s1k1: 'Derecha en el aire: arriba en la gráfica. Izquierda: abajo.',
    s1k2: 'La gráfica de una onda dice cuánto se ha movido el aire en cada sitio.',
    s1k3: 'Una nota pura es una onda perfecta: un seno.',
    s3k: 'Una voz también es aire que va y viene: una onda, mucho menos perfecta que una nota pura.',
    s4k0: 'En una cuerda atada solo caben ondas con medias ondas justas: 1, 2, 3, 4…',
    s4k1: 'La cuerda = suma de las ondas que caben.',
    s4k3: 'Timbre: qué ondas suenan, y con qué fuerza.',
    rest7: (k) => `n = 7…${k}: las demás de una guitarra`, nofit: 'no cabe',
    sumof: 'la cuerda = suma de las ondas que caben:',
    pluck: '▶ pulsar', six: 'marcar las 6', onlyfund: 'solo la fundamental', sum: 'suma',
    s5h: 'El timbre',
    s5p1: 'Qué frecuencias vibran y con qué fuerza es lo que el cerebro oye como una guitarra, o como la voz de una persona.',
    s5p2: 'Arrastra las barras: la nota es la misma, el sonido no.',
    s5k: 'Todo sonido es una suma de frecuencias puras.',
    pure: 'nota pura', likestring: 'como la cuerda', amplitude: 'amplitud', frequency: 'frecuencia',
    s6h: 'Cómo viaja tu audio',
    s6p1: 'Un móvil encuentra las frecuencias y las amplitudes de una grabación, envía eso como datos comprimidos, y el otro móvil lo vuelve a reproducir.',
    s6k: 'Basta con las frecuencias más fuertes.',
    keep: 'frecuencias que se conservan', playorig: '▶ original', playrecon: '▶ reconstruida',
    srcvoice: 'Grabación: tu voz (etapa 3).', srcsample: 'Grabación: señal de ejemplo sintética. Graba tu voz en la etapa 3 para usarla aquí.',
    numbers: (k, m) => `${k} frecuencias · ${3 * k} números (frecuencia, amplitud, fase) en lugar de ${m} muestras`,
    spectrum: 'frecuencias de la grabación', original: 'original', recon: 'reconstruida',
    s7h: 'Las mareas',
    s7p1: 'La marea sube y baja; a lo largo de un día dibuja una onda. La mueven fuerzas periódicas: la gravedad de la Luna, la del Sol, y más. Cada una es un seno puro.',
    s7k: 'Sumando unas pocas ondas puras se predice la marea.',
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
    s1c0: 'How do you describe this wave?',
    s1c1: 'Look at a few columns of air. The dashes mark their equilibrium positions: where they sit when there is no sound.',
    s1c2: 'To describe the wave, I need to say how far each one has moved. I note it right below, on a graph. Here they have all moved 0.',
    s1c3: 'If I move this column to its right, the graph looks like this: its point goes up.',
    s1c4: 'Your turn: drag the marked column sideways, with the mouse or your finger.',
    s1c4r: 'To the right, its point goes up. Now take it to the left.',
    s1c4l: 'To the left, its point goes down. Now take it to the right.',
    s1c4ok: 'That’s it: right is up, left is down. And the further the column moves from its place, the further its point from the line.',
    s1c5: (n) => `Now place each column so its point lands in its circle. ${n} to go.`,
    s1c5up: 'The other way: to make its point go up, move it right.',
    s1c5down: 'The other way: to make its point go down, move it left.',
    s1c5ok: 'That’s it!',
    s1c6: 'This is the air at one instant while a note sounds. With many columns, the points make a curve: the wave.',
    s1c7: 'Now in motion: the wave travels. Waves this perfect are pure notes: sines or cosines.',
    dragme: 'drag me', prev: '← back',
    next: 'next →', again: '↻ again',
    pause: '⏸ pause', play: '▶ play', slow: 'slow motion',
    position: 'position', displacement: 'displacement', time: 'time', right: 'right', left: 'left',
    vocal: 'vocal cords', ear: 'ear',
    rest: 'the rest',
    s2h: 'A note is a frequency',
    s2p1: 'A musical note is defined by its frequency: how many times per second the air vibrates. 440 times is an A.',
    s2k: 'The faster the air vibrates, the higher the note.',
    freq: 'frequency', listen: '▶ listen', stop: '■ stop',
    realspeed: 'real speed', realon: 'real speed: nothing can be seen', slowmo: 'slow motion',
    s3h: 'A microphone',
    s3p1: 'A microphone measures the displacement of the air at one single point, over time.',
    s3c0: 'A microphone listens at one single point of the air. There, the particle in front of it goes right and left, and that is all.',
    s3c1: 'The microphone notes how far it has moved at each instant: right up, left down. The horizontal axis is no longer position: it is time.',
    s3c2: 'A pure note gives a perfect sine. And a real voice? Record yours, speaking or singing, or use the example recording.',
    s3crec: (n) => `Recording: speak or sing… ${n}`,
    s3c3: 'This is the whole recording: the air goes back and forth so fast that only the syllables show. Tap the graph anywhere to see it in slow motion.',
    s3c4: 'In slow motion, 150 times slower: the air goes back and forth as with the pure note, but in a far less perfect shape.',
    recvoice: '🎙 record my voice', recagain: '🎙 record again', example: '▶ example recording', micro: 'microphone', tapme: 'tap me',
    micask: 'asking for microphone permission…', micno: 'no microphone, or no permission: use the example recording',
    recok: 'recorded: stage 6 will use your voice', recno: 'this browser cannot record: use the example recording',
    exsynth: 'for now, the example recording is a synthetic signal',
    s4h: 'A guitar string',
    s4p1: 'A guitar note is not a pure sine either. Why?',
    s4c0: 'The string is tied at both ends. Drag the knob to stretch or squeeze the wave: can you make it end exactly at the right end?',
    s4cno: 'It does not fit: it ends away from the right end, and that end is tied.',
    s4cnear: (r) => `Almost: a little more to the ${r ? 'right' : 'left'}.`,
    s4cmore: 'Find another one.',
    s4cfit: (n) => `It fits! n = ${n}: ${n === 1 ? 'exactly half a wave' : `exactly ${n} half waves`}.`,
    s4cok: 'Only waves with a whole number of half waves fit: 1, 2, 3, 4…',
    s4c1: 'Each wave that fits is a pure note. Tap each one to hear it, or pluck the string: they all sound at once.',
    s4hear: (n, x, e) => [`n = 1, the fundamental: ${x}, the note you play.`, `n = 2: ${x} again, one octave higher.`, `n = 3: ${x}! You play an ${e} and a ${x} sounds too.`, `n = 4: ${x}, two octaves above the fundamental.`, `n = 5: ${x}, yet another note.`, `n = 6: ${x} again, one octave above the one at n = 3.`][n - 1],
    s4c2ok: (e) => `All at once: an ${e} with the timbre of a guitar.`,
    s4c2: 'Choose with the boxes which waves sound, and pluck again.',
    s4only: 'The fundamental alone: a pure sine. It sounds like a beep, not a guitar.',
    s4six6: 'The first 6: it already sounds like a string, but duller: the highest ones are missing.',
    s4all: (e) => `The first 100: an ${e} with the timbre of a guitar.`,
    s4mix: 'Another mix of waves, another sound.',
    s4c3: 'Each wave sounds with its own strength, its amplitude: change it with its slider and pluck. Which waves sound, and how strongly: that is timbre.',
    s1k1: 'Right in the air: up on the graph. Left: down.',
    s1k2: 'The graph of a wave tells how far the air has moved at each place.',
    s1k3: 'A pure note is a perfect wave: a sine.',
    s3k: 'A voice is also air going back and forth: a wave, far less perfect than a pure note.',
    s4k0: 'On a tied string only waves with a whole number of half waves fit: 1, 2, 3, 4…',
    s4k1: 'The string = the sum of the waves that fit.',
    s4k3: 'Timbre: which waves sound, and how strongly.',
    rest7: (k) => `n = 7…${k}: the rest of a guitar`, nofit: 'does not fit',
    sumof: 'the string = sum of the waves that fit:',
    pluck: '▶ pluck', six: 'tick all 6', onlyfund: 'fundamental only', sum: 'sum',
    s5h: 'Timbre',
    s5p1: 'Which frequencies vibrate, and how strongly, is what the brain hears as a guitar, or as one person’s voice.',
    s5p2: 'Drag the bars: the note stays the same, the sound does not.',
    s5k: 'Every sound is a sum of pure frequencies.',
    pure: 'pure note', likestring: 'like the string', amplitude: 'amplitude', frequency: 'frequency',
    s6h: 'How your voice message travels',
    s6p1: 'A phone finds the frequencies and amplitudes of a recording, sends those as compressed data, and the other phone plays them back.',
    s6k: 'The strongest frequencies alone are enough.',
    keep: 'frequencies kept', playorig: '▶ original', playrecon: '▶ rebuilt',
    srcvoice: 'Recording: your voice (stage 3).', srcsample: 'Recording: a synthetic example signal. Record your voice in stage 3 to use it here.',
    numbers: (k, m) => `${k} frequencies · ${3 * k} numbers (frequency, amplitude, phase) instead of ${m} samples`,
    spectrum: 'frequencies in the recording', original: 'original', recon: 'rebuilt',
    s7h: 'Tides',
    s7p1: 'The tide goes up and down; over a day it draws a wave. It is driven by periodic forces: the Moon’s gravity, the Sun’s, and more. Each one is a pure sine.',
    s7k: 'Adding a few pure waves predicts the tide.',
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
const ease = (u) => { u = clamp(u, 0, 1); return u * u * (3 - 2 * u); };
const show = (el, on) => { el.style.display = on ? '' : 'none'; };
const hint = (el, on) => el.classList.toggle('hint', !!on);   // the control the story points at pulses
/* the key idea of a moment, big in the text column: text key k fades in; '' hides it */
function keyMsg(el, k) {
  if (el.dataset.k === (k || '')) return;
  el.dataset.k = k || ''; el.classList.remove('on'); el.textContent = k ? t(k) : '';
  if (k) requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('on')));
}
/* a stage told step by step: its caption (id + 'cap') and its ← back / next → buttons (id + 'prev', id + 'next').
   onStep(step) runs on every change of step; o.st counts the seconds since the step began. */
function stepper(id, last, onStep) {
  const o = { step: 0, st: 0, cap: $(id + 'cap'), pv: $(id + 'prev'), nx: $(id + 'next') };
  o.go = (s) => {
    o.step = clamp(s, 0, last); o.st = 0;
    show(o.pv, o.step > 0); show(o.nx, o.step < last); o.nx.disabled = false;
    onStep(o.step);
  };
  o.say = (s) => { if (o.cap.textContent !== s) o.cap.textContent = s; };
  o.pv.addEventListener('click', () => o.go(o.step - 1));
  o.nx.addEventListener('click', () => o.go(o.step + 1));
  return o;
}

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
const S = {};               // stage objects by section id (s0, s1, s2, …)
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
  const a = S[sections[active].id]; if (a && a.leave) a.leave();
  active = i;
  const b = S[sections[active].id]; if (b && b.enter) b.enter();
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
  document.querySelectorAll('.key').forEach((el) => { if (el.dataset.k) el.textContent = t(el.dataset.k); });
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
  S.s0 = {
    ctx,
    draw(dt) {
      const { W, H } = ctx.cv; clear(ctx); ph += dt * 1.2;
      pencil(ctx, 0, H / 2, W, H / 2, C.ink, 0.35);
      nibFn(ctx, 4, W - 4, (x) => H / 2 - H * 0.32 * Math.sin(TAU * x / (W / 3) - ph) * Math.sin(Math.PI * x / W), C.curve, 3.6);
    },
  };
}

/* ======================================================================
   Stage 1 · vibrating air, and what the displacement graph means, told step by step.
   Steps: 0 the air vibrates · 1 a few particles, at rest · 2 the graph, all at 0 ·
   3 one particle moves right · 4 the reader drags it both ways ·
   5 the reader places every particle so that its point lands in a circle ·
   6 that was one instant of a note: the curve · 7 the air vibrates again, with its graph
   ====================================================================== */
{
  const ctx = canvas('c1'), cv = ctx.cv;
  const air = makeAir(46, 7, 7);
  const P = 2, LAST = 7;                        // the particle moved first; the last step
  const AMP = 0.42, DMAX = 0.45, TOL = 0.1;     // wave amplitude, largest drag, circle tolerance, in spacings between big particles
  const W0 = TAU * 0.55;                        // angular frequency of the wave (rad/s)
  const key1 = $('s1key'), cap = $('s1cap'), pv = $('s1prev'), nx = $('s1next'), btn = $('s1play'), slow = $('s1slow'), sp = $('s1speed'), again = $('s1again');
  const ease = (u) => { u = clamp(u, 0, 1); return u * u * (3 - 2 * u); };
  const show = (el, on) => { el.style.display = on ? '' : 'none'; };
  const dv = new Array(7).fill(0);              // displacement of each big particle, in spacings
  let from = dv.slice();                        // dv when the step started
  let step = 0, st = 0, tm = 0, playing = true;
  let touched = false, seenR = false, seenL = false, solved = -1;
  let G = null, grab = -1, grabX = 0;           // G: layout of the last frame, for the pointer
  // displacement of big particle j (of n) in the wave at time tm, in spacings
  const wave = (j, n) => AMP * Math.sin(TAU * (j + 0.5) / (n * 0.7) - W0 * tm);
  const nBig = () => (G ? G.N : 7);
  const done = (j) => Math.abs(dv[j] - wave(j, nBig())) < TOL;
  const left = () => { let c = 0; for (let j = 0; j < nBig(); j++) if (!done(j)) c++; return c; };
  function caption() {
    keyMsg(key1, (step === 4 && seenR && seenL) || step === 5 ? 's1k1' : step === 6 ? 's1k2' : step === LAST ? 's1k3' : '');
    let s = t('s1c' + step);
    if (step === 4) s = t(seenR && seenL ? 's1c4ok' : seenR ? 's1c4r' : seenL ? 's1c4l' : 's1c4');
    if (step === 5) {
      const tg = grab >= 0 ? wave(grab, nBig()) : 0;
      s = solved >= 0 ? t('s1c5ok')
        : tg > 0.12 && dv[grab] < -0.08 ? t('s1c5up')
        : tg < -0.12 && dv[grab] > 0.08 ? t('s1c5down')
        : t('s1c5')(left());
    }
    if (cap.textContent !== s) cap.textContent = s;
  }
  function setStep(s) {
    const back = s < step;
    step = s; st = 0; touched = false; seenR = false; seenL = false; solved = -1;
    if (s === 0 || s === 2 || s === 3) dv.fill(0);
    if (s === 4) { dv.fill(0); dv[P] = 0.7 * DMAX; }
    if (s === 5) { tm = 0; if (back) dv.fill(0); }   // the circles: the wave at time 0
    from = dv.slice();
    show(pv, s > 0); show(nx, s < LAST); show(btn, s === LAST); show(slow, s === LAST); show(again, s === LAST);
    nx.disabled = s === 4 || s === 5;             // step 4 goes on after both directions; step 5 when every point is in its circle
    if (s === LAST) { playing = true; setBtn(btn, 'pause'); }
    caption();
  }
  pv.addEventListener('click', () => setStep(step - 1));
  nx.addEventListener('click', () => setStep(step + 1));
  again.addEventListener('click', () => setStep(0));
  btn.addEventListener('click', () => { playing = !playing; setBtn(btn, playing ? 'pause' : 'play'); });
  // dragging: a press anywhere in the air band grabs the particle (step 4) or the nearest one (step 5)
  const at = (e) => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  function pick(x, y) {
    if (!G || (step !== 4 && step !== 5) || solved >= 0 || y < G.top || y > G.top + G.airH) return -1;
    if (step === 4) return P;
    let best = 0, bd = Infinity;
    for (let j = 0; j < G.N; j++) { const dd = Math.abs(x - G.xs[j] - dv[j] * G.spc); if (dd < bd) { bd = dd; best = j; } }
    return best;
  }
  cv.addEventListener('pointerdown', (e) => {
    const [x, y] = at(e), j = pick(x, y); if (j < 0) return;
    grab = j; grabX = x - dv[j] * G.spc; touched = true;
    cv.setPointerCapture(e.pointerId); cv.style.cursor = 'grabbing'; e.preventDefault();
  });
  cv.addEventListener('pointermove', (e) => {
    const [x, y] = at(e);
    if (grab < 0) { cv.style.cursor = pick(x, y) >= 0 ? 'grab' : ''; return; }
    const v = clamp((x - grabX) / G.spc, -DMAX, DMAX); dv[grab] = v;
    if (step === 4) { if (v > 0.15) seenR = true; if (v < -0.15) seenL = true; if (seenR && seenL) nx.disabled = false; }
    caption();
  });
  const release = () => {
    if (grab < 0) return;
    if (step === 5) {
      const tg = wave(grab, nBig()); if (Math.abs(dv[grab] - tg) < TOL) dv[grab] = tg;   // snap into the circle
      if (left() === 0) solved = st;
    }
    grab = -1; cv.style.cursor = ''; caption();
  };
  cv.addEventListener('pointerup', release); cv.addEventListener('pointercancel', release);
  S.s1 = {
    ctx,
    draw(dt) {
      const { W, H } = cv; clear(ctx);
      st += dt;
      if (step === 0) tm += dt;
      if (step === LAST && playing) tm += dt * (1 - parseFloat(sp.value));
      if (step === 5 && solved >= 0 && st - solved > 0.9) setStep(6);
      const L = 70, R = W - 34;                    // air spans [L, R]
      const N = W < 600 ? 5 : 7, spc = (R - L) / N, xs = [];
      for (let j = 0; j < N; j++) xs.push(L + (j + 0.5) * spc);
      const top = 34, airH = H * 0.4;
      const M = 7, rowY = (r) => top + airH * (0.1 + 0.8 * r / (M - 1));   // the particles of a column
      const py = top + airH + 34 + (H - top - airH - 34) / 2, ph = (H - top - airH - 34) * 0.38;
      const A = AMP * spc, k = TAU / ((R - L) * 0.7);
      const gy = 0.9 * ph / A;                     // graph scale: the wave fills the graph
      const xi = (x) => A * Math.sin(k * (x - L) - W0 * tm);
      G = { N, xs, spc, top, airH };
      // the many small particles: how much they move (amp) and how visible they are (cloud)
      const calm = step === 1 ? 1 - ease(st / 0.9) : 0, back = step === 6 ? ease((st - 0.6) / 1) : 0;
      const amp = step === 0 || step === LAST ? 1 : step === 1 ? calm : back;
      const cloud = step === 0 ? 0.78 : step === 1 ? 0.3 + 0.48 * calm : step <= 5 ? 0.3 : step === 6 ? 0.3 + 0.15 * back : 0.45;   // dimmer behind the columns
      if (step === 1) for (let j = 0; j < N; j++) dv[j] = calm * xi(xs[j]) / spc;
      if (step === 3) dv[P] = ease(st / 1.2) * 0.7 * DMAX;
      if (step === 6) for (let j = 0; j < N; j++) dv[j] = from[j] + (xi(xs[j]) / spc - from[j]) * ease(st / 1.2);
      if (step === LAST) for (let j = 0; j < N; j++) dv[j] = xi(xs[j]) / spc;
      // vocal cords: a plate at x = L that moves with the air next to it
      if (amp > 0.01) {
        const px = L - 16 + amp * xi(L);
        ctx.save(); ctx.globalAlpha = amp; ctx.strokeStyle = C.a1; ctx.lineWidth = 3; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(px, top + 6); ctx.lineTo(px, top + airH - 6); ctx.stroke(); ctx.restore();
        label(ctx, t('vocal'), L - 20, top + airH + 16, { size: 12, color: C.a1, align: 'center', alpha: 0.85 * amp });
        label(ctx, t('ear') + ' →', R, top + airH + 16, { size: 12, align: 'right', alpha: 0.7 * amp });
      }
      if (cloud > 0.01) {
        ctx.save(); ctx.fillStyle = C.ink; ctx.globalAlpha = cloud;
        for (const p of air) {
          if (W < 600 && !p.few) continue;
          const x0 = L + p.u * (R - L), y = top + p.v * airH;
          ctx.beginPath(); ctx.arc(x0 + amp * xi(x0), y, p.s, 0, TAU); ctx.fill();
        }
        ctx.restore();
      }
      if (step === 0) return;
      // columns of particles: rest position (pencil), displacement (arrow, above), the particles
      const big = step === 1 ? ease((st - 0.3) / 0.8) : 1;
      const col = (j) => (step === 5 && done(j) ? C.a2 : step >= 5 || (step >= 3 && j === P) ? C.a1 : C.ink);
      for (let j = 0; j < N; j++) {
        const x0 = xs[j], d = dv[j] * spc;
        pencil(ctx, x0, top - 2, x0, top + airH + 2, C.ink, 0.55 * big);
        if (step > 1 && Math.abs(d) > 3) arrow(ctx, x0, top - 8, x0 + d, top - 8, col(j), 1.4);
        for (let r = 0; r < M; r++) dot(ctx, x0 + d, rowY(r), j === grab ? 5.5 : 4.5, col(j), big);
      }
      // what can be dragged: a pulsing ring and "drag me".
      // Step 4: on the particle, until the reader first grabs it.
      // Step 5: "drag me" on the first particle whose point is not in its circle; rings on all of those
      // until the reader first grabs one, then only on that first one.
      if ((step === 4 || step === 5) && grab < 0 && solved < 0) {
        let lab = -1;
        if (step === 4 && !touched) lab = P;
        if (step === 5) for (let j = 0; j < N; j++) if (!done(j)) { lab = j; break; }
        const pulse = 0.5 + 0.5 * Math.sin(st * 4);
        for (let j = 0; j < N; j++) {
          if (!(j === lab || (step === 5 && !touched && !done(j)))) continue;
          ctx.save(); ctx.strokeStyle = C.a1; ctx.globalAlpha = 0.35 + 0.5 * pulse; ctx.lineWidth = 1.6;
          const x = xs[j] + dv[j] * spc, e = 9 + 3 * pulse;
          ctx.strokeRect(x - e, top + airH * 0.04 - e + 9, 2 * e, airH * 0.92 + 2 * e - 18); ctx.restore();
        }
        if (lab >= 0) label(ctx, '◀ ' + t('dragme') + ' ▶', clamp(xs[lab] + dv[lab] * spc, L + 40, R - 40), top - 16, { size: 14, color: C.a1, align: 'center', alpha: 0.95 });
      }
      if (step < 2) return;
      // displacement against position
      axes(ctx, L, py, R + 8, ph * 1.25, ph * 1.15, t('position'), null);
      dirLabels(ctx, L, py, ph * 1.25, ph * 1.15);
      label(ctx, '0', L - 8, py, { size: 13, align: 'right', base: 'middle', alpha: 0.75 });
      if (step === 5) {                            // the circles to land the points in
        for (let j = 0; j < N; j++) {
          const ok = done(j);
          ctx.save(); ctx.strokeStyle = ok ? C.a2 : C.curve; ctx.lineWidth = 1.6; if (!ok) ctx.setLineDash([3, 3]);
          ctx.beginPath(); ctx.arc(xs[j], py - wave(j, N) * spc * gy, 10, 0, TAU); ctx.stroke(); ctx.restore();
        }
      }
      if (step >= 6) {
        const xe = step === 6 ? L + (R - L) * ease((st - 1.2) / 1.3) : R;
        if (xe > L + 2) nibFn(ctx, L, xe, (x) => py - xi(x) * gy, C.curve, 3.6);
      }
      for (let j = 0; j < N; j++) {
        const x0 = xs[j], d = dv[j] * spc;
        pencil(ctx, x0, top + airH + 4, x0, py + ph * 1.1, C.ink, 0.18);
        if (step === 2) {                          // each point drops from its column onto the line
          const e = ease((st - 0.15 * j) / 0.5), y0 = top + airH;
          if (e > 0) dot(ctx, x0, y0 + (py - y0) * e, 5, col(j));
          continue;
        }
        // the same displacement as the arrow in the air, turned upright: right = up, left = down
        if (Math.abs(d * gy) > 6) arrow(ctx, x0, py, x0, py - d * gy, col(j), 1.4);
        dot(ctx, x0, py - d * gy, 5, col(j));
      }
    },
    lang() { caption(); setBtn(btn, playing ? 'pause' : 'play'); },
  };
  setStep(0);
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
  hint(sl.closest('label'), true);
  sl.addEventListener('input', () => { hint(sl.closest('label'), false); f = fromSlider(); show(); if (snd) snd.setFreq(f); });
  bs.addEventListener('click', () => {
    if (snd) { snd.stop(); snd = null; } else snd = tone(f);
    bs.setAttribute('aria-pressed', snd ? 'true' : 'false'); setBtn(bs, snd ? 'stop' : 'listen');
  });
  br.addEventListener('click', () => {
    real = !real; br.setAttribute('aria-pressed', real ? 'true' : 'false'); setBtn(br, real ? 'slowmo' : 'realspeed');
  });
  S.s2 = {
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
        // too fast for the eye: each point of the curve sweeps the band between its two extremes,
        // and spends most time near them, so the blur is brightest at the edges
        const gr = ctx.createLinearGradient(0, py - phh, 0, py + phh);
        [[0, 0.5], [0.12, 0.2], [0.5, 0.08], [0.88, 0.2], [1, 0.5]].forEach(([o, a]) => gr.addColorStop(o, `rgba(205, 200, 122, ${a})`));
        ctx.save(); ctx.fillStyle = gr; ctx.fillRect(L, py - phh, R - L, 2 * phh); ctx.restore();
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
  S.s2.init();
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
   Stage 3 · microphone at one point, told step by step.
   Steps: 0 a microphone, and the particle in front of it · 1 its displacement against time ·
   2 a real voice: record one, or use the example · 3 the whole recording, played ·
   4 a moment of it in slow motion, with the air it travels through.
   Example recording: the file voice.mp3 next to this page; while it does not exist, a synthetic signal.
   ====================================================================== */
{
  const ctx = canvas('c3'), cv = ctx.cv;
  const air = makeAir(46, 4, 33);
  const brc = $('s3rec'), bex = $('s3ex'), bpl = $('s3play'), stEl = $('s3st');
  const REC_S = 3;        // seconds recorded
  const SLOW = 150;       // slow motion: 1 s on screen is 1/150 s of sound
  const DAIR = 0.008;     // seconds of sound held by the row of air, from the vocal cords to the microphone
  const DCH = 0.025;      // seconds of sound in the slow-motion graph
  const LOOP = 0.06;      // seconds of sound the slow motion goes through, again and again
  const TW = 4;           // seconds of history in the pure-note graph
  let tm = 0, chartT0 = 0;
  let clip = null;        // { data, sr, peak, kind: 'voice' | 'example' | 'synthetic' }
  let ov = null;          // the whole clip, one column of the graph each: lowest and highest value
  let stream = null, an = null, buf = null, mr = null, recT0 = 0, livePk = 0.05, live = null;
  let playT0 = -1, center = 0, tau = 0, locPk = 1, touched = false, grabbing = false, G = null;
  const status = (k) => { stEl.dataset.k = k || ''; stEl.textContent = k ? t(k) : ''; };
  const dur = () => clip.data.length / clip.sr;
  const smp = (tt) => { const i = Math.round(tt * clip.sr); return i >= 0 && i < clip.data.length ? clip.data[i] : 0; };
  const playing = () => !!(clip && AC && playT0 >= 0 && voices.size > 0 && AC.currentTime - playT0 < dur());
  function setCenter(c) {            // the moment shown in slow motion, and the loudest value around it
    center = clamp(c, LOOP / 2, Math.max(LOOP / 2, dur() - LOOP / 2));
    tau = center - LOOP / 2 + DCH;
    const i0 = Math.max(0, Math.round((center - LOOP / 2) * clip.sr)), i1 = Math.min(clip.data.length, Math.round((center + LOOP / 2) * clip.sr));
    locPk = 1e-9; for (let i = i0; i < i1; i++) locPk = Math.max(locPk, Math.abs(clip.data[i]));
    locPk = Math.max(locPk, 0.2 * clip.peak);      // a quiet moment stays small instead of filling the graph
  }
  function loudest() {               // centre of the LOOP-long stretch with the most energy
    const d0 = clip.data, w = Math.max(1, Math.min(d0.length, Math.round(LOOP * clip.sr)));
    let e = 0, best = -1, bi = 0;
    for (let i = 0; i < d0.length; i++) {
      e += d0[i] * d0[i]; if (i >= w) e -= d0[i - w] * d0[i - w];
      if (i >= w - 1 && e > best) { best = e; bi = i - w + 1; }
    }
    return (bi + w / 2) / clip.sr;
  }
  function setClip(c) {
    let m = 1e-9; for (let i = 0; i < c.data.length; i++) m = Math.max(m, Math.abs(c.data[i]));
    clip = { data: c.data, sr: c.sr, kind: c.kind, peak: m }; ov = null; setCenter(loudest());
  }
  function play() { if (!clip || !audio()) return; stopSounds(); playBuffer(clip.data, clip.sr); playT0 = AC.currentTime; }
  function micOff() {
    if (mr && mr.state === 'recording') { try { mr.stop(); } catch (e) { /* already stopped */ } }
    if (stream) stream.getTracks().forEach((tr) => tr.stop());
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) { /* not supported */ }
    stream = null; an = null;
  }
  const P3 = stepper('s3', 4, (s) => {
    touched = false;
    if (s === 1) chartT0 = tm;
    show(brc, s >= 2); setBtn(brc, s === 2 ? 'recvoice' : 'recagain');
    show(bex, s === 2); show(bpl, s >= 3);
    if (s === 2) show(P3.nx, !!clip);
    hint(brc, s === 2 && !clip); hint(bex, false);
    if (s < 3) { stopSounds(); playT0 = -1; }
    if (s === 4) setCenter(center);
    keyMsg($('s3key'), s === 4 ? 's3k' : '');
  });
  async function record() {
    if (mr) return;
    hint(brc, false); hint(bex, false); stopSounds(); playT0 = -1;
    const ac = audio();
    if (!ac || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
      status(window.MediaRecorder ? 'micno' : 'recno'); hint(bex, true); return;
    }
    P3.go(2); status('micask');
    try { if (navigator.audioSession) navigator.audioSession.type = 'play-and-record'; } catch (e) { /* not supported */ }
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
    } catch (e) { stream = null; micOff(); status('micno'); hint(bex, true); return; }
    if (sections[active].id !== 's3' || P3.step !== 2) { micOff(); status(''); return; }
    status('');
    const src = ac.createMediaStreamSource(stream);
    an = ac.createAnalyser(); an.fftSize = 2048; buf = new Float32Array(an.fftSize);
    src.connect(an);                       // not connected to the speakers: no feedback
    const chunks = [];
    try { mr = new MediaRecorder(stream); } catch (e) { mr = null; micOff(); status('recno'); hint(bex, true); return; }
    mr.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
    mr.onstop = async () => {
      const type = mr.mimeType; mr = null; micOff();
      brc.disabled = false; bex.disabled = false; P3.pv.disabled = false;
      try {
        const b = await audio().decodeAudioData(await new Blob(chunks, { type }).arrayBuffer());
        const data = new Float32Array(b.getChannelData(0));
        shared.voice = { data, sr: b.sampleRate }; if (S.s6) S.s6.invalidate();
        setClip({ data, sr: b.sampleRate, kind: 'voice' }); status('recok');
        if (sections[active].id === 's3') { P3.go(3); play(); } else P3.go(2);
      } catch (e) { status('recno'); P3.go(2); }
    };
    live = null; livePk = 0.05;
    recT0 = ac.currentTime; mr.start();
    brc.disabled = true; bex.disabled = true; P3.pv.disabled = true;
    setTimeout(() => { if (mr && mr.state === 'recording') mr.stop(); }, REC_S * 1000);
  }
  async function example() {
    if (mr) return;
    hint(bex, false); micOff();
    const ac = audio(); if (!ac) return;
    let c = null;
    try {
      const r = await fetch('voice.mp3');
      if (r.ok) { const b = await ac.decodeAudioData(await r.arrayBuffer()); c = { data: new Float32Array(b.getChannelData(0)), sr: b.sampleRate, kind: 'example' }; }
    } catch (e) { c = null; }
    if (!c) { if (!shared.sample) shared.sample = makeSample(44100); c = { data: shared.sample.data, sr: shared.sample.sr, kind: 'synthetic' }; }
    setClip(c); status(c.kind === 'synthetic' ? 'exsynth' : '');
    if (sections[active].id === 's3') { P3.go(3); play(); }
  }
  brc.addEventListener('click', record);
  bex.addEventListener('click', example);
  bpl.addEventListener('click', play);
  // pointer: step 3, tap the graph to choose a moment; step 4, drag the box along the whole recording
  const at = (e) => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const timeAt = (x) => clamp((x - G.L) / (G.R - G.L), 0, 1) * dur();
  const over = (y) => (P3.step === 3 && y > G.cTop - 10) || (P3.step === 4 && y > G.oTop - 14 && y < G.oBot + 14);
  cv.addEventListener('pointerdown', (e) => {
    if (!G || !clip) return;
    const [x, y] = at(e); if (!over(y)) return;
    if (P3.step === 3) { setCenter(timeAt(x)); P3.go(4); return; }
    touched = true; grabbing = true; setCenter(timeAt(x));
    cv.setPointerCapture(e.pointerId); e.preventDefault();
  });
  cv.addEventListener('pointermove', (e) => {
    if (!G || !clip) return;
    const [x, y] = at(e);
    if (grabbing) { setCenter(timeAt(x)); return; }
    cv.style.cursor = over(y) ? 'pointer' : '';
  });
  const release = () => { grabbing = false; };
  cv.addEventListener('pointerup', release); cv.addEventListener('pointercancel', release);
  function caption() {
    P3.say(P3.step === 2 && mr ? t('s3crec')(Math.max(1, Math.ceil(REC_S - (AC.currentTime - recT0)))) : t('s3c' + P3.step));
  }
  S.s3 = {
    ctx,
    draw(dt) {
      const { W, H } = cv; clear(ctx); tm += dt; P3.st += dt;
      const s = P3.step;
      caption();
      const L = 24, R = W - 40, xm = R;                // the microphone at the right end of the air
      const top = 36, airH = Math.max(36, H * 0.24), yA = top + airH / 2;
      const cTop = top + airH + 30, cBot = H - 8;
      G = { L, R, cTop, oTop: 0, oBot: 0 };
      // displacement of the air at x (px), at this moment
      const lamP = (R - L) * 0.45, kP = TAU / lamP, A0 = 0.5 / kP, wP = TAU * 0.5;
      const note = (x, tt) => A0 * Math.sin(kP * (x - L) - wP * tt);   // a pure note
      const AV = Math.max(4, (R - L) * 0.025);          // largest displacement drawn for a voice
      const lag = (x) => (xm - x) / (xm - L) * DAIR;     // seconds the sound takes from x to the microphone
      let d;
      if (s <= 1 || (s === 2 && !an)) d = (x) => note(x, tm);
      else if (s === 2) {                                // recording: the live sound
        an.getFloatTimeDomainData(buf);
        let m = 0; for (let i = 0; i < buf.length; i++) m = Math.max(m, Math.abs(buf[i]));
        livePk = Math.max(0.02, livePk * 0.995, m);
        const sr = AC.sampleRate;
        d = (x) => AV * buf[buf.length - 1 - Math.round(lag(x) * sr)] / livePk;
      } else if (s === 3) {                              // the recording at its real speed, while it plays
        const pt = playing() ? AC.currentTime - playT0 : -1;
        d = pt < 0 ? () => 0 : (x) => AV * smp(pt - lag(x)) / clip.peak;
      } else {                                           // slow motion
        tau += dt / SLOW; if (tau > center + LOOP / 2) tau = center - LOOP / 2 + DCH;
        d = (x) => AV * smp(tau - lag(x)) / locPk;
      }
      // vocal cords at the left end, moving with the air next to them
      const px = L - 10 + d(L);
      ctx.save(); ctx.strokeStyle = C.a1; ctx.lineWidth = 3; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(px, top + 4); ctx.lineTo(px, top + airH - 4); ctx.stroke(); ctx.restore();
      label(ctx, t('vocal'), L - 14, top - 12, { size: 12, color: C.a1, alpha: 0.85 });
      ctx.save(); ctx.fillStyle = C.ink; ctx.globalAlpha = 0.78;
      for (const p of air) {
        if (W < 600 && !p.few) continue;
        const x0 = L + p.u * (R - L); ctx.beginPath(); ctx.arc(x0 + d(x0), top + p.v * airH, p.s, 0, TAU); ctx.fill();
      }
      ctx.restore();
      // the microphone, and the particle in front of it: rest position, displacement, particle
      const dm = d(xm);
      ctx.save(); ctx.strokeStyle = C.a1; ctx.fillStyle = C.a1; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.ellipse(xm, top - 16, 5, 7.5, 0, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(xm, top - 16, 9, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); ctx.restore();
      label(ctx, t('micro'), xm - 14, top - 12, { size: 12, align: 'right', color: C.a1, alpha: 0.85 });
      pencil(ctx, xm, top, xm, top + airH, C.ink, 0.5);
      if (Math.abs(dm) > 3) arrow(ctx, xm, yA - 12, xm + dm, yA - 12, C.a1, 1.3);
      dot(ctx, xm + dm, yA, 5.5, C.a1);
      if (s === 0) return;
      const py = (cTop + cBot) / 2, ph = (cBot - cTop) * 0.36;
      const C0 = Math.max(1, Math.round(R - L));
      // one vertical line per column, from the lowest to the highest value of the sound in it
      const bars = (lo, hi, n, pk, y0, h, alpha) => {
        ctx.save(); ctx.strokeStyle = C.curve; ctx.globalAlpha = alpha; ctx.lineWidth = 1; ctx.beginPath();
        for (let c = 0; c < n; c++) { const x = L + c + 0.5; ctx.moveTo(x, y0 - h * hi[c] / pk); ctx.lineTo(x, y0 - h * lo[c] / pk + 0.6); }
        ctx.stroke(); ctx.restore();
      };
      if (s === 1 || (s === 2 && !mr)) {
        // the pure note at the microphone against time; the newest point under the microphone
        axes(ctx, L, py, R + 8, ph * 1.25, ph * 1.15, t('time'), null);
        if (ph > 26) dirLabels(ctx, L, py, ph * 1.25, ph * 1.15);
        const x0 = Math.max(L, R - (R - L) * (tm - chartT0) / TW);
        if (R - x0 > 2) nibFn(ctx, x0, R, (x) => py - ph * note(xm, tm - TW * (R - x) / (R - L)) / A0, C.curve, 3.2);
        const yp = py - ph * dm / A0;
        pencil(ctx, xm, top + airH, xm, yp, C.a1, 0.6);
        if (Math.abs(yp - py) > 6) arrow(ctx, xm, py, xm, yp, C.a1, 1.4);
        dot(ctx, xm, yp, 5, C.a1);
        return;
      }
      if (s === 2) {
        // recording: the graph of the whole recording, drawn as it comes in
        if (!live || live.n !== C0) live = { n: C0, lo: new Float32Array(C0), hi: new Float32Array(C0), x: 0 };
        const xNow = Math.floor(clamp((AC.currentTime - recT0) / REC_S, 0, 1) * C0);
        const nNew = Math.min(buf.length, Math.max(1, Math.round(dt * AC.sampleRate))), span = Math.max(1, xNow - live.x);
        for (let c = live.x; c < xNow; c++) {   // the newest samples, spread over the new columns
          const a = buf.length - nNew + Math.floor((c - live.x) / span * nNew), b = Math.max(a + 1, buf.length - nNew + Math.floor((c + 1 - live.x) / span * nNew));
          let lo = 0, hi = 0; for (let i = a; i < b; i++) { lo = Math.min(lo, buf[i]); hi = Math.max(hi, buf[i]); }
          live.lo[c] = lo; live.hi[c] = hi;
        }
        live.x = Math.max(live.x, xNow);
        axes(ctx, L, py, R + 8, ph * 1.25, ph * 1.15, t('time'), null);
        if (ph > 26) dirLabels(ctx, L, py, ph * 1.25, ph * 1.15);
        bars(live.lo, live.hi, live.x, livePk, py, ph, 0.9);
        dot(ctx, L + live.x, py - ph * buf[buf.length - 1] / livePk, 5, C.a1);
        label(ctx, `${REC_S} s`, L + 8, py + 18, { size: 12, alpha: 0.6 });
        return;
      }
      if (!ov || ov.n !== C0) {
        ov = { n: C0, lo: new Float32Array(C0), hi: new Float32Array(C0) };
        const d0 = clip.data, per = d0.length / C0;
        for (let c = 0; c < C0; c++) {
          let lo = 0, hi = 0;
          for (let i = Math.floor(c * per); i < Math.floor((c + 1) * per); i++) { const v = d0[i]; if (v < lo) lo = v; if (v > hi) hi = v; }
          ov.lo[c] = lo; ov.hi[c] = hi;
        }
      }
      const pulse = 0.5 + 0.5 * Math.sin(P3.st * 4);
      if (s === 3) {
        // the whole recording; a line follows it while it plays
        axes(ctx, L, py, R + 8, ph * 1.25, ph * 1.15, t('time'), null);
        if (ph > 26) dirLabels(ctx, L, py, ph * 1.25, ph * 1.15);
        bars(ov.lo, ov.hi, C0, clip.peak, py, ph, 0.9);
        label(ctx, `${dur().toFixed(1)} s`, L + 8, py + 18, { size: 12, alpha: 0.6 });
        if (playing()) { const xp = L + (R - L) * (AC.currentTime - playT0) / dur(); pencil(ctx, xp, py - ph * 1.2, xp, py + ph * 1.1, C.a1, 0.9); }
        // where to tap: the loudest moment
        const xc = L + (R - L) * center / dur();
        ctx.save(); ctx.strokeStyle = C.a1; ctx.globalAlpha = 0.35 + 0.5 * pulse; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(xc, py, 14 + 5 * pulse, 0, TAU); ctx.stroke(); ctx.restore();
        label(ctx, t('tapme'), clamp(xc, L + 40, R - 40), py - ph * 1.05, { size: 14, color: C.a1, align: 'center', alpha: 0.95 });
        return;
      }
      // step 4. Above: the whole recording, small, with a box on the moment shown in slow motion
      const oTop = cTop, oh = Math.max(28, (cBot - cTop) * 0.2), oBot = oTop + oh, oy = (oTop + oBot) / 2;
      G.oTop = oTop; G.oBot = oBot;
      pencil(ctx, L, oy, R, oy, C.ink, 0.3);
      bars(ov.lo, ov.hi, C0, clip.peak, oy, oh * 0.45, 0.6);
      const xa = L + (R - L) * (center - LOOP / 2) / dur(), xb = L + (R - L) * (center + LOOP / 2) / dur();
      const bw = Math.max(16, xb - xa), bx = (xa + xb) / 2 - bw / 2;
      ctx.save(); ctx.strokeStyle = C.a1; ctx.lineWidth = 1.8; ctx.strokeRect(bx, oTop, bw, oh); ctx.restore();
      if (!touched) {
        ctx.save(); ctx.strokeStyle = C.a1; ctx.globalAlpha = 0.3 + 0.5 * pulse; ctx.lineWidth = 1.4;
        ctx.strokeRect(bx - 3 - 3 * pulse, oTop - 3 - 3 * pulse, bw + 6 + 6 * pulse, oh + 6 + 6 * pulse); ctx.restore();
        label(ctx, '◀ ' + t('dragme') + ' ▶', clamp(bx + bw / 2, L + 60, R - 60), oTop - 8, { size: 13, color: C.a1, align: 'center', alpha: 0.95 });
      }
      // below: that moment, 150 times slower; the newest point under the microphone
      const dTop = oBot + 26, py2 = (dTop + cBot) / 2, ph2 = (cBot - dTop) * 0.36;
      pencil(ctx, bx, oBot, L, dTop - 6, C.a1, 0.35); pencil(ctx, bx + bw, oBot, R, dTop - 6, C.a1, 0.35);
      axes(ctx, L, py2, R + 8, ph2 * 1.25, ph2 * 1.15, t('time'), null);
      if (ph2 > 26) dirLabels(ctx, L, py2, ph2 * 1.25, ph2 * 1.15);
      nibFn(ctx, L, R, (x) => py2 - ph2 * smp(tau - DCH * (R - x) / (R - L)) / locPk, C.curve, 2.8, 1, 1.5);
      const yp = py2 - ph2 * smp(tau) / locPk;
      pencil(ctx, xm, top + airH, xm, yp, C.a1, 0.6);
      dot(ctx, xm, yp, 5, C.a1);
      label(ctx, `${Math.round(DCH * 1000)} ms`, L + 8, py2 + 18, { size: 12, alpha: 0.6 });
    },
    leave() { micOff(); if (stEl.dataset.k === 'micask') status(''); },
    lang() { caption(); if (stEl.dataset.k) status(stEl.dataset.k); },
  };
  P3.go(0);
}

/* ======================================================================
   Stage 4 · guitar string, told step by step.
   Steps: 0 which waves fit on a string tied at both ends (the reader drags the wave) ·
   1 each wave that fits is a pure note: tap one to hear it, or pluck to hear them all at once ·
   2 which ones sound (checkboxes) · 3 how strongly each one sounds (sliders)
   ====================================================================== */
/* Guitar string: amplitudes of an ideal string plucked at a fraction P of its length,
   a_n ∝ sin(n π P) / n²  (Fletcher & Rossing, 1998, The Physics of Musical Instruments,
   2nd ed., Springer, ch. 2). P is chosen by ear. The first 6 are the ones drawn. */
const PLUCK_P = 0.18, KG = 100;
const GUITAR = []; for (let n = 1; n <= KG; n++) GUITAR.push(Math.sin(n * Math.PI * PLUCK_P) / (n * n));
const STRING_AMPS = (() => { const a = GUITAR.slice(0, 6).map(Math.abs), m = Math.max(...a); return a.map((v) => v / m); })();
const MODE_COL = [C.a1, C.a2, C.a3, C.a1, C.a2, C.a3];
const F1_STRING = 440 * Math.pow(2, -17 / 12);           // E, 164.81 Hz
{
  const ctx = canvas('c4'), cv = ctx.cv;
  const N = 6, on = Array(N).fill(true), amp = STRING_AMPS.slice();
  let rest = true;                                        // n = 7…KG sound too
  const box = $('s4modes'), eq = $('s4eq'), bpk = $('s4pluck'), bone = $('s4one'), bsix = $('s4six');
  const g1 = Math.abs(GUITAR[0]);
  const ampOf = (n) => (n <= N ? (on[n - 1] ? Math.sign(GUITAR[n - 1]) * amp[n - 1] * g1 : 0) : (rest ? GUITAR[n - 1] : 0));
  const gam = (n) => 0.7 + n * F1_STRING / 1800;         // how fast frequency n dies out (1/s): the higher, the faster (chosen by ear)
  const NU = 1;                                          // drawn vibration of n = 1 (Hz): slow motion
  // step 0: a knob on a rail sets q, the number of half waves on the string, from 0.5 (left) to 6.5 (right)
  let tm = 0, v = 1 / 6;                                 // position of the knob on the rail, 0 to 1
  const qOf = (u) => 0.5 + 6 * u, SNAP = 0.15;           // within SNAP of a whole number, the wave fits and the knob clicks there
  const found = new Set(), heard = new Set();
  let pluckedOnce = false, lastHeard = 0, pluckAt = -1, toneN = 0, toneAt = -1, lastCfg = '', touched = false, grab = false, gx0 = 0, gv0 = 0, G = null;
  const cfg = () => on.map((b) => (b ? 1 : 0)).join('') + (rest ? '+' : '');
  // controls: one row per frequency (checkbox, name, amplitude slider), and one checkbox for n = 7…KG
  const sliders = [], checks = [], names = [];
  const row = (cls) => { const l = document.createElement('label'); if (cls) l.className = cls; box.appendChild(l); return l; };
  for (let n = 1; n <= N; n++) {
    const lab = row(), cb = document.createElement('input'), nm = document.createElement('span'), r = document.createElement('input');
    cb.type = 'checkbox'; cb.setAttribute('aria-label', `n = ${n}`);
    nm.className = 'nm'; nm.style.color = MODE_COL[n - 1];
    r.type = 'range'; r.min = 0; r.max = 100; r.setAttribute('aria-label', `a${n}`);
    cb.addEventListener('change', () => { on[n - 1] = cb.checked; hint(box, false); });
    r.addEventListener('input', () => { amp[n - 1] = r.value / 100; hint(box, false); });
    lab.append(cb, nm, r); sliders.push(r); checks.push(cb); names.push(nm);
  }
  const restCb = document.createElement('input'), restNm = document.createElement('span');
  restCb.type = 'checkbox'; restCb.addEventListener('change', () => { rest = restCb.checked; hint(box, false); });
  row('rest').append(restCb, restNm);
  function sync() { for (let i = 0; i < N; i++) { checks[i].checked = on[i]; sliders[i].value = Math.round(amp[i] * 100); } restCb.checked = rest; }
  bone.addEventListener('click', () => { on.fill(false); on[0] = true; rest = false; sync(); hint(box, false); });
  bsix.addEventListener('click', () => { on.fill(true); rest = false; sync(); hint(box, false); });
  function sound(list) {               // list of [n, amplitude]: decaying sines, as in a plucked string
    const ac = audio(); if (!ac) return false;
    stopSounds();
    const sr = ac.sampleRate, len = Math.round(sr * 3), d = new Float32Array(len);
    for (const [n, a] of list) {
      const f = n * F1_STRING; if (!a || f > 0.45 * sr) continue;
      const w = TAU * f / sr, cw = Math.cos(w), sw = Math.sin(w), k = Math.exp(-gam(n) / sr);
      let x = 1, y = 0;                                   // rotating phasor: y = e^{-γt} sin(2π f t)
      for (let i = 0; i < len; i++) { d[i] += a * y; const nx = (x * cw - y * sw) * k; y = (x * sw + y * cw) * k; x = nx; }
    }
    for (let i = 0; i < Math.min(len, 200); i++) d[i] *= i / 200;
    playBuffer(d, sr, 0.9);
    return true;
  }
  const P4 = stepper('s4', 3, (s) => {
    touched = false; lastHeard = 0; stopSounds(); pluckAt = -1; toneAt = -1;
    show(bpk, s >= 1); show(bone, s >= 2); show(bsix, s >= 2); show(box, s >= 2);
    box.classList.toggle('noamp', s < 3);
    hint(bpk, false); hint(box, s >= 2);
    if (s === 0) P4.nx.disabled = found.size < 3;
    if (s === 1) P4.nx.disabled = heard.size < 3 && !pluckedOnce;
    keyMsg($('s4key'), s === 0 ? (found.size >= 3 ? 's4k0' : '') : s <= 2 ? 's4k1' : 's4k3');
  });
  bpk.addEventListener('click', () => {
    const list = []; for (let n = 1; n <= (rest ? KG : N); n++) list.push([n, ampOf(n)]);
    if (!sound(list)) return;
    pluckAt = tm; toneAt = -1; hint(bpk, false);
    lastCfg = cfg();
    pluckedOnce = true; if (P4.step === 1) P4.nx.disabled = false;
  });
  function tapMode(n) {
    if (!sound([[n, 1]])) return;
    toneN = n; toneAt = tm; pluckAt = -1; heard.add(n); lastHeard = n;
    if (P4.step === 1 && heard.size >= 3) P4.nx.disabled = false;
  }
  // how strongly frequency n vibrates now: it dies out after a pluck or a tap, as in the sound
  const envP = (n) => (pluckAt >= 0 ? Math.exp(-gam(n) * (tm - pluckAt)) : 0);              // after a pluck
  const envT = (n) => (toneAt >= 0 && n === toneN ? Math.exp(-gam(n) * (tm - toneAt)) : 0); // after a tap on its panel
  const env = (n) => Math.max(envP(n), envT(n));
  const fitN = () => { const q = qOf(v), n0 = Math.round(q); return n0 >= 1 && Math.abs(q - n0) < SNAP ? n0 : 0; };
  function caption() {
    const s = P4.step, e = noteName(F1_STRING); let c = t('s4c' + s);
    if (s === 0) {
      const n0 = fitN(), q = qOf(v), near = Math.abs(q - Math.round(q)) < 0.4;
      c = n0 ? t('s4cfit')(n0) + (found.size < 3 ? ' ' + t('s4cmore') : '')
        : found.size >= 3 ? t('s4cok')
        : !touched ? t('s4c0')
        : near ? t('s4cnear')(q < Math.round(q))
        : t('s4cno');
    }
    if (s === 1 && pluckAt >= 0) c = t('s4c2ok')(e);
    else if (s === 1 && lastHeard) c = t('s4hear')(lastHeard, noteName(lastHeard * F1_STRING), e);
    if (s === 2 && pluckAt >= 0 && cfg() === lastCfg) c = lastCfg === '100000' ? t('s4only') : lastCfg === '111111+' ? t('s4all')(e) : lastCfg === '111111' ? t('s4six6') : t('s4mix');
    P4.say(c);
  }
  // pointer: step 0, drag anywhere to move the knob (a press on the rail puts it there); later, tap a panel to hear its note
  const at = (e) => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const panelAt = (x, y) => (G ? G.panels.find((p) => x >= p.x && x <= p.x + p.w && y >= p.y && y <= p.y + p.h) : null);
  cv.addEventListener('pointerdown', (e) => {
    if (!G) return;
    const [x, y] = at(e);
    if (P4.step === 0) {
      grab = true; touched = true;
      if (Math.abs(y - G.ry) < 32) v = clamp((x - G.rx0) / (G.rx1 - G.rx0), 0, 1);
      gx0 = x; gv0 = v; cv.setPointerCapture(e.pointerId); e.preventDefault(); return;
    }
    const p = panelAt(x, y); if (p) { touched = true; tapMode(p.n); }
  });
  cv.addEventListener('pointermove', (e) => {
    if (!G) return;
    const [x, y] = at(e);
    if (grab) { v = clamp(gv0 + (x - gx0) / (G.rx1 - G.rx0), 0, 1); return; }
    cv.style.cursor = P4.step === 0 ? 'grab' : panelAt(x, y) ? 'pointer' : '';
  });
  const release = () => { if (grab && fitN()) v = (fitN() - 0.5) / 6; grab = false; };
  cv.addEventListener('pointerup', release); cv.addEventListener('pointercancel', release);
  const names6 = () => {
    for (let n = 1; n <= N; n++) names[n - 1].textContent = `n=${n} · ${noteName(n * F1_STRING)}`;
    restNm.textContent = t('rest7')(KG);
    tex(eq, `\\begin{gathered} f_n = n\\,f_1,\\quad n = 1, 2, 3, \\dots \\\\ f_1 = ${F1_STRING.toFixed(1)}\\ \\mathrm{Hz}\\ (\\text{${noteName(F1_STRING)}}) \\end{gathered}`);
  };
  S.s4 = {
    ctx,
    draw(dt) {
      const { W, H } = cv; clear(ctx); tm += dt; P4.st += dt;
      const s = P4.step, pulse = 0.5 + 0.5 * Math.sin(P4.st * 4);
      const L = 34, R = W - 34;
      G = { L, R, rx0: L, rx1: R, ry: 0, panels: [] };
      if (s === 0) {
        // a wave of q half waves, starting at the left peg; it fits when q is a whole number
        const sy = H * 0.4, Aw = Math.min(H * 0.2, (R - L) * 0.18), ry = Math.min(H - 42, sy + Aw + 58);
        G.ry = ry;
        const n0 = fitN(); if (n0) { found.add(n0); if (found.size >= 3) { P4.nx.disabled = false; keyMsg($('s4key'), 's4k0'); } }
        const vd = n0 ? (n0 - 0.5) / 6 : clamp(v + (touched ? 0 : 0.025 * Math.sin(tm * 2.2)), 0, 1);   // untouched, the knob wiggles
        const qq = n0 || qOf(vd), col = n0 ? MODE_COL[(n0 - 1) % 6] : C.ink, osc = n0 ? Math.cos(TAU * 0.8 * tm) : 1;
        const peg = (x, c) => { ctx.save(); ctx.fillStyle = c; ctx.fillRect(x - 3, sy - 18, 6, 36); ctx.restore(); };
        pencil(ctx, L, sy, R, sy, C.ink, 0.35);
        if (n0) {
          ctx.save(); ctx.strokeStyle = col; ctx.globalAlpha = 0.45; ctx.lineWidth = 1; ctx.setLineDash([5, 4]);
          for (const sg of [1, -1]) { ctx.beginPath(); for (let x = L; x <= R + 0.5; x += 2) { const yy = sy - sg * Aw * Math.sin(qq * Math.PI * (x - L) / (R - L)); x === L ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke(); }
          ctx.restore();
        }
        nibFn(ctx, L, R, (x) => sy - Aw * Math.sin(qq * Math.PI * (x - L) / (R - L)) * osc, col, 3.4, n0 ? 1 : 0.85);
        peg(L, n0 ? C.a2 : C.ink); peg(R, n0 ? C.a2 : C.a1);
        if (n0) for (let j = 1; j < n0; j++) dot(ctx, L + (R - L) * j / n0, sy, 3, C.ink, 0.85);
        else {     // where the wave ends, away from the right peg; and the target, on the peg
          const yE = sy - Aw * Math.sin(qq * Math.PI);
          ctx.save(); ctx.strokeStyle = C.a2; ctx.globalAlpha = 0.35 + 0.5 * pulse; ctx.lineWidth = 1.8;
          ctx.beginPath(); ctx.arc(R, sy, 14 + 4 * pulse, 0, TAU); ctx.stroke(); ctx.restore();
          ctx.save(); ctx.strokeStyle = C.a1; ctx.lineWidth = 1.8; ctx.setLineDash([4, 3]);
          ctx.beginPath(); ctx.moveTo(R, yE); ctx.lineTo(R, sy); ctx.stroke(); ctx.setLineDash([]);
          ctx.beginPath(); ctx.moveTo(R - 6, yE - 6); ctx.lineTo(R + 6, yE + 6); ctx.moveTo(R - 6, yE + 6); ctx.lineTo(R + 6, yE - 6); ctx.stroke(); ctx.restore();
          if (Math.abs(yE - sy) > 22) label(ctx, t('nofit'), R - 12, yE + (yE < sy ? -10 : 20), { size: 13, align: 'right', color: C.a1 });
        }
        // the rail: long waves at the left end, short ones at the right; a mark where each wave found fits
        const kx = (u) => L + (R - L) * u;
        ctx.save(); ctx.strokeStyle = C.ink; ctx.globalAlpha = 0.6; ctx.lineWidth = 2; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(L, ry); ctx.lineTo(R, ry); ctx.stroke(); ctx.restore();
        nibFn(ctx, L, L + 30, (x) => ry + 22 - 6 * Math.sin(TAU * (x - L) / 30), C.ink, 1.6, 0.75, 1);
        nibFn(ctx, R - 30, R, (x) => ry + 22 - 6 * Math.sin(TAU * 4 * (x - R + 30) / 30), C.ink, 1.6, 0.75, 1);
        for (const n of found) {
          const x = kx((n - 0.5) / 6), cn = MODE_COL[(n - 1) % 6];
          ctx.save(); ctx.strokeStyle = cn; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, ry - 7); ctx.lineTo(x, ry + 7); ctx.stroke(); ctx.restore();
          label(ctx, `n=${n}`, x, ry - 13, { size: 12, color: cn, align: 'center' });
        }
        // the knob
        const xk = kx(vd);
        if (!touched) {
          ctx.save(); ctx.strokeStyle = C.a1; ctx.globalAlpha = 0.35 + 0.5 * pulse; ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.arc(xk, ry, 16 + 5 * pulse, 0, TAU); ctx.stroke(); ctx.restore();
          label(ctx, '◀ ' + t('dragme') + ' ▶', clamp(xk, L + 60, R - 60), ry - 28, { size: 14, color: C.a1, align: 'center', alpha: 0.95 });
        }
        dot(ctx, xk, ry, 11, n0 ? col : C.curve);
        ctx.save(); ctx.strokeStyle = C.bg; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(xk - 3, ry - 5); ctx.lineTo(xk - 3, ry + 5); ctx.moveTo(xk + 3, ry - 5); ctx.lineTo(xk + 3, ry + 5); ctx.stroke(); ctx.restore();
        caption();
        return;
      }
      // the string, at the top: the sum of every frequency that sounds
      const K = rest ? KG : N, sy = Math.max(30, H * 0.14), sh = Math.min(40, H * 0.1);
      let amax = 0; for (let i = 0; i < N; i++) amax += STRING_AMPS[i];
      const as = []; for (let n = 1; n <= K; n++) { const v = ampOf(n) / g1 * envP(n) + Math.sign(GUITAR[n - 1]) * envT(n); as.push(Math.abs(v) > 0.002 ? v : 0); }
      const ph = TAU * NU * tm;
      pencil(ctx, L, sy, R, sy, C.ink, 0.45);
      nibFn(ctx, L, R, (x) => {
        let v = 0; const u = (x - L) / (R - L);
        for (let n = 1; n <= K; n++) if (as[n - 1]) v += as[n - 1] * Math.sin(n * Math.PI * u) * Math.cos(n * ph);
        return sy - sh * v / amax * 1.25;
      }, C.curve, 3.8);
      for (const x of [L, R]) dot(ctx, x, sy, 5, C.ink);
      label(ctx, t('sum'), L - 4, Math.max(12, sy - sh - 6), { size: 13, alpha: 0.7, italic: true });
      // each wave that fits (the first 6): small panels, added together they make the string above
      const gTop = sy + sh * 1.35 + 34;
      label(ctx, t('sumof'), L - 4, gTop - 12, { size: 15, alpha: 0.95, color: C.curve });
      // as many columns as bring the panels closest to 2.2 times wider than tall, for any screen
      const gap = 26;
      let lay = null;
      for (const c of [2, 3, 6]) {
        const r = Math.ceil(N / c), w = (R - L + 8 - gap * (c - 1)) / c, h = (H - gTop - 8 - gap * 0.6 * (r - 1)) / r;
        if (!lay || Math.min(w / 2.2, h) > lay.score) lay = { cols: c, pw: w, phh: h, score: Math.min(w / 2.2, h) };
      }
      const { cols, pw, phh } = lay, small = phh < 60, ty = small ? 15 : 19;
      let next = 0; for (let n = 1; n <= N; n++) if (!heard.has(n)) { next = n; break; }
      for (let n = 1; n <= N; n++) {
        const ci = (n - 1) % cols, ri = Math.floor((n - 1) / cols);
        const x0 = L - 4 + ci * (pw + gap), y0 = gTop + ri * (phh + gap * 0.6);
        G.panels.push({ n, x: x0, y: y0, w: pw, h: phh });
        const isOn = on[n - 1], a = isOn ? amp[n - 1] : 0, col = MODE_COL[n - 1], e = env(n);
        // panel frame: lit while it sounds; pulsing on the next one to tap in step 1
        ctx.save(); ctx.strokeStyle = e > 0.05 ? col : C.ink; ctx.globalAlpha = e > 0.05 ? 0.5 + 0.5 * e : isOn ? 0.35 : 0.15; ctx.lineWidth = e > 0.05 ? 2 : 1;
        ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x0, y0, pw, phh, 8) : ctx.rect(x0, y0, pw, phh); ctx.stroke(); ctx.restore();
        if (s === 1 && n === next && (toneAt < 0 || tm - toneAt > 1.2)) {
          ctx.save(); ctx.strokeStyle = C.a1; ctx.globalAlpha = 0.3 + 0.5 * pulse; ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x0 - 3 - 2 * pulse, y0 - 3 - 2 * pulse, pw + 6 + 4 * pulse, phh + 6 + 4 * pulse, 10) : ctx.rect(x0 - 3, y0 - 3, pw + 6, phh + 6); ctx.stroke(); ctx.restore();
          label(ctx, t('tapme'), x0 + pw / 2, y0 + phh - 8, { size: 13, color: C.a1, align: 'center', alpha: 0.95 });
        }
        if (n > 1) {
          const px = ci === 0 ? x0 - 15 : x0 - gap / 2;
          label(ctx, '+', px, y0 + phh / 2 + 7, { size: 20, align: 'center', alpha: 0.7 });
        }
        // title: n, note, frequency
        mlabel(ctx, [['n', 'i'], [` = ${n}`, 'r']], x0 + 8, y0 + ty, { size: small ? 12 : 14, alpha: isOn ? 0.95 : 0.35 });
        label(ctx, noteName(n * F1_STRING), x0 + (small ? 46 : 58), y0 + ty, { size: small ? 12 : 13, color: col, alpha: isOn ? 0.95 : 0.35 });
        if (pw > 110) mlabel(ctx, n === 1 ? [['f', 'i'], ['1', 's']] : [[`${n}`, 'r'], ['f', 'i'], ['1', 's']], x0 + pw - 10, y0 + ty, { size: small ? 12 : 14, align: 'right', alpha: isOn ? 0.8 : 0.3 });
        if (s === 3 && isOn && phh >= 70) mlabel(ctx, [['a', 'i'], [`${n}`, 's'], [` = ${a.toFixed(2)}`, 'r']], x0 + pw - 10, y0 + phh - 8, { size: 13, align: 'right', alpha: 0.75 });
        // a short string between two pegs: the shape of the wave (dashed), its nodes, and the wave while it sounds
        const xl = x0 + 14, xr = x0 + pw - 14, cy = y0 + ty + 4 + (phh - ty - 4) / 2, hmax = Math.max(3, (phh - ty - 12) * 0.42);
        const u = (x) => (x - xl) / (xr - xl);
        pencil(ctx, xl, cy, xr, cy, C.ink, 0.3);
        if (isOn || s < 2) {
          ctx.save(); ctx.strokeStyle = col; ctx.globalAlpha = 0.45; ctx.lineWidth = 1; ctx.setLineDash([5, 4]);
          for (const sg2 of [1, -1]) {
            ctx.beginPath();
            for (let x = xl; x <= xr + 0.5; x += 2) { const yy = cy - sg2 * hmax * Math.sin(n * Math.PI * u(x)); x === xl ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); }
            ctx.stroke();
          }
          ctx.restore();
          const sg = Math.sign(GUITAR[n - 1]), aa = a * envP(n) + envT(n);
          if (aa > 0.003) nibFn(ctx, xl, xr, (x) => cy - hmax * sg * Math.min(1, aa * 1.6) * Math.sin(n * Math.PI * u(x)) * Math.cos(n * ph), col, 2.6);
        }
        for (let j = 0; j <= n; j++) dot(ctx, xl + (xr - xl) * j / n, cy, j === 0 || j === n ? 3.2 : 2.4, C.ink, isOn ? 0.85 : 0.3);
      }
      caption();
    },
    lang() { names6(); caption(); },
  };
  sync(); names6(); P4.go(0);
}

/* ======================================================================
   Stage 5 · timbre: drag the amplitude of each frequency
   ====================================================================== */
{
  const ctx = canvas('c5');
  const N = 8, F1 = 220, amp = [1, 0, 0, 0, 0, 0, 0, 0];
  const bs = $('s5snd'), eq = $('s5eq');
  let snd = null, drag = false, sel = 0, geo = null, touched = false;
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
  cv.addEventListener('pointerdown', (e) => { drag = true; touched = true; cv.setPointerCapture(e.pointerId); hit(e); });
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
  S.s5 = {
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
        if (!touched && i === 1) {             // until the first drag: what to touch
          const pulse = 0.5 + 0.5 * Math.sin(performance.now() / 250);
          ctx.save(); ctx.strokeStyle = C.a1; ctx.globalAlpha = 0.35 + 0.5 * pulse; ctx.lineWidth = 1.6;
          ctx.strokeRect(cx - w / 2 - 5 - 3 * pulse, base - bh - 5 - 3 * pulse, w + 10 + 6 * pulse, bh + 10 + 6 * pulse); ctx.restore();
          label(ctx, '↕ ' + t('dragme'), cx, base - bh - 14, { size: 14, color: C.a1, align: 'center', alpha: 0.95 });
        }
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
  hint(sl.closest('label'), true);
  sl.addEventListener('input', () => { hint(sl.closest('label'), false); needK = true; });
  $('s6orig').addEventListener('click', () => { if (D) { stopSounds(); playBuffer(D.orig, D.sr); } });
  $('s6rec').addEventListener('click', () => { if (rec) { stopSounds(); playBuffer(rec, D.sr); } });
  S.s6 = {
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
  hint(br, true);
  br.addEventListener('click', () => { hint(br, false); running = !running; br.setAttribute('aria-pressed', running ? 'true' : 'false'); setBtn(br, running ? 'halt' : 'advance'); });
  const comp = (i, hours) => AI[i] * Math.cos(TAU * hours / TI[i]);
  S.s7 = {
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
  for (const i of visible) { const st = S[sections[i].id]; if (st && st.draw) st.draw(dt); }
  requestAnimationFrame(frame);
}
applyLang();
updateDots();
requestAnimationFrame(frame);
document.fonts && document.fonts.ready.then(() => { for (const k in S) if (S[k].ctx) S[k].ctx.cv.dirty = true; });
})();
