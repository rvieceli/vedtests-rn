import { render, fireEvent } from '@testing-library/react-native';
import { Header } from './Header';

const onPress = jest.fn();

describe('Cart > Header component', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<Header onPress={onPress} />);
    const closeButton = getByTestId('cart-header-close-button');

    fireEvent.press(closeButton);

    expect(closeButton).toBeDefined();
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
