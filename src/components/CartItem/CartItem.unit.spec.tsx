import { render, fireEvent } from '@testing-library/react-native';
import { CartItem } from './CartItem';

const product = {
  id: 1,
  title: 'Beautiful Watch',
  price: '10',
  image:
    'https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q',
};

const renderCartItem = () => {
  return render(<CartItem product={product} />);
};

describe('CartItem component', () => {
  describe('when it renders', () => {
    it('should render correctly', () => {
      const { getByTestId } = renderCartItem();
      const card = getByTestId('cart-item');

      expect(card).toBeDefined();
    });

    it('should display proper content', async () => {
      const { getByText, getByTestId } = renderCartItem();

      const image = getByTestId('cart-item-image');

      expect(getByText(new RegExp(product.title, 'i'))).toBeDefined();
      expect(getByText(new RegExp(product.price, 'i'))).toBeDefined();
      expect(image).toHaveProperty('props.source.uri', product.image);
      expect(image).toHaveProperty('props.accessibilityLabel', product.title);
    });
  });

  describe('when changes quantity', () => {
    it('should show initial quantity as 1', () => {
      const { getByTestId } = renderCartItem();

      const quantity = getByTestId('quantity-button-quantity');

      expect(quantity).toHaveProperty('props.children', 1);
    });

    it('should increase quantity by 1 when (+) button is pressed', () => {
      const { getByTestId } = renderCartItem();

      const quantity = getByTestId('quantity-button-quantity');
      const increaseButton = getByTestId('quantity-button-increase');

      fireEvent.press(increaseButton);
      expect(quantity).toHaveProperty('props.children', 2);
    });

    it('should decrease quantity by 1 when (-) button is pressed', () => {
      const { getByTestId } = renderCartItem();

      const quantity = getByTestId('quantity-button-quantity');
      const decreaseButton = getByTestId('quantity-button-decrease');

      fireEvent.press(decreaseButton);

      expect(quantity).toHaveProperty('props.children', 0);
    });

    it('should not decrease quantity less than ZERO when (-) button is pressed', () => {
      const { getByTestId } = renderCartItem();

      const quantity = getByTestId('quantity-button-quantity');
      const decreaseButton = getByTestId('quantity-button-decrease');

      fireEvent.press(decreaseButton);
      fireEvent.press(decreaseButton);

      expect(quantity).toHaveProperty('props.children', 0);
    });
  });
});
