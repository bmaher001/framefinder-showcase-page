import { useState } from 'react'
import { Check, EyeOff, FolderPlus, HardDrive, LoaderCircle, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button, Modal } from '../components'

type DashboardDrive = {
  id: string
  label: string
  status: 'indexing' | 'connected' | 'disconnected'
  detail: string
  storage: number
}

const dashboardDrives: DashboardDrive[] = [
  { id: 'archive', label: 'Archive Drive A', status: 'indexing', detail: '64% · 12,482 keyframes', storage: 64 },
  { id: 'interviews', label: 'Client Interview Reels', status: 'connected', detail: '8,619 keyframes', storage: 64 },
  { id: 'selects', label: '2025 Selects', status: 'disconnected', detail: '2,041 keyframes', storage: 64 },
]

function DriveStatus({ status }: Pick<DashboardDrive, 'status'>) {
  if (status === 'indexing') return <span className="flex h-6 items-center gap-1 rounded-full border border-[#43678f] bg-[#a7c4e6] px-2 text-[11px] font-semibold text-[#43678f]"><LoaderCircle size={12} strokeWidth={1.6} aria-hidden="true" /> Indexing</span>
  if (status === 'connected') return <span className="flex h-6 items-center gap-1 rounded-full border border-[#5d87bc] bg-[#f1f3f4] px-2 text-[11px] font-semibold text-[#3b4248]"><Check size={12} strokeWidth={1.8} className="text-[#5d87bc]" aria-hidden="true" /> Connected</span>
  return <span className="flex h-6 items-center gap-1 rounded-full border border-[#c9cdd0] bg-[#f1f1ef] px-2 text-[11px] font-semibold text-[#3b4248]"><EyeOff size={12} strokeWidth={1.6} aria-hidden="true" /> Disconnected</span>
}

function DriveCard({ drive, onOpen }: { drive: DashboardDrive; onOpen: () => void }) {
  return (
    <article className="flex h-60 min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-elevated px-4 pb-3.5 pt-4 shadow-[0_2px_10px_rgba(0,0,0,0.08)] dark:bg-[#3b4248] dark:shadow-[0_2px_10px_rgba(0,0,0,0.14)]">
      <header className="flex w-full items-center gap-2.5">
        <HardDrive size={20} strokeWidth={1.45} className="shrink-0 text-secondary" aria-hidden="true" />
        <h2 className="min-w-0 flex-1 truncate text-[14px] font-semibold leading-[22px] text-primary">{drive.label}</h2>
        <DriveStatus status={drive.status} />
      </header>
      <div className="mt-2.5 text-[11px] leading-4 text-secondary"><p>{drive.detail}</p><p>Last indexed today</p></div>
      <div className="mt-2.5">
        <div className="flex items-center justify-between text-[10px] leading-none"><span className="font-medium text-secondary">Storage used</span><span className="font-semibold text-primary">{drive.storage}%</span></div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-panel dark:bg-[#1d2125]"><div className="h-full rounded-full bg-[#739bc9]" style={{ width: `${drive.storage}%` }} /></div>
      </div>
      <footer className="mt-auto flex h-[20px] items-end justify-between border-t border-line pt-2.5 text-[10px] leading-none dark:border-[#24292d]">
        <span className="text-muted">Indexed locally</span>
        <button type="button" onClick={onOpen} className="ff-focus text-[#ff8d85] hover:text-[#ffaaa4]">Open drive&nbsp; →</button>
      </footer>
    </article>
  )
}

export function DashboardScreen({ onOpenDrive }: { onOpenDrive: () => void }) {
  const { t } = useTranslation()
  const [addOpen, setAddOpen] = useState(false)
  return (
    <div className="h-full min-w-0 overflow-auto ps-6 pe-7">
      <header className="flex h-16 w-full items-center justify-between overflow-hidden">
        <div className="min-w-0 px-5"><h1 className="truncate text-[20px] font-semibold leading-[26px] tracking-[-0.02em] text-primary">Dashboard</h1><p className="truncate text-[11px] leading-4 text-secondary">Search and review indexed frames from connected drives</p></div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" className="ff-focus flex h-9 w-[220px] items-center gap-2 overflow-hidden rounded-lg border border-line bg-elevated px-3 text-start text-muted dark:bg-[#2a2f34]" aria-label="Search frames, scenes, or people"><Search size={16} strokeWidth={1.7} className="shrink-0" aria-hidden="true" /><span className="min-w-0 flex-1 text-[13px] leading-[14px]">Search frames, scenes, or people</span></button>
          <button type="button" onClick={() => setAddOpen(true)} className="ff-focus flex h-8 min-w-[88px] items-center justify-center rounded-lg bg-signal-400 px-3 text-[12px] font-medium text-[#0a0b0c] hover:bg-[#ff756d]">Add Drive</button>
        </div>
      </header>
      <section className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-4 pb-6" aria-label="Media drives">{dashboardDrives.map(drive => <DriveCard key={drive.id} drive={drive} onOpen={onOpenDrive} />)}</section>
      {addOpen && <Modal title={t('dashboard.addTitle')} onClose={() => setAddOpen(false)} footer={<><Button onClick={() => setAddOpen(false)}>{t('common.cancel')}</Button><Button variant="primary" onClick={() => setAddOpen(false)}><FolderPlus size={14} />{t('dashboard.choose')}</Button></>}><p className="text-[12px] leading-5 text-secondary">{t('dashboard.addBody')}</p></Modal>}
    </div>
  )
}
