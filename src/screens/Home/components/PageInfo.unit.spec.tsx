import { render } from '@testing-library/react-native';
import { PageInfo } from './PageInfo';

describe('Home screen > PageInfo', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<PageInfo quantity={10} />);

    expect(getByTestId('page-info')).toBeDefined();
  });

  it('should display the total quantity of products', () => {
    const { queryByText } = render(<PageInfo quantity={10} />);

    expect(queryByText(/10 Products/i)).not.toBeNull();
  });

  describe('when props.quantity is equal one', () => {
    it('display display "product" in the singular', () => {
      const { queryByText } = render(<PageInfo quantity={1} />);

      expect(queryByText(/1 Products/i)).toBeNull();
      expect(queryByText(/1 Product$/i)).not.toBeNull();
    });
  });

  describe('when props.quantity is zero or less', () => {
    it('should not show the component', () => {
      const { getByTestId } = render(<PageInfo quantity={0} />);

      expect(() => getByTestId('page-info')).toThrow();
    });
  });
});
