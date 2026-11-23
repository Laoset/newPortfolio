import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { IconWorld } from './icons';

const LocaleSwitcher = () => {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations('Navbar');
  const isEnglish = params.locale === 'en';

  const onSelectChange = () => {
    router.replace(isEnglish ? '/es' : '/en');
  };

  return (
    <button
      type="button"
      onClick={onSelectChange}
      aria-label={isEnglish ? t('switchToSpanish') : t('switchToEnglish')}
      data-testid="locale-switcher"
    >
      <IconWorld aria-hidden="true" className="hover:rotate-12 duration-300" />
    </button>
  );
};

export default LocaleSwitcher;
