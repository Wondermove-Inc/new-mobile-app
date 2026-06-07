import { render, screen, fireEvent } from '@testing-library/react-native';
import Home from '../index';

describe('Home screen', () => {
  it('renders configured title and increments the counter', () => {
    render(<Home />);
    expect(screen.getByTestId('title')).toHaveTextContent('Mobile App Template');
    expect(screen.getByTestId('counter')).toHaveTextContent('Count: 0');
    fireEvent.press(screen.getByTestId('increment'));
    expect(screen.getByTestId('counter')).toHaveTextContent('Count: 1');
  });
});
