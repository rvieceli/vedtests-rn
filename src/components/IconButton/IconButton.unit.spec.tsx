import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { IconButton } from './IconButton';

describe('IconButton component', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <IconButton testID="icon-button" name="trash" />,
    );

    expect(getByTestId('icon-button')).toBeDefined();
    expect(getByTestId('icon-button-icon')).toBeDefined();
  });

  describe('when have a props.children', () => {
    it('should render the child', () => {
      const { getByTestId } = render(
        <IconButton testID="icon-button" name="trash">
          <Text testID="i-am-a-child">Don't matter</Text>
        </IconButton>,
      );

      expect(getByTestId('icon-button')).toBeDefined();
      expect(getByTestId('icon-button-icon')).toBeDefined();
      expect(getByTestId('i-am-a-child')).toBeDefined();
    });
  });
});
