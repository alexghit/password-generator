const SETS = {
  tUpper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  tLower: 'abcdefghijklmnopqrstuvwxyz',
  tNum:   '0123456789',
  tSym:   '!@#$%^&*-_=+?'
};

const AMBIGUOUS = 'Il1O0';

// unbiased pick via rejection sampling
function pick(str){
  const max = Math.floor(256 / str.length) * str.length;
  const buf = new Uint8Array(1);
  let v;
  do { crypto.getRandomValues(buf); v = buf[0]; } while (v >= max);
  return str[v % str.length];
}

function setChars(id, noAmbiguous){
  const s = SETS[id];
  if (!noAmbiguous) return s;
  return [...s].filter(c => !AMBIGUOUS.includes(c)).join('');
}

function makePassword(len, setIds, noAmbiguous){
  // filter first — otherwise the one-per-set guarantee could force an excluded char
  const sets = setIds.map(id => setChars(id, noAmbiguous)).filter(s => s.length);
  if (!sets.length) return '';
  const pool = sets.join('');
  let chars = sets.map(s => pick(s)).slice(0, len);
  while (chars.length < len) chars.push(pick(pool));
  for (let i = chars.length - 1; i > 0; i--){
    const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}
