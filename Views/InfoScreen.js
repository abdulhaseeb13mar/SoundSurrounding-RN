/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import HigherOrderScreen from '../Helpers/HigherOrderScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../Helpers/colors';
import dim from '../Helpers/heightWidth';
import {Button, Overlay} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {isFormValid} from '../Helpers/validate';
import NavPointer from '../Navigation/NavPointer';
import {UserAction, resetCart} from '../Redux/actions';
import Toast from 'react-native-root-toast';
import UseHeader from '../Helpers/UseHeader';

const ConfirmOrder = (props) => {
  const [firstName, setFirstName] = useState('');
  const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameErrMsg, setLastNameErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneErrMsg, setPhoneErrMsg] = useState('');
  const [address, setAddress] = useState('');
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(false);

  const Confirm = () => {
    const formValidResponse = isFormValid(
      firstName,
      lastName,
      email,
      phone,
      address,
    );
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      CallApi();
      props.UserAction({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        address: address,
      });
    }
  };

  const ShowToast = (msg) => {
    Toast.show(msg, {
      backgroundColor: colors.secondary,
      textColor: 'white',
      opacity: 1,
      position: -60,
    });
  };

  const CallApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://reactnativeapps.herokuapp.com/customers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            phonenumber: phone,
            address: address,
            email: email,
            appname: 'Ball Collection',
          }),
        },
      );
      const response = await res.json();
      setLoading(false);
      response.status ? setShowModal(true) : ShowToast('Some error occurred');
    } catch (error) {
      console.log(error);
    }
  };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrMsg(errMsg);
      setFirstNameErrMsg('');
      setLastNameErrMsg('');
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'firstname') {
      setFirstNameErrMsg(errMsg);
      setLastNameErrMsg('');
      setEmailErrMsg('');
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'lastname') {
      setLastNameErrMsg(errMsg);
      setEmailErrMsg('');
      setFirstNameErrMsg('');
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'phone') {
      setPhoneErrMsg(errMsg);
      setFirstNameErrMsg('');
      setLastNameErrMsg('');
      setEmailErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'address') {
      setAddressErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setLastNameErrMsg('');
      setEmailErrMsg('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    props.resetCart();
    NavPointer.Push('MainScreen');
  };

  const changeFirstName = (t) => setFirstName(t);
  const changeLastName = (t) => setLastName(t);
  const changeEmail = (t) => setEmail(t);
  const changePhone = (t) => setPhone(t);
  const changeAddress = (t) => setAddress(t);
  const goBack = () => NavPointer.GoBack();

  return (
    <HigherOrderScreen style={{backgroundColor: colors.lightBackground}}>
      <KeyboardAwareScrollView style={styles.container}>
        <UseHeader
          leftIcon={AntDesign}
          Title="Checkout"
          leftIconName="arrowleft"
          leftIconAction={goBack}
        />
        <View style={styles.summaryOverlay}>
          <View style={styles.sm1}>
            <View style={styles.sm2}>
              <Text>Total:</Text>
              <Text style={{fontWeight: 'bold'}}>${props.total}</Text>
            </View>
            <View style={styles.sm3}>
              <Text style={styles.sm4}>Payment Mode:</Text>
              <Text style={styles.sm4}>Payment on delivery</Text>
            </View>
          </View>
        </View>
        <View style={styles.personalInfoWrapper}>
          <Text style={styles.personalInfoHeader}>Contact Info</Text>
        </View>
        <View style={styles.PersonalInfoWrapper}>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: firstNameErrMsg ? 'red' : colors.primary,
              }}>
              FIRST NAME <Text> {firstNameErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="user"
                size={dim.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="First Name"
                style={styles.Input}
                onChangeText={changeFirstName}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: lastNameErrMsg ? 'red' : colors.primary,
              }}>
              LAST NAME <Text> {lastNameErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="user"
                size={dim.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Last Name"
                style={styles.Input}
                onChangeText={changeLastName}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: emailErrMsg ? 'red' : colors.primary,
              }}>
              EMAIL<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="mail"
                size={dim.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Email"
                style={styles.Input}
                onChangeText={changeEmail}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: phoneErrMsg ? 'red' : colors.primary,
              }}>
              PHONE<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="phone"
                size={dim.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Phone Number"
                keyboardType="number-pad"
                style={styles.Input}
                onChangeText={changePhone}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: addressErrMsg ? 'red' : colors.primary,
              }}>
              ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="map-pin"
                size={dim.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Address"
                style={styles.Input}
                onChangeText={changeAddress}
              />
            </View>
          </View>
        </View>
        <View style={styles.ConfirmButtonWrapper}>
          <Button
            title="CONFIRM ORDER"
            raised
            buttonStyle={styles.confirmButton}
            titleStyle={{color: 'white', fontWeight: 'bold'}}
            containerStyle={styles.confirmButtonContainer}
            onPress={Confirm}
            loading={loading}
          />
        </View>
        <Overlay
          isVisible={showModal}
          onBackdropPress={closeModal}
          animationType="fade">
          <View style={styles.ModalWrapper}>
            <FontAwesome
              name="check-circle-o"
              size={dim.width * 0.25}
              color={colors.primary}
            />
            <Text style={styles.ModalHeadText}>THANK YOU!</Text>
            <Text style={styles.ModalSubText}>
              Your Order has been confirmed
            </Text>
          </View>
        </Overlay>
      </KeyboardAwareScrollView>
    </HigherOrderScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    pdt: state.crntPrdt,
    total: state.cartReducer.totalAmount,
  };
};

