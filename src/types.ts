export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export const LEVELS: { value: Level; label: string; desc: string }[] = [
  { value: 'A1', label: 'Débutant', desc: 'A1 — quelques bases' },
  { value: 'A2', label: 'Élémentaire', desc: 'A2 — phrases simples' },
  { value: 'B1', label: 'Intermédiaire', desc: 'B1 — conversations courantes' },
  { value: 'B2', label: 'Intermédiaire +', desc: 'B2 — à l’aise sur la plupart des sujets' },
  { value: 'C1', label: 'Avancé', desc: 'C1 — fluide et nuancé' },
  { value: 'C2', label: 'Maîtrise', desc: 'C2 — niveau quasi natif' },
]

export type Category = 'grammar' | 'vocabulary' | 'expression' | 'pronunciation'

export const CATEGORY_LABELS: Record<Category, string> = {
  grammar: 'Grammaire',
  vocabulary: 'Vocabulaire',
  expression: 'Expression',
  pronunciation: 'Prononciation',
}

export interface Correction {
  original: string
  corrected: string
  explanation: string
  category: Category
  severity: 'error' | 'tip'
  translation?: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'coach'
  text: string
  textFr?: string
  corrections?: Correction[]
  score?: number
  ts: number
}

export interface CoachResponse {
  reply: string
  replyFr?: string
  corrections: Correction[]
  score: number
  tip?: string
}

export interface SessionContext {
  level: Level
  interests: string[]
  kind: 'topic' | 'scenario'
  topic?: string
  scenarioId?: string
  history: ChatMessage[]
}

export interface CoachEngine {
  startSession(ctx: SessionContext): Promise<CoachResponse>
  respond(userText: string, ctx: SessionContext): Promise<CoachResponse>
  endSession(messages: ChatMessage[]): SessionSummary
}

export interface SessionSummary {
  score: number
  errorCount: number
  tipCount: number
  tip?: string
  highlights: Correction[]
}

export interface SessionRecord {
  id: string
  startedAt: number
  endedAt: number
  durationSec: number
  score: number
  errorCount: number
  tipCount: number
  kind: 'topic' | 'scenario'
  label: string
}

export interface Profile {
  level: Level
  interests: string[]
  createdAt: number
}

export type CoachMode = 'auto' | 'local' | 'llm'

export interface Settings {
  sound: boolean
  mode: CoachMode
  apiKey: string
  endpoint: string
  model: string
}

export interface AppState {
  profile: Profile | null
  premium: boolean
  sessions: SessionRecord[]
  settings: Settings
}

export const DEFAULT_SETTINGS: Settings = {
  sound: true,
  mode: 'llm',
  apiKey: '',
  endpoint: 'https://api.openai.com/v1/chat/completions',
  model: 'gpt-4o-mini',
}
