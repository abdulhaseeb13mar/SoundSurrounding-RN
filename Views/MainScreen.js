/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import HigherOrderScreen from '../Helpers/HigherOrderScreen';
import colors from '../Helpers/colors';
import dim from '../Helpers/heightWidth';
import Image from 'react-native-fast-image';
import Listers from '../Helpers/listers';
import {Data} from '../SampleData';
import {connect} from 'react-redux';
import {
  setCrntPdt,
  setFavAction,
  removeFavAction,
  removeCartAction,
  addCartAction,
} from '../Redux/actions';
import NavPointer from '../Navigation/NavPointer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import UseHeader from '../Helpers/UseHeader';

function MainScreen(props) {
  useEffect(() => {
    ct(Data.Sheet1[0]);
  }, []);
  const [categories, setCategories] = useState(Data.Sheet1);
  const [cc, setCC] = useState(Data.Sheet1[0]);
  const [tabProducts, setTabProducts] = useState([]);

  const ct = (tab) => {
    setCC(tab);
    const fPrd = Data.Sheet2.filter((item) => item.CategoryId === tab.id);
    setTabProducts(fPrd);
  };

  const addToCart = (i) => props.addCartAction(i);

  const removeFromCart = (i) =>
    props.cart[i.id].added !== 0 && props.removeCartAction(i);

  const goToSP = (item) => {
    props.setCrntPdt(item);
    NavPointer.Navigate('SinglePrd');
  };

  const GotoFavs = () => NavPointer.NavigateAndReset('Favourites');
  const GotoCart = () => NavPointer.NavigateAndReset('Cart');

  return (
    <HigherOrderScreen style={{backgroundColor: 'white'}}>
      <ScrollView bounces={false}>
        <UseHeader
          leftIcon={AntDesign}
          leftIconName="hearto"
          leftIconAction={GotoFavs}
          rightIconAction={GotoCart}
          rightIcon={Feather}
          rightIconName="shopping-bag"
          Title="Bunny Cookies"
        />
        <Text
          style={{
            marginLeft: dim.width * 0.04,
            fontSize: dim.width * 0.07,
            fontWeight: 'bold',
          }}>
          Categories
        </Text>
        <View style={{marginVertical: dim.height * 0.01}}>
          <Listers
            data={categories}
            renderItem={({item}) => <Tabs item={item} cc={cc} ct={ct} />}
          />
        </View>
        <View style={styles.TilesWrapper}>
          {tabProducts.length > 0 &&
            tabProducts.map((item, index) => {
              return (
                <CookiesTiles
                  key={item.id}
                  item={{...item}}
                  cc={cc}
                  goToSP={goToSP}
                  favs={props.favs}
                  removeFavAct={(i) => props.removeFavAction(i)}
                  setFavAct={(i) => props.setFavAction(i)}
                  addToCart={addToCart}
                  itemInCard={props.cart[item.id]}
                  removeFromCart={removeFromCart}
                />
              );
            })}
        </View>
      </ScrollView>
    </HigherOrderScreen>
  );
}

export const CookiesTiles = ({
  item,
  cc,
  goToSP,
  favs,
  removeFavAct,
  setFavAct,
  addToCart,
  itemInCard,
  removeFromCart,
}) => {
  useEffect(() => {
    checkIfFav();
  }, []);

  const [fav, setFav] = useState(false);

  const checkIfFav = () => {
    for (let i = 0; i < favs.length; i++) {
      if (favs[i].id === item.id) {
        setFav(true);
        break;
      }
    }
  };

  const toggleFav = () => {
    fav
      ? removeFavAct(item.id)
      : setFavAct({...item, categoryName: cc.categoryName});
    setFav(!fav);
  };

  return (
    <View
      style={{
        width: dim.width * 0.45,
        paddingHorizontal: dim.width * 0.025,
        paddingTop: dim.width * 0.025,
        backgroundColor: colors.secondary,
        borderRadius: 15,
        marginVertical: dim.height * 0.015,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity onPress={toggleFav}>
          <AntDesign
            name={fav ? 'heart' : 'hearto'}
            color={colors.primary}
            size={dim.width * 0.05}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => goToSP({...item, categoryName: cc.categoryName})}>
        <ImageBackground
          source={item.images}
          style={{
            width: '100%',
            height: dim.height * 0.117,
            marginVertical: dim.width * 0.015,
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            color: colors.primary,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          ${item.price}
        </Text>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: dim.height * 0.006,
          }}>
          {item.productName}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopWidth: 1,
          borderColor: colors.lightGrey1,
        }}>
        {itemInCard !== undefined && itemInCard !== 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: dim.height * 0.013,
              width: '75%',
            }}>
            <TouchableOpacity onPress={() => removeFromCart(item)}>
              <Feather
                name="minus-circle"
                size={dim.width * 0.05}
                color={colors.primary}
              />
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', color: colors.primary}}>
              {itemInCard.added}
            </Text>
            <TouchableOpacity onPress={() => addToCart(item)}>
              <Feather
                name="plus-circle"
                size={dim.width * 0.05}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => addToCart(item)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: dim.height * 0.013,
            }}>
            <Feather
              name="shopping-bag"
              color={colors.primary}
              size={dim.width * 0.05}
            />
            <Text
              style={{
                color: colors.primary,
                fontWeight: 'bold',
                fontSize: dim.width * 0.035,
                marginLeft: dim.width * 0.02,
              }}>
              Add to cart
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const Tabs = ({item, cc, ct}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.HomeTabsWrapper,
        backgroundColor:
          item.categoryName === cc.categoryName ? colors.primary : 'white',
      }}
      onPress={() => ct(item)}>
      <Image source={item.categoryImage} style={styles.tabIcon} />
      <Text
        style={{
          ...styles.HomeTabsText,
          color:
            item.categoryName === cc.categoryName ? 'white' : colors.primary,
        }}>
        {item.categoryName}
      </Text>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.items,
    favs: state.toggleFav,
  };
};

export default connect(mapStateToProps, {
  setCrntPdt,
  setFavAction,
  removeFavAction,
  removeCartAction,
  addCartAction,
})(MainScreen);

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
    backgroundColor: colors.lightBackground,
  },
  HomeTabsText: {
    fontWeight: '700',
    fontSize: dim.width * 0.043,
  },
  tabIcon: {
    height: dim.height * 0.05,
    width: dim.width * 0.1,
    marginRight: dim.width * 0.025,
  },
  HomeTabsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: dim.width * 0.04,
    paddingHorizontal: dim.width * 0.04,
    paddingVertical: dim.height * 0.009,
    borderColor: colors.primary,
    borderWidth: 1.5,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  contain: {
    paddingHorizontal: dim.width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: dim.height * 0.025,
    paddingTop: dim.height * 0.035,
  },
});
