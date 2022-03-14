import { act, renderHook } from '@testing-library/react-hooks';
import { render, fireEvent } from '@testing-library/react-native';
import { useCartStore } from '../../store/cart';
import { CartButton } from './CartButton';

describe('Cart > CartButton component', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<CartButton />);
    const openCartModalButton = getByTestId('cart-button-open');

    fireEvent.press(openCartModalButton);

    expect(openCartModalButton).toBeDefined();
  });

  describe('when button is pressed', () => {
    it('should toggle useCartStore.open to true', () => {
      const { result } = renderHook(() => useCartStore());

      const { getByTestId } = render(<CartButton />);
      const openCartModalButton = getByTestId('cart-button-open');

      expect(result.current.state.open).toBe(false);

      fireEvent.press(openCartModalButton);

      expect(result.current.state.open).toBe(true);
    });
  });

  describe('when has items in the cart', () => {
    it('should show badge with total of items', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => result.current.actions.add({ id: 1 } as any));

      const { getByTestId } = render(<CartButton />);

      const badge = getByTestId('cart-button-badge');

      expect(badge).toBeDefined();
    });
  });

  describe('when does not have items in the cart', () => {
    it('should not show the badge', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => result.current.actions.reset());

      const { getByTestId } = render(<CartButton />);

      expect(() => getByTestId('cart-button-badge')).toThrow();
    });
  });
});
