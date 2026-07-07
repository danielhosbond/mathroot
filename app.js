// ══════════════════════════════════════════
// THEME
// ══════════════════════════════════════════
function getPreferredTheme() {
  const saved = localStorage.getItem('mathroot-theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = theme === 'light' ? '🌙' : '☀️';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('mathroot-theme', next);
  applyTheme(next);
}

// Apply theme immediately (before DOM-dependent init)
applyTheme(getPreferredTheme());

// ══════════════════════════════════════════
// STORAGE  (JSON-serialized localStorage, safe against quota/corruption)
// ══════════════════════════════════════════
const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },
};

const MAX_SAVED_SESSIONS = 50;
function saveSessions() {
  if (allSessions.length > MAX_SAVED_SESSIONS) allSessions = allSessions.slice(0, MAX_SAVED_SESSIONS);
  store.set('mathroot-sessions', allSessions);
}

// ══════════════════════════════════════════
// TRANSLATIONS
// ══════════════════════════════════════════
const TRANSLATIONS = {
  en: {
    // Page title
    pageTitle: 'MathRoot — Math Trainer',
    // Hero
    heroTitle: 'Train your <span>math skills.</span><span class="cursor"></span>',
    heroTagline: 'Pick an operation, choose how many questions, and beat your score.',
    // Home sections
    chooseOperation: 'Choose operation',
    numberOfQuestions: 'Number of questions',
    inputMode: 'Input mode',
    sessionHistory: 'Session history',
    clearAll: 'Clear all',
    showAll: (n) => `Show all (${n})`,
    showLess: 'Show less',
    startTraining: 'Start Training →',
    // Operations
    addition: 'Addition',
    subtraction: 'Subtraction',
    multiplication: 'Multiplication',
    division: 'Division',
    mixed: 'Mixed',
    wordProblems: 'Word problems',
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
    avgPerQuestion: 'Avg / q',
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
    // Scoring
    points: 'pts',
    personalBest: 'Personal best',
    newPersonalBest: 'New personal best!',
    // Conversions
    practiceType: 'Practice type',
    math: 'Math',
    conversions: 'Conversions',
    chooseCategory: 'Choose category',
    catLength: 'Length',
    catWeight: 'Weight',
    catVolume: 'Volume',
    catTime: 'Time',
    catArea: 'Area',
    convReference: 'Reference',
    // Times table
    timesTable: 'Times Tables',
    chooseTable: 'Choose table',
    // Clock
    clock: 'Clock',
    chooseDirection: 'Choose direction',
    dirRead: 'Read the clock',
    dirSet: 'Find the clock',
    // Geometry
    geometry: 'Geometry',
    catShapes: 'Shapes',
    catPerimeter: 'Perimeter',
    // (catArea is defined once above, under Conversions — geometry reuses it)
    qNameShape: 'What shape is this?',
    qHowManySides: 'How many sides?',
    qHowManyCorners: 'How many corners?',
    qPerimeter: 'Find the perimeter',
    qArea: 'Find the area',
    shapeNames: {
      circle:'Circle', triangle:'Triangle', square:'Square', rectangle:'Rectangle',
      pentagon:'Pentagon', hexagon:'Hexagon', star:'Star', oval:'Oval',
      octagon:'Octagon', rhombus:'Rhombus',
    },
    // Fractions & percentages
    fractions: 'Fractions & %',
    catCompare: 'Compare',
    catFractionOf: 'Fraction of',
    catRounding: 'Rounding',
    catEquivalent: 'Equivalent',
    catAddSub: 'Add & subtract',
    catPercent: 'Percent',
    qCompareFrac: 'Which fraction is the largest?',
    qRoundTo: (to) => `Round to the nearest ${to}`,
    wordOf: 'of',
    // Streak
    streakDays: (n) => `${n}-day streak`,
    todayProgress: (n, goal) => `${n}/${goal} today`,
    // Mistakes
    practiceMistakes: (n) => `Practice mistakes (${n})`,
    mistakesPractice: 'Mistake practice',
    // Badges
    badges: 'Badges',
    newBadge: 'New badge!',
    badgeFirstSession: 'First Steps',            badgeFirstSessionDesc: 'Complete your first session',
    badgePerfect10: 'Perfect 10',                badgePerfect10Desc: '100% on a session of 10+ questions',
    badgePerfectMarathon: 'Marathon Champion',   badgePerfectMarathonDesc: '100% on a 40-question marathon',
    badgeQ100: 'Century',                        badgeQ100Desc: 'Answer 100 questions',
    badgeQ500: 'High Flyer',                     badgeQ500Desc: 'Answer 500 questions',
    badgeQ1000: 'Superstar',                     badgeQ1000Desc: 'Answer 1,000 questions',
    badgeStreak3: 'On Fire',                     badgeStreak3Desc: 'Reach a 3-day streak',
    badgeStreak7: 'Unstoppable',                 badgeStreak7Desc: 'Reach a 7-day streak',
    badgeStreak30: 'Legend',                     badgeStreak30Desc: 'Reach a 30-day streak',
    badgeExplorer: 'Explorer',                   badgeExplorerDesc: 'Try all six practice types',
    badgeComeback: 'Comeback Kid',               badgeComebackDesc: 'Master 10 of your mistakes',
    badgeLightning: 'Speed Demon',               badgeLightningDesc: 'Under 3s per question, 80%+ correct (10+ questions)',
    badgeTableMaster: 'Table Master',            badgeTableMasterDesc: '100% on a times-table session',
    badgeGradeClimber: 'Grade Climber',          badgeGradeClimberDesc: 'Complete sessions at 3 different grades',
    // Print worksheet
    printWorksheet: 'Print Worksheet',
    printSavePdf:   'Print / Save as PDF',
    grade:          'Grade',
    layout:         'Layout',
    answerKey:      'Answer key',
    include:        'Include',
    exclude:        'Exclude',
    oneColumn:      '1 Column',
    twoColumns:     '2 Columns',
    problems:       (n) => `${n} problem${n !== 1 ? 's' : ''}`,
    unitLabels: {
      km:'km', m:'m', cm:'cm', mm:'mm',
      kg:'kg', g:'g', mg:'mg',
      l:'l', dl:'dl', cl:'cl', ml:'ml',
      'm²':'m²', 'cm²':'cm²', 'km²':'km²', hectare:'hectare',
      sec:   { s:'second',  p:'seconds'  },
      min:   { s:'minute',  p:'minutes'  },
      hour:  { s:'hour',    p:'hours'    },
      day:   { s:'day',     p:'days'     },
      week:  { s:'week',    p:'weeks'    },
      month: { s:'month',   p:'months'   },
      year:  { s:'year',    p:'years'    },
    },
  },

  da: {
    pageTitle: 'MathRoot — Matematiktræner',
    heroTitle: 'Træn din <span>matematik.</span><span class="cursor"></span>',
    heroTagline: 'Vælg en regningsart, antal spørgsmål og slå din rekord.',
    chooseOperation: 'Vælg regningsart',
    numberOfQuestions: 'Antal spørgsmål',
    inputMode: 'Inputtilstand',
    sessionHistory: 'Sessionshistorik',
    clearAll: 'Ryd alle',
    showAll: (n) => `Vis alle (${n})`,
    showLess: 'Vis færre',
    startTraining: 'Start træning →',
    addition: 'Addition',
    subtraction: 'Subtraktion',
    multiplication: 'Multiplikation',
    division: 'Division',
    mixed: 'Blandet',
    wordProblems: 'Regnehistorier',
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
    avgPerQuestion: 'Gns. / spr.',
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
    // Scoring
    points: 'point',
    personalBest: 'Personlig rekord',
    newPersonalBest: 'Ny personlig rekord!',
    // Conversions
    practiceType: 'Øvelsestype',
    math: 'Matematik',
    conversions: 'Enheder',
    chooseCategory: 'Vælg kategori',
    catLength: 'Længde',
    catWeight: 'Vægt',
    catVolume: 'Rumfang',
    catTime: 'Tid',
    catArea: 'Areal',
    convReference: 'Reference',
    // Times table
    timesTable: 'Gangetabel',
    chooseTable: 'Vælg tabel',
    // Clock
    clock: 'Klokken',
    chooseDirection: 'Vælg retning',
    dirRead: 'Aflæs uret',
    dirSet: 'Find uret',
    // Geometry
    geometry: 'Geometri',
    catShapes: 'Former',
    catPerimeter: 'Omkreds',
    // (catArea is defined once above, under Conversions — geometry reuses it)
    qNameShape: 'Hvilken form er det?',
    qHowManySides: 'Hvor mange sider?',
    qHowManyCorners: 'Hvor mange hjørner?',
    qPerimeter: 'Find omkredsen',
    qArea: 'Find arealet',
    shapeNames: {
      circle:'Cirkel', triangle:'Trekant', square:'Kvadrat', rectangle:'Rektangel',
      pentagon:'Femkant', hexagon:'Sekskant', star:'Stjerne', oval:'Oval',
      octagon:'Ottekant', rhombus:'Rombe',
    },
    // Fractions & percentages
    fractions: 'Brøker & %',
    catCompare: 'Sammenlign',
    catFractionOf: 'Brøkdel af',
    catRounding: 'Afrunding',
    catEquivalent: 'Ligeværdige',
    catAddSub: 'Plus & minus',
    catPercent: 'Procent',
    qCompareFrac: 'Hvilken brøk er størst?',
    qRoundTo: (to) => `Rund til nærmeste ${to}`,
    wordOf: 'af',
    // Streak
    streakDays: (n) => `${n} dages stime`,
    todayProgress: (n, goal) => `${n}/${goal} i dag`,
    // Mistakes
    practiceMistakes: (n) => `Øv dine fejl (${n})`,
    mistakesPractice: 'Fejltræning',
    // Badges
    badges: 'Mærker',
    newBadge: 'Nyt mærke!',
    badgeFirstSession: 'Første skridt',          badgeFirstSessionDesc: 'Gennemfør din første session',
    badgePerfect10: 'Perfekt 10',                badgePerfect10Desc: '100 % i en session med 10+ spørgsmål',
    badgePerfectMarathon: 'Maratonmester',       badgePerfectMarathonDesc: '100 % i en maraton med 40 spørgsmål',
    badgeQ100: 'Hundrede',                       badgeQ100Desc: 'Besvar 100 spørgsmål',
    badgeQ500: 'Højtflyvende',                   badgeQ500Desc: 'Besvar 500 spørgsmål',
    badgeQ1000: 'Superstjerne',                  badgeQ1000Desc: 'Besvar 1.000 spørgsmål',
    badgeStreak3: 'I ilden',                     badgeStreak3Desc: 'Nå en stime på 3 dage',
    badgeStreak7: 'Ustoppelig',                  badgeStreak7Desc: 'Nå en stime på 7 dage',
    badgeStreak30: 'Legende',                    badgeStreak30Desc: 'Nå en stime på 30 dage',
    badgeExplorer: 'Opdagelsesrejsende',         badgeExplorerDesc: 'Prøv alle seks øvelsestyper',
    badgeComeback: 'Comeback-konge',             badgeComebackDesc: 'Mestr 10 af dine fejl',
    badgeLightning: 'Lynhurtig',                 badgeLightningDesc: 'Under 3 sek. pr. spørgsmål, 80 %+ rigtige (10+ spørgsmål)',
    badgeTableMaster: 'Tabelmester',             badgeTableMasterDesc: '100 % i en gangetabel-session',
    badgeGradeClimber: 'Klassekravler',          badgeGradeClimberDesc: 'Gennemfør sessioner på 3 forskellige klassetrin',
    // Print worksheet
    printWorksheet: 'Print arbejdsark',
    printSavePdf:   'Print / Gem som PDF',
    grade:          'Klasse',
    layout:         'Layout',
    answerKey:      'Facitliste',
    include:        'Inkluder',
    exclude:        'Ekskluder',
    oneColumn:      '1 kolonne',
    twoColumns:     '2 kolonner',
    problems:       (n) => `${n} opgave${n !== 1 ? 'r' : ''}`,
    unitLabels: {
      km:'km', m:'m', cm:'cm', mm:'mm',
      kg:'kg', g:'g', mg:'mg',
      l:'l', dl:'dl', cl:'cl', ml:'ml',
      'm²':'m²', 'cm²':'cm²', 'km²':'km²', hectare:'hektar',
      sec:   { s:'sekund',  p:'sekunder'  },
      min:   { s:'minut',   p:'minutter'  },
      hour:  { s:'time',    p:'timer'     },
      day:   { s:'dag',     p:'dage'      },
      week:  { s:'uge',     p:'uger'      },
      month: { s:'måned',   p:'måneder'   },
      year:  { s:'år',      p:'år'        },
    },
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

// ══════════════════════════════════════════
// CONVERSION CONFIG
// ══════════════════════════════════════════
const CONVERSION_PAIRS = {
  length: [
    { from:'km',  to:'m',   factor:1000,  minGrade:1, valueMin:1,    valueMax:5,    valueStep:1   }, // 1–5 km → 1000–5000 m
    { from:'m',   to:'cm',  factor:100,   minGrade:1, valueMin:1,    valueMax:10,   valueStep:1   }, // 1–10 m → 100–1000 cm
    { from:'cm',  to:'mm',  factor:10,    minGrade:2, valueMin:1,    valueMax:30,   valueStep:1   }, // 1–30 cm → 10–300 mm
    { from:'cm',  to:'m',   factor:0.01,  minGrade:4, valueMin:100,  valueMax:1000, valueStep:100 }, // 100–1000 cm → 1–10 m
    { from:'mm',  to:'cm',  factor:0.1,   minGrade:4, valueMin:10,   valueMax:100,  valueStep:10  }, // 10–100 mm → 1–10 cm
    { from:'m',   to:'km',  factor:0.001, minGrade:5, valueMin:1000, valueMax:9000, valueStep:500 }, // 1000–9000 m → 1–9 km
  ],
  weight: [
    { from:'kg',  to:'g',   factor:1000,  minGrade:1, valueMin:1,    valueMax:5,    valueStep:1   }, // 1–5 kg → 1000–5000 g
    { from:'g',   to:'kg',  factor:0.001, minGrade:4, valueMin:1000, valueMax:9000, valueStep:500 }, // 1000–9000 g → 1–9 kg
    { from:'g',   to:'mg',  factor:1000,  minGrade:6, valueMin:1,    valueMax:5,    valueStep:1   }, // 1–5 g → 1000–5000 mg
    { from:'mg',  to:'g',   factor:0.001, minGrade:7, valueMin:1000, valueMax:5000, valueStep:500 }, // 1000–5000 mg → 1–5 g
  ],
  volume: [
    { from:'l',   to:'ml',  factor:1000,  minGrade:1, valueMin:1,    valueMax:5,    valueStep:1   }, // 1–5 l → 1000–5000 ml
    { from:'l',   to:'dl',  factor:10,    minGrade:2, valueMin:1,    valueMax:10,   valueStep:1   }, // 1–10 l → 10–100 dl
    { from:'dl',  to:'cl',  factor:10,    minGrade:3, valueMin:1,    valueMax:20,   valueStep:1   }, // 1–20 dl → 10–200 cl
    { from:'cl',  to:'ml',  factor:10,    minGrade:3, valueMin:1,    valueMax:30,   valueStep:1   }, // 1–30 cl → 10–300 ml
    { from:'dl',  to:'l',   factor:0.1,   minGrade:4, valueMin:10,   valueMax:100,  valueStep:10  }, // 10–100 dl → 1–10 l
    { from:'cl',  to:'dl',  factor:0.1,   minGrade:4, valueMin:10,   valueMax:100,  valueStep:10  }, // 10–100 cl → 1–10 dl
    { from:'ml',  to:'cl',  factor:0.1,   minGrade:5, valueMin:10,   valueMax:200,  valueStep:10  }, // 10–200 ml → 1–20 cl
    { from:'ml',  to:'l',   factor:0.001, minGrade:5, valueMin:1000, valueMax:5000, valueStep:500 }, // 1000–5000 ml → 1–5 l
  ],
  time: [
    { from:'min',   to:'sec',   factor:60,    minGrade:1, valueMin:1,  valueMax:5,   valueStep:1  }, // 1–5 min → 60–300 sec
    { from:'week',  to:'day',   factor:7,     minGrade:1, valueMin:1,  valueMax:4,   valueStep:1  }, // 1–4 weeks → 7–28 days
    { from:'hour',  to:'min',   factor:60,    minGrade:2, valueMin:1,  valueMax:6,   valueStep:1  }, // 1–6 hours → 60–360 min
    { from:'day',   to:'hour',  factor:24,    minGrade:2, valueMin:1,  valueMax:7,   valueStep:1  }, // 1–7 days → 24–168 hours
    { from:'year',  to:'month', factor:12,    minGrade:2, valueMin:1,  valueMax:5,   valueStep:1  }, // 1–5 years → 12–60 months
    { from:'day',   to:'week',  factor:1/7,   minGrade:4, valueMin:7,  valueMax:42,  valueStep:7  }, // 7–42 days → 1–6 weeks
    { from:'month', to:'year',  factor:1/12,  minGrade:4, valueMin:12, valueMax:60,  valueStep:12 }, // 12–60 months → 1–5 years
    { from:'sec',   to:'min',   factor:1/60,  minGrade:5, valueMin:60, valueMax:600, valueStep:60 }, // 60–600 sec → 1–10 min
    { from:'min',   to:'hour',  factor:1/60,  minGrade:5, valueMin:60, valueMax:360, valueStep:30 }, // 60–360 min → 1–6 hours
    { from:'hour',  to:'day',   factor:1/24,  minGrade:6, valueMin:24, valueMax:168, valueStep:12 }, // 24–168 hours → 1–7 days
  ],
  area: [
    { from:'m²',      to:'cm²',     factor:10000,  minGrade:7, valueMin:1,     valueMax:10,     valueStep:1     }, // 1–10 m² → 10 000–100 000 cm²
    { from:'cm²',     to:'m²',      factor:0.0001, minGrade:7, valueMin:10000, valueMax:100000, valueStep:10000 }, // 10 000–100 000 cm² → 1–10 m²
    { from:'hectare', to:'m²',      factor:10000,  minGrade:7, valueMin:1,     valueMax:10,     valueStep:1     }, // 1–10 ha → 10 000–100 000 m²
    { from:'m²',      to:'hectare', factor:0.0001, minGrade:8, valueMin:10000, valueMax:100000, valueStep:10000 }, // 10 000–100 000 m² → 1–10 ha
    { from:'km²',     to:'hectare', factor:100,    minGrade:9, valueMin:1,     valueMax:10,     valueStep:1     }, // 1–10 km² → 100–1000 ha
    { from:'hectare', to:'km²',     factor:0.01,   minGrade:9, valueMin:100,   valueMax:1000,   valueStep:100   }, // 100–1000 ha → 1–10 km²
  ],
};

const CONV_REFS = {
  length: [
    { from:1, fromUnit:'km', to:1000, toUnit:'m'  },
    { from:1, fromUnit:'m',  to:100,  toUnit:'cm' },
    { from:1, fromUnit:'cm', to:10,   toUnit:'mm' },
  ],
  weight: [
    { from:1, fromUnit:'kg', to:1000, toUnit:'g'  },
    { from:1, fromUnit:'g',  to:1000, toUnit:'mg' },
  ],
  volume: [
    { from:1, fromUnit:'l',  to:10,   toUnit:'dl' },
    { from:1, fromUnit:'dl', to:10,   toUnit:'cl' },
    { from:1, fromUnit:'cl', to:10,   toUnit:'ml' },
    { from:1, fromUnit:'l',  to:1000, toUnit:'ml' },
  ],
  time: [
    { from:1, fromUnit:'min',   to:60, toUnit:'sec'   },
    { from:1, fromUnit:'hour',  to:60, toUnit:'min'   },
    { from:1, fromUnit:'day',   to:24, toUnit:'hour'  },
    { from:1, fromUnit:'week',  to:7,  toUnit:'day'   },
    { from:1, fromUnit:'year',  to:12, toUnit:'month' },
  ],
  area: [
    { from:1, fromUnit:'m²',      to:10000, toUnit:'cm²'     },
    { from:1, fromUnit:'hectare', to:10000, toUnit:'m²'      },
    { from:1, fromUnit:'km²',     to:100,   toUnit:'hectare' },
  ],
};

// ══════════════════════════════════════════
// CLOCK CONFIG  (tell the time — 24-hour, ☀️/🌙 day-night cue)
// ══════════════════════════════════════════
const CLOCK_DIRS = [
  { key:'a2d',   icon:'🕒',   labelKey:'dirRead' },  // shown a clock face, answer digital
  { key:'d2a',   icon:'12:00', labelKey:'dirSet'  }, // shown a digital time, pick the face
  { key:'mixed', icon:'⇄',    labelKey:'mixed'   },
];

function clockStepForGrade(g) { return { 1:60, 2:30, 3:15, 4:5 }[g] || 1; }

function fmtClock(min) {
  min = ((min % 1440) + 1440) % 1440;
  return `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
}

function dayNightIcon(h24) { return h24 >= 6 && h24 < 18 ? '☀️' : '🌙'; }

function clockSVG(h24, m, opts = {}) {
  const { size = 200, hands = true } = opts;
  const r2 = v => Math.round(v * 100) / 100;
  const pt = (r, deg) => {
    const a = deg * Math.PI / 180;
    return [r2(50 + r * Math.sin(a)), r2(50 - r * Math.cos(a))];
  };
  let s = `<svg class="clock-svg" viewBox="0 0 100 100" width="${size}" height="${size}" role="img" aria-label="${fmtClock((h24 % 24) * 60 + m)}">`;
  s += `<circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" stroke-width="2.5"/>`;
  for (let i = 0; i < 60; i++) {
    const major = i % 5 === 0;
    const [x1, y1] = pt(major ? 41.5 : 44.5, i * 6);
    const [x2, y2] = pt(46.5, i * 6);
    s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="${major ? 2 : 0.8}"/>`;
  }
  for (let n = 1; n <= 12; n++) {
    const [x, y] = pt(34, n * 30);
    s += `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="9.5" font-weight="700" fill="currentColor" stroke="none">${n}</text>`;
  }
  // Day/night cue drawn before the hands so they stay readable on top
  s += `<text x="50" y="33" text-anchor="middle" dominant-baseline="central" font-size="10" stroke="none">${dayNightIcon(h24)}</text>`;
  if (hands) {
    const [hx, hy] = pt(20, ((h24 % 12) + m / 60) * 30);
    const [mx, my] = pt(31, m * 6);
    s += `<line x1="50" y1="50" x2="${hx}" y2="${hy}" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>`;
    s += `<line x1="50" y1="50" x2="${mx}" y2="${my}" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`;
  }
  s += `<circle cx="50" cy="50" r="2.5" fill="currentColor" stroke="none"/></svg>`;
  return s;
}

function generateClockQuestion() {
  const step = clockStepForGrade(selectedGrade);
  const minutes = randInt(0, 1440 / step - 1) * step;
  let direction = selectedClockDir;
  if (direction === 'mixed') direction = Math.random() < 0.5 ? 'a2d' : 'd2a';
  if (selectedMode === 'input') direction = 'a2d'; // a clock face can't be typed
  return { display: { h: Math.floor(minutes / 60), m: minutes % 60, direction }, answer: minutes };
}

function generateClockChoices(answer) {
  const h = Math.floor(answer / 60), m = answer % 60;
  const norm = v => ((v % 1440) + 1440) % 1440;
  // Classic misreadings, most valuable first once shuffled
  const cand = [norm(answer + 720)]; // day/night twin — the signature 24-hour mistake
  const swapped = norm(((Math.round(m / 5) % 12) * 60 + (h % 12) * 5) + (answer >= 720 ? 720 : 0));
  if (swapped !== answer) cand.push(swapped); // hour and minute hands swapped
  cand.push(norm(answer + 60), norm(answer - 60)); // hour hand misread by one
  if (m !== 0 && m !== 30) cand.push(norm(h * 60 + (60 - m))); // minute hand mirrored
  shuffle(cand);

  const choices = new Set([answer]);
  for (const c of cand) {
    if (choices.size >= 4) break;
    if (c !== answer) choices.add(c);
  }
  // Fallback offsets — at least 5 min apart so faces stay distinguishable
  const step = Math.max(clockStepForGrade(selectedGrade), 5);
  let tries = 0;
  while (choices.size < 4 && tries < 50) {
    const c = norm(answer + randInt(1, 6) * step * (Math.random() < 0.5 ? 1 : -1));
    if (c !== answer) choices.add(c);
    tries++;
  }
  return shuffle([...choices]);
}

// ══════════════════════════════════════════
// GEOMETRY CONFIG  (shapes & properties, perimeter, area)
// ══════════════════════════════════════════
// NOTE: never reorder SHAPES — 'name' answers are stored as indices (mistakes bank, logs)
const SHAPES = [
  { key:'circle',    sides:0,  corners:0,  minGrade:1 },
  { key:'triangle',  sides:3,  corners:3,  minGrade:1 },
  { key:'square',    sides:4,  corners:4,  minGrade:1 },
  { key:'rectangle', sides:4,  corners:4,  minGrade:1 },
  { key:'pentagon',  sides:5,  corners:5,  minGrade:2 },
  { key:'hexagon',   sides:6,  corners:6,  minGrade:2 },
  { key:'star',      sides:10, corners:10, minGrade:2 },
  { key:'oval',      sides:0,  corners:0,  minGrade:2 },
  { key:'octagon',   sides:8,  corners:8,  minGrade:4 },
  { key:'rhombus',   sides:4,  corners:4,  minGrade:4 },
];

const GEO_CATEGORIES = [
  { key:'shapes',    icon:'△', labelKey:'catShapes',    minGrade:1 },
  { key:'perimeter', icon:'□', labelKey:'catPerimeter', minGrade:3 },
  { key:'area',      icon:'▦', labelKey:'catArea',      minGrade:3 },
];

function geoShapePool(pred = () => true) {
  return SHAPES.map((s, i) => ({ ...s, idx: i })).filter(s => s.minGrade <= selectedGrade && pred(s));
}

function shapeNameByIdx(i) {
  const map = TRANSLATIONS[currentLang].shapeNames ?? TRANSLATIONS.en.shapeNames;
  const key = SHAPES[i] ? SHAPES[i].key : '?';
  return map[key] ?? key;
}

function geoPromptKey(display) {
  return display.kind === 'name' ? 'qNameShape'
    : display.kind === 'count' ? (display.countType === 'sides' ? 'qHowManySides' : 'qHowManyCorners')
    : display.kind === 'perimeter' ? 'qPerimeter' : 'qArea';
}

function shapeSVG(display, opts = {}) {
  const { size = 180 } = opts;
  const rr = v => Math.round(v * 100) / 100;
  const stroke = 'fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"';
  const poly  = pts => `<polygon points="${pts.map(p => p.map(rr).join(',')).join(' ')}" ${stroke}/>`;
  const label = (x, y, txt) => `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="8.5" font-weight="700" fill="currentColor" stroke="none">${txt}</text>`;
  const ngon  = (n, r, rot = -90) => Array.from({ length: n }, (_, i) => {
    const a = (rot + i * 360 / n) * Math.PI / 180;
    return [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
  });

  const d = display.dims || {};
  let vbW = 100, body = '';
  switch (display.kind === 'name' || display.kind === 'count' ? display.shape : `${display.shape}:${display.kind}`) {
    // ── Unlabeled shapes (name / count questions) ──
    case 'circle':    body = `<circle cx="50" cy="50" r="38" ${stroke}/>`; break;
    case 'oval':      body = `<ellipse cx="50" cy="50" rx="42" ry="26" ${stroke}/>`; break;
    case 'triangle':  body = poly(ngon(3, 40)); break;
    case 'square':    body = `<rect x="22" y="22" width="56" height="56" ${stroke}/>`; break;
    case 'rectangle': body = `<rect x="14" y="28" width="72" height="44" ${stroke}/>`; break;
    case 'pentagon':  body = poly(ngon(5, 40)); break;
    case 'hexagon':   body = poly(ngon(6, 40)); break;
    case 'octagon':   body = poly(ngon(8, 40, -90 + 22.5)); break;
    case 'rhombus':   body = poly([[50, 12], [86, 50], [50, 88], [14, 50]]); break;
    case 'star': {
      const pts = Array.from({ length: 10 }, (_, i) => {
        const a = (-90 + i * 36) * Math.PI / 180, r = i % 2 === 0 ? 42 : 17;
        return [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
      });
      body = poly(pts); break;
    }
    // ── Labeled figures (perimeter / area) ──
    case 'square:perimeter':
    case 'square:area':
      body = `<rect x="25" y="20" width="52" height="52" ${stroke}/>` + label(51, 84, `${d.s} cm`);
      break;
    case 'rectangle:perimeter':
    case 'rectangle:area': {
      const rh = Math.max(24, Math.min(50, 72 * d.h / d.w));
      const y0 = rr(46 - rh / 2);
      vbW = 126;
      body = `<rect x="10" y="${y0}" width="72" height="${rr(rh)}" ${stroke}/>`
        + label(46, rr(y0 + rh + 11), `${d.w} cm`)
        + label(101, 46, `${d.h} cm`);
      break;
    }
    case 'triangle:perimeter':
      body = poly([[15, 76], [85, 76], [58, 18]])
        + label(50, 89, `${d.a} cm`) + label(86, 42, `${d.b} cm`) + label(21, 42, `${d.c} cm`);
      break;
    case 'rtriangle:area':
      vbW = 114;
      body = poly([[30, 78], [98, 78], [30, 18]])
        + `<polyline points="30,70 38,70 38,78" ${stroke} stroke-width="1.2"/>`
        + label(64, 90, `${d.a} cm`) + label(13, 46, `${d.b} cm`);
      break;
    case 'parallelogram:area':
      vbW = 126;
      body = poly([[10, 74], [30, 26], [104, 26], [84, 74]])
        + `<line x1="30" y1="26" x2="30" y2="74" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>`
        + label(50, 86, `${d.w} cm`) + label(44, 50, `${d.h} cm`);
      break;
  }
  const h = Math.round(size * 100 / vbW);
  return `<svg class="geo-svg" viewBox="0 0 ${vbW} 100" width="${size}" height="${h}" role="img">${body}</svg>`;
}

function generateGeometryQuestion(category) {
  if (category === 'shapes') {
    if (Math.random() < 0.5) {
      const pool = geoShapePool();
      const pick = pool[randInt(0, pool.length - 1)];
      return { display: { kind: 'name', shape: pick.key }, answer: pick.idx };
    }
    const pool = geoShapePool(s => !['circle', 'oval', 'star'].includes(s.key));
    const pick = pool[randInt(0, pool.length - 1)];
    const countType = Math.random() < 0.5 ? 'sides' : 'corners';
    return { display: { kind: 'count', shape: pick.key, countType }, answer: pick[countType] };
  }
  const max = selectedGrade <= 3 ? 10 : selectedGrade <= 5 ? 20 : 50;
  const kind = category; // 'perimeter' | 'area'
  const shapes = ['rectangle', 'square'];
  if (kind === 'perimeter' && selectedGrade >= 4) shapes.push('triangle');
  if (kind === 'area' && selectedGrade >= 5) shapes.push('rtriangle');
  if (kind === 'area' && selectedGrade >= 6) shapes.push('parallelogram');
  const shape = shapes[randInt(0, shapes.length - 1)];
  let dims, answer;
  if (shape === 'square') {
    const s = randInt(2, max);
    dims = { s }; answer = kind === 'perimeter' ? 4 * s : s * s;
  } else if (shape === 'rectangle' || shape === 'parallelogram') {
    const w = randInt(3, max);
    const h = randInt(2, Math.max(2, Math.min(w - 1, max)));
    dims = { w, h }; answer = kind === 'perimeter' ? 2 * (w + h) : w * h;
  } else if (shape === 'rtriangle') {
    let a = randInt(2, max);
    const b = randInt(2, max);
    if ((a * b) % 2) a++; // keep the area an integer
    dims = { a, b }; answer = a * b / 2;
  } else { // triangle perimeter — sides must satisfy the triangle inequality
    const a = randInt(2, max), b = randInt(2, max);
    const c = randInt(Math.abs(a - b) + 1, a + b - 1);
    dims = { a, b, c }; answer = a + b + c;
  }
  return { display: { kind, shape, dims }, answer };
}

function generateGeometryChoices(answer, display) {
  if (display.kind === 'name') {
    const others = shuffle(geoShapePool().map(s => s.idx).filter(i => i !== answer));
    return shuffle([answer, ...others.slice(0, 3)]);
  }
  const choices = new Set([answer]);
  const add = v => { if (Number.isInteger(v) && v > 0 && v !== answer && choices.size < 4) choices.add(v); };
  const d = display.dims || {};
  if (display.kind === 'count') {
    shuffle([answer + 1, answer - 1, answer + 2, answer - 2, 3, 4, 5, 6, 8]).forEach(add);
  } else if (display.kind === 'perimeter') {
    // The classic mistake first: computed the area instead
    if (d.s != null) { add(d.s * d.s); add(d.s * 3); }
    if (d.w != null) { add(d.w * d.h); add(d.w + d.h); add(2 * d.w + d.h); }
    if (d.c != null) { add(d.a + d.b); }
    [answer + 2, answer - 2, answer + 4, answer - 4].forEach(add);
  } else { // area — classic mistake: computed the perimeter instead
    if (d.s != null) { add(4 * d.s); add(2 * d.s); }
    if (d.w != null) { add(2 * (d.w + d.h)); add(d.w + d.h); }
    if (d.a != null) { add(d.a * d.b); add(d.a + d.b); }
    [Math.round(answer * 1.2), Math.round(answer * 0.8), answer + 10, answer - 10].forEach(add);
  }
  let tries = 0;
  while (choices.size < 4 && tries < 50) {
    add(answer + randInt(1, 5) * (Math.random() < 0.5 ? 1 : -1));
    tries++;
  }
  return shuffle([...choices]);
}

// ══════════════════════════════════════════
// FRACTIONS & PERCENTAGES CONFIG
// ══════════════════════════════════════════
const FRACTION_CATEGORIES = [
  { key:'compare',    icon:'≷', labelKey:'catCompare',    minGrade:3 },
  { key:'fractionOf', icon:'¼', labelKey:'catFractionOf', minGrade:3 },
  { key:'rounding',   icon:'≈', labelKey:'catRounding',   minGrade:3 },
  { key:'equivalent', icon:'=', labelKey:'catEquivalent', minGrade:4 },
  { key:'addSub',     icon:'±', labelKey:'catAddSub',     minGrade:5 },
  { key:'percent',    icon:'%', labelKey:'catPercent',    minGrade:6 },
];

function fracDenMax() { return selectedGrade <= 4 ? 6 : selectedGrade <= 5 ? 10 : 12; }

function fracHTML(n, d) {
  return `<span class="frac"><span class="frac-n">${n}</span><span class="frac-d">${d}</span></span>`;
}

function generateFractionsQuestion(cat) {
  if (cat === 'compare') {
    const fr = [];
    if (selectedGrade <= 3) {
      // Same denominator — compare numerators
      const d = randInt(5, 9);
      const ns = new Set();
      while (ns.size < 4) ns.add(randInt(1, d - 1));
      [...ns].forEach(n => fr.push([n, d]));
    } else if (selectedGrade === 4) {
      // Same numerator — smaller denominator wins
      const n = randInt(1, 3);
      const ds = new Set();
      while (ds.size < 4) ds.add(randInt(n + 1, n + 6));
      [...ds].forEach(d => fr.push([n, d]));
    } else {
      // Mixed fractions with clearly distinct values
      const vals = [];
      while (fr.length < 4) {
        const d = randInt(2, fracDenMax()), n = randInt(1, d - 1);
        const v = n / d;
        if (!vals.some(x => Math.abs(x - v) < 0.04)) { vals.push(v); fr.push([n, d]); }
      }
    }
    let best = 0;
    fr.forEach((f, i) => { if (f[0] / f[1] > fr[best][0] / fr[best][1]) best = i; });
    return { display: { kind: 'compare', fr }, answer: best };
  }
  if (cat === 'fractionOf') {
    const d = randInt(2, fracDenMax());
    const n = randInt(1, d - 1);
    const x = d * randInt(2, selectedGrade <= 4 ? 6 : 12);
    return { display: { kind: 'fractionOf', n, d, x }, answer: n * x / d };
  }
  if (cat === 'rounding') {
    const to = selectedGrade <= 3 ? 10 : selectedGrade <= 5 ? [10, 100][randInt(0, 1)] : [10, 100, 1000][randInt(0, 2)];
    let nVal;
    do { nVal = randInt(to + 1, to * 10 - 1); } while (nVal % to === 0);
    return { display: { kind: 'rounding', nVal, to }, answer: Math.round(nVal / to) * to };
  }
  if (cat === 'equivalent') {
    const d = randInt(2, 6), n = randInt(1, d - 1), k = randInt(2, selectedGrade <= 5 ? 4 : 6);
    if (Math.random() < 0.5) {
      return { display: { kind: 'equivalent', ln: n * k, ld: d * k, rd: d }, answer: n };       // (nk)/(dk) = ?/d
    }
    return { display: { kind: 'equivalent', ln: n, ld: d, rd: d * k }, answer: n * k };         // n/d = ?/(dk)
  }
  if (cat === 'addSub') {
    const d = randInt(3, fracDenMax());
    if (Math.random() < 0.5) {
      const n1 = randInt(1, d - 2);
      const n2 = randInt(1, Math.max(1, d - n1 - 1));
      return { display: { kind: 'addSub', fop: '+', n1, n2, d }, answer: n1 + n2 };
    }
    const n1 = randInt(2, d - 1), n2 = randInt(1, n1 - 1);
    return { display: { kind: 'addSub', fop: '−', n1, n2, d }, answer: n1 - n2 };
  }
  // percent — friendly percentages with whole-number answers
  const pSet = selectedGrade <= 6 ? [50, 25, 10] : selectedGrade <= 7 ? [50, 25, 10, 75, 20, 5] : [50, 25, 10, 75, 20, 5, 1, 30, 90];
  const p = pSet[randInt(0, pSet.length - 1)];
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const base = 100 / gcd(p, 100);
  const x = base * randInt(1, Math.max(2, Math.floor((selectedGrade <= 7 ? 200 : 600) / base)));
  return { display: { kind: 'percent', p, x }, answer: p * x / 100 };
}

function generateFractionsChoices(answer, display) {
  if (display.kind === 'compare') return [0, 1, 2, 3]; // the four rendered fractions, answer = index
  const choices = new Set([answer]);
  const add = v => { if (Number.isInteger(v) && v > 0 && v !== answer && choices.size < 4) choices.add(v); };
  if (display.kind === 'fractionOf') {
    add(Math.round(display.x / display.d));   // took one part instead of n
    add(display.x - display.n);               // subtracted instead
    add(answer + display.n); add(answer - display.n);
  } else if (display.kind === 'rounding') {
    add(answer + display.to); add(answer - display.to);
    add(Math.floor(display.nVal / display.to) * display.to);  // truncated instead of rounded
    add(display.nVal);
  } else if (display.kind === 'equivalent') {
    add(answer + 1); add(answer - 1); add(display.ln); add(display.rd);
  } else if (display.kind === 'addSub') {
    add(answer + 1); add(answer - 1);
    add(display.n1 + display.n2 + display.d); // "added the denominators too"
    add(display.fop === '+' ? Math.abs(display.n1 - display.n2) : display.n1 + display.n2);
  } else { // percent — order-of-magnitude and wrong-operation slips
    add(answer * 10); add(Math.round(answer / 10));
    add(display.x - display.p); add(answer + display.p);
  }
  let tries = 0;
  while (choices.size < 4 && tries < 50) {
    add(answer + randInt(1, 5) * (Math.random() < 0.5 ? 1 : -1));
    tries++;
  }
  return shuffle([...choices]);
}

const CONV_CATEGORIES = [
  { key:'length', icon:'m',   labelKey:'catLength', minGrade:1 },
  { key:'weight', icon:'kg',  labelKey:'catWeight', minGrade:1 },
  { key:'volume', icon:'l',   labelKey:'catVolume', minGrade:1 },
  { key:'time',   icon:'t',   labelKey:'catTime',   minGrade:1 },
  { key:'area',   icon:'m²',  labelKey:'catArea',   minGrade:7 },
];

const OP_META_KEYS = {
  addition: 'addition', subtraction: 'subtraction',
  multiplication: 'multiplication', division: 'division',
  mixed: 'mixed', word: 'wordProblems',
};
const OP_SYMBOLS = { addition:'+', subtraction:'−', multiplication:'×', division:'÷', mixed:'±', word:'📖' };
const MATH_OPS   = ['addition', 'subtraction', 'multiplication', 'division'];

// ══════════════════════════════════════════
// WORD PROBLEMS  (template-based story problems)
// ══════════════════════════════════════════
const WORD_NAMES = ['Emma', 'Noah', 'Ida', 'Oscar', 'Alma', 'Theo']; // work in both languages
const WORD_ITEMS = {
  en: ['apples', 'marbles', 'stickers', 'cards', 'books', 'coins'],
  da: ['æbler', 'kugler', 'klistermærker', 'kort', 'bøger', 'mønter'],
};
const WORD_TEMPLATES = {
  en: {
    addition: [
      (a, b, n, i) => `${n} has ${a} ${i}. A friend gives ${n} ${b} more. How many ${i} does ${n} have now?`,
      (a, b, n, i) => `There are ${a} ${i} in one box and ${b} ${i} in another. How many ${i} are there in total?`,
      (a, b, n, i) => `${n} collected ${a} ${i} on Monday and ${b} ${i} on Tuesday. How many ${i} did ${n} collect in all?`,
      (a, b, n, i) => `A shop sold ${a} ${i} in the morning and ${b} ${i} in the afternoon. How many ${i} were sold that day?`,
    ],
    subtraction: [
      (a, b, n, i) => `${n} has ${a} ${i} and gives ${b} of them away. How many ${i} does ${n} have left?`,
      (a, b, n, i) => `There were ${a} ${i} in a jar. ${b} ${i} were taken out. How many ${i} are left in the jar?`,
      (a, b, n, i) => `${n} needs ${a} ${i} and already has ${b} ${i}. How many more ${i} does ${n} need?`,
      (a, b, n, i) => `A box held ${a} ${i}, but ${b} ${i} were lost. How many ${i} remain?`,
    ],
    multiplication: [
      (a, b, n, i) => `${n} has ${b} bags with ${a} ${i} in each bag. How many ${i} does ${n} have in total?`,
      (a, b, n, i) => `There are ${b} shelves with ${a} ${i} on each shelf. How many ${i} are there altogether?`,
      (a, b, n, i) => `${n} buys ${b} packs of ${i}. Each pack holds ${a} ${i}. How many ${i} is that?`,
      (a, b, n, i) => `Every day for ${b} days, ${n} finds ${a} ${i}. How many ${i} does ${n} find in total?`,
    ],
    division: [
      (a, b, n, i) => `${n} shares ${a} ${i} equally among ${b} friends. How many ${i} does each friend get?`,
      (a, b, n, i) => `${a} ${i} are packed into boxes of ${b} ${i} each. How many boxes are filled?`,
      (a, b, n, i) => `${n} splits ${a} ${i} into ${b} equal piles. How many ${i} are in each pile?`,
      (a, b, n, i) => `A class of ${b} children shares ${a} ${i} fairly. How many ${i} does each child get?`,
    ],
  },
  da: {
    addition: [
      (a, b, n, i) => `${n} har ${a} ${i}. En ven giver ${n} ${b} mere. Hvor mange ${i} har ${n} nu?`,
      (a, b, n, i) => `Der er ${a} ${i} i én kasse og ${b} ${i} i en anden. Hvor mange ${i} er der i alt?`,
      (a, b, n, i) => `${n} samlede ${a} ${i} mandag og ${b} ${i} tirsdag. Hvor mange ${i} samlede ${n} i alt?`,
      (a, b, n, i) => `En butik solgte ${a} ${i} om formiddagen og ${b} ${i} om eftermiddagen. Hvor mange ${i} blev der solgt den dag?`,
    ],
    subtraction: [
      (a, b, n, i) => `${n} har ${a} ${i} og giver ${b} af dem væk. Hvor mange ${i} har ${n} tilbage?`,
      (a, b, n, i) => `Der var ${a} ${i} i et glas. ${b} ${i} blev taget op. Hvor mange ${i} er der tilbage i glasset?`,
      (a, b, n, i) => `${n} skal bruge ${a} ${i} og har allerede ${b} ${i}. Hvor mange flere ${i} mangler ${n}?`,
      (a, b, n, i) => `En kasse indeholdt ${a} ${i}, men ${b} ${i} blev væk. Hvor mange ${i} er der tilbage?`,
    ],
    multiplication: [
      (a, b, n, i) => `${n} har ${b} poser med ${a} ${i} i hver pose. Hvor mange ${i} har ${n} i alt?`,
      (a, b, n, i) => `Der er ${b} hylder med ${a} ${i} på hver hylde. Hvor mange ${i} er der i alt?`,
      (a, b, n, i) => `${n} køber ${b} pakker med ${i}. Hver pakke indeholder ${a} ${i}. Hvor mange ${i} er det?`,
      (a, b, n, i) => `Hver dag i ${b} dage finder ${n} ${a} ${i}. Hvor mange ${i} finder ${n} i alt?`,
    ],
    division: [
      (a, b, n, i) => `${n} deler ${a} ${i} ligeligt mellem ${b} venner. Hvor mange ${i} får hver ven?`,
      (a, b, n, i) => `${a} ${i} pakkes i kasser med ${b} ${i} i hver. Hvor mange kasser bliver fyldt?`,
      (a, b, n, i) => `${n} deler ${a} ${i} i ${b} lige store bunker. Hvor mange ${i} er der i hver bunke?`,
      (a, b, n, i) => `En klasse med ${b} børn deler ${a} ${i} ligeligt. Hvor mange ${i} får hvert barn?`,
    ],
  },
};

function wordText(display) {
  const lang  = WORD_TEMPLATES[currentLang] ? currentLang : 'en';
  const tpls  = WORD_TEMPLATES[lang][display.op];
  const items = WORD_ITEMS[lang] ?? WORD_ITEMS.en;
  return tpls[display.tpl % tpls.length](
    display.a, display.b,
    WORD_NAMES[display.name % WORD_NAMES.length],
    items[display.item % items.length]
  );
}

function generateWordQuestion() {
  const op = MATH_OPS[randInt(0, MATH_OPS.length - 1)];
  // Readability clamp — stories stay at 3-digit numbers even at high grades
  const savedGrade = selectedGrade;
  selectedGrade = Math.min(selectedGrade, 4);
  const base = generateQuestion(op);
  selectedGrade = savedGrade;
  return {
    display: {
      kind: 'word', op, a: base.display.a, b: base.display.b,
      name: randInt(0, WORD_NAMES.length - 1),
      item: randInt(0, WORD_ITEMS.en.length - 1),
      tpl:  randInt(0, WORD_TEMPLATES.en[op].length - 1),
    },
    answer: base.answer,
    opUsed: op,
  };
}
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
let sessionScore  = 0;
let currentAnswer = null;
let answered      = false;
let sessionLog    = [];
let numpadValue   = '';

let usedEquations     = new Set();
let sessionStartTime  = null;
let questionStartTime = null;
let sessionTimerID    = null;

let allSessions = [];
let historyExpanded = false;
let detailIndex = null;
let practiceType     = 'math';
let selectedCategory = null;
let selectedTable    = null;
let selectedClockDir = null;
let selectedGeoCat   = null;
let selectedFracCat  = null;
let mistakesQueue    = [];
let quizEpoch        = 0; // bumped per session so stale timers from a stopped quiz can't fire into a new one

// ══════════════════════════════════════════
// SCORING
// ══════════════════════════════════════════
function calcQuestionScore(mode, grade, elapsedMs, wasCorrect, type='math') {
  if (!wasCorrect) return 0;
  const base      = grade * 10;
  const budgetMs  = (type === 'conversions' || type === 'clock' || type === 'geometry' || type === 'fractions' || mode === 'input')
    ? (6 + grade * 1.5) * 1000
    : (3 + grade * 0.5) * 1000;
  const multiplier = Math.min(2, Math.max(0.5, budgetMs / Math.max(elapsedMs, 1)));
  return Math.round(base * multiplier);
}
function calcMaxScore(mode, grade, totalQ) { return totalQ * grade * 10 * 2; }
function pbKey(op, grade, mode) { return `mathroot-pb-${op}-${grade}-${mode}`; }
function getPersonalBest(op, grade, mode) { return parseInt(localStorage.getItem(pbKey(op, grade, mode)) || '0', 10); }
function setPersonalBest(op, grade, mode, score) { localStorage.setItem(pbKey(op, grade, mode), String(score)); }

// ══════════════════════════════════════════
// STREAK & DAILY GOAL
// ══════════════════════════════════════════
const DAILY_GOAL = 20; // answered questions per day (right or wrong — effort counts)

function localDateStr(d = new Date()) { return d.toLocaleDateString('sv'); } // YYYY-MM-DD in local time
function yesterdayStr() { const d = new Date(); d.setDate(d.getDate() - 1); return localDateStr(d); }

function getStreakState() {
  const s  = store.get('mathroot-streak', {}) || {};
  const st = {
    current:           s.current || 0,
    best:              s.best || 0,
    lastCompletedDate: s.lastCompletedDate || '',
    todayDate:         s.todayDate || '',
    todayCount:        s.todayCount || 0,
  };
  const today = localDateStr();
  if (st.todayDate !== today) { st.todayDate = today; st.todayCount = 0; }
  if (st.lastCompletedDate !== today && st.lastCompletedDate !== yesterdayStr()) st.current = 0;
  return st;
}

function bumpStreak() {
  const st = getStreakState();
  st.todayCount++;
  if (st.todayCount === DAILY_GOAL && st.lastCompletedDate !== st.todayDate) {
    st.current = st.lastCompletedDate === yesterdayStr() ? st.current + 1 : 1;
    st.best    = Math.max(st.best, st.current);
    st.lastCompletedDate = st.todayDate;
    launchConfetti();
  }
  store.set('mathroot-streak', st);
}

function renderStreak() {
  const el = $('streak-bar');
  if (!el) return;
  const st = getStreakState();
  if (st.todayCount === 0 && st.best === 0) { el.style.display = 'none'; return; }
  el.style.display = '';
  $('streak-days').textContent  = t('streakDays')(st.current);
  $('streak-today').textContent = t('todayProgress')(st.todayCount, DAILY_GOAL);
  $('streak-progress-inner').style.width = `${Math.min(100, (st.todayCount / DAILY_GOAL) * 100)}%`;
}

// ══════════════════════════════════════════
// MISTAKES BANK
// ══════════════════════════════════════════
const MAX_MISTAKES = 100;

function loadMistakes() {
  const m = store.get('mathroot-mistakes', []);
  return Array.isArray(m) ? m : [];
}
function saveMistakesBank(bank) { store.set('mathroot-mistakes', bank.slice(-MAX_MISTAKES)); }

function addMistake(cq) {
  if (!cq || !cq.key || cq.answer == null) return;
  const bank = loadMistakes();
  const existing = bank.find(e => e.key === cq.key);
  if (existing) {
    existing.timesWrong = (existing.timesWrong || 0) + 1;
    existing.lastMissed = Date.now();
  } else {
    bank.push({
      key: cq.key, display: cq.display, answer: cq.answer,
      practiceType: cq.practiceType, opUsed: cq.opUsed || null, category: cq.category || null,
      grade: cq.grade, timesWrong: 1, lastMissed: Date.now(),
    });
  }
  saveMistakesBank(bank);
}

function removeMistake(key) {
  saveMistakesBank(loadMistakes().filter(e => e.key !== key));
  const stats = loadStats();
  stats.mistakesMastered++;
  saveStats(stats);
}

function renderMistakesButton() {
  const row = $('mistakes-row');
  if (!row) return;
  const n = loadMistakes().length;
  row.style.display = n > 0 ? '' : 'none';
  if (n > 0) $('mistakes-label').textContent = t('practiceMistakes')(n);
}

function startMistakesQuiz() {
  const bank = loadMistakes();
  if (bank.length === 0) return;
  mistakesQueue = shuffle([...bank]).slice(0, 20);
  practiceType  = 'mistakes';
  totalQ        = mistakesQueue.length;
  startQuiz();
}

// ══════════════════════════════════════════
// LIFETIME STATS & BADGES
// ══════════════════════════════════════════
function loadStats() {
  const s = store.get('mathroot-stats', {}) || {};
  return {
    questionsAnswered: s.questionsAnswered || 0,
    sessionsCompleted: s.sessionsCompleted || 0,
    mistakesMastered:  s.mistakesMastered  || 0,
    typesPlayed:     Array.isArray(s.typesPlayed)     ? s.typesPlayed     : [],
    gradesPlayed:    Array.isArray(s.gradesPlayed)    ? s.gradesPlayed    : [],
    tablesPerfected: Array.isArray(s.tablesPerfected) ? s.tablesPerfected : [],
  };
}
function saveStats(s) { store.set('mathroot-stats', s); }
function loadBadges() { const b = store.get('mathroot-badges', {}) || {}; return { earned: b.earned || {} }; }
function saveBadges(b) { store.set('mathroot-badges', b); }

// check(stats, session, streak) — session is the just-saved session (may be cancelled)
const BADGES = [
  { id:'first-session',    icon:'🎈', nameKey:'badgeFirstSession',    descKey:'badgeFirstSessionDesc',    check:(st)=>st.sessionsCompleted>=1 },
  { id:'perfect-10',       icon:'🏆', nameKey:'badgePerfect10',       descKey:'badgePerfect10Desc',       check:(st,se)=>!!se&&!se.cancelled&&se.pct===100&&se.totalQ>=10 },
  { id:'perfect-marathon', icon:'👑', nameKey:'badgePerfectMarathon', descKey:'badgePerfectMarathonDesc', check:(st,se)=>!!se&&!se.cancelled&&se.pct===100&&se.totalQ>=40 },
  { id:'q-100',            icon:'💯', nameKey:'badgeQ100',            descKey:'badgeQ100Desc',            check:(st)=>st.questionsAnswered>=100 },
  { id:'q-500',            icon:'🚀', nameKey:'badgeQ500',            descKey:'badgeQ500Desc',            check:(st)=>st.questionsAnswered>=500 },
  { id:'q-1000',           icon:'🌟', nameKey:'badgeQ1000',           descKey:'badgeQ1000Desc',           check:(st)=>st.questionsAnswered>=1000 },
  { id:'streak-3',         icon:'🔥', nameKey:'badgeStreak3',         descKey:'badgeStreak3Desc',         check:(st,se,str)=>str.best>=3 },
  { id:'streak-7',         icon:'⚡', nameKey:'badgeStreak7',         descKey:'badgeStreak7Desc',         check:(st,se,str)=>str.best>=7 },
  { id:'streak-30',        icon:'🌈', nameKey:'badgeStreak30',        descKey:'badgeStreak30Desc',        check:(st,se,str)=>str.best>=30 },
  { id:'explorer',         icon:'🧭', nameKey:'badgeExplorer',        descKey:'badgeExplorerDesc',        check:(st)=>['math','conversions','times-table','clock','geometry','fractions'].every(x=>st.typesPlayed.includes(x)) },
  { id:'comeback',         icon:'💪', nameKey:'badgeComeback',        descKey:'badgeComebackDesc',        check:(st)=>st.mistakesMastered>=10 },
  { id:'lightning',        icon:'🏎️', nameKey:'badgeLightning',       descKey:'badgeLightningDesc',       check:(st,se)=>!!se&&!se.cancelled&&se.answeredCount>=10&&se.avgMs<3000&&se.pct>=80 },
  { id:'table-master',     icon:'✖️', nameKey:'badgeTableMaster',     descKey:'badgeTableMasterDesc',     check:(st)=>st.tablesPerfected.length>=1 },
  { id:'grade-climber',    icon:'🧗', nameKey:'badgeGradeClimber',    descKey:'badgeGradeClimberDesc',    check:(st)=>st.gradesPlayed.length>=3 },
];

function recordSessionAndAwardBadges(session) {
  const stats = loadStats();
  stats.questionsAnswered += session.answeredCount;
  if (!session.cancelled) {
    stats.sessionsCompleted++;
    if (!stats.gradesPlayed.includes(session.grade)) stats.gradesPlayed.push(session.grade);
    if (session.practiceType === 'times-table' && session.pct === 100 && !stats.tablesPerfected.includes(session.table)) {
      stats.tablesPerfected.push(session.table);
    }
  }
  if (!stats.typesPlayed.includes(session.practiceType)) stats.typesPlayed.push(session.practiceType);
  saveStats(stats);

  const badges = loadBadges();
  const streak = getStreakState();
  const newly  = [];
  for (const b of BADGES) {
    if (badges.earned[b.id]) continue;
    if (b.check(stats, session, streak)) {
      badges.earned[b.id] = Date.now();
      newly.push(b);
    }
  }
  if (newly.length) saveBadges(badges);
  return newly;
}

function renderBadges() {
  const grid = $('badges-grid');
  if (!grid) return;
  const earned = loadBadges().earned;
  $('badges-count').textContent = `${BADGES.filter(b => earned[b.id]).length}/${BADGES.length}`;
  grid.innerHTML = BADGES.map(b => {
    const ts = earned[b.id];
    return `<div class="badge-chip${ts ? '' : ' badge-locked'}" title="${t(b.descKey)}">
      <span class="badge-icon">${b.icon}</span>
      <div class="badge-info">
        <div class="badge-name">${t(b.nameKey)}</div>
        <div class="badge-sub">${ts ? fmtDate(ts) : t(b.descKey)}</div>
      </div>
    </div>`;
  }).join('');
}

// ══════════════════════════════════════════
// CONVERSION HELPERS
// ══════════════════════════════════════════
function cvtFmt(v) { return v % 1 === 0 ? String(v) : v.toFixed(1); }
function unitLabel(unit, value) {
  const map = TRANSLATIONS[currentLang].unitLabels ?? TRANSLATIONS.en.unitLabels;
  const lbl = map[unit] ?? unit;
  if (typeof lbl === 'string') return lbl;
  return value === 1 ? lbl.s : lbl.p;
}

function generateConversionQuestion(category) {
  const pairs = CONVERSION_PAIRS[category].filter(p => p.minGrade <= selectedGrade);
  const pair  = pairs[Math.floor(Math.random() * pairs.length)];
  const steps = randInt(Math.round(pair.valueMin / pair.valueStep), Math.round(pair.valueMax / pair.valueStep));
  const fromValue = Math.round(steps * pair.valueStep * 1000) / 1000;
  const answer    = Math.round(fromValue * pair.factor * 10) / 10;
  return { display: { fromValue, fromUnit: pair.from, toUnit: pair.to, factor: pair.factor }, answer };
}

function generateConversionChoices(answer, display) {
  const choices = new Set([answer]);

  // One classic order-of-magnitude mistake (÷10 of answer = used wrong power of 10)
  const r1 = v => Math.round(v * 10) / 10;
  const magErr = r1(answer / 10);
  if (magErr > 0 && magErr !== answer) choices.add(magErr);

  // Two numerically-close distractors — same order of magnitude as the answer
  const step = Math.max(0.1, Math.pow(10, Math.floor(Math.log10(Math.max(answer, 0.1))) - 1));
  let tries = 0;
  while (choices.size < 4 && tries < 80) {
    const pct  = 0.1 + Math.random() * 0.3;           // 10–40 % offset
    const dir  = Math.random() < 0.5 ? 1 : -1;
    const raw  = answer * (1 + dir * pct);
    const c    = r1(Math.round(raw / step) * step);
    if (c > 0 && c !== answer) choices.add(c);
    tries++;
  }
  return shuffle([...choices].slice(0, 4));
}

function buildCategoryGrid() {
  const grid = $('conv-grid');
  if (!grid) return;
  grid.innerHTML = CONV_CATEGORIES.map(cat => {
    const eligible   = CONVERSION_PAIRS[cat.key].some(p => p.minGrade <= selectedGrade);
    const activeClass = selectedCategory === cat.key ? ' active' : '';
    const clickAttr   = eligible ? `onclick="selectCategory(this)"` : '';
    return `<div class="op-card conv-cat-card${activeClass}${eligible ? '' : ' conv-cat-disabled'}" data-cat="${cat.key}" ${clickAttr}>
      <span class="op-symbol conv-cat-icon">${cat.icon}</span>
      <div class="op-name">${t(cat.labelKey)}</div>
    </div>`;
  }).join('');
  if (selectedCategory && !CONVERSION_PAIRS[selectedCategory].some(p => p.minGrade <= selectedGrade)) {
    selectedCategory = null;
    if (practiceType === 'conversions') $('start-btn').disabled = true;
  }
}

function selectPracticeType(el) {
  document.querySelectorAll('.practice-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  practiceType = el.dataset.type;
  selectedOp = null; selectedCategory = null; selectedTable = null; selectedClockDir = null; selectedGeoCat = null; selectedFracCat = null;
  $('start-btn').disabled = true;
  document.querySelectorAll('.op-card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.times-card').forEach(c => c.classList.remove('active'));
  $('op-grid-wrap').style.display     = practiceType === 'math' ? '' : 'none';
  $('conv-grid-wrap').style.display   = practiceType === 'conversions' ? '' : 'none';
  $('times-grid-wrap').style.display  = practiceType === 'times-table' ? '' : 'none';
  $('clock-grid-wrap').style.display  = practiceType === 'clock' ? '' : 'none';
  $('geo-grid-wrap').style.display    = practiceType === 'geometry' ? '' : 'none';
  $('frac-grid-wrap').style.display   = practiceType === 'fractions' ? '' : 'none';
}

function buildFractionsGrid() {
  const grid = $('frac-grid');
  if (!grid) return;
  grid.innerHTML = FRACTION_CATEGORIES.map(cat => {
    const eligible    = cat.minGrade <= selectedGrade;
    const activeClass = selectedFracCat === cat.key ? ' active' : '';
    return `<div class="op-card conv-cat-card frac-cat-card${activeClass}${eligible ? '' : ' conv-cat-disabled'}" data-cat="${cat.key}" ${eligible ? 'onclick="selectFracCat(this)"' : ''}>
      <span class="op-symbol conv-cat-icon">${cat.icon}</span>
      <div class="op-name">${t(cat.labelKey)}</div>
    </div>`;
  }).join('');
  if (selectedFracCat && FRACTION_CATEGORIES.find(c => c.key === selectedFracCat).minGrade > selectedGrade) {
    selectedFracCat = null;
    if (practiceType === 'fractions') $('start-btn').disabled = true;
  }
}

function selectFracCat(el) {
  document.querySelectorAll('.frac-cat-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  selectedFracCat = el.dataset.cat;
  $('start-btn').disabled = false;
}

function buildGeoGrid() {
  const grid = $('geo-grid');
  if (!grid) return;
  grid.innerHTML = GEO_CATEGORIES.map(cat => {
    const eligible    = cat.minGrade <= selectedGrade;
    const activeClass = selectedGeoCat === cat.key ? ' active' : '';
    return `<div class="op-card conv-cat-card geo-cat-card${activeClass}${eligible ? '' : ' conv-cat-disabled'}" data-cat="${cat.key}" ${eligible ? 'onclick="selectGeoCat(this)"' : ''}>
      <span class="op-symbol conv-cat-icon">${cat.icon}</span>
      <div class="op-name">${t(cat.labelKey)}</div>
    </div>`;
  }).join('');
  if (selectedGeoCat && GEO_CATEGORIES.find(c => c.key === selectedGeoCat).minGrade > selectedGrade) {
    selectedGeoCat = null;
    if (practiceType === 'geometry') $('start-btn').disabled = true;
  }
}

function selectGeoCat(el) {
  document.querySelectorAll('.geo-cat-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  selectedGeoCat = el.dataset.cat;
  $('start-btn').disabled = false;
}

function buildClockGrid() {
  const grid = $('clock-grid');
  if (!grid) return;
  grid.innerHTML = CLOCK_DIRS.map(d => {
    // A clock face can't be typed, so digital→analog is quiz-only
    const disabled    = selectedMode === 'input' && d.key === 'd2a';
    const activeClass = selectedClockDir === d.key ? ' active' : '';
    return `<div class="op-card clock-dir-card${activeClass}${disabled ? ' conv-cat-disabled' : ''}" data-dir="${d.key}" ${disabled ? '' : 'onclick="selectClockDir(this)"'}>
      <span class="op-symbol clock-dir-icon">${d.icon}</span>
      <div class="op-name">${t(d.labelKey)}</div>
    </div>`;
  }).join('');
  if (selectedMode === 'input' && selectedClockDir === 'd2a') {
    selectedClockDir = null;
    if (practiceType === 'clock') $('start-btn').disabled = true;
  }
}

function selectClockDir(el) {
  document.querySelectorAll('.clock-dir-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  selectedClockDir = el.dataset.dir;
  $('start-btn').disabled = false;
}

function selectCategory(el) {
  document.querySelectorAll('.conv-cat-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  selectedCategory = el.dataset.cat;
  $('start-btn').disabled = false;
}

function buildTimesTableGrid() {
  const grid = $('times-grid');
  if (!grid) return;
  grid.innerHTML = Array.from({ length: 20 }, (_, i) => i + 1).map(n => {
    const active = selectedTable === n ? ' active' : '';
    return `<div class="times-card${active}" data-table="${n}" onclick="selectTimesTable(this)">${n}</div>`;
  }).join('');
}

function selectTimesTable(el) {
  document.querySelectorAll('.times-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  selectedTable = parseInt(el.dataset.table, 10);
  $('start-btn').disabled = false;
}

function generateTimesTableQuestion() {
  const factor = randInt(1, 12);
  const flipOrder = Math.random() < 0.5;
  const a = flipOrder ? factor : selectedTable;
  const b = flipOrder ? selectedTable : factor;
  return { display: { a, op: '×', b }, answer: selectedTable * factor, opUsed: 'multiplication' };
}

function equationKey(display, type) {
  if (display && display.kind === 'word') return `word:${display.op}:${display.a}:${display.b}`;
  if (type === 'clock') return `clock:${display.direction}:${display.h}:${display.m}`;
  if (type === 'geometry') return `geo:${display.kind}:${display.shape}:${display.countType || ''}:${JSON.stringify(display.dims || {})}`;
  if (type === 'conversions') return `${display.fromValue}${display.fromUnit}>${display.toUnit}`;
  // Normalize commutative ops so "3+5" and "5+3" count as the same question
  if (display.op === '+' || display.op === '×') {
    return `${Math.min(display.a, display.b)}${display.op}${Math.max(display.a, display.b)}`;
  }
  return `${display.a}${display.op}${display.b}`;
}

function renderConvRefBox() {
  const box = $('conv-ref-box');
  if (!box) return;
  if (practiceType !== 'conversions' || !selectedCategory) { box.style.display = 'none'; return; }
  $('conv-ref-title').textContent = t('convReference');
  const refs = CONV_REFS[selectedCategory] || [];
  $('conv-ref-list').innerHTML = refs.map(r =>
    `<span class="conv-ref-item">1 ${unitLabel(r.fromUnit, 1)} = ${r.to.toLocaleString()} ${unitLabel(r.toUnit, r.to)}</span>`
  ).join('');
  box.style.display = '';
}

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
  buildCategoryGrid();
  buildClockGrid();
  buildGeoGrid();
  buildFractionsGrid();
  selectGrade(selectedGrade, false); // refresh pills without closing menu

  // Re-render quiz section dynamic text if visible
  if ($('quiz-section').classList.contains('visible')) {
    $('q-label').textContent = t('questionOf')(currentQ + 1, totalQ);
    renderConvRefBox();
  }

  // Re-render result section if visible
  if ($('result-section').classList.contains('visible') && allSessions.length > 0) {
    refreshResultSection(allSessions[0]);
  }

  // Re-render detail section if visible
  if ($('detail-section').classList.contains('visible') && detailIndex !== null) {
    openDetail(detailIndex);
  }

  // Re-render history list
  renderHistory();
  renderStreak();
  renderMistakesButton();
  renderBadges();

  // Rebuild print config UI if open (it uses t() inline)
  const pcs = $('print-config-section');
  if (pcs && pcs.style.display !== 'none' && pcs.innerHTML) buildPrintConfigUI();
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
  store.set('mathroot-lang', lang);
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
  store.set('mathroot-grade', g);
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
  buildCategoryGrid();
  buildGeoGrid();
  buildFractionsGrid();
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
  savePrefs();
}
function selectMode(el) {
  document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  selectedMode = el.dataset.mode;
  savePrefs();
  buildClockGrid(); // d2a availability depends on input mode
}
function savePrefs() { store.set('mathroot-prefs', { count: totalQ, mode: selectedMode }); }

// ══════════════════════════════════════════
// QUESTION GENERATION
// ══════════════════════════════════════════
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// Fisher–Yates — shuffles in place and returns the array
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateQuestion(op) {
  if (op === 'word') return generateWordQuestion();
  if (op === 'mixed') op = MATH_OPS[randInt(0, MATH_OPS.length - 1)];
  const cfg = GRADE_CONFIG[selectedGrade];
  let a, b, answer, display;
  switch (op) {
    case 'addition':      { const r=cfg.add; a=randInt(r.aMin,r.aMax); b=randInt(r.bMin,r.bMax); answer=a+b; display={a,op:'+',b}; break; }
    case 'subtraction':   { const r=cfg.sub; a=randInt(r.aMin,r.aMax); b=randInt(r.bMin,Math.min(r.bMax,a-1)); answer=a-b; display={a,op:'−',b}; break; }
    case 'multiplication':{ const r=cfg.mul; a=randInt(r.aMin,r.aMax); b=randInt(r.bMin,r.bMax); answer=a*b; display={a,op:'×',b}; break; }
    case 'division':      { const r=cfg.div; const dv=randInt(r.dMin,r.dMax); const qt=randInt(r.qMin,r.qMax); a=dv*qt; answer=qt; b=dv; display={a,op:'÷',b}; break; }
  }
  return { display, answer, opUsed: op };
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
    // Addition / subtraction: generate close distractors that mimic
    // common arithmetic mistakes (carry errors, off-by-ten, etc.)
    const offsets = [];

    // Small offsets: ±1 to ±9 (ones-place mistakes)
    for (let d = 1; d <= 9; d++) { offsets.push(d, -d); }

    // Tens-place mistakes: ±10, ±20, ±30 …
    for (let d = 10; d <= 50; d += 10) { offsets.push(d, -d); }

    // Carry/borrow errors: ±100, ±200
    if (answer > 200) { offsets.push(100, -100, 200, -200); }

    // Shuffle and pick distractors close to the answer
    shuffle(offsets);

    for (const o of offsets) {
      if (choices.size >= 4) break;
      const c = answer + o;
      if (c > 0 && c !== answer) choices.add(c);
    }

    // Fallback: if we still need more, use very small random offsets
    let tries = 0;
    while (choices.size < 4 && tries < 50) {
      const c = answer + randInt(1, 20) * (Math.random() < 0.5 ? 1 : -1);
      if (c > 0 && c !== answer) choices.add(c);
      tries++;
    }
  }
  return shuffle([...choices]);
}

// ══════════════════════════════════════════
// QUIZ FLOW
// ══════════════════════════════════════════
function startQuiz() {
  quizEpoch++;
  currentQ=0; correct=0; wrong=0; sessionScore=0; sessionLog=[]; usedEquations=new Set();
  $('home-section').style.display='none';
  hide('detail-section'); show('quiz-section'); hide('result-section');
  $('session-timer').textContent='0:00';
  startSessionClock(); updateScorebar(); renderConvRefBox(); renderQuestion();
}

function renderQuestion() {
  // Block input until the new question is live — the old card (and its still-active
  // buttons, e.g. after a cancelled session) stays on screen during the exit animation,
  // and a tap there would register against the stale question
  answered = true;

  const card = $('question-card');

  // Animate the card out, swap content while invisible, animate back in.
  // This ensures the new buttons are never at the same screen coordinates
  // as the tap when iOS processes its pending touch events.
  card.classList.add('card-exit');

  const epoch = quizEpoch;
  setTimeout(() => {
    if (epoch !== quizEpoch || !$('quiz-section').classList.contains('visible')) return;
    // ── Reset state while card is invisible ───────────────────────────────
    answered = false;
    questionStartTime = Date.now();
    card.classList.remove('correct', 'wrong', 'card-exit');
    const fb = $('feedback-msg');
    fb.textContent = ''; fb.className = 'feedback';

    // ── Replace choices grid ─────────────────────────────────────────────
    const oldGrid = $('choices-grid');
    const newGrid = document.createElement('div');
    newGrid.id        = 'choices-grid';
    newGrid.className = 'choices-grid';
    oldGrid.replaceWith(newGrid);

    // ── Generate new question ────────────────────────────────────────────
    let q, eqKey, qType;
    if (practiceType === 'mistakes') {
      // Mistakes sessions replay stored questions instead of generating new ones
      q = mistakesQueue[currentQ];
      eqKey = q.key;
      qType = q.practiceType;
    } else {
      for (let attempt = 0; attempt < 8; attempt++) {
        q = practiceType === 'conversions'
          ? generateConversionQuestion(selectedCategory)
          : practiceType === 'times-table'
            ? generateTimesTableQuestion()
            : practiceType === 'clock'
              ? generateClockQuestion()
              : practiceType === 'geometry'
                ? generateGeometryQuestion(selectedGeoCat)
                : practiceType === 'fractions'
                  ? generateFractionsQuestion(selectedFracCat)
                  : generateQuestion(selectedOp);
        eqKey = equationKey(q.display, practiceType);
        if (!usedEquations.has(eqKey)) break;
      }
      usedEquations.add(eqKey);
      qType = practiceType;
    }
    currentAnswer = q.answer;
    const { display } = q;
    // A clock face can't be typed — replayed d2a mistakes render as a2d in input mode
    const clockDir = qType === 'clock' && selectedMode === 'input' ? 'a2d' : display.direction;

    renderQuestion._currentQ = practiceType === 'mistakes' ? q : {
      key: eqKey,
      display,
      answer: q.answer,
      practiceType,
      opUsed: q.opUsed || null,
      category: practiceType === 'conversions' ? selectedCategory
        : practiceType === 'geometry' ? selectedGeoCat
        : practiceType === 'fractions' ? selectedFracCat
        : null,
      grade: selectedGrade,
    };

    if (display.kind === 'word') {
      // The summary shows the underlying arithmetic; the story was the exercise
      renderQuestion._currentEquation = `📖 ${display.a} ${OP_SYMBOLS[display.op]} ${display.b}`;
    } else if (qType === 'clock') {
      renderQuestion._currentEquation = clockDir === 'a2d' ? '🕐 → ?' : `${fmtClock(q.answer)} → 🕐`;
    } else if (qType === 'geometry') {
      renderQuestion._currentEquation = t(geoPromptKey(display));
    } else if (qType === 'fractions') {
      renderQuestion._currentEquation =
        display.kind === 'compare'    ? t('qCompareFrac')
        : display.kind === 'fractionOf' ? `${display.n}/${display.d} ${t('wordOf')} ${display.x}`
        : display.kind === 'rounding'   ? `${display.nVal} ≈ (${display.to})`
        : display.kind === 'equivalent' ? `${display.ln}/${display.ld} = ?/${display.rd}`
        : display.kind === 'addSub'     ? `${display.n1}/${display.d} ${display.fop} ${display.n2}/${display.d}`
        : `${display.p}% ${t('wordOf')} ${display.x}`;
    } else if (qType === 'conversions') {
      renderQuestion._currentEquation = `${cvtFmt(display.fromValue)} ${unitLabel(display.fromUnit, display.fromValue)} → ${unitLabel(display.toUnit, 2)}`;
    } else {
      renderQuestion._currentEquation = `${display.a} ${display.op} ${display.b}`;
    }

    $('q-label').textContent   = t('questionOf')(currentQ + 1, totalQ);
    $('q-counter').textContent = `${currentQ + 1}/${totalQ}`;

    const eqEl = $('q-equation');
    if (display.kind === 'word') {
      eqEl.className = 'q-equation q-equation-word';
      eqEl.innerHTML =
        `<div class="q-word">${wordText(display)}</div>` +
        `<div class="q-geo-answer"><span class="q-eq-op">=</span><span class="q-eq-box">?</span></div>`;
    } else if (qType === 'geometry') {
      eqEl.className = 'q-equation q-equation-geo';
      const unit = display.kind === 'area' ? 'cm²' : display.kind === 'perimeter' ? 'cm' : '';
      eqEl.innerHTML =
        `<div class="q-geo-prompt">${t(geoPromptKey(display))}</div>` +
        `<div class="q-geo">${shapeSVG(display, { size: 170 })}</div>` +
        (display.kind !== 'name'
          ? `<div class="q-geo-answer"><span class="q-eq-op">=</span><span class="q-eq-box">?</span>${unit ? `<span class="q-geo-unit">${unit}</span>` : ''}</div>`
          : '');
    } else if (qType === 'fractions') {
      eqEl.className = 'q-equation q-equation-frac';
      const k = display.kind;
      if (k === 'compare') {
        eqEl.innerHTML = `<div class="q-geo-prompt">${t('qCompareFrac')}</div>`;
      } else if (k === 'fractionOf') {
        eqEl.innerHTML = `${fracHTML(display.n, display.d)}<span class="q-frac-mid">${t('wordOf')}</span><span>${display.x}</span><span class="q-eq-op">=</span><span class="q-eq-box">?</span>`;
      } else if (k === 'rounding') {
        eqEl.innerHTML = `<div class="q-geo-prompt">${t('qRoundTo')(display.to)}</div><span>${fmtNum(display.nVal)}</span><span class="q-eq-op">≈</span><span class="q-eq-box">?</span>`;
      } else if (k === 'equivalent') {
        eqEl.innerHTML = `${fracHTML(display.ln, display.ld)}<span class="q-eq-op">=</span>${fracHTML('?', display.rd)}`;
      } else if (k === 'addSub') {
        eqEl.innerHTML = `${fracHTML(display.n1, display.d)}<span class="q-eq-op">${display.fop}</span>${fracHTML(display.n2, display.d)}<span class="q-eq-op">=</span>${fracHTML('?', display.d)}`;
      } else {
        eqEl.innerHTML = `<span>${display.p}%</span><span class="q-frac-mid">${t('wordOf')}</span><span>${display.x}</span><span class="q-eq-op">=</span><span class="q-eq-box">?</span>`;
      }
    } else if (qType === 'clock') {
      eqEl.className = 'q-equation q-equation-clock';
      eqEl.innerHTML = clockDir === 'a2d'
        ? `<div class="q-clock">${clockSVG(display.h, display.m, { size: 190 })}</div><span class="q-eq-op">=</span><span class="q-eq-box">?</span>`
        : `<span class="q-clock-digital">${fmtClock(q.answer)}</span><span class="q-eq-op">=</span><span class="q-eq-box">?</span>`;
    } else if (qType === 'conversions') {
      eqEl.className = 'q-equation q-equation-conversion';
      eqEl.innerHTML = `<span class="q-conv-val">${cvtFmt(display.fromValue)}</span><span class="q-conv-unit">${unitLabel(display.fromUnit, display.fromValue)}</span><span class="q-eq-op">=</span><span class="q-eq-box">?</span><span class="q-conv-unit">${unitLabel(display.toUnit, 2)}</span>`;
    } else if (display.op === '+' || display.op === '−') {
      // ── Vertical (stacked) layout for addition / subtraction ──
      // For addition, put the larger number on top (a+b = b+a).
      // For subtraction, a is already the larger number (minuend).
      const numTop = display.op === '+' ? Math.max(display.a, display.b) : display.a;
      const numBot = display.op === '+' ? Math.min(display.a, display.b) : display.b;
      const top = String(numTop);
      const bot = String(numBot);
      const maxLen = Math.max(top.length, bot.length);
      const fs = '\u2007'; // figure space — same width as a digit in monospace
      // Pad top number: extra 2 chars on the left to match the op+space prefix on the bottom row
      const padTop = (fs + fs + top).padStart(maxLen + 2, fs);
      // Bottom row: operator + figure-space + right-aligned number
      const padBot = bot.padStart(maxLen, fs);

      eqEl.className = 'q-equation q-equation-stacked';
      eqEl.innerHTML =
        `<div class="q-stack">` +
          `<div class="q-stack-row q-stack-top">${padTop}</div>` +
          `<div class="q-stack-row q-stack-bot"><span class="q-stack-op">${display.op}</span>${fs}${padBot}</div>` +
          `<div class="q-stack-line"></div>` +
          `<div class="q-stack-row q-stack-ans">?</div>` +
        `</div>`;
    } else {
      // ── Horizontal layout for multiplication / division ──
      eqEl.className = 'q-equation';
      eqEl.innerHTML = `<span>${display.a}</span><span class="q-eq-op">${display.op}</span><span>${display.b}</span><span class="q-eq-op">=</span><span class="q-eq-box">?</span>`;
    }

    const appendChoiceBtns = (choices, labelFn = cvtFmt, asHtml = false) => {
      choices.forEach(c => {
        const div = document.createElement('div');
        div.className   = 'choice-btn no-touch-feedback' + (asHtml ? ' choice-clock' : '');
        div.dataset.value = c;
        if (asHtml) div.innerHTML = labelFn(c); else div.textContent = labelFn(c);
        div.setAttribute('role', 'button');
        div.setAttribute('tabindex', '0');
        div.addEventListener('pointerdown', e => { e.preventDefault(); handleAnswer(c, div); });
        div.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') handleAnswer(c, div); });
        newGrid.appendChild(div);
      });
    };

    // Some kinds can't be typed on the numpad — they render as multiple-choice in any mode
    const useChoices = selectedMode === 'quiz'
      || (qType === 'geometry' && display.kind === 'name')
      || (qType === 'fractions' && display.kind === 'compare');
    if (useChoices) {
      $('numpad-wrap').style.display = 'none';
      if (qType === 'fractions') {
        const choices = generateFractionsChoices(currentAnswer, display);
        if (display.kind === 'compare') {
          appendChoiceBtns(choices, i => fracHTML(display.fr[i][0], display.fr[i][1]), true);
        } else if (display.kind === 'addSub') {
          appendChoiceBtns(choices, v => fracHTML(v, display.d), true);
        } else if (display.kind === 'equivalent') {
          appendChoiceBtns(choices, v => fracHTML(v, display.rd), true);
        } else {
          appendChoiceBtns(choices);
        }
      } else if (qType === 'geometry') {
        const choices = generateGeometryChoices(currentAnswer, display);
        appendChoiceBtns(choices, display.kind === 'name' ? shapeNameByIdx : cvtFmt);
      } else if (qType === 'clock') {
        const choices = generateClockChoices(currentAnswer);
        if (clockDir === 'd2a') {
          appendChoiceBtns(choices, v => clockSVG(Math.floor(v / 60), v % 60, { size: 96 }), true);
        } else {
          appendChoiceBtns(choices, fmtClock);
        }
      } else if (qType === 'conversions') {
        appendChoiceBtns(generateConversionChoices(currentAnswer, display));
      } else {
        appendChoiceBtns(generateChoices(currentAnswer, q.opUsed || selectedOp));
      }
      // Remove the guard class after iOS has fully cleared any residual touch state
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          newGrid.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('no-touch-feedback'));
        });
      });
    } else {
      newGrid.style.display = 'none';
      $('numpad-wrap').style.display = '';
      renderNumpad();
    }

    // Animate card back in
    card.classList.remove('input-blocked');
    card.classList.add('card-enter');
    setTimeout(() => card.classList.remove('card-enter'), 300);

  }, 200); // wait for exit animation to complete
}

// ══════════════════════════════════════════
// NUMPAD
// ══════════════════════════════════════════
function renderNumpad() {
  numpadValue='';
  const disp=$('numpad-display'); disp.textContent='_'; disp.className='numpad-display';
  const grid=$('numpad-grid'); grid.innerHTML='';
  ['1','2','3','4','5','6','7','8','9','.','0','⌫'].forEach(k=>{
    const btn=document.createElement('button');
    btn.className='numpad-btn'; btn.textContent=k;
    if(k==='⌫') btn.classList.add('numpad-back');
    if(k==='.') btn.classList.add('numpad-dot');
    btn.addEventListener('click',()=>handleNumpadKey(k)); grid.appendChild(btn);
  });
  const nc=$('numpad-confirm'); if(nc) nc.disabled=false;
}
function isClockQuestion() {
  const cq = renderQuestion._currentQ;
  return !!cq && cq.practiceType === 'clock';
}
function updateNumpadDisplay() {
  const disp = $('numpad-display');
  if (numpadValue === '') { disp.textContent = '_'; return; }
  // Clock questions: typed digits render as a time, colon before the last two ("1930" → 19:30)
  disp.textContent = isClockQuestion() && numpadValue.length > 2
    ? numpadValue.slice(0, -2) + ':' + numpadValue.slice(-2)
    : numpadValue;
}
function flashNumpadInvalid() {
  const disp = $('numpad-display');
  disp.classList.add('numpad-wrong');
  setTimeout(() => disp.classList.remove('numpad-wrong'), 350);
}
function handleNumpadKey(k) {
  if(answered) return;
  // Ignore stray input when this question renders choices instead (geometry 'name' in input mode)
  if($('numpad-wrap').style.display === 'none') return;
  const clockQ = isClockQuestion();
  if(k==='⌫') { numpadValue=numpadValue.slice(0,-1); updateNumpadDisplay(); }
  else if(k==='.') { if(!clockQ&&numpadValue.length>0&&!numpadValue.includes('.')) { numpadValue+='.'; updateNumpadDisplay(); } }
  else if(k==='✓') {
    if(numpadValue===''||numpadValue==='.') return;
    if(clockQ) {
      const m = parseInt(numpadValue.slice(-2), 10);
      const h = parseInt(numpadValue.slice(0, -2) || '0', 10);
      if(numpadValue.length < 3 || m > 59 || h > 23) { flashNumpadInvalid(); return; }
      handleAnswer(h * 60 + m, null);
    } else handleAnswer(parseFloat(numpadValue),null);
  }
  else { if(numpadValue.length>=(clockQ?4:12)) return; numpadValue+=k; updateNumpadDisplay(); }
}
document.addEventListener('keydown', e => {
  if(selectedMode!=='input') return;
  const qs=document.getElementById('quiz-section');
  if(!qs||!qs.classList.contains('visible')||answered) return;
  if(e.key>='0'&&e.key<='9') handleNumpadKey(e.key);
  else if(e.key==='.') handleNumpadKey('.');
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
  const wasCorrect=Math.abs(Number(chosen)-currentAnswer)<0.005;
  const cq = renderQuestion._currentQ;
  // Mistakes sessions mix questions from different grades/types — score each by its origin
  const qGrade    = practiceType === 'mistakes' && cq ? (cq.grade || selectedGrade) : selectedGrade;
  const scoreType = practiceType === 'mistakes' && cq ? cq.practiceType : practiceType;
  const qScore=calcQuestionScore(selectedMode,qGrade,elapsedMs,wasCorrect,scoreType);
  const maxQScore=qGrade*10*2;
  const logFmt = cq && cq.practiceType === 'clock' ? 'clock'
    : cq && cq.practiceType === 'geometry' && cq.display.kind === 'name' ? 'shape'
    : cq && cq.practiceType === 'fractions' && cq.display.kind === 'compare' ? 'frac'
    : undefined;
  const answerLabel = fmtAnswer(cq, currentAnswer);
  sessionScore+=qScore;
  sessionLog.push({equation:renderQuestion._currentEquation,correctAnswer:currentAnswer,chosen,wasCorrect,elapsedMs,score:qScore,maxQScore,fmt:logFmt,fracChoices:logFmt==='frac'?cq.display.fr:undefined});

  if (cq) {
    if (!wasCorrect) addMistake(cq);
    else if (practiceType === 'mistakes') removeMistake(cq.key);
  }
  bumpStreak();

  const card=$('question-card'), fb=$('feedback-msg');
  // Branch on how the answer arrived, not the session mode — geometry 'name'
  // questions render choice buttons even inside numpad sessions
  if(btnEl) {
    card.classList.add('input-blocked');
    document.querySelectorAll('.choice-btn').forEach(b => b.setAttribute('data-answered','1'));
    if(wasCorrect) {
      correct++; card.classList.add('correct');
      if(btnEl) btnEl.classList.add('correct-choice');
      fb.textContent=t('correctFeedback'); fb.className='feedback correct show';
    } else {
      wrong++; card.classList.add('wrong');
      if(btnEl) btnEl.classList.add('wrong-choice');
      // Also highlight the correct answer
      document.querySelectorAll('.choice-btn').forEach(b => {
        if(Math.abs(Number(b.dataset.value)-currentAnswer)<0.005) b.classList.add('correct-choice');
      });
      card.classList.add('shake'); setTimeout(()=>card.classList.remove('shake'),400);
      fb.textContent=t('wrongFeedback')(answerLabel); fb.className='feedback wrong show';
    }
  } else {
    document.querySelectorAll('.numpad-btn').forEach(b=>(b.disabled=true));
    const nc=$('numpad-confirm'); if(nc) nc.disabled=true;
    const disp=$('numpad-display');
    if(wasCorrect) {
      correct++; card.classList.add('correct'); disp.classList.add('numpad-correct');
      fb.textContent=t('correctFeedback'); fb.className='feedback correct show';
    } else {
      wrong++; card.classList.add('wrong'); disp.classList.add('numpad-wrong'); disp.textContent=fmtAnswer(cq,chosen);
      card.classList.add('shake'); setTimeout(()=>card.classList.remove('shake'),400);
      fb.textContent=t('wrongFeedback')(answerLabel); fb.className='feedback wrong show';
    }
  }
  updateScorebar();
  currentQ++;

  const delay = wasCorrect ? 1000 : 1500;

  // On touch devices, wait for the finger to fully lift before scheduling
  // the next question. iOS applies tap-highlight based on the active touch —
  // ensuring touchend has fired means the OS has released all touch state
  // before any new interactive elements appear in the DOM.
  let advanced = false;
  const epoch = quizEpoch;
  const advance = () => {
    if (advanced) return;
    advanced = true;
    setTimeout(() => {
      // The quiz may have been stopped (or replaced by a new session) during the delay
      if (epoch !== quizEpoch || !$('quiz-section').classList.contains('visible')) return;
      if (currentQ >= totalQ) showResults(false);
      else renderQuestion();
    }, delay);
  };

  if ('ontouchend' in window) {
    document.addEventListener('touchend', advance, { once: true, passive: true });
    // Fallback in case touchend already fired before we registered
    setTimeout(advance, 300);
  } else {
    advance();
  }
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
// CONFETTI
// ══════════════════════════════════════════
function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const W = canvas.width  = window.innerWidth;
  const H = canvas.height = window.innerHeight;

  // Theme-matched palette — oranges dominate, gold for contrast, green for success, white for sparkle
  const PALETTE = [
    '#fb923c','#fb923c','#fb923c',  // orange-light (brand, most frequent)
    '#ea6a10','#f97316',            // orange variants
    '#ffca3a','#ffca3a',            // gold
    '#34d399',                      // green accent
    '#ffffff','#fff8f0',            // white / cream
  ];

  const rnd  = (a, b) => a + Math.random() * (b - a);
  const pick = arr  => arr[Math.floor(Math.random() * arr.length)];

  // Draw a 4-pointed star centred at (0,0) with outer radius r
  function star4(r) {
    const inner = r * 0.38;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const a   = (i * Math.PI / 4) - Math.PI / 2;
      const len = i % 2 === 0 ? r : inner;
      i === 0 ? ctx.moveTo(Math.cos(a)*len, Math.sin(a)*len)
              : ctx.lineTo(Math.cos(a)*len, Math.sin(a)*len);
    }
    ctx.closePath();
    ctx.fill();
  }

  // Build all particles — first wave immediately, second wave after 320 ms
  function makeParticles(count, delay) {
    return Array.from({ length: count }, () => {
      const t     = Math.random();
      const shape = t < 0.55 ? 'rect' : t < 0.82 ? 'circle' : 'star';
      const speed = rnd(10, 26);
      const ang   = rnd(-Math.PI * 0.92, -Math.PI * 0.08); // wide upward arc
      return {
        x:     W * rnd(0.25, 0.75) + rnd(-40, 40),
        y:     H * rnd(0.75, 0.88),
        vx:    Math.cos(ang) * speed,
        vy:    Math.sin(ang) * speed,
        w:     rnd(7, 14),                  // rect width
        h:     rnd(12, 20),                 // rect height (long strip)
        r:     rnd(4, 9),                   // circle / star radius
        color: pick(PALETTE),
        angle: rnd(0, Math.PI * 2),
        spin:  rnd(-0.28, 0.28),
        shape,
        glow:  Math.random() < 0.28,        // ~1 in 4 particles glows
        delay,
      };
    });
  }

  const particles = [...makeParticles(140, 0), ...makeParticles(80, 320)];

  const GRAVITY   = 0.42;
  const DRAG      = 0.992;
  const DURATION  = 4200;
  const FADE_TIME = 900;
  const startTime = Date.now();

  function draw() {
    const elapsed = Date.now() - startTime;
    ctx.clearRect(0, 0, W, H);

    const globalAlpha = elapsed < DURATION ? 1 : Math.max(0, 1 - (elapsed - DURATION) / FADE_TIME);

    let alive = false;
    for (const p of particles) {
      if (elapsed < p.delay) { alive = true; continue; }

      p.vx    *= DRAG;
      p.x     += p.vx;
      p.y     += p.vy;
      p.vy    += GRAVITY;
      p.angle += p.spin;

      if (p.y < H + 50) alive = true;

      ctx.save();
      ctx.globalAlpha = globalAlpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;

      if (p.glow) { ctx.shadowColor = p.color; ctx.shadowBlur = 12; }

      if (p.shape === 'rect') {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      } else if (p.shape === 'circle') {
        ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fill();
      } else {
        star4(p.r * 1.1);
      }

      ctx.restore();
    }

    if (alive && elapsed < DURATION + FADE_TIME) {
      requestAnimationFrame(draw);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(draw);
}

// ══════════════════════════════════════════
// RESULTS
// ══════════════════════════════════════════
function showResults(cancelled) {
  stopSessionClock(); hide('quiz-section'); show('result-section');
  const totalSessionMs=Date.now()-sessionStartTime;
  const answeredCount=sessionLog.length;
  const pct=answeredCount>0?Math.round((correct/answeredCount)*100):0;
  const avgMs=answeredCount>0?sessionLog.reduce((s,e)=>s+e.elapsedMs,0)/answeredCount:0;
  // Mistakes sessions mix grades, so personal bests aren't comparable — skip PB tracking
  const isMistakes = practiceType === 'mistakes';
  const maxScore = isMistakes
    ? mistakesQueue.reduce((s, q) => s + (q.grade || selectedGrade) * 10 * 2, 0)
    : calcMaxScore(selectedMode,selectedGrade,totalQ);
  const opKey = isMistakes ? 'mistakes'
    : practiceType === 'times-table' ? `times-table-${selectedTable}`
    : practiceType === 'clock' ? `clock-${selectedClockDir}`
    : practiceType === 'geometry' ? `geometry-${selectedGeoCat}`
    : practiceType === 'fractions' ? `fractions-${selectedFracCat}`
    : selectedOp;
  const pb = isMistakes ? 0 : getPersonalBest(opKey,selectedGrade,selectedMode);
  const isNewPb = !isMistakes && !cancelled && sessionScore>pb;
  if(isNewPb) setPersonalBest(opKey,selectedGrade,selectedMode,sessionScore);

  const sessionCategory = practiceType === 'geometry' ? selectedGeoCat : practiceType === 'fractions' ? selectedFracCat : selectedCategory;
  const session={id:Date.now(),op:opKey,grade:selectedGrade,mode:selectedMode,practiceType,category:sessionCategory,table:selectedTable,totalQ,correct,wrong:answeredCount-correct,pct,totalSessionMs,avgMs,answeredCount,cancelled,timestamp:Date.now(),log:[...sessionLog],score:sessionScore,maxScore,isNewPb};
  session.newBadges = recordSessionAndAwardBadges(session).map(b => b.id);
  allSessions.unshift(session);
  saveSessions();

  // One celebration per results screen — perfect score takes precedence
  if (!cancelled && pct === 100) launchConfetti();
  else if (session.newBadges.length) launchConfetti();

  refreshResultSection(session);
}

function refreshResultSection(session) {
  const s = session;
  $('res-correct').textContent=s.correct; $('res-wrong').textContent=s.wrong;
  $('res-pct').textContent=s.pct+'%'; $('res-duration').textContent=fmtMs(s.totalSessionMs);
  $('res-avg').textContent=s.answeredCount>0?fmtMsShort(s.avgMs):'—';
  $('res-grade-badge').textContent=TRANSLATIONS[currentLang].gradeLabel(s.grade);
  $('res-mode-badge').textContent=t(MODE_KEYS[s.mode]);

  if(s.score!=null){
    $('res-score-pts').textContent=s.score.toLocaleString();
    $('res-score-max').textContent=`/ ${s.maxScore.toLocaleString()} ${t('points')}`;
    const pb=getPersonalBest(s.op,s.grade,s.mode);
    $('res-pb-label').textContent=s.isNewPb?t('newPersonalBest'):pb>0?`${t('personalBest')}: ${pb.toLocaleString()}`:'';
  }

  const rb = $('res-badges');
  if (rb) {
    const items = (s.newBadges || []).map(id => BADGES.find(b => b.id === id)).filter(Boolean);
    rb.style.display = items.length ? '' : 'none';
    rb.innerHTML = items.length
      ? `<span class="res-badges-label">${t('newBadge')}</span>` + items.map(b => `<span class="res-badge-item">${b.icon} ${t(b.nameKey)}</span>`).join('')
      : '';
  }

  if(s.cancelled) {
    $('result-emoji').textContent='🛑';
    $('result-title').textContent=t('titleStopped');
    $('result-sub').textContent=t('subStopped')(s.answeredCount,s.totalQ,s.correct);
  } else {
    let emoji='😔',title=t('titleKeepTrying'),sub=t('subKeepTrying')(s.correct,s.totalQ);
    if(s.pct===100){emoji='🏆';title=t('titlePerfect');sub=t('subPerfect');}
    else if(s.pct>=80){emoji='🎉';title=t('titleGreat');sub=t('subGreat')(s.correct,s.totalQ);}
    else if(s.pct>=60){emoji='👍';title=t('titleGood');sub=t('subGood')(s.correct,s.totalQ);}
    else if(s.pct>=40){emoji='💪';title=t('titleKeepGoing');sub=t('subKeepGoing')(s.correct,s.totalQ);}
    $('result-emoji').textContent=emoji; $('result-title').textContent=title; $('result-sub').textContent=sub;
  }
  renderSummaryList($('summary-list'),$('summary-count'),s.log);
}

// ══════════════════════════════════════════
// SHARED SUMMARY RENDERER
// ══════════════════════════════════════════
function fmtAnswer(cq, v) {
  if (!cq) return v;
  if (cq.practiceType === 'clock') return fmtClock(v);
  if (cq.practiceType === 'geometry' && cq.display.kind === 'name') return shapeNameByIdx(v);
  if (cq.practiceType === 'fractions' && cq.display.kind === 'compare') {
    const f = cq.display.fr[v];
    return f ? `${f[0]}/${f[1]}` : v;
  }
  return v;
}
function logVal(e, v) {
  if (e.fmt === 'clock') return fmtClock(v);
  if (e.fmt === 'shape') return shapeNameByIdx(v);
  if (e.fmt === 'frac') {
    const f = e.fracChoices && e.fracChoices[v];
    return f ? `${f[0]}/${f[1]}` : v;
  }
  return v;
}
function renderSummaryList(listEl,countEl,log) {
  if(log.length===0){listEl.innerHTML='<p class="summary-empty">'+t('questionSummary')+'</p>';countEl.textContent='';return;}
  countEl.textContent=t('questionsAnswered')(log.length);
  listEl.innerHTML=log.map((e,i)=>`
    <div class="summary-row ${e.wasCorrect?'summary-correct':'summary-wrong'}">
      <span class="summary-num">${i+1}</span>
      <span class="summary-eq">${e.equation} = ${logVal(e,e.correctAnswer)}</span>
      <span class="summary-chosen">${e.wasCorrect?`<span class="summary-icon">✓</span> ${logVal(e,e.chosen)}`:`<span class="summary-icon">✗</span> <s>${logVal(e,e.chosen)}</s>`}</span>
      <span class="summary-time">${fmtMsShort(e.elapsedMs)}</span>
      ${e.maxQScore!=null?`<span class="summary-score">${e.score}<span class="summary-score-max">/${e.maxQScore}</span></span>`:''}
    </div>`).join('');
}

// ══════════════════════════════════════════
// HISTORY LIST
// ══════════════════════════════════════════
const HISTORY_COLLAPSED_COUNT = 5;
function toggleHistoryExpanded() { historyExpanded = !historyExpanded; renderHistory(); }

function renderHistory() {
  if(allSessions.length===0){$('history-section').style.display='none';return;}
  $('history-section').style.display='';
  // Collapsed view shows the newest-first prefix, so map indices still match allSessions
  const visible = historyExpanded ? allSessions : allSessions.slice(0, HISTORY_COLLAPSED_COUNT);
  $('history-list').innerHTML=visible.map((s,i)=>{
    let sym, opLabel;
    if (s.practiceType==='conversions') {
      const cat=CONV_CATEGORIES.find(c=>c.key===s.category);
      sym=cat?cat.icon:'↔'; opLabel=cat?t(cat.labelKey):s.category||'?';
    } else if (s.practiceType==='times-table') {
      sym='×'; opLabel=`×${s.table}`;
    } else if (s.practiceType==='clock') {
      sym='🕐'; opLabel=t('clock');
    } else if (s.practiceType==='geometry') {
      const cat=GEO_CATEGORIES.find(c=>c.key===s.category);
      sym=cat?cat.icon:'△'; opLabel=cat?t(cat.labelKey):t('geometry');
    } else if (s.practiceType==='fractions') {
      const cat=FRACTION_CATEGORIES.find(c=>c.key===s.category);
      sym=cat?cat.icon:'½'; opLabel=cat?t(cat.labelKey):t('fractions');
    } else if (s.practiceType==='mistakes') {
      sym='⟳'; opLabel=t('mistakesPractice');
    } else {
      sym=OP_SYMBOLS[s.op]||'?'; opLabel=t(OP_META_KEYS[s.op]||s.op);
    }
    const modeLabel=t(MODE_KEYS[s.mode]||s.mode);
    const gradeLabel=TRANSLATIONS[currentLang].gradeLabel(s.grade);
    const pctCls=s.pct===100?'green':s.pct>=60?'grape':'red';
    const stopped=s.cancelled?`<span class="hist-badge cancelled">${t('stopped')}</span>`:'';
    const scoreDisplay=s.score!=null
      ?`<div class="hist-score ${pctCls}">${s.score.toLocaleString()}<span class="hist-score-max">/${s.maxScore.toLocaleString()}</span></div>`
      :`<div class="hist-score ${pctCls}">${s.pct}%</div>`;
    return `
      <div class="hist-row" onclick="openDetail(${i})" role="button" tabindex="0" onkeydown="if(event.key==='Enter')openDetail(${i})">
        <div class="hist-op-badge">${sym}</div>
        <div class="hist-info">
          <span class="hist-op-name">${opLabel}${stopped}<span class="hist-chip hist-chip-grade">${gradeLabel}</span><span class="hist-chip hist-chip-mode">${modeLabel}</span></span>
          <span class="hist-meta">${fmtDate(s.timestamp)} · ${t('questionsShort')(s.answeredCount,s.totalQ)} · ${fmtMs(s.totalSessionMs)}</span>
        </div>
        ${scoreDisplay}
        <div class="hist-chevron">›</div>
      </div>`;
  }).join('');

  const more = $('history-more');
  if (more) {
    more.innerHTML = allSessions.length > HISTORY_COLLAPSED_COUNT
      ? `<button class="btn-history-toggle" onclick="toggleHistoryExpanded()">${historyExpanded ? t('showLess') : t('showAll')(allSessions.length)}</button>`
      : '';
  }
}
function clearHistory(){allSessions=[];historyExpanded=false;saveSessions();renderHistory();}

// ══════════════════════════════════════════
// SESSION DETAIL
// ══════════════════════════════════════════
function openDetail(index) {
  detailIndex=index;
  const s=allSessions[index];
  const opLabel = s.practiceType==='conversions'
    ? t((CONV_CATEGORIES.find(c=>c.key===s.category)||{}).labelKey||s.category)
    : s.practiceType==='times-table'
      ? `×${s.table}`
      : s.practiceType==='clock'
        ? t('clock')
        : s.practiceType==='geometry'
          ? t((GEO_CATEGORIES.find(c=>c.key===s.category)||{}).labelKey||'geometry')
          : s.practiceType==='fractions'
            ? t((FRACTION_CATEGORIES.find(c=>c.key===s.category)||{}).labelKey||'fractions')
            : s.practiceType==='mistakes'
              ? t('mistakesPractice')
              : t(OP_META_KEYS[s.op]||s.op);
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

  if(s.score!=null){
    $('detail-score-pts').textContent=s.score.toLocaleString();
    $('detail-score-max').textContent=`/ ${s.maxScore.toLocaleString()} ${t('points')}`;
    const pb=getPersonalBest(s.op,s.grade,s.mode);
    $('detail-pb-label').textContent=s.isNewPb?t('newPersonalBest'):pb>0?`${t('personalBest')}: ${pb.toLocaleString()}`:'';
  }

  renderSummaryList($('detail-list'),$('detail-count'),s.log);
  $('home-section').style.display='none';
  show('detail-section');
  window.scrollTo({top:0,behavior:'smooth'});
}
function closeDetail(){hide('detail-section');goHome();}

// ══════════════════════════════════════════
// REPLAY / HOME
// ══════════════════════════════════════════
function replaySession() {
  // Snapshot the full selection before goHome() clears it — each practice type
  // keeps its choice in a different variable
  const snap = {
    type: practiceType, op: selectedOp, category: selectedCategory, table: selectedTable,
    clockDir: selectedClockDir, geoCat: selectedGeoCat, fracCat: selectedFracCat,
  };
  goHome();
  setTimeout(() => {
    if (snap.type === 'mistakes') { startMistakesQuiz(); return; }
    // Re-select through the card element so the home UI stays in sync if the kid stops early
    const reselect = (selector, fn) => { const el = document.querySelector(selector); if (el) fn(el); };
    if (snap.type === 'math')             reselect(`.op-card[data-op="${snap.op}"]`, selectOp);
    else if (snap.type === 'conversions') reselect(`#conv-grid .conv-cat-card[data-cat="${snap.category}"]`, selectCategory);
    else if (snap.type === 'times-table') reselect(`#times-grid .times-card[data-table="${snap.table}"]`, selectTimesTable);
    else if (snap.type === 'clock')       reselect(`#clock-grid .clock-dir-card[data-dir="${snap.clockDir}"]`, selectClockDir);
    else if (snap.type === 'geometry')    reselect(`#geo-grid .geo-cat-card[data-cat="${snap.geoCat}"]`, selectGeoCat);
    else if (snap.type === 'fractions')   reselect(`#frac-grid .frac-cat-card[data-cat="${snap.fracCat}"]`, selectFracCat);
    startQuiz();
  }, 20);
}
function goHome() {
  // If a quiz is active with answers, save it as a stopped session
  if ($('quiz-section').classList.contains('visible') && sessionLog.length > 0) {
    stopSessionClock();
    const totalSessionMs = Date.now() - sessionStartTime;
    const answeredCount = sessionLog.length;
    const pct = answeredCount > 0 ? Math.round((correct / answeredCount) * 100) : 0;
    const avgMs = answeredCount > 0 ? sessionLog.reduce((s, e) => s + e.elapsedMs, 0) / answeredCount : 0;
    const opKey = practiceType === 'mistakes' ? 'mistakes'
      : practiceType === 'times-table' ? `times-table-${selectedTable}`
      : practiceType === 'clock' ? `clock-${selectedClockDir}`
      : practiceType === 'geometry' ? `geometry-${selectedGeoCat}`
      : practiceType === 'fractions' ? `fractions-${selectedFracCat}`
      : selectedOp;
    const maxScore = practiceType === 'mistakes'
      ? mistakesQueue.reduce((s, q) => s + (q.grade || selectedGrade) * 10 * 2, 0)
      : calcMaxScore(selectedMode, selectedGrade, totalQ);
    const sessionCategory = practiceType === 'geometry' ? selectedGeoCat : practiceType === 'fractions' ? selectedFracCat : selectedCategory;
    const session = { id: Date.now(), op: opKey, grade: selectedGrade, mode: selectedMode, practiceType, category: sessionCategory, table: selectedTable, totalQ, correct, wrong: answeredCount - correct, pct, totalSessionMs, avgMs, answeredCount, cancelled: true, timestamp: Date.now(), log: [...sessionLog], score: sessionScore, maxScore, isNewPb: false };
    session.newBadges = recordSessionAndAwardBadges(session).map(b => b.id);
    allSessions.unshift(session);
    saveSessions();
    sessionLog = [];
  }
  stopSessionClock();
  // A mistakes session overrides practiceType and totalQ — restore them from the home-screen UI
  practiceType = document.querySelector('.practice-btn.active')?.dataset.type || 'math';
  totalQ = parseInt(document.querySelector('.count-card.active')?.dataset.count || '10', 10);
  hide('result-section'); hide('quiz-section'); hide('detail-section');
  $('print-config-section').style.display = 'none';
  $('print-section').innerHTML = '';
  const rb=$('conv-ref-box'); if(rb) rb.style.display='none';
  $('home-section').style.display='';
  document.querySelectorAll('.op-card').forEach(c=>c.classList.remove('active'));
  document.querySelectorAll('.conv-cat-card').forEach(c=>c.classList.remove('active'));
  document.querySelectorAll('.times-card').forEach(c=>c.classList.remove('active'));
  selectedOp=null; selectedCategory=null; selectedTable=null; selectedClockDir=null; selectedGeoCat=null; selectedFracCat=null; $('start-btn').disabled=true;
  renderHistory();
  renderStreak();
  renderMistakesButton();
  renderBadges();
  window.scrollTo({top:0,behavior:'smooth'});
}

// ══════════════════════════════════════════
// PRINT / WORKSHEET
// ══════════════════════════════════════════
let printCfg = {
  type: 'math', op: null, category: null, table: null, clockDir: null, geoCat: null, fracCat: null,
  grade: 4, answerKey: true,
};

function openPrintConfig() {
  $('home-section').style.display = 'none';
  buildPrintConfigUI();
  $('print-config-section').style.display = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closePrintConfig() {
  $('print-config-section').style.display = 'none';
  $('home-section').style.display = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function buildPrintConfigUI() {
  const el = $('print-config-section');
  const isTimesTable   = printCfg.type === 'times-table';
  const isConversions  = printCfg.type === 'conversions';
  const isClock        = printCfg.type === 'clock';
  const isGeometry     = printCfg.type === 'geometry';
  const isFractions    = printCfg.type === 'fractions';
  const isPrintReady   = (printCfg.type === 'math'        && printCfg.op)
                       || (printCfg.type === 'conversions' && printCfg.category)
                       || (printCfg.type === 'times-table' && printCfg.table)
                       || (printCfg.type === 'clock'       && printCfg.clockDir)
                       || (printCfg.type === 'geometry'    && printCfg.geoCat)
                       || (printCfg.type === 'fractions'   && printCfg.fracCat);

  const typeButtons = ['math','conversions','times-table','clock','geometry','fractions'].map(type =>
    `<button class="practice-btn${printCfg.type===type?' active':''}" data-type="${type}" onclick="printSetType(this)">${type==='times-table'?t('timesTable'):t(type)}</button>`
  ).join('');

  const opCards = ['addition','subtraction','multiplication','division','mixed','word'].map(op =>
    `<div class="op-card${printCfg.op===op?' active':''}" data-op="${op}" onclick="printSetOp(this)">
      <span class="op-symbol">${OP_SYMBOLS[op]}</span>
      <div class="op-name">${t(op)}</div>
    </div>`
  ).join('');

  const catCards = CONV_CATEGORIES.map(cat =>
    `<div class="op-card conv-cat-card${printCfg.category===cat.key?' active':''}" data-cat="${cat.key}" onclick="printSetCat(this)">
      <span class="op-symbol conv-cat-icon">${cat.icon}</span>
      <div class="op-name">${t(cat.labelKey)}</div>
    </div>`
  ).join('');

  const tableCards = Array.from({length:20},(_,i)=>i+1).map(n =>
    `<div class="times-card${printCfg.table===n?' active':''}" data-table="${n}" onclick="printSetTable(this)">${n}</div>`
  ).join('');

  const clockCards = CLOCK_DIRS.map(d =>
    `<div class="op-card clock-dir-card${printCfg.clockDir===d.key?' active':''}" data-dir="${d.key}" onclick="printSetClockDir(this)">
      <span class="op-symbol clock-dir-icon">${d.icon}</span>
      <div class="op-name">${t(d.labelKey)}</div>
    </div>`
  ).join('');

  const geoCards = GEO_CATEGORIES.map(cat =>
    `<div class="op-card conv-cat-card${printCfg.geoCat===cat.key?' active':''}" data-cat="${cat.key}" onclick="printSetGeoCat(this)">
      <span class="op-symbol conv-cat-icon">${cat.icon}</span>
      <div class="op-name">${t(cat.labelKey)}</div>
    </div>`
  ).join('');

  const fracCards = FRACTION_CATEGORIES.map(cat =>
    `<div class="op-card conv-cat-card${printCfg.fracCat===cat.key?' active':''}" data-cat="${cat.key}" onclick="printSetFracCat(this)">
      <span class="op-symbol conv-cat-icon">${cat.icon}</span>
      <div class="op-name">${t(cat.labelKey)}</div>
    </div>`
  ).join('');

  const gradeButtons = Object.keys(GRADE_CONFIG).map(g =>
    `<div class="print-grade-btn${parseInt(g)===printCfg.grade?' active':''}" data-grade="${g}" onclick="printSetGrade(this)">${g}</div>`
  ).join('');

  const akCards = [true,false].map(v =>
    `<div class="mode-card${printCfg.answerKey===v?' active':''}" data-ak="${v}" onclick="printSetAk(this)" style="padding:16px 12px;">
      <div class="mode-name">${v?t('include'):t('exclude')}</div>
    </div>`
  ).join('');

  el.innerHTML = `
    <div class="hero" style="padding:14px 0 24px;">
      <h2 style="font-size:clamp(1.4rem,4vw,2rem);font-weight:800;letter-spacing:-.5px;">${t('printWorksheet')}</h2>
    </div>

    <div class="section-label">${t('practiceType')}</div>
    <div class="practice-toggle" style="margin-bottom:32px;">${typeButtons}</div>

    <div class="picker-zone">
      <div id="print-op-wrap"${isConversions||isTimesTable?' style="display:none;"':''}>
        <div class="section-label">${t('chooseOperation')}</div>
        <div class="op-grid">${opCards}</div>
      </div>
      <div id="print-conv-wrap"${!isConversions?' style="display:none;"':''}>
        <div class="section-label">${t('chooseCategory')}</div>
        <div class="op-grid conv-grid">${catCards}</div>
      </div>
      <div id="print-times-wrap"${!isTimesTable?' style="display:none;"':''}>
        <div class="section-label">${t('chooseTable')}</div>
        <div class="times-grid">${tableCards}</div>
      </div>
      <div id="print-clock-wrap"${!isClock?' style="display:none;"':''}>
        <div class="section-label">${t('chooseDirection')}</div>
        <div class="op-grid conv-grid clock-grid">${clockCards}</div>
      </div>
      <div id="print-geo-wrap"${!isGeometry?' style="display:none;"':''}>
        <div class="section-label">${t('chooseCategory')}</div>
        <div class="op-grid conv-grid geo-grid">${geoCards}</div>
      </div>
      <div id="print-frac-wrap"${!isFractions?' style="display:none;"':''}>
        <div class="section-label">${t('chooseCategory')}</div>
        <div class="op-grid conv-grid frac-grid">${fracCards}</div>
      </div>
    </div>

    <div id="print-grade-wrap"${isTimesTable?' style="display:none;"':''}>
      <div class="section-label">${t('grade')}</div>
      <div class="print-grade-grid">${gradeButtons}</div>
    </div>

    <div class="section-label">${t('answerKey')}</div>
    <div class="mode-grid" style="grid-template-columns:repeat(2,1fr);">${akCards}</div>

    <div class="start-row" style="gap:12px;flex-wrap:wrap;margin-top:40px;">
      <button class="btn-secondary" onclick="closePrintConfig()">${t('backToOverview')}</button>
      <button class="btn-submit" id="print-btn" onclick="printWorksheet()"${isPrintReady?'':' disabled'}>${t('printSavePdf')}</button>
    </div>
  `;
}

function printSetType(el) {
  $('print-config-section').querySelectorAll('.practice-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  printCfg.type = el.dataset.type; printCfg.op = null; printCfg.category = null; printCfg.table = null; printCfg.clockDir = null; printCfg.geoCat = null; printCfg.fracCat = null;
  const isTT = printCfg.type === 'times-table', isCV = printCfg.type === 'conversions', isCK = printCfg.type === 'clock', isGE = printCfg.type === 'geometry', isFR = printCfg.type === 'fractions';
  $('print-op-wrap').style.display    = (!isTT && !isCV && !isCK && !isGE && !isFR) ? '' : 'none';
  $('print-conv-wrap').style.display  = isCV ? '' : 'none';
  $('print-times-wrap').style.display = isTT ? '' : 'none';
  $('print-clock-wrap').style.display = isCK ? '' : 'none';
  $('print-geo-wrap').style.display   = isGE ? '' : 'none';
  $('print-frac-wrap').style.display  = isFR ? '' : 'none';
  $('print-grade-wrap').style.display = isTT ? 'none' : '';
  $('print-btn').disabled = true;
}
function printSetFracCat(el) {
  $('print-frac-wrap').querySelectorAll('.op-card').forEach(c=>c.classList.remove('active'));
  el.classList.add('active'); printCfg.fracCat = el.dataset.cat; $('print-btn').disabled = false;
}
function printSetClockDir(el) {
  $('print-clock-wrap').querySelectorAll('.op-card').forEach(c=>c.classList.remove('active'));
  el.classList.add('active'); printCfg.clockDir = el.dataset.dir; $('print-btn').disabled = false;
}
function printSetGeoCat(el) {
  $('print-geo-wrap').querySelectorAll('.op-card').forEach(c=>c.classList.remove('active'));
  el.classList.add('active'); printCfg.geoCat = el.dataset.cat; $('print-btn').disabled = false;
}
function printSetOp(el) {
  $('print-op-wrap').querySelectorAll('.op-card').forEach(c=>c.classList.remove('active'));
  el.classList.add('active'); printCfg.op = el.dataset.op; $('print-btn').disabled = false;
}
function printSetCat(el) {
  $('print-conv-wrap').querySelectorAll('.op-card').forEach(c=>c.classList.remove('active'));
  el.classList.add('active'); printCfg.category = el.dataset.cat; $('print-btn').disabled = false;
}
function printSetTable(el) {
  $('print-times-wrap').querySelectorAll('.times-card').forEach(c=>c.classList.remove('active'));
  el.classList.add('active'); printCfg.table = parseInt(el.dataset.table,10); $('print-btn').disabled = false;
}
function printSetGrade(el) {
  $('print-config-section').querySelectorAll('.print-grade-btn').forEach(c=>c.classList.remove('active'));
  el.classList.add('active'); printCfg.grade = parseInt(el.dataset.grade,10);
}
function printSetAk(el) {
  el.parentElement.querySelectorAll('.mode-card').forEach(c=>c.classList.remove('active'));
  el.classList.add('active'); printCfg.answerKey = el.dataset.ak === 'true';
}

// Add/sub (and mixed, which can contain them) print as tall stacked problems → 18 in 3 columns
function printUsesStackedLayout() {
  return printCfg.type === 'math' && ['addition','subtraction','mixed'].includes(printCfg.op);
}
function getPrintCount() {
  if (printCfg.type === 'clock' || printCfg.type === 'geometry') return 12; // figures are tall — 3 cols × 4 rows
  if (printCfg.type === 'math' && printCfg.op === 'word') return 12;        // stories are wide — single column
  if (printCfg.type === 'fractions') return 18;
  return printUsesStackedLayout() ? 18 : 20;
}

function printGridClass() {
  if (printCfg.type === 'clock')    return 'print-cols-3 print-clock-grid';
  if (printCfg.type === 'geometry') return 'print-cols-3 print-geo-grid';
  if (printCfg.type === 'fractions') return 'print-cols-3 print-frac-grid';
  if (printCfg.type === 'math' && printCfg.op === 'word') return 'print-cols-1';
  return `print-cols-${printUsesStackedLayout() ? 3 : 2}`;
}

function generateWorksheet() {
  // Temporarily swap globals so existing generators use print config values
  // (mode → 'quiz' so clock generation doesn't force a2d as it does for numpad input)
  const saved = { grade:selectedGrade, op:selectedOp, table:selectedTable, category:selectedCategory, clockDir:selectedClockDir, geoCat:selectedGeoCat, fracCat:selectedFracCat, mode:selectedMode };
  selectedGrade = printCfg.grade; selectedOp = printCfg.op;
  selectedTable = printCfg.table; selectedCategory = printCfg.category;
  selectedClockDir = printCfg.clockDir; selectedGeoCat = printCfg.geoCat; selectedFracCat = printCfg.fracCat; selectedMode = 'quiz';

  const localUsed = new Set();
  const questions = [];
  for (let i = 0; i < getPrintCount(); i++) {
    let q, key;
    for (let attempt = 0; attempt < 10; attempt++) {
      q = printCfg.type === 'conversions'
        ? generateConversionQuestion(printCfg.category)
        : printCfg.type === 'times-table'
          ? generateTimesTableQuestion()
          : printCfg.type === 'clock'
            ? generateClockQuestion()
            : printCfg.type === 'geometry'
              ? generateGeometryQuestion(printCfg.geoCat)
              : printCfg.type === 'fractions'
                ? generateFractionsQuestion(printCfg.fracCat)
                : generateQuestion(printCfg.op);
      key = equationKey(q.display, printCfg.type);
      if (!localUsed.has(key)) break;
    }
    localUsed.add(key);
    questions.push({ display: q.display, answer: q.answer });
  }

  selectedGrade = saved.grade; selectedOp = saved.op;
  selectedTable = saved.table; selectedCategory = saved.category;
  selectedClockDir = saved.clockDir; selectedGeoCat = saved.geoCat; selectedFracCat = saved.fracCat; selectedMode = saved.mode;
  return questions;
}

function formatPrintEq(display, type) {
  if (type === 'fractions') {
    const k = display.kind;
    if (k === 'compare') {
      return `<div class="print-frac-compare"><div class="print-geo-prompt">${t('qCompareFrac')}</div><div class="print-frac-row">${display.fr.map(f => fracHTML(f[0], f[1])).join('')}</div><div class="print-geo-blank">______</div></div>`;
    }
    if (k === 'fractionOf') return `<span class="print-eq">${fracHTML(display.n, display.d)} ${t('wordOf')} ${display.x} = ______</span>`;
    if (k === 'rounding')  return `<span class="print-eq">${fmtNum(display.nVal)} ≈ ______ <span class="print-frac-hint">(${display.to})</span></span>`;
    if (k === 'equivalent') return `<span class="print-eq">${fracHTML(display.ln, display.ld)} = ${fracHTML('__', display.rd)}</span>`;
    if (k === 'addSub')    return `<span class="print-eq">${fracHTML(display.n1, display.d)} ${display.fop} ${fracHTML(display.n2, display.d)} = ${fracHTML('__', display.d)}</span>`;
    return `<span class="print-eq">${display.p}% ${t('wordOf')} ${display.x} = ______</span>`;
  }
  if (display && display.kind === 'word') {
    return `<div class="print-word"><div class="print-word-text">${wordText(display)}</div><div class="print-word-blank">= __________</div></div>`;
  }
  if (type === 'geometry') {
    const unit = display.kind === 'area' ? 'cm²' : display.kind === 'perimeter' ? 'cm' : '';
    const blank = display.kind === 'name' ? '__________' : `= ______ ${unit}`;
    return `<div class="print-geo"><div class="print-geo-prompt">${t(geoPromptKey(display))}</div>${shapeSVG(display, { size: 78 })}<div class="print-geo-blank">${blank}</div></div>`;
  }
  if (type === 'clock') {
    if (display.direction === 'd2a') {
      // Kid draws the hands on an empty face
      return `<div class="print-clock"><div class="print-clock-time">${fmtClock(display.h * 60 + display.m)}</div>${clockSVG(display.h, display.m, { size: 100, hands: false })}</div>`;
    }
    return `<div class="print-clock">${clockSVG(display.h, display.m, { size: 100 })}<div class="print-clock-blank">____ : ____</div></div>`;
  }
  if (type === 'conversions') {
    return `<span class="print-eq">${cvtFmt(display.fromValue)} ${unitLabel(display.fromUnit, display.fromValue)} = _______ ${unitLabel(display.toUnit, 2)}</span>`;
  }
  if (display.op === '+' || display.op === '−') {
    const top = display.op === '+' ? Math.max(display.a, display.b) : display.a;
    const bot = display.op === '+' ? Math.min(display.a, display.b) : display.b;
    return `<div class="print-eq print-eq-stack">
      <span class="print-stack-top">${top}</span>
      <span class="print-stack-op">${display.op}</span>
      <span class="print-stack-num">${bot}</span>
      <div class="print-stack-line"></div>
      <div class="print-stack-blank"></div>
    </div>`;
  }
  return `<span class="print-eq">${display.a} ${display.op} ${display.b} = _______</span>`;
}

function getPrintTitle() {
  if (printCfg.type === 'conversions') {
    const cat = CONV_CATEGORIES.find(c => c.key === printCfg.category);
    return `${cat ? t(cat.labelKey) : ''} ${t('conversions')}`;
  }
  if (printCfg.type === 'times-table') return `×${printCfg.table} ${t('timesTable')}`;
  if (printCfg.type === 'clock') return `${t('clock')} ${t('printWorksheet')}`;
  if (printCfg.type === 'geometry') {
    const cat = GEO_CATEGORIES.find(c => c.key === printCfg.geoCat);
    return `${cat ? t(cat.labelKey) : t('geometry')} ${t('printWorksheet')}`;
  }
  if (printCfg.type === 'fractions') {
    const cat = FRACTION_CATEGORIES.find(c => c.key === printCfg.fracCat);
    return `${cat ? t(cat.labelKey) : t('fractions')} ${t('printWorksheet')}`;
  }
  return `${t(OP_META_KEYS[printCfg.op] || printCfg.op)} ${t('printWorksheet')}`;
}

function printAnswerLabel(q) {
  if (printCfg.type === 'clock') return fmtClock(q.answer);
  if (printCfg.type === 'geometry' && q.display.kind === 'name') return shapeNameByIdx(q.answer);
  if (printCfg.type === 'fractions' && q.display.kind === 'compare') {
    const f = q.display.fr[q.answer];
    return `${f[0]}/${f[1]}`;
  }
  return cvtFmt(q.answer);
}

function renderPrintSection(questions) {
  const title   = getPrintTitle();
  const dateStr = new Date().toLocaleDateString(currentLang==='da'?'da-DK':'en-GB', {year:'numeric',month:'long',day:'numeric'});
  const gradeMeta = printCfg.type !== 'times-table'
    ? ` · ${TRANSLATIONS[currentLang].gradeLabel(printCfg.grade)}` : '';
  const countMeta = t('problems')(getPrintCount());

  const problemsHtml = questions.map((q,i) =>
    `<div class="print-problem">
      <span class="print-num">${i+1}.</span>
      ${formatPrintEq(q.display, printCfg.type)}
    </div>`
  ).join('');

  const akHtml = printCfg.answerKey ? `
    <div class="print-answer-key">
      <div class="print-ak-header">
        <div class="print-ak-title">${t('answerKey')} — ${title}</div>
        <div class="print-ak-meta">${dateStr}${gradeMeta}</div>
      </div>
      <div class="print-ak-grid">
        ${questions.map((q,i)=>`<span><strong>${i+1}.</strong> ${printAnswerLabel(q)}</span>`).join('')}
      </div>
    </div>` : '';

  $('print-section').innerHTML = `
    <div class="print-header">
      <div class="print-brand">MathRoot</div>
      <div class="print-header-center">
        <div class="print-meta">${dateStr}${gradeMeta} · ${countMeta}</div>
      </div>
      <div class="print-name">Name: _________________________&nbsp;&nbsp;Score: _____ / ${questions.length}</div>
    </div>
    <div class="print-problems ${printGridClass()}">${problemsHtml}</div>
    ${akHtml}`;
}

function printWorksheet() {
  const questions = generateWorksheet();
  renderPrintSection(questions);
  setTimeout(() => window.print(), 150);
}

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
allSessions = store.get('mathroot-sessions', []);
if (!Array.isArray(allSessions)) allSessions = [];

const savedPrefs = store.get('mathroot-prefs', {}) || {};
if ([10, 20, 30, 40].includes(savedPrefs.count)) {
  totalQ = savedPrefs.count;
  document.querySelectorAll('.count-card').forEach(c => c.classList.toggle('active', parseInt(c.dataset.count, 10) === totalQ));
}
if (savedPrefs.mode === 'quiz' || savedPrefs.mode === 'input') {
  selectedMode = savedPrefs.mode;
  document.querySelectorAll('.mode-card').forEach(c => c.classList.toggle('active', c.dataset.mode === selectedMode));
}

const savedLang = store.get('mathroot-lang', null);
currentLang = savedLang === 'da' || savedLang === 'en'
  ? savedLang
  : ((navigator.language || '').toLowerCase().startsWith('da') ? 'da' : 'en');
$('lang-btn-label').textContent = currentLang.toUpperCase();
document.querySelectorAll('.lang-option').forEach(el => el.classList.toggle('active', el.dataset.lang === currentLang));

// Restore grade BEFORE applyLang — applyLang internally calls selectGrade(selectedGrade),
// which persists, and would otherwise overwrite the saved grade with the default
const savedGrade = store.get('mathroot-grade', 4);
selectedGrade = GRADE_CONFIG[savedGrade] ? savedGrade : 4;

applyLang();
selectGrade(selectedGrade);
buildTimesTableGrid();
renderHistory();
