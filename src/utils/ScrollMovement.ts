import { prefersReducedMotion } from '@/lib/motion';

export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (!section) return;

  section.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth'
  });
};
