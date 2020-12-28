import { render, screen } from '@testing-library/react';
import App from './App';

test('Renderiza el título', () => {
  render(<App />);
  const linkElement = screen.getByText(/Repositorio semilla/);
  expect(linkElement).toBeInTheDocument();
});
