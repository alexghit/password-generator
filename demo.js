const pwEl = document.getElementById('pw');
const lenEl = document.getElementById('len');
const lenNum = document.getElementById('lenNum');
const ambEl = document.getElementById('tAmb');
const entEl = document.getElementById('ent');
const copyBtn = document.getElementById('copy');
const MIN = 6, MAX = 64;
const toggles = Object.keys(SETS).map(id => document.getElementById(id));

const on = b => b.getAttribute('aria-pressed') === 'true';

function generate(){
  const active = toggles.filter(on);
  if (!active.length){ pwEl.textContent = '—'; entEl.textContent = ''; return; }
  const noAmb = on(ambEl);
  pwEl.textContent = makePassword(+lenEl.value, active.map(b => b.id), noAmb);
  showEntropy(active, noAmb);
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


lenEl.addEventListener('input', () => {
  lenNum.value = lenEl.value;
  generate();
});

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

generate();
