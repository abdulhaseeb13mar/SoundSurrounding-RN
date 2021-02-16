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
import SearchBar from '../Helpers/searchBar';
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
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import UseHeader from '../Helpers/UseHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';

function MainScreen(props) {
  useEffect(() => {
    ct(Data.Category[0]);
  }, []);
  const [categories, setCategories] = useState(Data.Category);
  const [cc, setCC] = useState(Data.Category[0]);
  const [tabProducts, setTabProducts] = useState([]);
  const [subTabs, setSubTabs] = useState(['Popular', 'Discount', 'Exclusive']);
  const [currentSubTab, setCurrentSubTab] = useState(subTabs[0]);

  const ct = (tab) => {
    setCC(tab);
    const fPrd = Data.Product.filter((item) => item.categoryid === tab.id);
    setTabProducts(fPrd);
  };

  const addToCart = (i) => props.addCartAction(i);

  const removeFromCart = (i) =>
    props.cart[`${i.id}_${i.color}`].added !== 0 && props.removeCartAction(i);

  const goToSP = (item) => {
    props.setCrntPdt(item);
    NavPointer.Navigate('SinglePrd');
  };

  const changeSubTab = (item) => setCurrentSubTab(item);

  const GotoFavs = () => NavPointer.NavigateAndReset('Favourites');
  const GotoCart = () => NavPointer.NavigateAndReset('Cart');
  const goToSearch = () => NavPointer.NavigateAndReset('SearchScreen');

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
          Title={
            <Ionicons
              color="black"
              name="md-infinite-sharp"
              size={dim.width * 0.1}
            />
          }
          titleStyle={{color: colors.secondary, fontSize: dim.width * 0.055}}
        />
        <TouchableOpacity
          onPress={goToSearch}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: dim.height * 0.015,
          }}>
          <SearchBar editable={false} />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: dim.width * 0.04,
            fontSize: dim.width * 0.05,
            fontWeight: 'bold',
          }}>
          Choose Brand
        </Text>
        <View style={{marginVertical: dim.height * 0.01}}>
          <Listers
            data={categories}
            renderItem={({item}) => <Tabs item={item} cc={cc} ct={ct} />}
          />
        </View>
        <View>
          <Listers
            data={subTabs}
            renderItem={({item}) => (
              <SubTabs
                item={item}
                currentSubTab={currentSubTab}
                changeSubTab={changeSubTab}
              />
            )}
          />
        </View>
        <View style={styles.ProductTilesWrapper}>
          {tabProducts.length > 0 &&
            tabProducts.map((item, index) => {
              return (
                <ProductTile
                  key={item.id}
                  item={{...item}}
                  GoToSingleProduct={goToSP}
                  cc={cc}
                  favs={props.favs}
                  removeFavAct={(i) => props.removeFavAction(i)}
                  setFavAct={(i) => props.setFavAction(i)}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              );
            })}
        </View>
      </ScrollView>
    </HigherOrderScreen>
  );
}

export const ProductTile = ({
  item,
  GoToSingleProduct,
  cc,
  favs,
  removeFavAct,
  setFavAct,
  isCart,
  addToCart,
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
        ...styles.ProductTileWrapper,
        borderColor: isCart && `#${item.color}`,
        borderWidth: isCart ? 2 : 0,
      }}>
      <TouchableOpacity
        onPress={() => GoToSingleProduct({...item, categoryName: cc.category})}
        style={styles.PT_2}>
        <ImageBackground
          source={item.image}
          style={styles.PT_3}
          resizeMode="center"
        />
        <TouchableOpacity
          onPress={toggleFav}
          style={{
            position: 'absolute',
            bottom: -7,
            right: 0,
            borderRadius: 50,
            backgroundColor: 'white',
          }}>
          <Entypo
            name={fav ? 'heart' : 'heart-outlined'}
            color={colors.primary}
            size={dim.width * 0.07}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.PT_4}>
        <Text style={styles.PT_5}>{item.product}</Text>
        <Text style={styles.PT_6}>${item.price}</Text>
      </View>
      {isCart && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: dim.height * 0.013,
            width: dim.width * 0.44,
            paddingHorizontal: dim.width * 0.02,
          }}>
          <TouchableOpacity onPress={() => removeFromCart(item)}>
            <Feather
              name="minus-circle"
              size={dim.width * 0.05}
              color={colors.primary}
            />
          </TouchableOpacity>
          <Text style={{fontWeight: 'bold', color: colors.primary}}>
            {item.added}
          </Text>
          <TouchableOpacity onPress={() => addToCart(item)}>
            <Feather
              name="plus-circle"
              size={dim.width * 0.05}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const SubTabs = ({item, currentSubTab, changeSubTab}) => {
  return (
    <TouchableOpacity
      style={styles.SubTabsWrapper}
      onPress={() => changeSubTab(item)}>
      <Text
        style={{
          ...styles.SubTabsText,
          color: item === currentSubTab ? 'black' : colors.lightGrey3,
        }}>
        {item}
      </Text>
      {item === currentSubTab ? <View style={styles.tabIndicator} /> : null}
    </TouchableOpacity>
  );
};

const Tabs = ({item, cc, ct}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.HomeTabsWrapper,
        backgroundColor:
          item.category === cc.category
            ? colors.primary
            : colors.lightBackground,
      }}
      onPress={() => ct(item)}>
      <ImageBackground
        source={item.icon}
        style={styles.tabIcon}
        resizeMode="center"
      />
      <Text
        style={{
          ...styles.HomeTabsText,
          color: item.category === cc.category ? 'white' : colors.secondary,
        }}>
        {item.category}
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
  ProductTilesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  PT_6: {
    marginTop: dim.height * 0.004,
    fontSize: dim.width * 0.045,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  PT_5: {
    width: '100%',
    fontSize: dim.width * 0.038,
    // fontWeight: 'bold',
    color: colors.secondary,
  },
  PT_4: {
    width: dim.width * 0.44,
    marginTop: dim.height * 0.006,
  },
  PT_3: {
    width: dim.width * 0.4,
    height: dim.width * 0.5,
  },
  PT_2: {
    backgroundColor: colors.lightBackground,
    // paddingVertical: dim.height * 0.01,
    paddingHorizontal: dim.width * 0.02,
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
  ProductTileWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 15,
    marginVertical: dim.height * 0.008,
  },
  tabIndicator: {width: 8, borderWidth: 1.8, borderRadius: 10, marginTop: 4},
  SubTabsText: {
    fontWeight: '700',
  },
  SubTabsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 15,
    height: dim.width * 0.1, //1%
    paddingHorizontal: dim.width * 0.02,
    paddingTop: dim.width * 0.02,
  },
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
    marginTop: dim.height * 0.01,
    fontWeight: '700',
    fontSize: dim.width * 0.04,
    textAlign: 'center',
  },
  tabIcon: {
    height: dim.height * 0.08,
    width: '100%',
  },
  HomeTabsWrapper: {
    display: 'flex',
    width: dim.width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: dim.width * 0.04,
    paddingHorizontal: dim.width * 0.02,
    paddingVertical: dim.height * 0.009,
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
