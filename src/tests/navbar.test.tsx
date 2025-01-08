import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Navbar from '../components/Navbar';
// FIRST
// Wee need to test if the Navbar is rendering

describe('Navbar render all the content correctly', () => {
  describe('Desktop version', () => {
    test('Render the navbar with logo, content and icons', () => {
      const { getByTestId } = render(<Navbar />);
    });
  });
  describe('Mobile version', () => {
    test('Render the navbar', () => {});
  });
});

// SECOND
// If the navbar has que correct functionality
describe('', () => {});
