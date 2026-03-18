// ══════════════════════════════════════════
// TRANSLATIONS
// ══════════════════════════════════════════
const TRANSLATIONS = {
  en: {
    // Page title
    pageTitle: 'MathRoot — Math Trainer',
    // Hero
    heroTitle: 'Train your<br/><span>math skills.</span><span class="cursor"></span>',
    heroTagline: 'Pick an operation, choose how many questions, and beat your score.',
    // Home sections
    chooseOperation: 'Choose operation',
    numberOfQuestions: 'Number of questions',
    inputMode: 'Input mode',
    sessionHistory: 'Session history',
    clearAll: 'Clear all',
    startTraining: 'Start Training →',
    // Operations
    addition: 'Addition',
    subtraction: 'Subtraction',
    multiplication: 'Multiplication',
    division: 'Division',
    // Count labels
    quick: 'Quick',
    standard: 'Standard',
    long: 'Long',
    marathon: 'Marathon',
    // Mode
    modeQuiz: 'Quiz',
    modeQuizDesc: 'Pick from 4 choices',
    modeInput: 'Input',
    modeInputDesc: 'Type your answer',
    // Scorebar
    correct: 'Correct',
    wrong: 'Wrong',
    time: 'Time',
    stop: '✕ Stop',
    // Question label  (dynamic — use function)
    questionOf: (n, total) => `QUESTION ${n} OF ${total}`,
    next: 'Next →',
    seeResults: 'See Results →',
    // Feedback
    correctFeedback: '✓ Correct!',
    wrongFeedback: (answer) => `✗ The answer was ${answer}`,
    // Results
    session: 'Session',
    score: 'Score',
    duration: 'Duration',
    avgPerQuestion: 'Avg / question',
    backToOverview: '← Back to overview',
    playAgain: '🔄 Play Again',
    questionSummary: 'Question summary',
    questionsAnswered: (n) => `${n} question${n !== 1 ? 's' : ''}`,
    // Result titles
    titlePerfect: 'Perfect!',
    titleGreat: 'Great Job!',
    titleGood: 'Good Job!',
    titleKeepGoing: 'Keep Going!',
    titleKeepTrying: 'Keep Trying!',
    titleStopped: 'Stopped Early',
    subPerfect: 'Flawless! Every question correct.',
    subGreat: (c, t) => `Excellent — ${c} of ${t} correct!`,
    subGood: (c, t) => `Solid effort — ${c} of ${t} correct!`,
    subKeepGoing: (c, t) => `${c} of ${t} — practice makes perfect!`,
    subKeepTrying: (c, t) => `You got ${c} out of ${t}. You can do better!`,
    subStopped: (a, t, c) => `You answered ${a} of ${t} questions — ${c} correct.`,
    // History
    stopped: 'stopped',
    questionsShort: (a, t) => `${a}/${t} questions`,
    // Grade
    gradeLabel: (n) => `Grade ${n}`,
    // Grade descriptions
    gradeDescs: [
      '', // placeholder for index 0
      'Numbers up to 20',
      'Numbers up to 100',
      'Numbers up to 200',
      'Numbers up to 999',
      '4-digit numbers, harder ×÷',
      'Large numbers & two-digit ×',
      'Two-digit × two-digit',
      'Three-digit × two-digit',
      'Large × and big division',
      'Six-digit numbers & big ×÷',
    ],
    upTo: 'up to',
    // Detail titles
    detailFlawless: 'Flawless — every question correct!',
    detailAnswered: (a, t, c) => `Answered ${a} of ${t} — ${c} correct.`,
    detailCorrectOf: (c, t) => `${c} of ${t} correct`,
  },

  da: {
    pageTitle: 'MathRoot — Matematiktræner',
    heroTitle: 'Træn dine<br/><span>matematikfærdigheder.</span><span class="cursor"></span>',
    heroTagline: 'Vælg en regningsart, antal spørgsmål og slå din rekord.',
    chooseOperation: 'Vælg regningsart',
    numberOfQuestions: 'Antal spørgsmål',
    inputMode: 'Inputtilstand',
    sessionHistory: 'Sessionshistorik',
    clearAll: 'Ryd alle',
    startTraining: 'Start træning →',
    addition: 'Addition',
    subtraction: 'Subtraktion',
    multiplication: 'Multiplikation',
    division: 'Division',
    quick: 'Kort',
    standard: 'Standard',
    long: 'Lang',
    marathon: 'Maraton',
    modeQuiz: 'Quiz',
    modeQuizDesc: 'Vælg mellem 4 muligheder',
    modeInput: 'Indtastning',
    modeInputDesc: 'Skriv dit svar',
    correct: 'Rigtige',
    wrong: 'Forkerte',
    time: 'Tid',
    stop: '✕ Stop',
    questionOf: (n, total) => `SPØRGSMÅL ${n} AF ${total}`,
    next: 'Næste →',
    seeResults: 'Se resultater →',
    correctFeedback: '✓ Korrekt!',
    wrongFeedback: (answer) => `✗ Svaret var ${answer}`,
    session: 'Session',
    score: 'Score',
    duration: 'Varighed',
    avgPerQuestion: 'Gns. / spørgsmål',
    backToOverview: '← Tilbage til oversigt',
    playAgain: '🔄 Spil igen',
    questionSummary: 'Spørgsmålsoversigt',
    questionsAnswered: (n) => `${n} spørgsmål`,
    titlePerfect: 'Perfekt!',
    titleGreat: 'Godt klaret!',
    titleGood: 'Godt gået!',
    titleKeepGoing: 'Fortsæt så!',
    titleKeepTrying: 'Prøv igen!',
    titleStopped: 'Stoppet tidligt',
    subPerfect: 'Fejlfrit! Alle svar korrekte.',
    subGreat: (c, t) => `Fremragende — ${c} af ${t} korrekte!`,
    subGood: (c, t) => `God indsats — ${c} af ${t} korrekte!`,
    subKeepGoing: (c, t) => `${c} af ${t} — øvelse gør mester!`,
    subKeepTrying: (c, t) => `Du fik ${c} ud af ${t}. Du kan gøre det bedre!`,
    subStopped: (a, t, c) => `Du svarede på ${a} af ${t} spørgsmål — ${c} korrekte.`,
    stopped: 'stoppet',
    questionsShort: (a, t) => `${a}/${t} spørgsmål`,
    gradeLabel: (n) => `Klasse ${n}`,
    gradeDescs: [
      '',
      'Tal op til 20',
      'Tal op til 100',
      'Tal op til 200',
      'Tal op til 999',
      '4-cifrede tal, sværere ×÷',
      'Store tal og tocifret ×',
      'Tocifret × tocifret',
      'Trecifret × tocifret',
      'Store × og stor division',
      'Sekscifrede tal og stor ×÷',
    ],
    upTo: 'op til',
    detailFlawless: 'Fejlfrit — alle svar korrekte!',
    detailAnswered: (a, t, c) => `Besvarede ${a} af ${t} — ${c} korrekte.`,
    detailCorrectOf: (c, t) => `${c} af ${t} korrekte`,
  },
};

