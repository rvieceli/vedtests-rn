import { render, fireEvent } from '@testing-library/react-native';
import { AddToCartButton } from './AddToCartButton';

const onPress = jest.fn();

describe('AddToCartButton component', () => {
  it('should renders correctly', async () => {
    const { getByTestId } = render(<AddToCartButton onPress={onPress} />);
    const button = getByTestId('add-to-cart-button');

    fireEvent.press(button);

    expect(button).toBeDefined();
    expect(onPress).toBeCalledTimes(1);
  });
});
