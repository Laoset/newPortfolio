import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, expect, beforeEach, test } from 'vitest';
import Navbar from '../components/Navbar';
import { setScreenSize } from './setupMocks';

// Mock the LocaleSwitcher component
vi.mock('../components/LocaleSwitcher', () => ({
  default: () => <div data-testid="locale-switcher">LocaleSwitcher</div>
}));

// Mock the TextScramble component
vi.mock('../components/TextScramble', () => ({
  default: ({
    element,
    callback
  }: {
    element: any;
    callback: (item: any) => void;
  }) => <button onClick={() => callback(element)}>{element.name}</button>
}));

// Mock the scrollToSection function
vi.mock('@/utils/ScrollMovement', () => ({
  scrollToSection: vi.fn()
}));

describe('Navbar render all the content correctly', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(window, 'scrollTo', {
      value: vi.fn(),
      writable: true
    });
  });
  describe('Desktop version', () => {
    test('Render the navbar with logo, content and icons', () => {
      render(<Navbar />);
      expect(screen.getByTestId('navbar-header')).toBeInTheDocument();
      expect(screen.getByText('#KC')).toBeInTheDocument();
      const content = screen.getByTestId('navbar-content');
      expect(content.children.length).toBe(3);
      expect(
        screen.getByTestId('navbar-desktop-bttheme-dark')
      ).toBeInTheDocument();
    });
    test('toggles theme when theme button is clicked', () => {
      render(<Navbar />);
      const themeButton = screen.getByTestId('navbar-desktop-bttheme-dark');
      fireEvent.click(themeButton);
      expect(
        screen.getByTestId('navbar-desktop-bttheme-light')
      ).toBeInTheDocument();
      expect(themeButton).not.toBeInTheDocument();
    });
    test('renders LocaleSwitcher component', () => {
      render(<Navbar />);
      expect(screen.getByTestId('locale-switcher')).toBeInTheDocument();
    });
  });
  describe('Mobile version', () => {
    beforeEach(() => {
      setScreenSize(390);
    });
    test('Render the navbar with logo, and hamburger', () => {
      render(<Navbar />);
      expect(screen.getByTestId('navbar-header')).toBeInTheDocument();
      expect(screen.getByText('#KC')).toBeInTheDocument();
      const content = screen.getByTestId('navbar-mobile-btmenu');
      expect(content).toBeInTheDocument();
    });
    test('opens mobile menu when hamburger is clicked', () => {
      render(<Navbar />);
      const hamburger = screen.getByTestId('navbar-mobile-btmenu');
      expect(hamburger).toBeInTheDocument();
      fireEvent.click(hamburger);
      expect(screen.getByTestId('navbar-mobile-content')).toBeInTheDocument();
    });
    test('closes mobile menu when close button is clicked', () => {
      render(<Navbar />);
      const hamburger = screen.getByTestId('navbar-mobile-btmenu');
      fireEvent.click(hamburger);
      const closeButton = screen.getByTestId('navbar-mobile-btclose');
      fireEvent.click(closeButton);
      expect(
        screen.queryByTestId('navbar-mobile-content')
      ).not.toBeInTheDocument();
    });
    test('toggles theme when theme button is clicked', () => {
      render(<Navbar />);
      const content = screen.getByTestId('navbar-mobile-btmenu');
      fireEvent.click(content);
      const themeButton = screen.getByTestId('navbar-mobile-bttheme-dark');
      fireEvent.click(themeButton);
      expect(
        screen.getByTestId('navbar-mobile-bttheme-light')
      ).toBeInTheDocument();
      expect(themeButton).not.toBeInTheDocument();
    });
  });

  it('scrolls to top when logo is clicked', () => {
    render(<Navbar />);
    const logo = screen.getByTestId('navbar-btlogo');
    fireEvent.click(logo);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('changes navbar style on scroll', () => {
    render(<Navbar />);
    const navbar = screen.getByTestId('navbar-header');

    fireEvent.scroll(window, { target: { scrollY: 50 } });

    expect(navbar.querySelector('.insideNav')).toBeInTheDocument();

    fireEvent.scroll(window, { target: { scrollY: 0 } });

    expect(navbar.querySelector('.insideNavNoScroll')).toBeInTheDocument();
  });
});
