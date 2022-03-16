import 'react-native-reanimated';
import 'abort-controller/polyfill';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartModal } from './src/components/CartModal/CartModal';

import { HomeScreen } from './src/screens/Home/Home.screen';

if (process.env.NODE_ENV === 'development') {
  require('./src/miragejs/server').makeServer();
}

const App = () => {
  return (
    <SafeAreaProvider>
      <HomeScreen />
      <CartModal />
    </SafeAreaProvider>
  );
};

export default App;
