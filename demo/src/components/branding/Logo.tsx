import { useTranslation } from 'react-i18next'
import frameFinderLogoDark from '../../../framefinder-ci/framefinder-brand/logo/ff-horizontal-red-dark.svg'
import frameFinderLogoLight from '../../../framefinder-ci/framefinder-brand/logo/ff-horizontal-red-light.svg'
import frameFinderSymbol from '../../assets/figma/framefinder-symbol.svg'

export function Logo({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation()
  if (compact) return <img className="size-7 shrink-0 object-contain" src={frameFinderSymbol} alt={t('app.name')} />

  return <span className="block h-10 w-[166px] shrink-0" role="img" aria-label={t('app.name')}>
    <img className="hidden h-full w-full object-contain dark:block" src={frameFinderLogoDark} alt="" aria-hidden="true" />
    <img className="h-full w-full object-contain dark:hidden" src={frameFinderLogoLight} alt="" aria-hidden="true" />
  </span>
}
