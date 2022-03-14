import { act, renderHook } from '@testing-library/react-hooks';
import { useCartStore } from '.';
import { makeServer, Server } from '../../miragejs/server';

import { setAutoFreeze } from 'immer';
import { createCartItem } from './useCart.store';
import { CartActions } from './useCart.types';

describe('useCart store', () => {
  let server: Server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  beforeAll(() => {
    setAutoFreeze(false);
  });

  afterAll(() => {
    setAutoFreeze(false);
  });

  describe('when state is initialized', () => {
    it('should return open equals false on initial state', async () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.state.open).toBe(false);
    });

    it('should return an empty array of items', async () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.state.items).toHaveLength(0);
      expect(result.current.state.items).toEqual([]);
    });
  });

  describe('when call actions.add', () => {
    it('should add products to state.items', () => {
      const products = server.createList('product', 2);

      const { result } = renderHook(() => useCartStore());

      products.forEach((product) => {
        act(() => result.current.actions.add(product));
      });

      expect(result.current.state.items).toHaveLength(2);
      expect(result.current.state.items).toEqual(
        products.map((product) => createCartItem(product)),
      );
    });

    it('should toggle state.open to true', () => {
      const product = server.create('product');

      const { result } = renderHook(() => useCartStore());

      expect(result.current.state.open).toEqual(false);

      act(() => result.current.actions.add(product));

      expect(result.current.state.items).toHaveLength(1);
      expect(result.current.state.items).toEqual([createCartItem(product)]);
      expect(result.current.state.open).toEqual(true);
    });

    it('should not add same products twice', () => {
      const product = server.create('product');

      const { result } = renderHook(() => useCartStore());

      act(() => result.current.actions.add(product));
      act(() => result.current.actions.add(product));

      expect(result.current.state.items).toHaveLength(1);
      expect(result.current.state.items).toEqual([createCartItem(product)]);
    });
  });

  describe('when call actions.increase', () => {
    it('should increase the item.quantity', () => {
      const [product1, product2] = server.createList('product', 2);

      const { result } = renderHook(() => useCartStore());

      act(() => result.current.actions.add(product1));
      act(() => result.current.actions.add(product2));

      expect(result.current.state.items).toHaveLength(2);
      expect(result.current.state.items).toEqual([
        createCartItem(product1),
        createCartItem(product2),
      ]);

      act(() => result.current.actions.increase(product1));

      expect(result.current.state.items).toHaveLength(2);
      expect(result.current.state.items).toEqual([
        createCartItem(product1, 2),
        createCartItem(product2, 1),
      ]);
    });
  });

  describe('when call actions.decrease', () => {
    it('should decrease the item.quantity', () => {
      const [product1, product2] = server.createList('product', 2);

      const { result } = renderHook(() => useCartStore());

      act(() => result.current.actions.add(product1));
      act(() => result.current.actions.add(product2));

      act(() => result.current.actions.increase(product1));

      expect(result.current.state.items).toHaveLength(2);
      expect(result.current.state.items).toEqual([
        createCartItem(product1, 2),
        createCartItem(product2, 1),
      ]);

      act(() => result.current.actions.decrease(product1));

      expect(result.current.state.items).toHaveLength(2);
      expect(result.current.state.items).toEqual([
        createCartItem(product1, 1),
        createCartItem(product2, 1),
      ]);
    });

    it('should not decrease item.quantity to less than zero', () => {
      const product = server.create('product');

      const { result } = renderHook(() => useCartStore());

      act(() => result.current.actions.add(product));

      expect(result.current.state.items).toHaveLength(1);
      expect(result.current.state.items).toEqual([createCartItem(product, 1)]);

      act(() => result.current.actions.decrease(product));
      expect(result.current.state.items).toEqual([createCartItem(product, 0)]);

      act(() => result.current.actions.decrease(product));
      expect(result.current.state.items).toEqual([createCartItem(product, 0)]);
    });
  });

  describe('when call actions.toggle', () => {
    it('should toggle state.open to true', async () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.state.open).toBe(false);

      act(() => result.current.actions.toggle());
      expect(result.current.state.open).toBe(true);
    });

    it('should keep state.items unchanged', () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.state.items).toHaveLength(0);

      act(() => result.current.actions.toggle());

      expect(result.current.state.items).toHaveLength(0);
    });

    describe('and call 2 times', () => {
      it('should toggle state.open to true, then false', async () => {
        const { result } = renderHook(() => useCartStore());

        expect(result.current.state.open).toBe(false);

        act(() => result.current.actions.toggle());
        expect(result.current.state.open).toBe(true);

        act(() => result.current.actions.toggle());
        expect(result.current.state.open).toBe(false);
      });
    });
  });

  describe('when call actions.remove', () => {
    it('should remove a product from state.items', () => {
      const [product1, product2, product3] = server.createList('product', 3);

      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.actions.add(product1);
        result.current.actions.add(product2);
        result.current.actions.add(product3);
      });

      expect(result.current.state.items).toHaveLength(3);

      act(() => {
        result.current.actions.remove(product2);
      });

      expect(result.current.state.items).toHaveLength(2);
      expect(result.current.state.items).toEqual([
        createCartItem(product1),
        createCartItem(product3),
      ]);
    });

    it('should be able to remove with product.id', () => {
      const product = server.create('product');

      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.actions.add(product);
      });

      expect(result.current.state.items).toHaveLength(1);

      act(() => {
        result.current.actions.remove(product.id);
      });

      expect(result.current.state.items).toHaveLength(0);
    });
  });

  describe('when call actions.removeAll', () => {
    it('should clear state.items', () => {
      const products = server.createList('product', 2);

      const { result } = renderHook(() => useCartStore());

      act(() => {
        products.forEach((product) => result.current.actions.add(product));
      });

      expect(result.current.state.items).toHaveLength(2);

      act(() => {
        result.current.actions.removeAll();
      });

      expect(result.current.state.items).toHaveLength(0);
    });
  });

  describe('when product does not exists in store.items', () => {
    const cases: Array<keyof CartActions> = ['remove', 'increase', 'decrease'];

    it.each(cases)('should do nothing when call actions %p', (method) => {
      const [product1, product2] = server.createList('product', 2);

      const { result } = renderHook(() => useCartStore());

      const spy = jest.spyOn(result.current.actions, method);

      act(() => result.current.actions.add(product1));

      expect(result.current.state.items).toHaveLength(1);
      expect(result.all).toHaveLength(2);

      act(() => {
        result.current.actions[method]('i-am-not-in-ID' as any);
      });
      expect(spy).toHaveBeenCalledWith('i-am-not-in-ID');

      act(() => {
        result.current.actions[method](product2);
      });
      expect(spy).toHaveBeenCalledWith(product2);

      expect(spy).toHaveBeenCalledTimes(2);

      expect(result.current.state.items).toHaveLength(1);
      expect(result.all).toHaveLength(2);
    });
  });
});
