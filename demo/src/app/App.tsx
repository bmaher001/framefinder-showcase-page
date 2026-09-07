import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HelpModal } from '../components'
import { setDocumentLocale } from '../i18n'
import { LoginScreen } from '../screens'
import type { Screen } from '../types'
import { AppShell } from './AppShell'
import { createScreenRegistry } from './screenRegistry'

export default function App() {
  const { i18n } = useTranslation()
  const [authenticated, setAuthenticated] = useState(true)
  const [screen, setScreen] = useState<Screen>('dashboard')
  const [guideStep, setGuideStep] = useState<number | null>(null)
  const [help, setHelp] = useState(false)
  const [theme, setTheme] = useState('dark')
  const language: 'en' | 'ar' = i18n.language.startsWith('ar') ? 'ar' : 'en'

  const changeTheme = (value: string) => {
    setTheme(value)
    const dark = value === 'dark' || (value === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList.toggle('dark', dark)
  }
  const changeLanguage = (value: string) => { void i18n.changeLanguage(value); setDocumentLocale(value) }

  useEffect(() => { changeTheme(theme) }, [])
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setHelp(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  // Same-origin bridge for the showcase's optional guided walkthrough.
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== window.parent || event.data?.type !== 'framefinder-step') return
      const screens: Screen[] = ['dashboard', 'drive', 'search', 'scenes', 'people', 'reviews', 'settings', 'dashboard', 'dashboard']
      const step = Number(event.data.step)
      if (!Number.isInteger(step) || !screens[step]) return
      setGuideStep(step)
      setAuthenticated(step !== 8)
      setHelp(step === 7)
      setScreen(screens[step])
    }
    window.addEventListener('message', receive)
    window.parent.postMessage({ type: 'framefinder-ready' }, location.origin)
    return () => window.removeEventListener('message', receive)
  }, [])

  const navigate = (next: Screen) => {
    setGuideStep(null)
    setScreen(next)
    window.parent.postMessage({ type: 'framefinder-exploring' }, location.origin)
  }

  if (!authenticated) return <div className="guided-app-screen" data-guide-step={guideStep}><LoginScreen onLogin={() => { setAuthenticated(true); navigate('dashboard') }} /></div>

  const screens = createScreenRegistry({ language, onLanguage: changeLanguage, onNavigate: navigate, onTheme: changeTheme, theme })
  return <AppShell activeScreen={screen} onNavigate={navigate} onHelp={() => setHelp(true)} onLogout={() => setAuthenticated(false)} overlays={help ? <HelpModal language={language} onLanguage={changeLanguage} onClose={() => setHelp(false)} /> : undefined}><div className="guided-app-layout" data-guide-step={guideStep}><div key={guideStep ?? screen} className="guided-app-screen">{screens[screen]}</div></div></AppShell>
}
