import { render, fireEvent } from '@testing-library/react-native';
import { ProductCard } from './ProductCard';

const product = {
  id: 1,
  title: 'Beautiful Watch',
  price: '10',
  image:
    'https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q',
};

const addToCard = jest.fn();

const renderProductCart = () => {
  return render(<ProductCard product={product} addToCart={addToCard} />);
};

describe('ProductCard component', () => {
  it('should render correctly', () => {
    const { getByTestId } = renderProductCart();
    const card = getByTestId('product-card');

    expect(card).toBeDefined();
  });

  it('should display proper content', async () => {
    const { getByText, getByTestId } = renderProductCart();

    const image = getByTestId('product-card-image');

    expect(getByText(new RegExp(product.title, 'i'))).toBeDefined();
    expect(getByText(new RegExp(product.price, 'i'))).toBeDefined();
    expect(image.props.source.uri).toBe(product.image);
  });

  describe('when AddToCartButton is pressed', () => {
    it('should call props.addToCart with product', () => {
      const { getByTestId } = renderProductCart();
      const button = getByTestId('add-to-cart-button');

      fireEvent.press(button);

      expect(addToCard).toHaveBeenCalledTimes(1);
      expect(addToCard).toHaveBeenCalledWith(product);
    });
  });
});
