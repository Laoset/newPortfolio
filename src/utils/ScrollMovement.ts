export const scrollToSection = (sectionId: any) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth'
    });
  }
};
