import { renderHook } from '@testing-library/react-hooks';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { Response } from 'miragejs';
import { makeServer, Server } from '../../miragejs/server';
import { useCartStore } from '../../store/cart';
import { HomeScreen } from './Home.screen';

const renderHomeScreen = () => render(<HomeScreen />);

describe('Home screen', () => {
  let server: Server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  describe('when it renders', () => {
    it('should render correctly', async () => {
      const { getByTestId } = renderHomeScreen();

      const homeScreen = getByTestId('home-screen');

      expect(homeScreen).toBeDefined();
    });

    it('should render 10 ProductCard', async () => {
      server.createList('product', 10);

      const { getAllByTestId, queryByTestId } = renderHomeScreen();

      expect(queryByTestId('home-screen-loading')).not.toBeNull();

      const productCards = await waitFor(() => getAllByTestId('product-card'));

      expect(productCards).toHaveLength(10);
      expect(queryByTestId('home-screen-loading')).toBeNull();
    });

    it('should display the total quantity of products', async () => {
      server.createList('product', 10);

      const { getByText } = renderHomeScreen();

      const productQuantity = await waitFor(() => getByText(/10 Products/i));

      expect(productQuantity).not.toBeNull();
    });

    it('should add product to cart', async () => {
      server.createList('product', 2);

      const { result } = renderHook(() => useCartStore());

      const { getAllByTestId } = renderHomeScreen();

      expect(result.current.state.items).toHaveLength(0);

      const addToCartButtons = await waitFor(() =>
        getAllByTestId('add-to-cart-button'),
      );

      addToCartButtons.forEach((button) => fireEvent.press(button));

      expect(result.current.state.items).toHaveLength(2);
    });
  });

  describe('when there are no products', () => {
    it('should render "no products" message', async () => {
      const { getByTestId, queryByTestId } = renderHomeScreen();

      expect(queryByTestId('home-screen-loading')).not.toBeNull();

      const empty = await waitFor(() => getByTestId('home-screen-no-products'));

      expect(empty).toBeDefined();
      expect(queryByTestId('home-screen-error')).toBeNull();
      expect(queryByTestId('home-screen-loading')).toBeNull();
    });
  });

  describe('when when api fails', () => {
    it('should render "error message" ', async () => {
      server.get('products', () => {
        return new Response(500, {}, '');
      });

      const { getByTestId, queryByTestId } = renderHomeScreen();

      expect(queryByTestId('home-screen-loading')).not.toBeNull();

      const error = await waitFor(() => getByTestId('home-screen-error'));

      expect(error).toBeDefined();
      expect(queryByTestId('home-screen-no-products')).toBeNull();
      expect(queryByTestId('home-screen-loading')).toBeNull();
    });
  });

  describe('when a search is performed', () => {
    it('should filter the product list', async () => {
      const searchTerm = 'Nice Watch';
      server.createList('product', 2);
      server.create('product', { title: searchTerm } as any);

      const { getAllByTestId, getByTestId, queryAllByTestId } =
        renderHomeScreen();

      const productCards = await waitFor(() => getAllByTestId('product-card'));

      expect(productCards).toHaveLength(3);

      const searchInput = getByTestId('search-input');

      fireEvent.changeText(searchInput, searchTerm);
      fireEvent(searchInput, 'submitEditing');

      const filteredProducts = queryAllByTestId('product-card');

      expect(filteredProducts).toHaveLength(1);
    });

    it('should display proper quantity', async () => {
      const searchTerm = 'Nice Watch';
      server.createList('product', 2);
      server.create('product', { title: searchTerm } as any);

      const { getByTestId, getAllByTestId, queryByText } = renderHomeScreen();

      await waitFor(() => getAllByTestId('product-card'));

      expect(queryByText(/3 Products/i)).not.toBeNull();

      const searchInput = getByTestId('search-input');

      fireEvent.changeText(searchInput, searchTerm);
      fireEvent(searchInput, 'submitEditing');

      expect(queryByText(/1 Product$/i)).not.toBeNull();
    });
  });
});
