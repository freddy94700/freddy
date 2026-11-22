import { Category, Correction } from './types'

interface GrammarRule {
  pattern: RegExp
  replacement: string | ((match: RegExpExecArray) => string)
  explanation: string
  category: Category
}

const GERUNDS: Record<string, string> = {
  hear: 'hearing', meet: 'meeting', see: 'seeing', go: 'going', work: 'working',
  eat: 'eating', play: 'playing', read: 'reading', write: 'writing', swim: 'swimming',
  travel: 'travelling', drive: 'driving', live: 'living', speak: 'speaking', run: 'running',
  wake: 'waking', get: 'getting', cook: 'cooking', shop: 'shopping', watch: 'watching',
  listen: 'listening', learn: 'learning', visit: 'visiting', help: 'helping', enjoy: 'enjoying',
}

const PAST_TO_BASE: Record<string, string> = {
  went: 'go', came: 'come', saw: 'see', ate: 'eat', had: 'have', did: 'do',
  made: 'make', took: 'take', understood: 'understand', knew: 'know', said: 'say',
  told: 'tell', got: 'get', found: 'find', thought: 'think', bought: 'buy',
  wrote: 'write', met: 'meet', left: 'leave', felt: 'feel', began: 'begin',
  drove: 'drive', ran: 'run', swam: 'swim', spoke: 'speak', liked: 'like',
  loved: 'love', wanted: 'want', needed: 'need', played: 'play', worked: 'work',
  lived: 'live', travelled: 'travel', watched: 'watch', listened: 'listen',
  cooked: 'cook', shopped: 'shop', enjoyed: 'enjoy', visited: 'visit',
  learned: 'learn', helped: 'help',
}

