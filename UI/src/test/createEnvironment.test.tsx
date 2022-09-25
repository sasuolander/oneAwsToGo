import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateEnvironment from '../components/createEnvironment';

test('renders learn react link', () => {
  render(<CreateEnvironment />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
