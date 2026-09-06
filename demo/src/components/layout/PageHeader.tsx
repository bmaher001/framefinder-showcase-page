import type { ReactNode } from 'react'

export function PageHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return <header className="flex min-h-[70px] shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line px-5 py-3"><div className="min-w-[180px] flex-1"><h1 className="truncate text-[17px] font-semibold tracking-[-0.025em]">{title}</h1><p className="mt-0.5 truncate text-[11px] text-muted">{subtitle}</p></div>{action && <div className="shrink-0">{action}</div>}</header>
}
