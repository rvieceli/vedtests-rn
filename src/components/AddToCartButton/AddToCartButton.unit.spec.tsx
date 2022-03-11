import { render, fireEvent } from '@testing-library/react-native';
import { AddToCartButton } from './AddToCartButton';

const onPress = jest.fn();

describe('AddToCartButton component', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<AddToCartButton onPress={onPress} />);
    const button = getByTestId('add-to-cart-button');

    expect(button).toBeDefined();
  });

  describe('when button is pressed', () => {
    it('should call props.onPress', () => {
      const { getByTestId } = render(<AddToCartButton onPress={onPress} />);
      const button = getByTestId('add-to-cart-button');

      fireEvent.press(button);

      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });
});
