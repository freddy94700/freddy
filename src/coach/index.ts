import { CoachEngine, Settings } from '../types'
import { LlmCoach } from './llmCoach'
import { LocalCoach } from './localCoach'

export function createCoach(settings: Settings): CoachEngine {
  const local = new LocalCoach()
  if (settings.mode === 'llm' || (settings.mode === 'auto' && settings.apiKey.trim().length > 0)) {
    if (settings.apiKey.trim().length > 0) {
      return new LlmCoach(
        { apiKey: settings.apiKey.trim(), endpoint: settings.endpoint.trim(), model: settings.model.trim() },
        local,
      )
    }
  }
  return local
}
