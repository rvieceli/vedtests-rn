import { act, renderHook, RenderResult } from '@testing-library/react-hooks';
import { fireEvent, render } from '@testing-library/react-native';
import { Server } from 'miragejs';
import { makeServer } from '../../miragejs/server';
import { CartStore, useCartStore } from '../../store/cart';
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

  it('should display two products', () => {
    const products = server.createList('product', 2);

    act(() =>
      products.forEach((product) => result.current.actions.add(product as any)),
    );

    const { getAllByTestId } = render(<Cart />);

    expect(getAllByTestId('cart-item')).toHaveLength(2);
    expect(result.current.state.items).toEqual(products);
  });

  it('should remove a product from the store', () => {
    const [product1, product2] = server.createList('product', 2);

    act(() => {
      result.current.actions.add(product1 as any);
      result.current.actions.add(product2 as any);
    });

    expect(result.current.state.items).toHaveLength(2);

    const { getAllByTestId } = render(<Cart />);

    const [buttonRemove1] = getAllByTestId('cart-item-remove');

    fireEvent.press(buttonRemove1);

    expect(getAllByTestId('cart-item')).toHaveLength(1);
    expect(result.current.state.items).toEqual([product2]);
  });

  it('should clean the cart', () => {
    const products = server.createList('product', 2);

    const { getAllByTestId, getByTestId } = render(<Cart />);

    act(() =>
      products.forEach((product) => result.current.actions.add(product as any)),
    );

    expect(getAllByTestId('cart-item')).toHaveLength(2);

    const clearButton = getByTestId('cart-clear-button');

    fireEvent.press(clearButton);

    expect(() => getAllByTestId('cart-item')).toThrow();
    expect(result.current.state.items).toHaveLength(0);
  });

  it('should toggle cart visibility', () => {
    const { getByTestId } = render(<Cart />);

    act(() => result.current.actions.toggle());

    expect(result.current.state.open).toBe(true);

    const closeButton = getByTestId('cart-close-button');

    fireEvent.press(closeButton);

    expect(result.current.state.open).toBe(false);
  });
});
