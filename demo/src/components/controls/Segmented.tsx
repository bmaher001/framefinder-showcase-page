import type { ReactNode } from 'react'

export type SegmentedOption = { value: string; label: string; icon?: ReactNode }

export function Segmented({ options, value, onChange }: { options: SegmentedOption[]; value: string; onChange: (value: string) => void }) {
  return <div className="inline-flex rounded-ff-xs border border-line bg-window p-0.5" role="group">{options.map(option => <button key={option.value} onClick={() => onChange(option.value)} className={`ff-focus flex h-7 items-center gap-1.5 rounded-[3px] px-2.5 text-[11px] font-medium transition ${value === option.value ? 'bg-elevated text-primary shadow-sm' : 'text-muted hover:text-secondary'}`} aria-pressed={value === option.value}>{option.icon}{option.label}</button>)}</div>
}
