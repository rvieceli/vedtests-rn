import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Search } from '../../components/Search/Search';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import { PageInfo } from './components/PageInfo';
import { styles } from './Home.styles';

export const HomeScreen = () => {
  const { products, loading, error } = useFetchProducts();
  const [term, setTerm] = useState('');

  const localProducts = useMemo(() => {
    if (term) {
      return products.filter((product) =>
        product.title.toLowerCase().includes(term.toLowerCase()),
      );
    }
    return products;
  }, [term, products]);

  const renderEmptyContent = () => {
    if (error) {
      return (
        <View testID="home-screen-error">
          <Text>An error happened</Text>
        </View>
      );
    }

    if (loading) {
      return (
        <View testID="home-screen-loading">
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View testID="home-screen-no-products">
        <Text>No products</Text>
      </View>
    );
  };

  return (
    <SafeAreaView testID="home-screen" style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brand}>Brand</Text>
        <Search doSearch={setTerm} />
        {/* <Cart /> */}
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={localProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard product={item} addToCart={() => null} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={<PageInfo quantity={localProducts.length} />}
        ListEmptyComponent={renderEmptyContent()}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.column}
      />
    </SafeAreaView>
  );
};
