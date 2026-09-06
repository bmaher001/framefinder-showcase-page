import type { ReactNode } from 'react'
import { AlertCircle, Check, CloudOff } from 'lucide-react'

export function InlineNotice({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'error' | 'success' }) {
  const toneClass = tone === 'error' ? 'border-rejected/30 bg-rejected/10 text-rejected' : tone === 'success' ? 'border-confirmed/30 bg-confirmed/10 text-confirmed' : 'border-daylight/30 bg-daylight/10 text-daylight'
  const Icon = tone === 'error' ? AlertCircle : tone === 'success' ? Check : CloudOff
  return <div className={`flex min-h-9 items-center gap-2 border px-3 text-[11px] ${toneClass}`} role={tone === 'error' ? 'alert' : 'status'}><Icon size={14} className="shrink-0" />{children}</div>
}
