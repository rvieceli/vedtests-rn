import { render } from '@testing-library/react-native';
import { CheckoutButton } from './CheckoutButton';

describe('Cart > CheckoutButton component', () => {
  it('should renders correctly', async () => {
    const { getByText } = render(<CheckoutButton />);

    expect(getByText(/checkout/i)).toBeDefined();
  });
});
