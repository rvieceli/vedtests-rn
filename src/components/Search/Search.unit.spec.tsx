import { render, fireEvent } from '@testing-library/react-native';
import { Search } from './Search';
const doSearch = jest.fn();

describe('Search component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { getByPlaceholderText } = render(<Search doSearch={doSearch} />);
    expect(getByPlaceholderText(/search/i)).toBeDefined();
  });

  describe('when search input is submitted', () => {
    it('should call props.doSearch', () => {
      const { getByTestId } = render(<Search doSearch={doSearch} />);

      const textInput = getByTestId('search-input');

      fireEvent(textInput, 'submitEditing');

      expect(doSearch).toHaveBeenCalledTimes(1);
    });

    it('should call props.doSearch with input value', () => {
      const searchTerm = 'nice product';

      const { getByTestId } = render(<Search doSearch={doSearch} />);

      const textInput = getByTestId('search-input');

      fireEvent.changeText(textInput, searchTerm);
      fireEvent(textInput, 'submitEditing');

      expect(doSearch).toHaveBeenCalledWith(searchTerm);
    });
  });
});
