import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import NavPointer from './Navigation/NavPointer';
import MainScreen from './Views/MainScreen';
import SinglePrd from './Views/singlePrd';
import Favourites from './Views/favourites';
import Cart from './Views/cart';
import InfoScreen from './Views/InfoScreen';
import SearchScreen from './Views/searchScreen';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        NavPointer.InitializeNavPointer(ref);
      }}>
      <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="SinglePrd" component={SinglePrd} />
        <Stack.Screen name="Favourites" component={Favourites} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="InfoScreen" component={InfoScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
