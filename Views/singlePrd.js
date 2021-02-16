/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import HigherOrderScreen from '../Helpers/HigherOrderScreen';
import colors from '../Helpers/colors';
import {Button} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import dim from '../Helpers/heightWidth';
import {connect} from 'react-redux';
import NavPointer from '../Navigation/NavPointer';
import {
  setFavAction,
  removeFavAction,
  addCartAction,
  removeCartAction,
} from '../Redux/actions';
import Feather from 'react-native-vector-icons/Feather';
import UseHeader from '../Helpers/UseHeader';

function SinglePrd(props) {
  useEffect(() => {
    checkIfFav();
  }, []);

  const [fav, setFav] = useState(false);
  const [availableColors, setAvailableColors] = useState([
    colors.secondary,
    '#8366ff',
    '#fc8766',
    '#ffd368',
  ]);
  const [currColor, setCurrColor] = useState(availableColors[0]);
  const pdt = props.pdt;

  const checkIfFav = () => {
    for (let i = 0; i < props.favs.length; i++) {
      if (props.favs[i].id === pdt.id) {
        setFav(true);
        break;
      }
    }
  };

  const goBack = () => NavPointer.GoBack();

  const GotoCart = () => NavPointer.NavigateAndReset('Cart');

  const addToCart = () =>
    props.addCartAction({...pdt, color: currColor.split('#')[1]});
  const removeFromCart = () => {
    props.cart[`${pdt.id}_${currColor.split('#')[1]}`].added !== 0 &&
      props.removeCartAction({...pdt, color: currColor.split('#')[1]});
  };

  return (
    <HigherOrderScreen
      statusBar={colors.lightBackground}
      style={{backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.secondary,
          paddingBottom: dim.height * 0.01,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{backgroundColor: 'white', width: '100%'}}>
          <UseHeader
            leftIcon={AntDesign}
            rightIcon={Feather}
            rightIconName="shopping-bag"
            Title=""
            leftIconName="arrowleft"
            leftIconAction={goBack}
            rightIconAction={GotoCart}
          />
        </View>
        <View
          style={{
            flex: 1,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor: 'white',
            width: dim.width * 1.008,
          }}>
          <View
            style={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: 'white',
              paddingHorizontal: dim.width * 0.03,
              width: dim.width,
              flex: 1,
            }}>
            <View
              style={{
                height: '60%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ImageBackground
                source={pdt.image}
                imageStyle={{paddingVertical: 10}}
                style={{
                  backgroundColor: 'white',
                  width: dim.width * 0.2,
                  height: dim.width * 0.2,
                  transform: [{scaleX: 4}, {scaleY: 4}],
                  borderRadius: 50,
                  elevation: 4,
                  borderWidth: 1,
                  borderColor: currColor,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                }}
                resizeMode="center"
              />
            </View>
            <ScrollView
              contentContainerStyle={{
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                minHeight: '40%',
              }}>
              <View>
                <Text
                  style={{
                    alignSelf: 'flex-start',
                    fontWeight: 'bold',
                    color: colors.darkGray,
                    fontSize: dim.width * 0.043,
                    marginTop: dim.height * 0.008,
                  }}>
                  {pdt.categoryName}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: dim.width * 0.058,
                  }}>
                  {pdt.product}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    marginVertical: dim.height * 0.01,
                    fontWeight: 'bold',
                    color: colors.darkGray,
                  }}>
                  Available Colors
                </Text>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                  }}>
                  {availableColors.map((color) => {
                    return (
                      <TouchableOpacity
                        onPress={() => setCurrColor(color)}
                        key={color}
                        style={{
                          borderRadius: 50,
                          borderColor: color,
                          borderWidth: dim.width * 0.015,
                          width: dim.width * 0.055,
                          height: dim.width * 0.055,
                          backgroundColor:
                            currColor === color ? 'white' : color,
                          marginRight: dim.width * 0.04,
                        }}
                      />
                    );
                  })}
                </View>
              </View>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: colors.lightGrey3,
                  fontSize: dim.width * 0.038,
                  marginTop: dim.height * 0.008,
                  marginBottom: dim.height * 0.007,
                  lineHeight: dim.height * 0.03,
                }}>
                {pdt.dis}
              </Text>
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: dim.width * 0.03,
            paddingVertical: dim.height * 0.025,
          }}>
          <View>
            <Text
              style={{
                color: colors.primary,
                fontWeight: 'bold',
                fontSize: dim.width * 0.035,
              }}>
              PRICE:
            </Text>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: dim.width * 0.05,
              }}>
              $249.34
            </Text>
          </View>
          <View
            style={{
              width: dim.width * 0.4,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {props.cart[`${pdt.id}_${currColor.split('#')[1]}`] !== undefined &&
            props.cart[`${pdt.id}_${currColor.split('#')[1]}`] !== 0 ? (
              <>
                <TouchableOpacity onPress={removeFromCart}>
                  <FontAwesome
                    name="minus-square"
                    color={colors.primary}
                    size={dim.width * 0.1}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: dim.width * 0.08,
                    }}>
                    {props.cart[`${pdt.id}_${currColor.split('#')[1]}`].added}
                  </Text>
                </View>
                <TouchableOpacity onPress={addToCart}>
                  <FontAwesome
                    name="plus-square"
                    color={colors.primary}
                    size={dim.width * 0.1}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <Button
                raised
                onPress={addToCart}
                icon={<Feather name="shopping-bag" size={15} color="white" />}
                title="Add to cart"
                titleStyle={{marginLeft: dim.width * 0.015}}
                buttonStyle={{width: '100%'}}
              />
            )}
          </View>
        </View>
      </View>
    </HigherOrderScreen>
  );
}

const mapStateToProps = (state) => {
  return {
    pdt: state.crntPrdt,
    favs: state.toggleFav,
    cart: state.cartReducer.items,
  };
};
export default connect(mapStateToProps, {
  setFavAction,
  removeFavAction,
  removeCartAction,
  addCartAction,
})(SinglePrd);
