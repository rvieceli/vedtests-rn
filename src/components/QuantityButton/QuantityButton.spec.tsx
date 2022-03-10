import { render, fireEvent } from '@testing-library/react-native';
import { QuantityButton } from './QuantityButton';

describe('QuantityButton component', () => {
  const renderButton = (initialQuantity = 1) => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <QuantityButton initialQuantity={initialQuantity} onChange={onChange} />,
    );

    const container = getByTestId('quantity-button');
    const quantity = getByTestId('quantity-button-quantity');
    const increase = getByTestId('quantity-button-increase');
    const decrease = getByTestId('quantity-button-decrease');

    return {
      onChange,
      container,
      quantity,
      increase,
      decrease,
    };
  };

  describe('when it renders', () => {
    it('should render correctly', () => {
      const { container, quantity, increase, decrease } = renderButton();
      expect(container).toBeDefined();
      expect(quantity).toBeDefined();
      expect(quantity.children).toEqual(['1']);
      expect(increase).toBeDefined();
      expect(decrease).toBeDefined();
    });

    it('should receive a initialQuantity prop', () => {
      const { quantity } = renderButton(3);
      expect(quantity.children).toEqual(['3']);
    });
  });

  describe('when increase button (+) is pressed', () => {
    it('should increases the quantity', () => {
      const { quantity, increase } = renderButton();
      expect(quantity.children).toEqual(['1']);
      fireEvent.press(increase);
      expect(quantity.children).toEqual(['2']);
    });

    it('should trigger onChange prop', () => {
      const { onChange, increase } = renderButton();
      fireEvent.press(increase);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(2);
    });
  });

  describe('when decrease button (-) is pressed', () => {
    it('should decreases the quantity', () => {
      const { quantity, decrease } = renderButton();

      expect(quantity.children).toEqual(['1']);
      fireEvent.press(decrease);
      expect(quantity.children).toEqual(['0']);
    });

    it('should not decreases the quantity less than 0', () => {
      const { quantity, decrease } = renderButton();
      expect(quantity.children).toEqual(['1']);
      fireEvent.press(decrease);
      fireEvent.press(decrease);
      expect(quantity.children).toEqual(['0']);
    });

    it('should trigger onChange prop', () => {
      const { onChange, decrease } = renderButton();

      fireEvent.press(decrease);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(0);
    });
  });
});
