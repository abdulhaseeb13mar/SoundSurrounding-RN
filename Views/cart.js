/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
  setFavAction,
  removeFavAction,
  removeCartAction,
  addCartAction,
  setCrntPdt,
} from '../Redux/actions';
import HigherOrderScreen from '../Helpers/HigherOrderScreen';
import colors from '../Helpers/colors';
import dim from '../Helpers/heightWidth';
import NavPointer from '../Navigation/NavPointer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button} from 'react-native-elements';
import UseHeader from '../Helpers/UseHeader';
import {CookiesTiles} from './MainScreen';

export const Cart = (props) => {
  const goBack = () => NavPointer.Navigate('MainScreen');
  const CartArray = Object.keys(props.cart);

  const goToSP = (item) => {
    props.setCrntPdt(item);
    NavPointer.Navigate('SinglePrd');
  };

  const infoScreen = () => NavPointer.Navigate('InfoScreen');
  const addToCart = (i) => props.addCartAction(i);
  const removeFromCart = (i) =>
    props.cart[i.id].added !== 0 && props.removeCartAction(i);

  return (
    <HigherOrderScreen style={{backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <UseHeader
          leftIcon={AntDesign}
          leftIconName="arrowleft"
          leftIconAction={goBack}
          Title="Cart"
        />
        <ScrollView>
          <View style={styles.TilesWrapper}>
            {CartArray.length > 0 ? (
              CartArray.map((id, index) => {
                const item = props.cart[id];
                return (
                  <CookiesTiles
                    key={item.id}
                    item={{...item}}
                    goToSP={goToSP}
                    favs={props.favs}
                    cc={{categoryName: item.categoryName}}
                    removeFavAct={(i) => props.removeFavAction(i)}
                    setFavAct={(i) => props.setFavAction(i)}
                    addToCart={addToCart}
                    itemInCard={props.cart[item.id]}
                    removeFromCart={removeFromCart}
                  />
                );
              })
            ) : (
              <Text
                style={{
                  width: '100%',
                  fontWeight: 'bold',
                  color: 'black',
                  textAlign: 'center',
                }}>
                Your cart is empty...
              </Text>
            )}
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: colors.primary,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            width: dim.width,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '75%',
              marginTop: dim.height * 0.015,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: dim.width * 0.035,
              }}>
              Total Amount:
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontWeight: 'bold',
                fontSize: dim.width * 0.05,
                backgroundColor: 'white',
                padding: 3,
                borderRadius: 8,
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
              }}>
              ${props.total}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '75%',
              marginTop: dim.height * 0.015,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: dim.width * 0.035,
              }}>
              Payment Mode:
            </Text>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: dim.width * 0.035,
              }}>
              Payment on Delivery
            </Text>
          </View>
          <View style={{paddingVertical: dim.height * 0.018, width: '80%'}}>
            <Button
              raised
              onPress={infoScreen}
              title="PROCEED TO CHECKOUT"
              titleStyle={{
                fontSize: dim.width * 0.05,
                color: colors.primary,
                fontWeight: 'bold',
              }}
              buttonStyle={{
                paddingVertical: dim.height * 0.015,
                backgroundColor: colors.secondary,
              }}
              containerStyle={{
                width: '100%',
                borderRadius: 50,
              }}
            />
          </View>
        </View>
      </View>
    </HigherOrderScreen>
  );
};

const styles = StyleSheet.create({
  TilesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingHorizontal: dim.width * 0.027,
    paddingTop: dim.height * 0.025,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: 'white',
  },
});

const mapStateToProps = (state) => ({
  cart: state.cartReducer.items,
  total: state.cartReducer.totalAmount,
  favs: state.toggleFav,
});

export default connect(mapStateToProps, {
  setFavAction,
  removeFavAction,
  removeCartAction,
  addCartAction,
  setCrntPdt,
})(Cart);
