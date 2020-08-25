import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View, StyleSheet, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, DrawerNavigator, DrawerItems, NavigationActions } from 'react-navigation';
//import Cashier from '../Cashier';
import Login from '../components/login/Login';
import Main from '../components/Main';
import Icon from 'react-native-vector-icons/EvilIcons';

//CONSTANTS
import { Colors, Fonts } from '../constant';
var contentOptions = {
  activeTintColor: '#e91e63',
  style: {
    marginVertical: 0,
  }
}
// ------------------------------------------------------------------
const backAction = NavigationActions.back()
// -------------------------------------------------
// main app screens
import HomeStack from './HomeStack';
import ReportsStack from './ReportsStack';
// import DuesStack from './DuesStack';
import SettingsStack from './SettingsStack';
// ============================================================
const CustomDrawerContentComponent = (props) => (
  <View style={{ flex: 1, backgroundColor: Colors.real_dark }}>
    <View style={styles.logocontainer}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
    </View>
    <DrawerItems {...props} />
  </View>
);
// =========================== STYLESHEET ===========================
var styles = StyleSheet.create({
  logocontainer: { flexDirection: 'column', height: 100, justifyContent: 'center', alignItems: 'center', top: 0, },
  logo: { width: 250, resizeMode: 'contain', alignItems: 'center', top: 0, },
});
// ============================================================
const InnerNavigator = DrawerNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      drawerLabel: <Text style={{ fontFamily: Fonts.brand, fontSize: 22, alignSelf: 'center', color: Colors.light, margin: 10, marginLeft: 10 }} >HOME</Text>,
      drawerIcon: ({ tintColor }) => { }
    }
  },
  Reports: {
    screen: ReportsStack,
    navigationOptions: {
      drawerLabel: <Text style={{ fontFamily: Fonts.brand, fontSize: 22, alignSelf: 'center', color: Colors.light, margin: 10, marginLeft: 10 }} >REPORTS</Text>,
      drawerIcon: ({ tintColor }) => { }
    }
  },
    Settings: {
    screen: SettingsStack,
    navigationOptions: {
      drawerLabel: <Text style={{ fontFamily: Fonts.brand, fontSize: 22, alignSelf: 'center', color: Colors.light, margin: 10, marginLeft: 10 }} >SETTINGS</Text>,
      drawerIcon: ({ tintColor }) => { }
    }
  },

}, {
    contentComponent: CustomDrawerContentComponent,
    drawerPosition: 'right',
    contentOptions: {
      activeTintColor: '#000',
      inactiveTintColor: '#000',
      activeBackgroundColor: Colors.accent_1,
    }
  }
);
// ============================================================
export const AppNavigator = StackNavigator({
  Login: { screen: Login },
  Main: { screen: InnerNavigator }
}, {
    initialRouteName: Login,
    headerMode: 'none',
  });
// ============================================================
class AppWithNavigationState extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    console.log(nav)
    dispatch(NavigationActions.back());
    return true;

  };

  render() {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav
    });
    return (
      <AppNavigator navigation={navigation} />
    )
  }
}
// ======================== REDUX CONNECTORS ========================
AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  nav: state.nav,
});
const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
})
// ==================================================================
export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);