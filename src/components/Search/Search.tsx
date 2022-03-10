import { useState } from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './Search.styles';

interface SearchProps {
  doSearch: (search: unknown) => void;
}

export const Search = ({ doSearch }: SearchProps) => {
  const [term, setTerm] = useState('');

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
      />
    </View>
  );
};
