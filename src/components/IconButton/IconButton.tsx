import { ReactNode } from 'react';
import {
  ColorValue,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './IconButton.styles';

interface IconButtonProps extends TouchableOpacityProps {
  name: string;
  size?: number;
  color?: number | ColorValue;
  children?: ReactNode;
}

export const IconButton = ({
  name,
  children,
  size = children ? 14 : 20,
  color,
  style,
  testID,
  ...touchProps
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      testID={testID}
      {...touchProps}>
      <Icon
        testID={testID && `${testID}-icon`}
        name={name}
        size={size}
        color={color}
      />
      {children}
    </TouchableOpacity>
  );
};
