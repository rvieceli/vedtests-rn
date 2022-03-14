import { act, renderHook } from '@testing-library/react-hooks';
import { fireEvent, render } from '@testing-library/react-native';
import { useCartStore } from '../../store/cart';
import { CartModal } from './CartModal';

describe('CartModal component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { getByTestId } = render(<CartModal />);

    const modal = getByTestId('cart-modal');

    expect(modal).toBeDefined();
  });

  it('should initialized closed', () => {
    const { getByTestId } = render(<CartModal />);
    const modal = getByTestId('cart-modal');

    expect(modal).toHaveProperty('props.visible', false);
  });

  it('should open when call useCartStore.toggle', () => {
    const { result } = renderHook(() => useCartStore());

    const { getByTestId } = render(<CartModal />);

    act(() => result.current.actions.toggle());

    expect(getByTestId('cart')).toBeDefined();
  });

  it('should close when modal.onRequestClose', () => {
    const { result } = renderHook(() => useCartStore());

    const { getByTestId } = render(<CartModal />);

    const modal = getByTestId('cart-modal');

    act(() => result.current.actions.toggle());

    expect(getByTestId('cart')).toBeDefined();

    fireEvent(modal, 'requestClose');

    expect(() => getByTestId('cart')).toThrow();
  });
});
