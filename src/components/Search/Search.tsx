import { useState } from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconButton } from '../IconButton/IconButton';
import { styles } from './Search.styles';

interface SearchProps {
  doSearch: (search: string) => void;
}

export const Search = ({ doSearch }: SearchProps) => {
  const [term, setTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setTerm('');
    doSearch('');
  };

  const renderAccessoryButton = () => {
    if (!term) {
      return null;
    }
    if (isFocused) {
      return (
        <IconButton
          testID="search-do"
          onPress={() => doSearch(term)}
          name="chevron-forward"
          size={16}
          color="#718096"
        />
      );
    } else {
      return (
        <IconButton
          testID="search-clear"
          onPress={handleClear}
          name="close"
          size={16}
          color="#718096"
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="search" size={16} color="#A0AEC0" />
      <TextInput
        testID="search-input"
        value={term}
        onChangeText={setTerm}
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#A0AEC0"
        onSubmitEditing={() => doSearch(term)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {renderAccessoryButton()}
    </View>
  );
};