export default connect(mapStateToProps, {UserAction, resetCart})(
  React.memo(ConfirmOrder),
);

const styles = StyleSheet.create({
  sm4: {fontSize: dim.width * 0.03, fontWeight: 'bold'},
  sm3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sm2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sm1: {
    width: '75%',
    backgroundColor: colors.secondary,
    borderRadius: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    padding: dim.width * 0.04,
  },
  summaryOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: dim.height * 0.02,
  },
  connecter3: {
    backgroundColor: colors.primary,
    width: '3%',
    height: dim.height * 0.05,
  },
  connecter2: {
    width: '80%',
    height: dim.height * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  connectorOverlayCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailprice: {
    color: colors.lightGrey3,
    fontSize: 15,
    fontWeight: '700',
  },
  detailInner2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    width: dim.width * 0.35,
  },
  TileImage: {
    width: dim.width * 0.3,
    height: dim.width * 0.35,
  },
  ModalSubText: {
    fontSize: dim.width * 0.045,
    color: colors.darkGray,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ModalHeadText: {
    fontSize: dim.width * 0.09,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ModalWrapper: {
    paddingVertical: dim.height * 0.04,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim.width * 0.8,
  },
  confirmButtonContainer: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 50,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    padding: dim.height * 0.018,
  },
  ConfirmButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: dim.width * 0.035,
    marginBottom: dim.height * 0.02,
  },
  Input: {
    width: dim.width * 0.81,
    height: dim.height * 0.065,
  },
  inputIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: dim.width * 0.09,
    color: colors.primary,
  },
  personalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingHorizontal: dim.width * 0.02,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  personalInfoHeadingName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  singlePersonalInfoWrapper: {
    marginVertical: 10,
  },
  PersonalInfoWrapper: {
    marginHorizontal: dim.width * 0.035,
    marginVertical: 20,
  },
  personalInfoHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  personalInfoWrapper: {
    marginHorizontal: dim.width * 0.035,
  },
  bookingDetailsWrapper: {
    borderColor: colors.primary,
    borderWidth: 2,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 10,
    marginVertical: dim.height * 0.01,
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  ProductName: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: 'bold',
    width: dim.width * 0.35,
  },
  DetailWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: dim.width * 0.06,
    position: 'relative',
  },
  bookingDetailsCenterOverlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {flex: 1},
});
