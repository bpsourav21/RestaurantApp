import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/EvilIcons';
//CONSTANTS
import { Colors, Fonts } from '../constant';
// main app screens
import Settings from '../components/settings/Settings'
// ------------------------------------------------------------------
const backAction = NavigationActions.back()
// ------------------------------------------------------------------
const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <Text style={{ fontSize: 22, alignSelf: 'center', textAlign: 'center', fontFamily: Fonts.brand, color: Colors.light }}>SETTINGS</Text>,
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
});
// ============================================================
export default SettingsStack