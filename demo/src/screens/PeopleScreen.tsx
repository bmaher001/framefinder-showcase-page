import { Merge, MoreHorizontal, Pencil, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { reviews } from '../data'
import { Button, IconButton, ImageWithFallback, PageHeader, Segmented } from '../components'

export function PeopleScreen() {
  const { t } = useTranslation()
  const [tab, setTab] = useState('all')
  const items = tab === 'unknown' ? reviews.filter(item => item.name.startsWith('Unknown')) : tab === 'known' ? reviews.filter(item => !item.name.startsWith('Unknown')) : reviews
  return <div className="flex h-full min-w-0 flex-col"><PageHeader title={t('people.title')} subtitle={t('people.subtitle')} action={<Button><Merge size={14} />{t('people.merge')}</Button>} /><div className="min-h-0 flex-1 overflow-auto p-4"><Segmented value={tab} onChange={setTab} options={['all', 'known', 'unknown'].map(value => ({ value, label: t(`people.${value}`) }))} /><section className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">{items.map((person, index) => <article key={person.id} className="group ff-card overflow-hidden"><div className="relative aspect-square overflow-hidden bg-panel"><ImageWithFallback src={person.reference} alt={person.name} className="size-full" /><IconButton label={t('common.more')} className="absolute end-2 top-2 bg-black/60 text-white opacity-0 group-hover:opacity-100"><MoreHorizontal size={14} /></IconButton></div><div className="p-2.5"><div className="flex items-center gap-2"><UserRound size={13} className="text-daylight" /><h3 className="min-w-0 flex-1 truncate text-[11px] font-medium">{person.name}</h3><IconButton label={t('people.rename')} className="size-6"><Pencil size={11} /></IconButton></div><p className="ff-mono mt-1 text-[9px] text-muted">{t('people.appearances', { count: 143 - index * 27 })}</p></div></article>)}</section></div></div>
}
