import {CommonActions} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';

var NavPointer;

const InitializeNavPointer = (ref) => {
  NavPointer = ref;
};

const Navigate = (name, params) => {
  NavPointer.dispatch(
    CommonActions.navigate({
      name: name,
      params: params,
    }),
  );
};

const NavigateAndReset = (routeName, params = {}) => {
  NavPointer.reset({
    index: 0,
    routes: [{name: routeName, params: params}],
  });
};

const Push = (name, params) => {
  NavPointer.dispatch(StackActions.push(name, params));
};

const GoBack = () => {
  NavPointer.dispatch(CommonActions.goBack());
};

export default {
  InitializeNavPointer,
  Navigate,
  NavigateAndReset,
  Push,
  GoBack,
};
