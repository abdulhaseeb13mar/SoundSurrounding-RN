/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import HigherOrderScreen from '../Helpers/HigherOrderScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SearchBar from '../Helpers/searchBar';
import {Data} from '../SampleData';
import dim from '../Helpers/heightWidth';
import NavPointer from '../Navigation/NavPointer';
import {ProductTile} from './MainScreen';
import {connect} from 'react-redux';
import {setCrntPdt, setFavAction, removeFavAction} from '../Redux/actions';
import UseHeader from '../Helpers/UseHeader';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const RenderSearchedResult = () => {
    var SearchedItems = Data.Product.filter((item) =>
      item.product.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold'}}>No Search Found...</Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const goToSP = (item) => {
    props.setCrntPdt(item);
    NavPointer.Navigate('SinglePrd');
  };

  const CardRender = (Arr) => {
    return Arr.map((item) => (
      <ProductTile
        key={item.id}
        item={{...item}}
        GoToSingleProduct={goToSP}
        cc={{categoryName: 'sony'}}
        favs={props.favs}
        removeFavAct={(i) => props.removeFavAction(i)}
        setFavAct={(i) => props.setFavAction(i)}
      />
    ));
  };

  const goBack = () => NavPointer.Navigate('MainScreen');

  const changeSearchText = (t) => setSearchText(t);
  return (
    <HigherOrderScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={AntDesign}
        Title="SEARCH"
        leftIconName="arrowleft"
        leftIconAction={goBack}
      />
      <View style={styles.SearchBarWrapper}>
        <View style={{width: '85%'}}>
          <SearchBar changeSearchText={changeSearchText} />
        </View>
      </View>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.TilesWrapper}>
          {searchText !== ''
            ? RenderSearchedResult()
            : CardRender(Data.Product)}
        </View>
      </KeyboardAwareScrollView>
    </HigherOrderScreen>
  );
}

const mapStateToProps = (state) => ({
  favs: state.toggleFav,
});

export default connect(mapStateToProps, {
  setCrntPdt,
  setFavAction,
  removeFavAction,
})(Search);

const styles = StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: dim.width * 0.03,
    paddingVertical: dim.height * 0.018,
  },
  TilesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  SearchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: dim.height * 0.003,
  },
  container: {flex: 1},
});