const RULES: GrammarRule[] = [
  {
    pattern: /\bI('m| am) agree\b/i,
    replacement: 'I agree',
    explanation: "On dit « I agree », sans « am ». « Agree » est déjà un verbe.",
    category: 'grammar',
  },
  {
    pattern: /\bI have (\d+) years\b/i,
    replacement: (m) => `I am ${m[1]} years old`,
    explanation: "Pour l’âge, on dit « I am X years old ».",
    category: 'grammar',
  },
  {
    pattern: /\bI am (\d+) years\b(?! old)/i,
    replacement: (m) => `I am ${m[1]} years old`,
    explanation: "On complète par « old » : « I am 25 years old ».",
    category: 'grammar',
  },
  {
    pattern: /\b(he|she|it) don't\b/i,
    replacement: (m) => `${m[1]} doesn't`,
    explanation: "À la 3ᵉ personne du singulier, on dit « doesn't », pas « don't ».",
    category: 'grammar',
  },
  {
    pattern: /\b(he|she) (go|do|have|want|need|like|know|think|come|get|make|say|see|take|eat|drink|work|live|love|hate|play|watch|read|write|listen|cook|shop|enjoy|visit|learn|travel|run|swim|drive|wake|speak|smile|laugh|walk|talk)\b/i,
    replacement: (m) => `${m[1]} ${m[2]}s`,
    explanation: "Au présent simple, avec he/she/it, le verbe prend un -s à la 3ᵉ personne.",
    category: 'grammar',
  },
  {
    pattern: /\bdidn't ([a-z]+)\b/i,
    replacement: (m) => {
      const base = PAST_TO_BASE[m[1].toLowerCase()]
      return base ? `didn't ${base}` : m[0]
    },
    explanation: "Après « did/didn't », le verbe revient à l’infinitif (forme de base) : « didn't go », pas « didn't went ».",
    category: 'grammar',
  },
  {
    pattern: /\binformations\b/i,
    replacement: 'information',
    explanation: "« Information » est indénombrable en anglais : pas de -s.",
    category: 'vocabulary',
  },
  {
    pattern: /\bthe peoples\b/i,
    replacement: 'people',
    explanation: "« People » (les gens) est déjà pluriel, pas de -s.",
    category: 'vocabulary',
  },
  {
    pattern: /\bchilds\b/i,
    replacement: 'children',
    explanation: "Le pluriel de « child » est « children » (irrégulier).",
    category: 'vocabulary',
  },
  {
    pattern: /\bfurnitures?\b/i,
    replacement: 'furniture',
    explanation: "« Furniture » (les meubles) est indénombrable.",
    category: 'vocabulary',
  },
  {
    pattern: /\badvices\b/i,
    replacement: 'advice',
    explanation: "« Advice » (les conseils) est indénombrable.",
    category: 'vocabulary',
  },
  {
    pattern: /\ba lot of works\b/i,
    replacement: 'a lot of work',
    explanation: "« Work » (le travail) est indénombrable.",
    category: 'vocabulary',
  },
  {
    pattern: /\bI('m| am) boring\b/i,
    replacement: "I'm bored",
    explanation: "« Bored » = qui s’ennuie (I'm bored). « Boring » = ennuyeux (it's boring).",
    category: 'grammar',
  },
  {
    pattern: /\bI('m| am) interesting\b/i,
    replacement: "I'm interested",
    explanation: "« Interested » = intéressé (I'm interested). « Interesting » = intéressant (it's interesting).",
    category: 'grammar',
  },
  {
    pattern: /\bI('m| am) interesting in\b/i,
    replacement: "I'm interested in",
    explanation: "On dit « I'm interested in » (intéressé par), pas « interesting in ».",
    category: 'grammar',
  },
  {
    pattern: /\bhow much (people|persons|students|children|books|cars|times|days|hours|apples|countries|cities|friends|brothers|sisters)\b/i,
    replacement: (m) => `how many ${m[1]}`,
    explanation: "« How many » pour les choses qu’on compte ; « how much » pour les indénombrables.",
    category: 'grammar',
  },
  {
    pattern: /\bI look forward to ([a-z]+)\b/i,
    replacement: (m) => {
      const g = GERUNDS[m[1].toLowerCase()]
      return g ? `I look forward to ${g}` : m[0]
    },
    explanation: "Après « look forward to », le verbe se met en -ing : « I look forward to hearing from you ».",
    category: 'grammar',
  },
  {
    pattern: /\bDespite of\b/i,
    replacement: 'Despite',
    explanation: "Pas de « of » après « despite » : « despite the rain ». Sinon : « in spite of the rain ».",
    category: 'grammar',
  },
  {
    pattern: /\bIt('s| is) depend of\b/i,
    replacement: 'It depends on',
    explanation: "On dit « it depends on », pas « depend of ».",
    category: 'grammar',
  },
  {
    pattern: /\bI'm used to ([a-z]+)\b/i,
    replacement: (m) => {
      const g = GERUNDS[m[1].toLowerCase()]
      return g ? `I'm used to ${g}` : m[0]
    },
    explanation: "Après « be used to », verbe en -ing : « I'm used to waking up early ».",
    category: 'grammar',
  },
  {
    pattern: /\bWhat means ([^?!.]+)\??/i,
    replacement: (m) => `What does ${m[1].trim()} mean?`,
    explanation: "« What does … mean? » — avec l’auxiliaire « does » et l’infinitif « mean ».",
    category: 'grammar',
  },
  {
    pattern: /\bHow much costs ([^?!.]+)\??/i,
    replacement: (m) => `How much does ${m[1].trim()} cost?`,
    explanation: "« How much does it cost? » — auxiliaire « does » + infinitif « cost ».",
    category: 'grammar',
  },
  {
    pattern: /\bI('m| am) coming from\b/i,
    replacement: 'I come from',
    explanation: "Une origine se dit au présent simple : « I come from France ».",
    category: 'grammar',
  },
  {
    pattern: /\bsince (\d+ years?|\d+ months?|\d+ weeks?|\d+ days?|one year|two years|three years|many years|several years|a long time)\b/i,
    replacement: (m) => `for ${m[1]}`,
    explanation: "Avec une durée, on utilise « for » (« for 3 years »). « Since » sert pour un point de départ (« since 2020 »).",
    category: 'grammar',
  },
  {
    pattern: /\bI have been (in|at) ([A-Z][a-zA-Z]+) last year\b/i,
    replacement: (m) => `I went to ${m[2]} last year`,
    explanation: "« Last year » = passé révolu, donc prétérit : « I went to London last year ».",
    category: 'grammar',
  },
  {
    pattern: /\bI go to the work\b/i,
    replacement: 'I go to work',
    explanation: "On dit « I go to work », sans « the ».",
    category: 'grammar',
  },
  {
    pattern: /\bI don't have the time\b/i,
    replacement: "I don't have time",
    explanation: "« Time » dans ce sens est indénombrable : « I don't have time ».",
    category: 'grammar',
  },
  {
    pattern: /\bI (did|do) a mistake\b/i,
    replacement: 'I made a mistake',
    explanation: "On « fait » une erreur : « I made a mistake » (make, pas do/did).",
    category: 'vocabulary',
  },
  {
    pattern: /\bI('m| am) doing a mistake\b/i,
    replacement: "I'm making a mistake",
    explanation: "« Faire une erreur » = « make a mistake ».",
    category: 'vocabulary',
  },
  {
    pattern: /\bmake a photo\b/i,
    replacement: 'take a photo',
    explanation: "On « prend » une photo : « take a photo » (pas « make »).",
    category: 'vocabulary',
  },
  {
    pattern: /\bI have hunger\b/i,
    replacement: "I'm hungry",
    explanation: "On dit « I'm hungry » (j’ai faim), pas « I have hunger ».",
    category: 'vocabulary',
  },
  {
    pattern: /\bI have thirst\b/i,
    replacement: "I'm thirsty",
    explanation: "« J’ai soif » = « I'm thirsty ».",
    category: 'vocabulary',
  },
  {
    pattern: /\bI('m| am) waiting (you|him|her|them|me|us)\b/i,
    replacement: (m) => `I'm waiting for ${m[2]}`,
    explanation: "« Attendre quelqu’un » = « wait for someone » : « I'm waiting for you ».",
    category: 'grammar',
  },
  {
    pattern: /\blistening (the )?(music|radio)\b/i,
    replacement: (m) => `listening to ${m[2]}`,
    explanation: "« Écouter quelque chose » = « listen to something » : « listening to music ».",
    category: 'grammar',
  },
  {
    pattern: /\bI suggest you to\b/i,
    replacement: 'I suggest that you',
    explanation: "Deux options : « I suggest going » (verbe en -ing) ou « I suggest that you go ».",
    category: 'grammar',
  },
  {
    pattern: /\b(I|we|they|he|she|you) (want|need|like|love|hate|try|decide|forget|remember|begin|start|continue|learn|choose|hope|plan|pretend|manage|promise|seem|appear|agree) (explain|go|eat|see|know|tell|say|speak|visit|buy|come|leave|arrive|find|make|take|do|have|meet|watch|read|write|play|work|travel|sleep|open|close|stop|move|bring|teach|show|give|call|ask|answer|listen|feel|think|believe|understand|study|practice|improve|correct|translate|repeat|pronounce|enjoy|cook|shop|run|swim|drive|wake|smile|laugh|walk|talk)\b/i,
    replacement: (m) => `${m[1]} ${m[2]} to ${m[3]}`,
    explanation: "Après ces verbes, on met « to » + l’infinitif : « I want to go ».",
    category: 'grammar',
  },
  {
    pattern: /\bI made my homework\b/i,
    replacement: 'I did my homework',
    explanation: "« Faire ses devoirs » = « do my homework » (pas « make »).",
    category: 'vocabulary',
  },
  {
    pattern: /\bWhat do you do in the life\b/i,
    replacement: 'What do you do for a living',
    explanation: "« Que fais-tu dans la vie ? » = « What do you do for a living? »",
    category: 'expression',
  },
  {
    pattern: /\bI work (in|at) a (society|enterprise|firm)\b/i,
    replacement: 'I work at a company',
    explanation: "« Une société » (entreprise) = « a company », pas « a society ».",
    category: 'vocabulary',
  },
  {
    pattern: /\bI take a coffee\b/i,
    replacement: "I'll have a coffee",
    explanation: "Au restaurant, on « prend » une consommation : « I'll have a coffee ».",
    category: 'expression',
  },
  {
    pattern: /\bto the university\b/i,
    replacement: 'to university',
    explanation: "On dit « go to university », sans « the » (idem : hospital, school, prison…).",
    category: 'grammar',
  },
  {
    pattern: /\bmore (better|good)\b/i,
    replacement: 'better',
    explanation: "« Better » est déjà comparatif : on ne dit pas « more better ».",
    category: 'grammar',
  },
  {
    pattern: /\bCan you repeat please\b/i,
    replacement: 'Could you repeat that, please?',
    explanation: "Plus poli et naturel : « Could you repeat that, please? »",
    category: 'expression',
  },
  {
    pattern: /\bI am (cold|hot|hungry|thirsty|bored|interested)\b/i,
    replacement: (m) => `I'm ${m[1]}`,
    explanation: "À l’oral, on contracte presque toujours : « I'm cold », pas « I am cold ».",
    category: 'expression',
  },
]

interface LexiconEntry {
  pattern: RegExp
  better: string
  note: string
}

const LEXICON: LexiconEntry[] = [
  { pattern: /\bvery good\b/i, better: 'great / awesome', note: 'Plus naturel et plus vivant.' },
  { pattern: /\bvery bad\b/i, better: 'terrible / awful', note: 'Plus expressif.' },
  { pattern: /\bvery interesting\b/i, better: 'fascinating', note: 'Un cran au-dessus.' },
  { pattern: /\bvery big\b/i, better: 'huge / enormous', note: 'Plus précis.' },
  { pattern: /\bvery small\b/i, better: 'tiny', note: 'Plus précis.' },
  { pattern: /\bvery tired\b/i, better: 'exhausted / worn out', note: 'Plus naturel à l’oral.' },
  { pattern: /\bvery happy\b/i, better: 'thrilled / delighted', note: 'Plus fort.' },
  { pattern: /\ba lot of\b/i, better: 'loads of / plenty of / tons of', note: 'Très courant à l’oral.' },
  { pattern: /\bI like\b/i, better: "I'm into… / I really enjoy… / I'm fond of…", note: 'Varie tes formulations.' },
  { pattern: /\bI think\b/i, better: "I'd say… / I reckon… / In my opinion…", note: 'Plus naturel en conversation.' },
  { pattern: /\bnice\b/i, better: 'lovely / great / awesome', note: '« Nice » est un peu plat ; varie !' },
  { pattern: /\bgood\b/i, better: 'great / solid / decent', note: 'Varie ton vocabulaire.' },
  { pattern: /\bbut\b/i, better: 'however / although / though', note: 'En début de phrase, « However, … » fait très naturel.' },
  { pattern: /\bbecause\b/i, better: 'since / as', note: '« Since » et « as » sont plus soutenus.' },
  { pattern: /\bso\b/i, better: "that's why / therefore", note: '« That’s why » est très courant à l’oral.' },
  { pattern: /\band also\b/i, better: 'plus / what’s more / moreover', note: 'Varie les connecteurs.' },
  { pattern: /\bI don't know\b/i, better: "I'm not sure / I have no idea", note: 'Plus naturel.' },
  { pattern: /\bmaybe\b/i, better: 'perhaps / possibly', note: '« Perhaps » est un peu plus soutenu.' },
  { pattern: /\bok(ay)?\b/i, better: 'sounds good / alright', note: '« Sounds good! » est ultra courant.' },
  { pattern: /\byes\b/i, better: 'absolutely / definitely / for sure', note: 'Plus d’enthousiasme !' },
  { pattern: /\bno problem\b/i, better: 'no worries / anytime / my pleasure', note: '« No worries » est très oral.' },
  { pattern: /\bI want\b/i, better: "I'd like / I'm keen to", note: "« I'd like » est plus poli que « I want »." },
  { pattern: /\bI have to\b/i, better: "I need to / I've got to", note: "« I've got to go » est très courant à l'oral." },
  { pattern: /\bfor me\b/i, better: "as far as I'm concerned / personally", note: 'Formulation plus idiomatique.' },
  { pattern: /\bthank you\b/i, better: 'thanks a lot / I really appreciate it', note: 'Varie tes remerciements.' },
  { pattern: /\bI'm sorry\b/i, better: 'my apologies', note: 'Plus soutenu.' },
  { pattern: /\bthing\b/i, better: 'stuff / aspect', note: '« Stuff » est très oral ; « thing » reste correct.' },
  { pattern: /\bget\b/i, better: 'grab / receive / obtain', note: 'Varie selon le registre.' },
  { pattern: /\bsee you\b/i, better: 'see you later / see you soon / catch you later', note: '« Catch you later » est très familier.' },
  { pattern: /\bI'm fine\b/i, better: "I'm good / I'm doing well", note: "Réponse plus naturelle que « I'm fine » (américain)." },
  { pattern: /\bI don't like\b/i, better: "I'm not into… / I can't stand…", note: '« I can’t stand » = détester (oral).' },
]

interface PronTip {
  pattern: RegExp
  word: string
  tip: string
}

const PRONUNCIATION: PronTip[] = [
  { pattern: /\b(think|this|that|three|thanks?|thing|birthday|mouth)\b/i, word: 'th', tip: 'Le « th » (think, this, three…) se prononce avec la langue entre les dents — pas « s » ni « t ».' },
  { pattern: /\bship\b/i, word: 'ship', tip: '« Ship » (navire) : « i » court, comme dans « sit ». Ne confonds pas avec « sheep » (mouton).' },
  { pattern: /\bsheep\b/i, word: 'sheep', tip: '« Sheep » (mouton) : « ee » long, comme dans « see ». Ne confonds pas avec « ship ».' },
  { pattern: /\bfull\b/i, word: 'full', tip: '« Full » : « u » court, comme dans « put ». Ne dis pas « fool » (fou).' },
  { pattern: /\bworld\b/i, word: 'world', tip: '« World » se prononce « werld » — le « r » se prononce avant le « l ».' },
  { pattern: /\bwork\b/i, word: 'work', tip: 'Dans « work », le « r » se prononce : « werk » (ou très discret en britannique).' },
  { pattern: /\bgirl\b/i, word: 'girl', tip: '« Girl » : le « r » se prononce, « guerl ».' },
  { pattern: /\blive\b/i, word: 'live', tip: '« Live » (vivre) : « i » court (« liv »). « Life » (la vie) : « ai » long (« laïf »).' },
  { pattern: /\blife\b/i, word: 'life', tip: '« Life » (la vie) : « ai » long (« laïf »), et le « f » devient « v » au pluriel « lives ».' },
  { pattern: /\bwant\b/i, word: 'want', tip: 'En américain, « want » se prononce souvent « waant ».' },
  { pattern: /\bwater\b/i, word: 'water', tip: '« Water » : en américain, le « t » sonne comme un « d » (« wadder »).' },
  { pattern: /\bcomfortable\b/i, word: 'comfortable', tip: '« Comfortable » se prononce souvent « comf-ter-bl » (le « t » disparaît à l’oral).' },
  { pattern: /\bvegetable\b/i, word: 'vegetable', tip: '« Vegetable » se prononce souvent « vej-tab’l ».' },
  { pattern: /\bjewelry|jewellery\b/i, word: 'jewelry', tip: '« Jewelry » (les bijoux) : le « j » se prononce « dj ».' },
]

export interface CorrectionResult {
  corrected: string
  corrections: Correction[]
  score: number
}

export function analyzeUserText(text: string): CorrectionResult {
  let corrected = text.trim()
  const corrections: Correction[] = []
  const seen = new Set<string>()

  for (const rule of RULES) {
    rule.pattern.lastIndex = 0
    const match = rule.pattern.exec(corrected)
    if (!match) continue
    let replacement = typeof rule.replacement === 'function' ? rule.replacement(match) : rule.replacement
    if (!replacement || replacement === match[0]) continue
    if (/^[A-Z]/.test(match[0]) && /^[a-z]/.test(replacement)) {
      replacement = replacement[0].toUpperCase() + replacement.slice(1)
    }
    const key = `${match[0]}->${replacement}`
    if (seen.has(key)) continue
    seen.add(key)
    corrected = corrected.replace(rule.pattern, replacement)
    corrections.push({
      original: match[0],
      corrected: replacement,
      explanation: rule.explanation,
      category: rule.category,
      severity: 'error',
    })
  }

  for (const entry of LEXICON) {
    entry.pattern.lastIndex = 0
    const match = entry.pattern.exec(corrected)
    if (!match) continue
    if (corrections.filter((c) => c.severity === 'tip' && c.category === 'expression').length >= 2) continue
    const key = `tip:${match[0]}`
    if (seen.has(key)) continue
    seen.add(key)
    corrections.push({
      original: match[0],
      corrected: entry.better,
      explanation: `Tu peux dire plus naturellement : « ${entry.better} ». ${entry.note}`,
      category: 'expression',
      severity: 'tip',
    })
  }

  for (const p of PRONUNCIATION) {
    p.pattern.lastIndex = 0
    if (p.pattern.test(corrected)) {
      corrections.push({
        original: p.word,
        corrected: p.word,
        explanation: p.tip,
        category: 'pronunciation',
        severity: 'tip',
      })
    }
  }

  const errors = corrections.filter((c) => c.severity === 'error')
  let score = 100
  for (const e of errors) {
    score -= e.category === 'grammar' ? 18 : 12
  }
  const words = corrected.split(/\s+/).filter(Boolean).length
  if (words >= 12) score += 5
  if (words >= 20) score += 5
  score = Math.max(20, Math.min(100, Math.round(score)))

  return { corrected, corrections, score }
}