// ══════════════════════════════════════════
// GRADE CONFIG  (levels 1–10)
// ══════════════════════════════════════════
const GRADE_CONFIG = {
  1:  { add: { aMin:1,   aMax:10,   bMin:1,   bMax:10   }, sub: { aMin:5,   aMax:20,   bMin:1,   bMax:10   }, mul: { aMin:1,  aMax:5,   bMin:1,  bMax:5   }, div: { qMin:1,  qMax:5,   dMin:1,  dMax:5   } },
  2:  { add: { aMin:10,  aMax:50,   bMin:5,   bMax:50   }, sub: { aMin:10,  aMax:100,  bMin:5,   bMax:30   }, mul: { aMin:2,  aMax:5,   bMin:2,  bMax:10  }, div: { qMin:1,  qMax:10,  dMin:2,  dMax:5   } },
  3:  { add: { aMin:20,  aMax:100,  bMin:10,  bMax:100  }, sub: { aMin:30,  aMax:200,  bMin:10,  bMax:100  }, mul: { aMin:2,  aMax:9,   bMin:2,  bMax:9   }, div: { qMin:2,  qMax:9,   dMin:2,  dMax:9   } },
  4:  { add: { aMin:12,  aMax:999,  bMin:12,  bMax:999  }, sub: { aMin:50,  aMax:999,  bMin:10,  bMax:500  }, mul: { aMin:2,  aMax:12,  bMin:2,  bMax:12  }, div: { qMin:2,  qMax:12,  dMin:2,  dMax:12  } },
  5:  { add: { aMin:100, aMax:4999, bMin:100, bMax:4999 }, sub: { aMin:500, aMax:9999, bMin:100, bMax:4999 }, mul: { aMin:3,  aMax:15,  bMin:3,  bMax:15  }, div: { qMin:3,  qMax:15,  dMin:3,  dMax:15  } },
  6:  { add: { aMin:1000,  aMax:9999,  bMin:1000, bMax:9999  }, sub: { aMin:1000,  aMax:9999,  bMin:500,  bMax:5000  }, mul: { aMin:10,  aMax:25,  bMin:2,  bMax:12  }, div: { qMin:4,  qMax:20,  dMin:4,  dMax:20  } },
  7:  { add: { aMin:5000,  aMax:49999, bMin:5000,  bMax:49999 }, sub: { aMin:5000,  aMax:49999, bMin:1000, bMax:24999 }, mul: { aMin:10,  aMax:50,  bMin:10, bMax:50  }, div: { qMin:10, qMax:50,  dMin:10, dMax:50  } },
  8:  { add: { aMin:10000, aMax:99999, bMin:10000, bMax:99999 }, sub: { aMin:10000, aMax:99999, bMin:5000, bMax:50000 }, mul: { aMin:100, aMax:500, bMin:10, bMax:99  }, div: { qMin:10, qMax:99,  dMin:10, dMax:99  } },
  9:  { add: { aMin:50000, aMax:499999,bMin:50000, bMax:499999}, sub: { aMin:50000, aMax:499999,bMin:10000,bMax:249999}, mul: { aMin:100, aMax:999, bMin:100,bMax:999 }, div: { qMin:100,qMax:999, dMin:10, dMax:99  } },
  10: { add: { aMin:100000,aMax:999999,bMin:100000,bMax:999999}, sub: { aMin:100000,aMax:999999,bMin:50000,bMax:499999}, mul: { aMin:100, aMax:9999,bMin:100,bMax:9999}, div: { qMin:100,qMax:9999,dMin:100,dMax:999 } },
};

