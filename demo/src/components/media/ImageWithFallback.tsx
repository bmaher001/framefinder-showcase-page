import { useState } from 'react'
import { Film } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function ImageWithFallback({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const { t } = useTranslation()
  const [failed, setFailed] = useState(false)
  if (failed) return <div className={`grid place-items-center bg-panel text-muted ${className}`} role="img" aria-label={t('common.noThumbnail')}><Film size={20} /></div>
  return <img src={src} alt={alt} className={`block object-cover object-center ${className}`} draggable={false} onError={() => setFailed(true)} />
}
