import 'abort-controller/polyfill';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { HomeScreen } from './src/screens/Home/Home.screen';

if (process.env.NODE_ENV === 'development') {
  require('./src/miragejs/server').makeServer();
}

const App = () => {
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
};

export default App;
