const pwEl   = document.getElementById('pw');
const lenEl  = document.getElementById('len');
const lenNum = document.getElementById('lenNum');
const copyBtn = document.getElementById('copy');
const ambEl = document.getElementById('tAmb');
const entEl = document.getElementById('ent');
const MIN = 6, MAX = 64;
const toggles = Object.keys(SETS).map(id => document.getElementById(id));

const on = b => b.getAttribute('aria-pressed') === 'true';

// unbiased pick via rejection sampling
function pick(str){
  const max = Math.floor(256 / str.length) * str.length;
  const buf = new Uint8Array(1);
  let v;
  do { crypto.getRandomValues(buf); v = buf[0]; } while (v >= max);
  return str[v % str.length];
}

function generate(){
  const active = toggles.filter(on);
  if (!active.length){ pwEl.textContent = '—'; entEl.textContent = ''; return; }
  const noAmb = on(ambEl);
  pwEl.textContent = makePassword(+lenEl.value, active.map(b => b.id), noAmb);
  showEntropy(active, noAmb);
  save();
}

function showEntropy(active, noAmb){
  const pool = active.map(b => setChars(b.id, noAmb)).join('').length;
  const bits = Math.round(+lenEl.value * Math.log2(pool));
  entEl.textContent = '~' + bits + ' bits';
  entEl.dataset.level = level(bits);
}

function level(b){
  if (b < 45) return 'weak';
  if (b < 65) return 'fair';
  if (b < 90) return 'strong';
  return 'very';
}

function save(){
  chrome.storage.local.set({
    len: +lenEl.value,
    sets: toggles.filter(on).map(b => b.id),
    noAmb: on(ambEl)
  });
}

async function restore(){
  const { len, sets, noAmb } = await chrome.storage.local.get(['len','sets','noAmb']);
  if (len){ lenEl.value = len; lenNum.value = len; }
  if (sets && sets.length){
    toggles.forEach(b => b.setAttribute('aria-pressed', sets.includes(b.id) ? 'true' : 'false'));
  }
  if (noAmb) ambEl.setAttribute('aria-pressed', 'true');
  generate();
}

lenEl.addEventListener('input', () => {
  lenNum.value = lenEl.value;
  generate();
});

// don't clamp mid-typing — "2" en route to "24" would snap to 6
lenNum.addEventListener('input', () => {
  const v = +lenNum.value;
  if (!Number.isInteger(v) || v < MIN || v > MAX) return;
  lenEl.value = v;
  generate();
});

lenNum.addEventListener('blur', () => {
  let v = Math.round(+lenNum.value);
  if (!Number.isFinite(v)) v = +lenEl.value;
  v = Math.min(MAX, Math.max(MIN, v));
  lenNum.value = v;
  lenEl.value = v;
  generate();
});

lenNum.addEventListener('keydown', e => {
  if (e.key === 'Enter') lenNum.blur();
});

toggles.forEach(b => b.addEventListener('click', () => {
  // keep at least one set on
  if (on(b) && toggles.filter(on).length === 1) return;
  b.setAttribute('aria-pressed', on(b) ? 'false' : 'true');
  generate();
}));

ambEl.addEventListener('click', () => {
  ambEl.setAttribute('aria-pressed', on(ambEl) ? 'false' : 'true');
  generate();
});

document.getElementById('regen').addEventListener('click', generate);
document.getElementById('wordmark').addEventListener('click', () => {
  lenEl.value = 16;
  lenNum.value = 16;
  toggles.forEach(b => b.setAttribute('aria-pressed', 'true'));
  ambEl.setAttribute('aria-pressed', 'false');
  generate();
});

// execCommand fallback — works where the async API is blocked (sandboxed iframes)
function legacyCopy(text){
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.cssText = 'position:fixed;top:-100px;opacity:0';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch (e) {}
  ta.remove();
  return ok;
}

copyBtn.addEventListener('click', async () => {
  const text = pwEl.textContent;
  if (!text || text === '—') return;

  let ok = false;
  try {
    await navigator.clipboard.writeText(text);
    ok = true;
  } catch (e) {
    ok = legacyCopy(text);
  }

  copyBtn.textContent = ok ? 'Copied' : 'Failed';
  setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1400);
});

document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT') return;
  if (e.code === 'Space'){ e.preventDefault(); generate(); }
  if (e.key.toLowerCase() === 'c'){ copyBtn.click(); }
});

restore();
