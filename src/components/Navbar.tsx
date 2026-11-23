'use client';
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useSyncExternalStore
} from 'react';
import { ElementsNavbar } from '@/utils/ElementsNavbar';
import { IconSun, IconMoon, IconMenu } from './icons';
import { scrollToSection } from '@/utils/ScrollMovement';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import IconClose from './icons/IconClose';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import TextScramble from './TextScramble';
import {
  applyTheme,
  getServerThemeSnapshot,
  getThemeSnapshot,
  subscribeTheme,
  toggleStoredTheme,
  type Theme
} from '@/lib/theme';

function ThemeButton({
  theme,
  onToggle,
  testId,
  iconFill
}: {
  theme: Theme;
  onToggle: () => void;
  testId: string;
  iconFill?: string;
}) {
  const t = useTranslations('Navbar');

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === 'light' ? t('switchToDark') : t('switchToLight')}
      data-testid={testId}
    >
      {theme === 'light' ? (
        <IconMoon
          aria-hidden="true"
          className="hover:rotate-12 duration-300"
          fill={iconFill}
        />
      ) : (
        <IconSun
          aria-hidden="true"
          className="hover:rotate-12 duration-300"
          fill={iconFill}
        />
      )}
    </button>
  );
}

const Navbar = () => {
  const t = useTranslations('Navbar');
  const reduceMotion = useReducedMotion();
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      setIsScroll(window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handlerMoveAndCloseModal = (item: string) => {
    setModal(false);
    scrollToSection(item);
  };

  return (
    <header
      className={modal ? '' : 'sectionWrapper fixed top-0 z-20'}
      data-testid="navbar-header"
    >
      <nav className="section">
        <motion.div
          className={`px-4 h-[64px]  ${
            isScroll
              ? 'insideNav bg-[#ffffff] dark:bg-[#f8f7fe] dark:text-black '
              : 'insideNavNoScroll bg-[#f8f7fe]  dark:bg-[#1c1a27] dark:text-[#ffffff] '
          } h-[4.75rem] flex flex-row justify-between items-center  z-50 text-base font-medium  `}
          initial={false}
          animate={{ opacity: modal ? 0 : 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
        >
          <button
            type="button"
            onClick={() => scrollTo(0, 0)}
            data-testid="navbar-btlogo"
            aria-label={t('homeLabel')}
          >
            <span className="hover:animate-pulse hover:text-[#BB2649] transition-colors text-base">
              #KC
            </span>
          </button>
          <div
            className="hidden lg:flex flex-row gap-4"
            data-testid="navbar-content"
          >
            {ElementsNavbar.map((item) => (
              <TextScramble
                element={item}
                callback={scrollToSection}
                key={item.id}
              />
            ))}
          </div>
          <div className="flex flex-row gap-4">
            <div className="hidden lg:flex flex-row gap-4 items-center">
              <ThemeButton
                theme={theme}
                onToggle={toggleStoredTheme}
                testId={
                  theme === 'light'
                    ? 'navbar-desktop-bttheme-light'
                    : 'navbar-desktop-bttheme-dark'
                }
              />
              <LocaleSwitcher />
            </div>
            <button
              type="button"
              className="lg:hidden"
              onClick={() => setModal((open) => !open)}
              aria-expanded={modal}
              aria-controls="mobile-nav"
              aria-label={modal ? t('closeMenu') : t('openMenu')}
              data-testid="navbar-mobile-btmenu"
            >
              <IconMenu aria-hidden="true" />
            </button>
          </div>
        </motion.div>
        <AnimatePresence>
          {modal && (
            <motion.ul
              id="mobile-nav"
              className="fixed z-50 flex flex-col justify-center items-center inset-0 w-full h-screen bg-black gap-4"
              initial={reduceMotion ? false : { x: '-100%' }}
              animate={{ x: 0 }}
              exit={reduceMotion ? { x: 0 } : { x: '-100%' }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
            >
              <div className="lg:hidden absolute top-[16px] w-full flex flex-row justify-between px-4">
                <div className="flex flex-row gap-[10px] items-center">
                  <ThemeButton
                    theme={theme}
                    onToggle={toggleStoredTheme}
                    testId={
                      theme === 'light'
                        ? 'navbar-mobile-bttheme-light'
                        : 'navbar-mobile-bttheme-dark'
                    }
                    iconFill="white"
                  />
                  <LocaleSwitcher />
                </div>
                <button
                  type="button"
                  onClick={() => setModal(false)}
                  aria-label={t('closeMenu')}
                  data-testid="navbar-mobile-btclose"
                >
                  <IconClose
                    aria-hidden="true"
                    className="text-lg text-white"
                  />
                </button>
              </div>

              <div
                className="flex flex-col gap-4"
                data-testid="navbar-mobile-content"
              >
                {ElementsNavbar.map((item) => (
                  <button
                    type="button"
                    onClick={() => handlerMoveAndCloseModal(item.href)}
                    key={item.id}
                    className="hover-underline-animation text-base text-white"
                  >
                    {'<'}
                    {t(item.name)}
                    {'/>'}
                  </button>
                ))}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