const OP_META_KEYS = {
  addition: 'addition', subtraction: 'subtraction',
  multiplication: 'multiplication', division: 'division',
};
const OP_SYMBOLS = { addition:'+', subtraction:'−', multiplication:'×', division:'÷' };
const MODE_KEYS  = { quiz: 'modeQuiz', input: 'modeInput' };

// ══════════════════════════════════════════
// STATE
// ══════════════════════════════════════════
let currentLang   = 'en';
let selectedGrade = 4;
let selectedMode  = 'quiz';
let selectedOp    = null;
let totalQ        = 10;
let currentQ      = 0;
let correct       = 0;
let wrong         = 0;
let currentAnswer = null;
let answered      = false;
let sessionLog    = [];
let numpadValue   = '';

let sessionStartTime  = null;
let questionStartTime = null;
let sessionTimerID    = null;

let allSessions = [];
let detailIndex = null;

// ══════════════════════════════════════════
// TRANSLATION HELPERS
// ══════════════════════════════════════════
function t(key) { return TRANSLATIONS[currentLang][key] ?? TRANSLATIONS.en[key] ?? key; }

function applyLang() {
  const T = TRANSLATIONS[currentLang];
  document.documentElement.lang = currentLang;
  document.title = T.pageTitle;

  // text content nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = T[key] ?? TRANSLATIONS.en[key];
    if (val !== undefined) el.textContent = val;
  });

  // innerHTML nodes (hero title with spans)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    const val = T[key] ?? TRANSLATIONS.en[key];
    if (val !== undefined) el.innerHTML = val;
  });

  // Rebuild dynamic sections that depend on language
  buildGradeMenu();
  selectGrade(selectedGrade, false); // refresh pills without closing menu
}

// ══════════════════════════════════════════
// LANGUAGE DROPDOWN
// ══════════════════════════════════════════
function toggleLangMenu() {
  const open = $('lang-menu').classList.toggle('open');
  $('lang-btn').setAttribute('aria-expanded', String(open));
}

function selectLang(lang) {
  currentLang = lang;
  const labels = { en: 'EN', da: 'DA' };
  $('lang-btn-label').textContent = labels[lang];

  // Update active state in menu
  document.querySelectorAll('.lang-option').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === lang);
  });

  $('lang-menu').classList.remove('open');
  $('lang-btn').setAttribute('aria-expanded', 'false');

  applyLang();
}

