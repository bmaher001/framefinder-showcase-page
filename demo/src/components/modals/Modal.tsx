import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { IconButton } from '../buttons/Button'

export function Modal({ title, children, onClose, footer }: { title: string; children: ReactNode; onClose: () => void; footer?: ReactNode }) {
  const { t } = useTranslation()
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/65 p-8" role="presentation" onMouseDown={e => e.target === e.currentTarget && onClose()}><section className="flex max-h-[calc(100vh-64px)] w-full max-w-md flex-col rounded-ff-sm border border-line bg-elevated shadow-panel" role="dialog" aria-modal="true" aria-label={title}><header className="flex h-11 shrink-0 items-center justify-between border-b border-line px-4"><h2 className="text-[13px] font-semibold">{title}</h2><IconButton label={t('common.close')} onClick={onClose}><X size={15} /></IconButton></header><div className="min-h-0 overflow-auto p-4">{children}</div>{footer && <footer className="flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-line px-4 py-3">{footer}</footer>}</section></div>
}
