import { BookOpen, Command, HardDrive, Languages, Search, Tags } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button, IconButton } from '../buttons/Button'
import { Modal } from './Modal'

export function HelpModal({ language, onLanguage, onClose }: { language: 'en' | 'ar'; onLanguage: (value: string) => void; onClose: () => void }) {
  const { t } = useTranslation()
  return <Modal title={t('help.title')} onClose={onClose} footer={<Button variant="primary" onClick={onClose}>{t('common.close')}</Button>}>
    <div className="divide-y divide-line">{[{ icon: Search, key: 'search' }, { icon: Tags, key: 'reviews' }, { icon: HardDrive, key: 'drives' }, { icon: Command, key: 'shortcuts' }].map(({ icon: Icon, key }) => <button key={key} className="ff-focus flex w-full items-center gap-3 py-3 text-start text-[11px] text-secondary hover:text-primary"><Icon size={15} className="text-daylight" />{t(`help.${key}`)}</button>)}</div>
    <div className="mt-4 flex items-center justify-between rounded-ff-xs bg-window p-3"><div className="flex items-center gap-2 text-[10px] text-muted"><BookOpen size={14} />{t('help.support')}</div><IconButton label={t('settings.language')} onClick={() => onLanguage(language === 'en' ? 'ar' : 'en')}><Languages size={14} /></IconButton></div>
  </Modal>
}
