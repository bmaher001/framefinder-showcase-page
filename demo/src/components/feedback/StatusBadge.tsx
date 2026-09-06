import { AlertCircle, Check, CloudOff, Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export type Status = 'connected' | 'disconnected' | 'indexing' | 'pending' | 'verified' | 'experimental'

export function StatusBadge({ status }: { status: Status }) {
  const { t } = useTranslation()
  const config = {
    connected: { label: t('common.connected'), icon: <Check size={10} />, cls: 'border-daylight/30 bg-daylight/10 text-daylight' },
    indexing: { label: t('common.indexing'), icon: <Loader2 size={10} className="animate-spin" />, cls: 'border-daylight/30 bg-daylight/10 text-daylight' },
    pending: { label: t('common.pending'), icon: <Loader2 size={10} />, cls: 'border-daylight/30 bg-daylight/10 text-daylight' },
    verified: { label: t('common.verified'), icon: <Check size={10} />, cls: 'border-confirmed/30 bg-confirmed/10 text-confirmed' },
    disconnected: { label: t('common.disconnected'), icon: <CloudOff size={10} />, cls: 'border-line bg-window text-muted' },
    experimental: { label: t('common.experimental'), icon: <AlertCircle size={10} />, cls: 'border-line bg-window text-muted' },
  }[status]
  return <span className={`ff-badge ${config.cls}`}>{config.icon}{config.label}</span>
}
