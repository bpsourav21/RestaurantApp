import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/EvilIcons';
//CONSTANTS
import { Colors, Fonts } from '../constant';
// main app screens
import Main from '../components/Main';
import Add from '../components/inventory/Add';
import AddItems from '../components/inventory/AddItems';
import AddCategory from '../components/inventory/AddCategory';
import AddTag from '../components/inventory/AddTag';
import ConfirmCart from '../components/order/ConfirmCart';
import ConfirmPayment from '../components/order/ConfirmPayment'
import PrintingReceipt  from '../components/order/PrintingReceipt'
// ------------------------------------------------------------------
const backAction = NavigationActions.back()
// ------------------------------------------------------------------
const HomeStack = StackNavigator({
  Home: {
    screen: Main,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  // ------------------------------------------------------------------
  Add: {
    screen: Add,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <Text style={{ fontSize: 22, alignSelf: 'center', textAlign: 'center', fontFamily: Fonts.brand, color: Colors.light }}>ADD</Text>,
      headerLeft: (<Icon name="chevron-left" size={46} style={{ margin: 10 }} color={Colors.navIcon} onPress={() => { navigation.dispatch(backAction) }} />),
      headerRight: (<Icon name="navicon" size={46} color={Colors.navIcon} onPress={() => navigation.navigate('DrawerOpen')} style={{ margin: 10 }} />),
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.headerbox,
        borderBottomColor: "#292E37",
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontFamily: Fonts.brand,
        textAlign: 'center'
      },
      titleStyle: {
        textAlign: 'center'
      }
    })
  },
  // ------------------------------------------------------------------
  AddItems: {
    screen: AddItems,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <Text style={{ fontSize: 22, alignSelf: 'center', textAlign: 'center', fontFamily: Fonts.brand, color: Colors.light }}>ADD ITEMS</Text>,
      headerLeft: (<Icon name="chevron-left" size={46} style={{ margin: 10 }} color={Colors.navIcon} onPress={() => { navigation.dispatch(backAction) }} />),
      headerRight: (<Icon name="navicon" size={46} color={Colors.navIcon} onPress={() => navigation.navigate('DrawerOpen')} style={{ margin: 10 }} />),
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.headerbox,
        borderBottomColor: "#292E37",
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontFamily: Fonts.brand,
        textAlign: 'center'
      },
      titleStyle: {
        textAlign: 'center'
      }
    })
  },
  // ------------------------------------------------------------------
  AddCategory: {
    screen: AddCategory,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <Text style={{ fontSize: 22, alignSelf: 'center', textAlign: 'center', fontFamily: Fonts.brand, color: Colors.light }}>ADD CATEGORIES</Text>,
      headerLeft: (<Icon name="chevron-left" size={46} style={{ margin: 10 }} color={Colors.navIcon} onPress={() => { navigation.dispatch(backAction) }} />),
      headerRight: (<Icon name="navicon" size={46} color={Colors.navIcon} onPress={() => navigation.navigate('DrawerOpen')} style={{ margin: 10 }} />),
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.headerbox,
        borderBottomColor: "#292E37",
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontFamily: Fonts.brand,
        textAlign: 'center'
      },
      titleStyle: {
        textAlign: 'center'
      }
    })
  },
  // ------------------------------------------------------------------
  AddTag: {
    screen: AddTag,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <Text style={{ fontSize: 22, alignSelf: 'center', textAlign: 'center', fontFamily: Fonts.brand, color: Colors.light }}>ADD TAGS</Text>,
      headerLeft: (<Icon name="chevron-left" size={46} style={{ margin: 10 }} color={Colors.navIcon} onPress={() => { navigation.dispatch(backAction) }} />),
      headerRight: (<Icon name="navicon" size={46} color={Colors.navIcon} onPress={() => navigation.navigate('DrawerOpen')} style={{ margin: 10 }} />),
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.headerbox,
        borderBottomColor: "#292E37",
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontFamily: Fonts.brand,
        textAlign: 'center'
      },
      titleStyle: {
        textAlign: 'center'
      }
    })
  },
  // ------------------------------------------------------------------
  ConfirmPayment: {
    screen: ConfirmPayment,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <Text style={{ fontSize: 22, alignSelf: 'center', textAlign: 'center', fontFamily: Fonts.brand, color: Colors.light }}>CONFIRM PAYMENT</Text>,
      headerLeft: (<Icon name="chevron-left" size={46} style={{ margin: 10 }} color={Colors.navIcon} onPress={() => { navigation.dispatch(backAction) }} />),
      headerRight: (<Icon name="navicon" size={46} color={Colors.navIcon} onPress={() => navigation.navigate('DrawerOpen')} style={{ margin: 10 }} />),
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.headerbox,
        borderBottomColor: "#292E37",
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontFamily: Fonts.brand,
        textAlign: 'center'
      },
      titleStyle: {
        textAlign: 'center'
      }
    })
  },
  // ------------------------------------------------------------------
  PrintingReceipt: {
    screen: PrintingReceipt,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
  // ------------------------------------------------------------------
});
// ============================================================
export default HomeStack