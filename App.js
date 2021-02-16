/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import store from './Redux/store';
import AppRouting from './routes';
// import RNBootSplash from 'react-native-bootsplash';

const App: () => React$Node = () => {
  // RNBootSplash.hide();
  return (
    <Provider store={store}>
      <AppRouting />
    </Provider>
  );
};

export default App;
