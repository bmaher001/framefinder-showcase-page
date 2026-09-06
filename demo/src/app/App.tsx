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

  if (!authenticated) return <LoginScreen onLogin={() => setAuthenticated(true)} />

  const screens = createScreenRegistry({ language, onLanguage: changeLanguage, onNavigate: setScreen, onTheme: changeTheme, theme })
  return <AppShell activeScreen={screen} onNavigate={setScreen} onHelp={() => setHelp(true)} onLogout={() => setAuthenticated(false)} overlays={help ? <HelpModal language={language} onLanguage={changeLanguage} onClose={() => setHelp(false)} /> : undefined}>{screens[screen]}</AppShell>
}
