import { CircleHelp, Clock3, Home, LogOut, Search, Settings, UserRound, Wrench } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Screen } from '../../types'
import frameFinderSymbol from '../../assets/figma/framefinder-symbol.svg'
import frameFinderLogoDark from '../../../framefinder-ci/framefinder-brand/logo/ff-horizontal-red-dark.svg'
import frameFinderLogoLight from '../../../framefinder-ci/framefinder-brand/logo/ff-horizontal-red-light.svg'

const nav = [
  ['dashboard', Home],
  ['search', Search],
  ['scenes', Wrench],
  ['people', UserRound],
  ['reviews', Clock3],
  ['settings', Settings],
] as const

type SidebarProps = {
  active: Screen
  onNavigate: (screen: Screen) => void
  onHelp: () => void
  onLogout: () => void
}

export function Sidebar({ active, onNavigate, onHelp, onLogout }: SidebarProps) {
  const { t } = useTranslation()
  const itemClass = (current = false) => `ff-focus relative flex h-8 w-[228px] items-center gap-2.5 rounded-[4px] px-2.5 text-[12px] leading-4 transition-colors max-[1040px]:w-8 max-[1040px]:justify-center max-[1040px]:px-0 ${current ? 'border border-line bg-elevated text-primary dark:bg-[rgb(var(--ink-600))]' : 'border border-transparent text-secondary hover:bg-panel hover:text-primary dark:hover:bg-[rgb(var(--ink-700))]'}`

  return <aside className="mt-8 flex h-[calc(100%-32px)] w-64 shrink-0 flex-col overflow-hidden border-e border-line bg-surface px-4 pb-4 pt-[18px] transition-[width,padding] duration-200 ease-out dark:bg-[rgb(var(--ink-700))] max-[1040px]:w-12 max-[1040px]:px-2">
    <div className="h-[40.6px] w-[168px] shrink-0 max-[1040px]:grid max-[1040px]:h-8 max-[1040px]:w-8 max-[1040px]:place-items-center" role="img" aria-label={t('app.name')}>
      <span className="block size-full max-[1040px]:hidden">
        <img className="h-full w-full object-contain dark:hidden" src={frameFinderLogoLight} alt="" />
        <img className="hidden h-full w-full object-contain dark:block" src={frameFinderLogoDark} alt="" />
      </span>
      <img className="hidden size-6 object-contain max-[1040px]:block" src={frameFinderSymbol} alt="" />
    </div>
    <div className="h-3 shrink-0" aria-hidden="true" />
    <nav className="flex flex-col gap-1.5" aria-label="Primary navigation">
      {nav.map(([screen, Icon]) => {
        const current = active === screen || (active === 'drive' && screen === 'dashboard')
        const label = t(`nav.${screen}`)
        return <button key={screen} type="button" title={label} onClick={() => onNavigate(screen)} aria-current={current ? 'page' : undefined} className={itemClass(current)}>
          {current && <span className="absolute inset-y-[5px] start-2 w-0.5 rounded-sm bg-accent max-[1040px]:start-0" />}
          <Icon className={current ? 'ms-2.5 max-[1040px]:ms-0' : ''} size={15} strokeWidth={1.75} aria-hidden="true" />
          <span className="truncate max-[1040px]:sr-only">{label}</span>
        </button>
      })}
    </nav>
    <div className="flex-1" />
    <div className="flex flex-col gap-1.5">
      <button type="button" title={t('nav.help')} onClick={onHelp} className={itemClass()}><CircleHelp size={15} strokeWidth={1.75} aria-hidden="true" /><span className="max-[1040px]:sr-only">{t('nav.help')}</span></button>
      <button type="button" title={t('nav.logout')} onClick={onLogout} className={itemClass()}><LogOut size={15} strokeWidth={1.75} aria-hidden="true" /><span className="max-[1040px]:sr-only">{t('nav.logout')}</span></button>
    </div>
  </aside>
}
