import { act, renderHook, RenderResult } from '@testing-library/react-hooks';
import { render, fireEvent } from '@testing-library/react-native';
import { makeServer, Server } from '../../miragejs/server';
import { CartStore, useCartStore } from '../../store/cart';
import { CartItem } from './CartItem';

const RenderCartItem = () => {
  const items = useCartStore((store) => store.state.items);
  if (items.length === 0) {
    return null;
  }
  return <CartItem product={items[0].product} quantity={items[0].quantity} />;
};

describe('CartItem component', () => {
  let server: Server;
  let result: RenderResult<CartStore>;

  beforeEach(() => {
    server = makeServer();

    const product = server.create('product');

    result = renderHook(() => useCartStore()).result;

    act(() => result.current.actions.add(product));
  });

  afterEach(() => {
    server.shutdown();
  });

  describe('when it renders', () => {
    it('should render correctly', () => {
      const cartItem = result.current.state.items[0];
      const { getByTestId } = render(
        <CartItem product={cartItem.product} quantity={cartItem.quantity} />,
      );
      const card = getByTestId('cart-item');

      expect(card).toBeDefined();
    });

    it('should display proper content', async () => {
      const cartItem = result.current.state.items[0];
      const { getByTestId, getByText } = render(
        <CartItem product={cartItem.product} quantity={cartItem.quantity} />,
      );

      const image = getByTestId('cart-item-image');

      expect(getByText(new RegExp(cartItem.product.title, 'i'))).toBeDefined();
      expect(
        getByText(new RegExp(String(cartItem.product.price), 'i')),
      ).toBeDefined();
      expect(image).toHaveProperty('props.source.uri', cartItem.product.image);
      expect(image).toHaveProperty(
        'props.accessibilityLabel',
        cartItem.product.title,
      );
    });
  });

  describe('when changes quantity', () => {
    it('should show initial quantity as 1', () => {
      const { getByTestId } = render(<RenderCartItem />);

      const quantity = getByTestId('quantity-button-quantity');

      expect(quantity).toHaveProperty('props.children', 1);
    });

    it('should increase quantity by 1 when (+) button is pressed', () => {
      const { getByTestId } = render(<RenderCartItem />);

      const quantity = getByTestId('quantity-button-quantity');
      const increaseButton = getByTestId('quantity-button-increase');

      fireEvent.press(increaseButton);
      expect(quantity).toHaveProperty('props.children', 2);
    });

    it('should decrease quantity by 1 when (-) button is pressed', () => {
      const { getByTestId } = render(<RenderCartItem />);

      const quantity = getByTestId('quantity-button-quantity');
      const decreaseButton = getByTestId('quantity-button-decrease');

      fireEvent.press(decreaseButton);

      expect(quantity).toHaveProperty('props.children', 0);
    });

    it('should not decrease quantity less than ZERO when (-) button is pressed', () => {
      const { getByTestId } = render(<RenderCartItem />);

      const quantity = getByTestId('quantity-button-quantity');
      const decreaseButton = getByTestId('quantity-button-decrease');

      fireEvent.press(decreaseButton);
      fireEvent.press(decreaseButton);

      expect(quantity).toHaveProperty('props.children', 0);
    });
  });
});
