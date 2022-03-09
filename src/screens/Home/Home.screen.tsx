import { Dimensions, FlatList, SafeAreaView, View } from 'react-native';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { DEFAULT_SPACE } from '../../constants';
import { Header } from './components/Header';
import { PageInfo } from './components/PageInfo';
import { styles } from './Home.styles';

const { width } = Dimensions.get('window');

const cardWidth = (width - DEFAULT_SPACE * 2) / 2 - 10;

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={[1, 2, 3, 4, 5, 6, 7]}
        keyExtractor={(item) => String(item)}
        renderItem={() => <ProductCard width={cardWidth} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={<PageInfo />}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.column}
      />
    </SafeAreaView>
  );
};
