import { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
        <TouchableOpacity testID="search-do" onPress={() => doSearch(term)}>
          <Icon name="chevron-forward" size={16} color="#718096" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity testID="search-clear" onPress={handleClear}>
          <Icon name="close" size={16} color="#718096" />
        </TouchableOpacity>
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