document.addEventListener('click', e => {
  if (!$('lang-picker').contains(e.target)) {
    $('lang-menu').classList.remove('open');
    $('lang-btn').setAttribute('aria-expanded', 'false');
  }
  if (!$('grade-picker').contains(e.target)) {
    $('grade-menu').classList.remove('open');
    $('grade-btn').setAttribute('aria-expanded', 'false');
  }
});

// ══════════════════════════════════════════
// GRADE DROPDOWN
// ══════════════════════════════════════════
function buildGradeMenu() {
  const T = TRANSLATIONS[currentLang];
  $('grade-menu').innerHTML = Object.keys(GRADE_CONFIG).map(g => {
    const gn  = parseInt(g);
    const lbl = T.gradeLabel(gn);
    const dsc = T.gradeDescs[gn];
    return `
      <div class="grade-option ${gn === selectedGrade ? 'active' : ''}"
           role="option" onclick="selectGrade(${g})">
        <span class="grade-option-label">${lbl}</span>
        <span class="grade-option-desc">${dsc}</span>
      </div>`;
  }).join('');
}

function toggleGradeMenu() {
  const open = $('grade-menu').classList.toggle('open');
  $('grade-btn').setAttribute('aria-expanded', String(open));
}

function selectGrade(g, closeMenu = true) {
  selectedGrade = g;
  const T   = TRANSLATIONS[currentLang];
  const cfg = GRADE_CONFIG[g];

  $('grade-btn-label').textContent = T.gradeLabel(g);

  const addMax = cfg.add.aMax + cfg.add.bMax;
  const subMax = cfg.sub.aMax;
  const mulMax = cfg.mul.aMax * cfg.mul.bMax;
  const divMax = cfg.div.qMax * cfg.div.dMax;
  const upTo   = T.upTo;

  $('grade-info').innerHTML = `
    <div class="grade-pills">
      <span class="grade-pill"><span class="grade-pill-op">+</span><span class="grade-pill-range">${upTo} ${fmtNum(addMax)}</span></span>
      <span class="grade-pill"><span class="grade-pill-op">−</span><span class="grade-pill-range">${upTo} ${fmtNum(subMax)}</span></span>
      <span class="grade-pill"><span class="grade-pill-op">×</span><span class="grade-pill-range">${upTo} ${fmtNum(mulMax)}</span></span>
      <span class="grade-pill"><span class="grade-pill-op">÷</span><span class="grade-pill-range">${upTo} ${fmtNum(divMax)}</span></span>
    </div>`;

  buildGradeMenu();
  if (closeMenu) {
    $('grade-menu').classList.remove('open');
    $('grade-btn').setAttribute('aria-expanded', 'false');
  }
}

// ══════════════════════════════════════════
// UI HELPERS
// ══════════════════════════════════════════
function show(id) { document.getElementById(id).classList.add('visible'); }
function hide(id) { document.getElementById(id).classList.remove('visible'); }
function $(id)    { return document.getElementById(id); }

function fmtMs(ms) {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
}
function fmtMsShort(ms) { return `${(ms / 1000).toFixed(1)}s`; }
function fmtNum(n)       { return n.toLocaleString(); }
function fmtDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString(currentLang === 'da' ? 'da-DK' : 'en-GB', { month: 'short', day: 'numeric' })
    + ' ' + d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

// ══════════════════════════════════════════
// SESSION CLOCK
// ══════════════════════════════════════════
function startSessionClock() {
  sessionStartTime = Date.now();
  clearInterval(sessionTimerID);
  sessionTimerID = setInterval(() => {
    $('session-timer').textContent = fmtMs(Date.now() - sessionStartTime);
  }, 500);
}
function stopSessionClock() { clearInterval(sessionTimerID); sessionTimerID = null; }

