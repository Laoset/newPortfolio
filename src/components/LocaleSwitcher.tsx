import { useRouter, useParams } from 'next/navigation';
import { IconWorld } from './icons';

const LocaleSwitcher = () => {
  const router = useRouter();
  const params = useParams();
  const onSelectChange = () => {
    if (params.locale === 'en') {
      router.replace(`/${'es'}`, {});
    } else {
      router.replace(`/${'en'}`, {});
    }
  };
  return (
    <button>
      <IconWorld
        className='hover:rotate-12  duration-300'
        onClick={onSelectChange}
        aria-label='Language'
      />
    </button>
  );
};

export default LocaleSwitcher;
