import { renderHook } from '@testing-library/react-hooks';
import { Response } from 'miragejs';
import { makeServer, Server } from '../miragejs/server';
import { useFetchProducts } from './useFetchProducts';

describe('useFetchProducts api', () => {
  let server: Server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  describe('when then api request succeed', () => {
    it('should return a list with 10 products', async () => {
      server.createList('product', 10);

      const { result, waitForNextUpdate } = renderHook(() =>
        useFetchProducts(),
      );

      expect(result.current.loading).toBe(true);

      await waitForNextUpdate();

      expect(result.current.products).toHaveLength(10);
      expect(result.current.error).toBe(false);
      expect(result.current.loading).toBe(false);
    });
  });

  describe('when then api request fails', () => {
    it('should set error to true', async () => {
      server.get('products', () => {
        return new Response(500, {}, '');
      });

      const { result, waitForNextUpdate } = renderHook(() =>
        useFetchProducts(),
      );

      expect(result.current.loading).toBe(true);

      await waitForNextUpdate();

      expect(result.current.products).toHaveLength(0);
      expect(result.current.error).toBe(true);
      expect(result.current.loading).toBe(false);
    });
  });

  describe('when then component is unmounted', () => {
    it('should cancel the api request', async () => {
      server.createList('product', 10);

      const { result, unmount } = renderHook(() => useFetchProducts());

      unmount();

      expect(result.current.products).toHaveLength(0);
      expect(result.current.error).toBe(false);
    });
  });
});
