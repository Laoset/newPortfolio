'use client';
import React, { useEffect, useState } from 'react';
import { ElementsNavbar } from '@/utils/ElementsNavbar';
import { IconSun, IconMoon, IconMenu } from './icons';
import { scrollToSection } from '@/utils/ScrollMovement';
import { motion, AnimatePresence } from 'framer-motion';
import IconClose from './icons/IconClose';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';

const Navbar = () => {
  const t = useTranslations('Navbar');
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('dark');
  const [modal, setModal] = useState<boolean>(false);
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handlerTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  const handlerMoveAndCloseModal = (item: any) => {
    setModal(!modal);
    scrollToSection(item);
  };

  const handleScroll = () => {
    if (window.scrollY > 30) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  return (
    <header className={modal ? '' : 'sectionWrapper fixed top-0 z-10 '}>
      <nav className='section'>
        <motion.div
          className={`px-4 h-[64px]  ${
            isScroll
              ? 'insideNav bg-[#ffffff] dark:bg-[#f8f7fe] dark:text-black '
              : 'insideNavNoScroll bg-[#f8f7fe]  dark:bg-[#1c1a27] dark:text-[#ffffff] '
          } h-[4.75rem] flex flex-row justify-between items-center  z-50  text-lg font-medium  `}
          initial={{ opacity: 1 }}
          animate={{ opacity: modal ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <button onClick={() => scrollTo(0, 0)}>
            <h1 className='hover:animate-pulse hover:text-[#BB2649] transition-colors md:text-lg'>
              #KC
            </h1>
          </button>
          <div className='hidden lg:flex flex-row gap-4 '>
            {ElementsNavbar.map((item) => (
              <button
                onClick={() => scrollToSection(item.href)}
                key={item.id}
                className='hover-underline-animation text-base md:text-lg'
              >
                {'< '}
                {t(item.name)}
                {' />'}
              </button>
            ))}
          </div>
          <div className='flex flex-row gap-4 '>
            <div className='hidden lg:block'>
              {theme === 'light' ? (
                <button>
                  <IconMoon
                    className='hover:rotate-12  duration-300'
                    onClick={handlerTheme}
                    aria-label='Dark mode'
                  />
                </button>
              ) : (
                <button>
                  <IconSun
                    className='hover:rotate-12  duration-300'
                    onClick={handlerTheme}
                    aria-label='Light mode'
                  />
                </button>
              )}
              <LocaleSwitcher />
            </div>
            <div className='lg:hidden'>
              <IconMenu onClick={() => setModal(!modal)} />
            </div>
          </div>
        </motion.div>
        <AnimatePresence>
          {modal && (
            <motion.ul
              className='fixed z-50 flex flex-col justify-center items-center inset-0 w-full h-screen bg-black gap-4'
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3 }}
            >
              <div className='lg:hidden absolute top-[16px] w-full flex flex-row justify-between px-4'>
                <div className='flex flex-row gap-[10px]'>
                  {theme === 'light' ? (
                    <button>
                      <IconMoon
                        className='hover:rotate-12  duration-300'
                        fill='white'
                        onClick={handlerTheme}
                      />
                    </button>
                  ) : (
                    <button>
                      <IconSun
                        className='hover:rotate-12  duration-300'
                        fill='white'
                        onClick={handlerTheme}
                      />
                    </button>
                  )}
                  <LocaleSwitcher />
                </div>
                <button>
                  <IconClose
                    className='text-xl text-white'
                    onClick={() => setModal(!modal)}
                  />
                </button>
              </div>

              {ElementsNavbar.map((item) => (
                <button
                  onClick={() => handlerMoveAndCloseModal(item.href)}
                  key={item.id}
                  className='hover-underline-animation text-lg text-white'
                >
                  {'<'}
                  {t(item.name)}
                  {'/>'}
                </button>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
