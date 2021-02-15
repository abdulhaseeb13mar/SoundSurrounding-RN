/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

function HigherOrderScreen(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: props.statusBar ? props.statusBar : 'white',
      }}>
      <StatusBar
        backgroundColor="white"
        barStyle={props.barStyle ? props.barStyle : 'dark-content'}
      />
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <View
            style={{
              flex: 1,
              marginTop: props.top === 0 ? props.top : insets.top,
              paddingBottom: props.bottom === 0 ? props.bottom : insets.bottom,
              backgroundColor: 'white',
              ...props.style,
            }}>
            {props.children}
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    </View>
  );
}

export default HigherOrderScreen;