// ══════════════════════════════════════════
// SELECTORS
// ══════════════════════════════════════════
function selectOp(el) {
  document.querySelectorAll('.op-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  selectedOp = el.dataset.op;
  $('start-btn').disabled = false;
}
function selectOpByName(op) {
  const card = document.querySelector(`.op-card[data-op="${op}"]`);
  if (card) selectOp(card);
}
function selectCount(el) {
  document.querySelectorAll('.count-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  totalQ = parseInt(el.dataset.count, 10);
}
function selectMode(el) {
  document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  selectedMode = el.dataset.mode;
}

// ══════════════════════════════════════════
// QUESTION GENERATION
// ══════════════════════════════════════════
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function generateQuestion(op) {
  const cfg = GRADE_CONFIG[selectedGrade];
  let a, b, answer, display;
  switch (op) {
    case 'addition':      { const r=cfg.add; a=randInt(r.aMin,r.aMax); b=randInt(r.bMin,r.bMax); answer=a+b; display={a,op:'+',b}; break; }
    case 'subtraction':   { const r=cfg.sub; a=randInt(r.aMin,r.aMax); b=randInt(r.bMin,Math.min(r.bMax,a-1)); answer=a-b; display={a,op:'−',b}; break; }
    case 'multiplication':{ const r=cfg.mul; a=randInt(r.aMin,r.aMax); b=randInt(r.bMin,r.bMax); answer=a*b; display={a,op:'×',b}; break; }
    case 'division':      { const r=cfg.div; const dv=randInt(r.dMin,r.dMax); const qt=randInt(r.qMin,r.qMax); a=dv*qt; answer=qt; b=dv; display={a,op:'÷',b}; break; }
  }
  return { display, answer };
}

function generateChoices(answer, op) {
  const choices = new Set([answer]);
  if (op === 'multiplication' || op === 'division') {
    const spread = Math.max(3, Math.ceil(answer * 0.15));
    while (choices.size < 4) {
      const c = answer + randInt(1, spread) * (Math.random() < 0.5 ? 1 : -1);
      if (c > 0) choices.add(c);
    }
  } else {
    const ud  = answer % 10;
    const mag = Math.max(10, Math.pow(10, Math.floor(Math.log10(answer))));
    const steps = [1,2,3,4,5,9,10,11].map(n => n*mag);
    const offs = []; for (const s of steps) offs.push(s,-s);
    offs.sort(() => Math.random()-.5);
    for (const o of offs) { if (choices.size>=4) break; const c=answer+o; if (c>0&&c!==answer&&c%10===ud) choices.add(c); }
    let step=mag; while(choices.size<4&&step<=answer*10){ for(const sg of[1,-1]){ if(choices.size>=4)break; const c=answer+sg*step; if(c>0&&c%10===ud)choices.add(c); } step+=mag; }
  }
  return [...choices].sort(() => Math.random() - 0.5);
}

// ══════════════════════════════════════════
// QUIZ FLOW
// ══════════════════════════════════════════
function startQuiz() {
  currentQ=0; correct=0; wrong=0; sessionLog=[];
  $('home-section').style.display='none';
  hide('detail-section'); show('quiz-section'); hide('result-section');
  $('session-timer').textContent='0:00';
  startSessionClock(); updateScorebar(); renderQuestion();
}

function renderQuestion() {
  answered = false;
  questionStartTime = Date.now();

  const card = $('question-card');
  const fb   = $('feedback-msg');

  // ── Reset card state ──────────────────────────────────────────────────
  card.classList.remove('correct', 'wrong');
  fb.textContent = ''; fb.className = 'feedback';

  // ── Replace the choices grid with a brand-new element ─────────────────
  // Reusing the same DOM node and clearing innerHTML leaves iOS holding a
  // GPU-composited snapshot of the old highlighted buttons. Replacing the
  // entire node guarantees the compositor has no prior layer to fall back on.
  const oldGrid = $('choices-grid');
  const newGrid = document.createElement('div');
  newGrid.id        = 'choices-grid';
  newGrid.className = 'choices-grid choices-hidden';  // hidden from birth
  oldGrid.replaceWith(newGrid);

  // ── Generate new question ─────────────────────────────────────────────
  const q = generateQuestion(selectedOp);
  currentAnswer = q.answer;
  const { display } = q;
  renderQuestion._currentEquation = `${display.a} ${display.op} ${display.b}`;

  $('q-label').textContent   = t('questionOf')(currentQ + 1, totalQ);
  $('q-counter').textContent = `${currentQ + 1}/${totalQ}`;
  $('q-equation').innerHTML  = `<span>${display.a}</span><span class="q-eq-op">${display.op}</span><span>${display.b}</span><span class="q-eq-op">=</span><span class="q-eq-box">?</span>`;

  if (selectedMode === 'quiz') {
    $('numpad-wrap').style.display = 'none';
    generateChoices(currentAnswer, selectedOp).forEach(c => {
      const div = document.createElement('div');
      div.className   = 'choice-btn';
      div.textContent = c;
      div.setAttribute('role', 'button');
      div.setAttribute('tabindex', '0');
      div.addEventListener('pointerdown', e => { e.preventDefault(); handleAnswer(c, div); });
      div.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') handleAnswer(c, div); });
      newGrid.appendChild(div);
    });
    // Reveal after a brief delay — gives iOS time to fully commit the new
    // hidden DOM before we make it visible, preventing any stale paint bleed.
    setTimeout(() => { newGrid.classList.remove('choices-hidden'); }, 50);
  } else {
    newGrid.style.display = 'none';
    $('numpad-wrap').style.display = '';
    renderNumpad();
  }
}

// ══════════════════════════════════════════
// NUMPAD
// ══════════════════════════════════════════
function renderNumpad() {
  numpadValue='';
  const disp=$('numpad-display'); disp.textContent='_'; disp.className='numpad-display';
  const grid=$('numpad-grid'); grid.innerHTML='';
  ['1','2','3','4','5','6','7','8','9','0','⌫','✓'].forEach(k=>{
    const btn=document.createElement('button');
    btn.className='numpad-btn'; btn.textContent=k;
    if(k==='⌫') btn.classList.add('numpad-back');
    if(k==='✓') btn.classList.add('numpad-submit');
    btn.addEventListener('click',()=>handleNumpadKey(k)); grid.appendChild(btn);
  });
}
function updateNumpadDisplay() { $('numpad-display').textContent=numpadValue===''?'_':numpadValue; }
function handleNumpadKey(k) {
  if(answered) return;
  if(k==='⌫') { numpadValue=numpadValue.slice(0,-1); updateNumpadDisplay(); }
  else if(k==='✓') { if(numpadValue==='') return; handleAnswer(parseInt(numpadValue,10),null); }
  else { if(numpadValue.length>=12) return; numpadValue+=k; updateNumpadDisplay(); }
}
document.addEventListener('keydown', e => {
  if(selectedMode!=='input') return;
  const qs=document.getElementById('quiz-section');
  if(!qs||!qs.classList.contains('visible')||answered) return;
  if(e.key>='0'&&e.key<='9') handleNumpadKey(e.key);
  else if(e.key==='Backspace') handleNumpadKey('⌫');
  else if(e.key==='Enter') handleNumpadKey('✓');
});

// ══════════════════════════════════════════
// HANDLE ANSWER
// ══════════════════════════════════════════
function handleAnswer(chosen, btnEl) {
  if(answered) return;
  if(btnEl && btnEl.getAttribute('data-answered')) return;
  answered=true;
  const elapsedMs=Date.now()-questionStartTime;
  const wasCorrect=(chosen===currentAnswer);
  sessionLog.push({equation:renderQuestion._currentEquation,correctAnswer:currentAnswer,chosen,wasCorrect,elapsedMs});

  const card=$('question-card'), fb=$('feedback-msg');
  if(selectedMode==='quiz') {
    // Immediately make the grid invisible on tap — iOS cannot show stale
    // button state if the grid is already transparent before the next render.
    const grid = $('choices-grid');
    if (grid) grid.classList.add('choices-hidden');

    document.querySelectorAll('.choice-btn').forEach(b => b.setAttribute('data-answered','1'));
    if(wasCorrect) {
      correct++; card.classList.add('correct');
      fb.textContent=t('correctFeedback'); fb.className='feedback correct show';
    } else {
      wrong++; card.classList.add('wrong');
      card.classList.add('shake'); setTimeout(()=>card.classList.remove('shake'),400);
      fb.textContent=t('wrongFeedback')(currentAnswer); fb.className='feedback wrong show';
    }
  } else {
    document.querySelectorAll('.numpad-btn').forEach(b=>(b.disabled=true));
    const disp=$('numpad-display');
    if(wasCorrect) {
      correct++; card.classList.add('correct'); disp.classList.add('numpad-correct');
      fb.textContent=t('correctFeedback'); fb.className='feedback correct show';
    } else {
      wrong++; card.classList.add('wrong'); disp.classList.add('numpad-wrong'); disp.textContent=chosen;
      card.classList.add('shake'); setTimeout(()=>card.classList.remove('shake'),400);
      fb.textContent=t('wrongFeedback')(currentAnswer); fb.className='feedback wrong show';
    }
  }
  updateScorebar();
  currentQ++;

  const delay = wasCorrect ? 1000 : 1500;
  setTimeout(() => {
    if (currentQ >= totalQ) showResults(false);
    else renderQuestion();
  }, delay);
}

function updateScorebar() {
  $('score-correct').textContent=correct;
  $('score-wrong').textContent=wrong;
  $('progress-bar').style.width=`${((currentQ+1)/totalQ)*100}%`;
}

// ══════════════════════════════════════════
// CANCEL
// ══════════════════════════════════════════
function cancelQuiz() { if(sessionLog.length===0){stopSessionClock();goHome();return;} showResults(true); }

// ══════════════════════════════════════════
// RESULTS
// ══════════════════════════════════════════
function showResults(cancelled) {
  stopSessionClock(); hide('quiz-section'); show('result-section');
  const totalSessionMs=Date.now()-sessionStartTime;
  const answeredCount=sessionLog.length;
  const pct=answeredCount>0?Math.round((correct/answeredCount)*100):0;
  const avgMs=answeredCount>0?sessionLog.reduce((s,e)=>s+e.elapsedMs,0)/answeredCount:0;

  const session={id:Date.now(),op:selectedOp,grade:selectedGrade,mode:selectedMode,totalQ,correct,wrong:answeredCount-correct,pct,totalSessionMs,avgMs,answeredCount,cancelled,timestamp:Date.now(),log:[...sessionLog]};
  allSessions.unshift(session);

  $('res-correct').textContent=correct; $('res-wrong').textContent=wrong;
  $('res-pct').textContent=pct+'%'; $('res-duration').textContent=fmtMs(totalSessionMs);
  $('res-avg').textContent=answeredCount>0?fmtMsShort(avgMs):'—';
  $('res-grade-badge').textContent=TRANSLATIONS[currentLang].gradeLabel(selectedGrade);
  $('res-mode-badge').textContent=t(MODE_KEYS[selectedMode]);

  if(cancelled) {
    $('result-emoji').textContent='🛑';
    $('result-title').textContent=t('titleStopped');
    $('result-sub').textContent=t('subStopped')(answeredCount,totalQ,correct);
  } else {
    let emoji='😔',title=t('titleKeepTrying'),sub=t('subKeepTrying')(correct,totalQ);
    if(pct===100){emoji='🏆';title=t('titlePerfect');sub=t('subPerfect');}
    else if(pct>=80){emoji='🎉';title=t('titleGreat');sub=t('subGreat')(correct,totalQ);}
    else if(pct>=60){emoji='👍';title=t('titleGood');sub=t('subGood')(correct,totalQ);}
    else if(pct>=40){emoji='💪';title=t('titleKeepGoing');sub=t('subKeepGoing')(correct,totalQ);}
    $('result-emoji').textContent=emoji; $('result-title').textContent=title; $('result-sub').textContent=sub;
  }
  renderSummaryList($('summary-list'),$('summary-count'),sessionLog);
}

// ══════════════════════════════════════════
// SHARED SUMMARY RENDERER
// ══════════════════════════════════════════
function renderSummaryList(listEl,countEl,log) {
  if(log.length===0){listEl.innerHTML='<p class="summary-empty">'+t('questionSummary')+'</p>';countEl.textContent='';return;}
  countEl.textContent=t('questionsAnswered')(log.length);
  listEl.innerHTML=log.map((e,i)=>`
    <div class="summary-row ${e.wasCorrect?'summary-correct':'summary-wrong'}">
      <span class="summary-num">${i+1}</span>
      <span class="summary-eq">${e.equation} = ${e.correctAnswer}</span>
      <span class="summary-chosen">${e.wasCorrect?`<span class="summary-icon">✓</span> ${e.chosen}`:`<span class="summary-icon">✗</span> <s>${e.chosen}</s>`}</span>
      <span class="summary-time">${fmtMsShort(e.elapsedMs)}</span>
    </div>`).join('');
}

// ══════════════════════════════════════════
// HISTORY LIST
// ══════════════════════════════════════════
function renderHistory() {
  if(allSessions.length===0){$('history-section').style.display='none';return;}
  $('history-section').style.display='';
  $('history-list').innerHTML=allSessions.map((s,i)=>{
    const sym=OP_SYMBOLS[s.op]||'?';
    const opLabel=t(OP_META_KEYS[s.op]||s.op);
    const modeLabel=t(MODE_KEYS[s.mode]||s.mode);
    const gradeLabel=TRANSLATIONS[currentLang].gradeLabel(s.grade);
    const pctCls=s.pct===100?'green':s.pct>=60?'grape':'red';
    const stopped=s.cancelled?`<span class="hist-badge cancelled">${t('stopped')}</span>`:'';
    return `
      <div class="hist-row" onclick="openDetail(${i})" role="button" tabindex="0" onkeydown="if(event.key==='Enter')openDetail(${i})">
        <div class="hist-op-badge">${sym}</div>
        <div class="hist-info">
          <span class="hist-op-name">${opLabel}${stopped}<span class="hist-chip hist-chip-grade">${gradeLabel}</span><span class="hist-chip hist-chip-mode">${modeLabel}</span></span>
          <span class="hist-meta">${fmtDate(s.timestamp)} · ${t('questionsShort')(s.answeredCount,s.totalQ)} · ${fmtMs(s.totalSessionMs)}</span>
        </div>
        <div class="hist-score ${pctCls}">${s.pct}%</div>
        <div class="hist-chevron">›</div>
      </div>`;
  }).join('');
}
function clearHistory(){allSessions=[];renderHistory();}

// ══════════════════════════════════════════
// SESSION DETAIL
// ══════════════════════════════════════════
function openDetail(index) {
  detailIndex=index;
  const s=allSessions[index];
  const opLabel=t(OP_META_KEYS[s.op]||s.op);
  const modeLabel=t(MODE_KEYS[s.mode]||s.mode);
  const gradeLabel=TRANSLATIONS[currentLang].gradeLabel(s.grade);

  let emoji='😔',title=t('titleKeepTrying'),sub=t('detailCorrectOf')(s.correct,s.totalQ)+'.';
  if(s.cancelled){emoji='🛑';title=t('titleStopped');sub=t('detailAnswered')(s.answeredCount,s.totalQ,s.correct);}
  else if(s.pct===100){emoji='🏆';title=t('titlePerfect');sub=t('detailFlawless');}
  else if(s.pct>=80){emoji='🎉';title=t('titleGreat');sub=t('detailCorrectOf')(s.correct,s.totalQ)+'!';}
  else if(s.pct>=60){emoji='👍';title=t('titleGood');sub=t('detailCorrectOf')(s.correct,s.totalQ)+'.';}
  else if(s.pct>=40){emoji='💪';title=t('titleKeepGoing');sub=t('detailCorrectOf')(s.correct,s.totalQ)+'.';}

  $('detail-emoji').textContent=emoji;
  $('detail-title').textContent=`${title} — ${opLabel}`;
  $('detail-sub').textContent=`${fmtDate(s.timestamp)} · ${sub}`;
  $('detail-correct').textContent=s.correct; $('detail-wrong').textContent=s.wrong;
  $('detail-pct').textContent=s.pct+'%'; $('detail-duration').textContent=fmtMs(s.totalSessionMs);
  $('detail-avg').textContent=s.answeredCount>0?fmtMsShort(s.avgMs):'—';
  $('detail-grade-badge').textContent=gradeLabel;
  $('detail-mode-badge').textContent=modeLabel;

  renderSummaryList($('detail-list'),$('detail-count'),s.log);
  $('home-section').style.display='none';
  show('detail-section');
  window.scrollTo({top:0,behavior:'smooth'});
}
function closeDetail(){hide('detail-section');goHome();}

// ══════════════════════════════════════════
// REPLAY / HOME
// ══════════════════════════════════════════
function replaySession() { const op=selectedOp; goHome(); setTimeout(()=>{selectOpByName(op);startQuiz();},20); }
function goHome() {
  stopSessionClock();
  hide('result-section'); hide('quiz-section'); hide('detail-section');
  $('home-section').style.display='';
  document.querySelectorAll('.op-card').forEach(c=>c.classList.remove('active'));
  selectedOp=null; $('start-btn').disabled=true;
  renderHistory();
  window.scrollTo({top:0,behavior:'smooth'});
}

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
applyLang();
selectGrade(4);
