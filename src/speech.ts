export interface RecognitionHandle {
  stop: () => void
}

export function recognitionSupported(): boolean {
  const w = window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }
  return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition)
}

type SR = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((ev: unknown) => void) | null
  onend: (() => void) | null
  onerror: ((ev: unknown) => void) | null
  start: () => void
  stop: () => void
}

export function startRecognition(opts: {
  lang?: string
  onFinal: (text: string) => void
  onInterim?: (text: string) => void
  onEnd?: () => void
  onError?: (message: string) => void
}): RecognitionHandle | null {
  const w = window as unknown as {
    SpeechRecognition?: new () => SR
    webkitSpeechRecognition?: new () => SR
  }
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition
  if (!Ctor) return null
  const rec = new Ctor()
  rec.lang = opts.lang ?? 'en-US'
  rec.continuous = true
  rec.interimResults = true
  rec.onresult = (ev: unknown) => {
    const e = ev as { results: ArrayLike<ArrayLike<{ transcript: string }>>; resultIndex: number }
    let interim = ''
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const result = e.results[i]
      const transcript = result[0]?.transcript ?? ''
      if (result && (result as unknown as { isFinal: boolean }).isFinal) {
        opts.onFinal(transcript.trim())
      } else {
        interim += transcript
      }
    }
    if (interim) opts.onInterim?.(interim)
  }
  rec.onend = () => opts.onEnd?.()
  rec.onerror = (ev: unknown) => {
    const e = ev as { error?: string }
    if (e.error && e.error !== 'aborted' && e.error !== 'no-speech') {
      opts.onError?.(e.error)
    }
  }
  try {
    rec.start()
  } catch {
    return null
  }
  return { stop: () => rec.stop() }
}

let voices: SpeechSynthesisVoice[] = []

export function loadVoices(): SpeechSynthesisVoice[] {
  voices = window.speechSynthesis.getVoices()
  return voices
}

export function pickEnglishVoice(): SpeechSynthesisVoice | null {
  if (voices.length === 0) voices = window.speechSynthesis.getVoices()
  const en = voices.filter((v) => v.lang.toLowerCase().startsWith('en'))
  if (en.length === 0) return null
  const preferred =
    en.find((v) => /google us english/i.test(v.name)) ??
    en.find((v) => /en[-_]US/i.test(v.lang) && /female|samantha|zira|aria/i.test(v.name)) ??
    en.find((v) => /en[-_]US/i.test(v.lang)) ??
    en.find((v) => /en[-_]GB/i.test(v.lang)) ??
    en[0]
  return preferred
}

export function speak(text: string, opts?: { rate?: number; onEnd?: () => void }): void {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'en-US'
  utter.rate = opts?.rate ?? 0.95
  const voice = pickEnglishVoice()
  if (voice) utter.voice = voice
  if (opts?.onEnd) utter.onend = opts.onEnd
  window.speechSynthesis.speak(utter)
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
}

export function ttsSupported(): boolean {
  return 'speechSynthesis' in window
}
