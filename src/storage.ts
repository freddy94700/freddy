import { AppState, DEFAULT_SETTINGS, SessionRecord } from './types'

const KEY = 'speakpal_state_v1'

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) {
      return { profile: null, premium: true, sessions: [], settings: { ...DEFAULT_SETTINGS } }
    }
    const parsed = JSON.parse(raw) as AppState
    return {
      profile: parsed.profile ?? null,
      premium: parsed.premium ?? true,
      sessions: parsed.sessions ?? [],
      settings: { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) },
    }
  } catch {
    return { profile: null, premium: true, sessions: [], settings: { ...DEFAULT_SETTINGS } }
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function dayKey(ts: number): string {
  const d = new Date(ts)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function sessionsOn(state: AppState, ts: number): SessionRecord[] {
  const k = dayKey(ts)
  return state.sessions.filter((s) => dayKey(s.startedAt) === k)
}

export const FREE_SESSIONS_PER_DAY = 1

export function canStartSession(state: AppState, now = Date.now()): boolean {
  if (state.premium) return true
  return sessionsOn(state, now).length < FREE_SESSIONS_PER_DAY
}

export function currentStreak(state: AppState, now = Date.now()): number {
  const days = new Set(state.sessions.map((s) => dayKey(s.startedAt)))
  let streak = 0
  let cursor = new Date(now)
  if (!days.has(dayKey(cursor.getTime()))) {
    cursor.setDate(cursor.getDate() - 1)
  }
  while (days.has(dayKey(cursor.getTime()))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function weekKey(ts: number): string {
  const d = new Date(ts)
  const monday = new Date(d)
  const day = (d.getDay() + 6) % 7
  monday.setDate(d.getDate() - day)
  return dayKey(monday.getTime())
}

export const WEEKLY_GOAL = 5

export function weekProgress(state: AppState, now = Date.now()): { done: number; goal: number } {
  const k = weekKey(now)
  const done = state.sessions.filter((s) => weekKey(s.startedAt) === k).length
  return { done, goal: WEEKLY_GOAL }
}

export function masteryScore(state: AppState): number {
  if (state.sessions.length === 0) return 0
  const sum = state.sessions.reduce((acc, s) => acc + s.score, 0)
  return Math.round(sum / state.sessions.length)
}

export function masteryTrend(state: AppState, limit = 10): SessionRecord[] {
  return [...state.sessions].sort((a, b) => a.startedAt - b.startedAt).slice(-limit)
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}
