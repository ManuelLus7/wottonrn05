import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';

export default function AppContainer() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}