import ProjectsCircle from './ProjectsCircle';
import { useTranslations } from 'next-intl';
import * as motion from 'motion/react-client';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      when: 'beforeChildren',
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

const MainContent = () => {
  const t = useTranslations();

  return (
    <motion.section
      id="main"
      className="section flex flex-col justify-center lg:scroll-mt-[4.75rem] lg:py-28 gap-[50px] 4xl:gap-20 text-black dark:text-[#ffedd5]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col text-center mt-[80px]">
        <h2 className="w-full title text-[2.6rem] 364:text-[2.8rem] xs:text-[3rem] sm:text-[4rem] md:text-[4.8rem] m:text-[5.5rem] lg:text-[5rem]">
          <span className="text-shadow-pink">K</span>EVIN
          <span className="text-shadow-pink ml-3 lg:ml-10">C</span>ORMAN
        </h2>
        <h2 className="w-full title text-[2.6rem] 364:text-[2.8rem] xs:text-[3rem] sm:text-[4rem] md:text-[4.8rem] m:text-[5.5rem] lg:text-[5rem]">
          {t('Hero.subtitle')}
        </h2>
      </div>
      <motion.div
        className="min-h-[150px] w-full flex justify-center text-[#333333] dark:text-[#ffedd5]"
        variants={itemVariants}
      >
        <ProjectsCircle />
      </motion.div>
    </motion.section>
  );
};

export default MainContent;
