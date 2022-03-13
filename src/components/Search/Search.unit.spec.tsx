import { render, fireEvent } from '@testing-library/react-native';
import { ReactTestInstance } from 'react-test-renderer';
import { Search } from './Search';

const searchTerm = 'nice product';

const doSearch = jest.fn();

function renderSearch() {
  const props = render(<Search doSearch={doSearch} />);
  const searchInput = props.getByTestId('search-input');
  return {
    ...props,
    searchInput,
  };
}

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
      const { searchInput } = renderSearch();

      fireEvent(searchInput, 'submitEditing');

      expect(doSearch).toHaveBeenCalledTimes(1);
    });

    it('should call props.doSearch with input value', () => {
      const { searchInput } = renderSearch();

      fireEvent.changeText(searchInput, searchTerm);
      fireEvent(searchInput, 'submitEditing');

      expect(doSearch).toHaveBeenCalledWith(searchTerm);
    });
  });

  describe('when search input is focused', () => {
    describe('and TextInput has some value', () => {
      it('should show run (>) button the run the filter', async () => {
        const { searchInput, queryByTestId } = renderSearch();

        expect(queryByTestId('search-do')).toBeNull();

        fireEvent.changeText(searchInput, searchTerm);
        fireEvent(searchInput, 'focus');

        expect(queryByTestId('search-do')).not.toBeNull();
        expect(queryByTestId('search-clear')).toBeNull();
      });

      describe('and get out of the focus', () => {
        it('should replace run (>) button with clear (x) button', () => {
          const { searchInput, queryByTestId } = renderSearch();

          expect(queryByTestId('search-do')).toBeNull();

          fireEvent.changeText(searchInput, searchTerm);
          fireEvent(searchInput, 'focus');

          expect(queryByTestId('search-do')).not.toBeNull();
          expect(queryByTestId('search-clear')).toBeNull();

          fireEvent(searchInput, 'blur');

          expect(queryByTestId('search-do')).toBeNull();
          expect(queryByTestId('search-clear')).not.toBeNull();
        });
      });
    });
    describe('and TextInput is empty', () => {
      it('should not show clear (x) button or run (>) button', () => {
        const { searchInput, queryByTestId } = renderSearch();

        expect(queryByTestId('search-do')).toBeNull();

        fireEvent.changeText(searchInput, '');
        fireEvent(searchInput, 'focus');

        expect(queryByTestId('search-do')).toBeNull();
        expect(queryByTestId('search-clear')).toBeNull();
      });
    });
  });

  describe('when search input is not focused', () => {
    describe('and TextInput has some value', () => {
      it('should show clear (x) button instead run (>) button', () => {
        const { searchInput, queryByTestId } = renderSearch();

        expect(queryByTestId('search-clear')).toBeNull();

        fireEvent.changeText(searchInput, searchTerm);

        expect(queryByTestId('search-clear')).not.toBeNull();
        expect(queryByTestId('search-do')).toBeNull();
      });
    });
    describe('and TextInput is empty', () => {
      it('should not show clear (x) button or run (>) button', () => {
        const { searchInput, queryByTestId } = renderSearch();

        fireEvent.changeText(searchInput, '');

        expect(queryByTestId('search-clear')).toBeNull();
        expect(queryByTestId('search-do')).toBeNull();
      });
    });
  });

  describe('when clear (x) button is pressed', () => {
    let clearButton: ReactTestInstance;
    let textInput: ReactTestInstance;

    beforeEach(() => {
      const { searchInput, getByTestId } = renderSearch();

      textInput = searchInput;

      fireEvent.changeText(textInput, searchTerm);

      clearButton = getByTestId('search-clear');
    });

    it('should clean TextInput', () => {
      expect(textInput).toHaveProperty('props.value', searchTerm);

      fireEvent.press(clearButton);

      expect(textInput).toHaveProperty('props.value', '');
    });
    it('should call props.doSearch', () => {
      expect(textInput).toHaveProperty('props.value', searchTerm);

      fireEvent.press(clearButton);

      expect(doSearch).toHaveBeenCalledTimes(1);
      expect(doSearch).toHaveBeenCalledWith('');
    });
  });

  describe('when run (>) button is pressed', () => {
    it('should call props.doSearch', () => {
      const { searchInput, getByTestId } = renderSearch();

      fireEvent(searchInput, 'focus');
      fireEvent.changeText(searchInput, searchTerm);

      const runButton = getByTestId('search-do');

      fireEvent.press(runButton);

      expect(doSearch).toHaveBeenCalledTimes(1);
      expect(doSearch).toHaveBeenCalledWith(searchTerm);
    });
  });
});
