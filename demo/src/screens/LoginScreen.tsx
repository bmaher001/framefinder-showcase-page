import { useState, type FormEvent } from 'react'
import { LockKeyhole } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button, Logo } from '../components'

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const submit = (event: FormEvent) => { event.preventDefault(); setLoading(true); window.setTimeout(onLogin, 600) }
  return <div className="ff-os-window grid h-full place-items-center bg-window"><div className="absolute inset-x-0 top-0 h-7 app-drag-region" /><main className="w-full max-w-sm"><div className="mb-6 flex justify-center"><Logo /></div><section className="ff-card bg-surface p-5 shadow-panel"><h1 className="sr-only">{t('login.signIn')} · {t('app.name')}</h1><p className="mb-5 text-center text-[11px] text-muted">{t('login.subtitle')}</p><form onSubmit={submit} className="space-y-3"><label className="block"><span className="ff-label">{t('login.email')}</span><input className="ff-input mt-1.5" type="email" autoComplete="email" required defaultValue="editor@studio.co" /></label><label className="block"><span className="ff-label">{t('login.password')}</span><input className="ff-input mt-1.5" type="password" autoComplete="current-password" required defaultValue="framefinder" /></label><Button variant="primary" type="submit" disabled={loading} className="mt-2 w-full"><LockKeyhole size={14} />{loading ? t('login.signingIn') : t('login.signIn')}</Button></form><p className="mt-4 text-center text-[9px] leading-4 text-muted">{t('login.owner')}</p></section></main></div>
}
