import { act, renderHook, RenderResult } from '@testing-library/react-hooks';
import { fireEvent, render } from '@testing-library/react-native';
import { makeServer, Server } from '../../miragejs/server';
import { CartStore, createCartItem, useCartStore } from '../../store/cart';
import { Cart } from './Cart';

describe('Card component', () => {
  let server: Server;
  let result: RenderResult<CartStore>;

  beforeEach(() => {
    server = makeServer({ environment: 'development' });
    result = renderHook(() => useCartStore()).result;
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should renders correctly', () => {
    const { getByTestId } = render(<Cart />);

    const cart = getByTestId('cart');

    expect(cart).toBeDefined();
  });

  it('should toggle cart visibility', () => {
    const { getByTestId } = render(<Cart />);

    act(() => result.current.actions.toggle());

    expect(result.current.state.open).toBe(true);

    const closeButton = getByTestId('cart-close-button');

    fireEvent.press(closeButton);

    expect(result.current.state.open).toBe(false);
  });

  describe('when cart has products', () => {
    it('should display two products', () => {
      const products = server.createList('product', 2);

      act(() =>
        products.forEach((product) => result.current.actions.add(product)),
      );

      const { getAllByTestId } = render(<Cart />);

      expect(getAllByTestId('cart-item')).toHaveLength(2);
      expect(result.current.state.items).toEqual(
        products.map((product) => createCartItem(product)),
      );
    });

    it('should remove a product from the store', () => {
      const [product1, product2] = server.createList('product', 2);

      act(() => {
        result.current.actions.add(product1);
        result.current.actions.add(product2);
      });

      expect(result.current.state.items).toHaveLength(2);

      const { getAllByTestId } = render(<Cart />);

      const [buttonRemove1] = getAllByTestId('cart-item-remove');

      fireEvent.press(buttonRemove1);

      expect(getAllByTestId('cart-item')).toHaveLength(1);
      expect(result.current.state.items).toEqual([createCartItem(product2)]);
    });

    it('should clean the cart', () => {
      const products = server.createList('product', 2);

      const { getAllByTestId, getByTestId } = render(<Cart />);

      act(() =>
        products.forEach((product) => result.current.actions.add(product)),
      );

      expect(getAllByTestId('cart-item')).toHaveLength(2);

      const clearButton = getByTestId('cart-clear-button');

      fireEvent.press(clearButton);

      expect(() => getAllByTestId('cart-item')).toThrow();
      expect(result.current.state.items).toHaveLength(0);
    });
  });

  describe('when cart is empty', () => {
    it('should display "cart-empty" message', () => {
      const { getByTestId, queryAllByTestId } = render(<Cart />);

      expect(queryAllByTestId('cart-item')).toHaveLength(0);
      expect(getByTestId('cart-empty')).toBeDefined();
    });

    it('should not show display "clear cart" button', () => {
      const { queryByTestId } = render(<Cart />);

      expect(result.current.state.items).toHaveLength(0);

      expect(queryByTestId('cart-clear-button')).toBeNull();
    });
  });
});
