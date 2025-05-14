import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
      <Toast />
    </Provider>

  );
};

export default App;
