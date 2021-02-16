/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {removeFavAction, setCrntPdt, setFavAction} from '../Redux/actions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UseHeader from '../Helpers/UseHeader';
import HigherOrderScreen from '../Helpers/HigherOrderScreen';
import NavPointer from '../Navigation/NavPointer';
import {ProductTile} from './MainScreen';
import dim from '../Helpers/heightWidth';

export const Favourites = (props) => {
  const goToSP = (item) => {
    props.setCrntPdt(item);
    NavPointer.Navigate('SinglePrd');
  };

  const goBack = () => NavPointer.Navigate('MainScreen');

  return (
    <HigherOrderScreen style={{backgroundColor: 'white'}}>
      <ScrollView bounces={false}>
        <UseHeader
          leftIcon={AntDesign}
          leftIconName="arrowleft"
          leftIconAction={goBack}
          Title="Favourites"
        />
        <View style={styles.TilesWrapper}>
          {props.favs.length > 0 ? (
            props.favs.map((item, index) => {
              return (
                <ProductTile
                  key={item.id}
                  item={{...item}}
                  goToSP={goToSP}
                  cc={{categoryName: item.categoryName}}
                  favs={props.favs}
                  removeFavAct={(id) => props.removeFavAction(id)}
                  setFavAct={(i) => props.setFavAction(i)}
                />
              );
            })
          ) : (
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                width: '100%',
              }}>
              No Favourites...
            </Text>
          )}
        </View>
      </ScrollView>
    </HigherOrderScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    favs: state.toggleFav,
  };
};

export default connect(mapStateToProps, {
  removeFavAction,
  setCrntPdt,
  setFavAction,
})(Favourites);

const styles = StyleSheet.create({
  TilesWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingHorizontal: dim.width * 0.027,
    paddingTop: dim.height * 0.025,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
});
