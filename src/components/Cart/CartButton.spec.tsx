import { render, fireEvent } from '@testing-library/react-native';
import { CartButton } from './CartButton';

const onPress = jest.fn();

describe('Cart > CartButton component', () => {
  it('should renders correctly', async () => {
    const { getByTestId } = render(<CartButton onPress={onPress} />);
    const openCartModalButton = getByTestId('cart-button-open');

    fireEvent.press(openCartModalButton);

    expect(openCartModalButton).toBeDefined();
    expect(onPress).toBeCalledTimes(1);
  });
});
