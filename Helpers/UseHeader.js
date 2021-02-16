/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../Helpers/colors';
import dim from '../Helpers/heightWidth';
import {Badge} from 'react-native-elements';
import {connect} from 'react-redux';

//======PROPS========
// leftIcon
// rightIcon
// leftIconAction
// leftIconName
// Title
// rightIconAction
// rightIconName
// titleStyle

function MyHeader(props) {
  const LeftIconLibrary = props.leftIcon;
  const RightIconLibrary = props.rightIcon;
  return (
    <View style={styles.HeaderBarWrapper}>
      <View style={styles.HeaderBarInnerWrapper}>
        {LeftIconLibrary ? (
          <TouchableOpacity
            onPress={props.leftIconAction}
            style={styles.IconWrap}>
            <LeftIconLibrary
              name={props.leftIconName}
              size={dim.width * 0.065}
              color={colors.secondary}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              ...styles.IconWrap,
              elevation: 0,
              backgroundColor: 'transparent',
            }}
          />
        )}
        <Text style={{...styles.HeaderText, ...props.titleStyle}}>
          {props.Title}
        </Text>
        {RightIconLibrary ? (
          <TouchableOpacity
            onPress={props.rightIconAction}
            style={styles.IconWrap}>
            <RightIconLibrary
              name={props.rightIconName}
              size={dim.width * 0.075}
              color={colors.secondary}
            />
            {props.totalItems > 0 && (
              <Badge
                value={props.totalItems}
                containerStyle={styles.badgeContainer}
                badgeStyle={{backgroundColor: colors.primary}}
              />
            )}
          </TouchableOpacity>
        ) : (
          <View
            style={{
              ...styles.IconWrap,
              elevation: 0,
              backgroundColor: 'transparent',
            }}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  IconWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 10,
    // backgroundColor: ,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
  },
  HeaderText: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: dim.width * 0.08,
  },
  HeaderBarInnerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: dim.width * 0.93,
  },
  HeaderBarWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: dim.height * 0.018,
  },
});

const mapStateToProps = (state) => ({
  totalItems: state.cartReducer.totalItems,
});

export default connect(mapStateToProps, {})(MyHeader);
