import type { ReactNode } from 'react'
import type { Screen } from '../types'
import { Sidebar } from '../components'
import { detectDesktopPlatform, TitleBar } from '../platform/TitleBar'

type AppShellProps = {
  activeScreen: Screen
  children: ReactNode
  overlays?: ReactNode
  onNavigate: (screen: Screen) => void
  onHelp: () => void
  onLogout: () => void
}

export function AppShell({ activeScreen, children, overlays, onNavigate, onHelp, onLogout }: AppShellProps) {
  const platform = detectDesktopPlatform()
  return <div className="ff-os-window relative flex h-full overflow-hidden bg-window" data-platform={platform}>
    <TitleBar platform={platform} />
    <Sidebar active={activeScreen} onNavigate={onNavigate} onHelp={onHelp} onLogout={onLogout} />
    <main id="main-content" className="mt-8 min-w-0 flex-1">{children}</main>
    {overlays}
  </div>
}
