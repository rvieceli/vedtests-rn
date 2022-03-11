import { render, fireEvent } from '@testing-library/react-native';
import { QuantityButton, QuantityButtonProps } from './QuantityButton';

describe('QuantityButton component', () => {
  const renderButton = (value = 1, props?: Partial<QuantityButtonProps>) => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <QuantityButton value={value} onChange={onChange} {...props} />,
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
      expect(quantity).toHaveProperty('props.children', 1);
      expect(increase).toBeDefined();
      expect(decrease).toBeDefined();
    });

    it('should render a received props.value', () => {
      const { quantity } = renderButton(3);
      expect(quantity).toHaveProperty('props.children', 3);
    });
  });

  describe('when increase button (+) is pressed', () => {
    it('should trigger props.onChange triggering props.onChange', () => {
      const { onChange, increase } = renderButton();

      fireEvent.press(increase);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(2);
    });

    it('should not increase the quantity more than props.max when its defined', () => {
      const { onChange, increase } = renderButton(10, { max: 10 });
      fireEvent.press(increase);
      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('when decrease button (-) is pressed', () => {
    it('should decrease the quantity triggering props.onChange', () => {
      const { onChange, decrease } = renderButton();

      fireEvent.press(decrease);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(0);
    });

    it('should not decrease the quantity less than props.min when its defined', () => {
      const { onChange, decrease } = renderButton(0, { min: 0 });
      fireEvent.press(decrease);
      expect(onChange).toHaveBeenCalledTimes(0);
    });

    it("should decrease the quantity less than zero if props.min isn't defined", () => {
      const { onChange, decrease } = renderButton(0);
      fireEvent.press(decrease);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(-1);
    });
  });
});
