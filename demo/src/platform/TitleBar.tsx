import { Minus, Square, X } from 'lucide-react'

export type DesktopPlatform = 'macos' | 'windows'

export function detectDesktopPlatform(): DesktopPlatform {
  return typeof navigator !== 'undefined' && /Windows/i.test(navigator.userAgent) ? 'windows' : 'macos'
}

export function TitleBar({ platform = detectDesktopPlatform() }: { platform?: DesktopPlatform }) {
  return <div className="app-drag-region fixed inset-x-0 top-0 z-40 h-8" data-platform={platform}>
    {platform === 'macos' ? <div className="absolute left-[19px] top-[9px] flex gap-2" aria-hidden="true"><span className="size-3.5 rounded-full bg-[#ff5f57]" /><span className="size-3.5 rounded-full bg-[#febc2e]" /><span className="size-3.5 rounded-full bg-[#28c840]" /></div> : <div className="no-drag absolute inset-y-0 right-0 flex" style={{ marginRight: 'env(titlebar-area-x, 0px)' }}><button className="grid w-11 place-items-center text-secondary hover:bg-panel hover:text-primary" aria-label="Minimize window"><Minus size={14} /></button><button className="grid w-11 place-items-center text-secondary hover:bg-panel hover:text-primary" aria-label="Maximize window"><Square size={12} /></button><button className="grid w-11 place-items-center text-secondary hover:bg-error hover:text-on-accent" aria-label="Close window"><X size={14} /></button></div>}
  </div>
}
