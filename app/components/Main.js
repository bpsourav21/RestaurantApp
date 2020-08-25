import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Picker, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Item, Icon, Input, Card, CardItem, Thumbnail, Body, Left, Drawer } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import Sidebar from './Sidebar.js';
import { Colors, Fonts } from '../constant'
import CategoryPicker from './picker/CategoryPicker.js'
import TablePicker from './picker/TablePicker.js';
import MainMenu from './menu/MainMenu.js'
import BottomQuickLinks from './menu/BottomQuickLinks.js'
import Cart from './order/Cart.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    // this.props.dispatch(getSpecificItems(this.props.selectedCategory))
  }
  componentWillReceiveProps(newProps) {
    this.setState({
    })
    // this.props.dispatch(getSpecificItems(newProps.selectedCategory))
  }
  render() {
    return (
      <View style={styles.container}>
        {/* MAIN CONTAINER */}
        <View style={styles.menuBarContainer}>
          {/* SUB CONTAINER LEFT */}
          <View elevation={10} style={styles.LeftContainer}>
            <View style={{ flex: 1 }}>
              <CategoryPicker />
            </View>
            <View style={{ flex: 12 }}>
              <MainMenu />
            </View>
            <View style={{ flex: 1 }}>
              <BottomQuickLinks />
            </View>
          </View>
          {/* SUB CONTAINER RIGHT */}
          <View elevation={10} style={styles.RightContainer}>
            <View style={{ backgroundColor: Colors.sushi, flex: 1 }}>
              <Text style={{ flex: 1, margin: 10, fontSize: 22, color: Colors.white, textAlign: 'center' }}>NEW ORDER</Text>
            </View>
            <View style={{ flex: 1 }}>
              <TablePicker />
            </View>
            <View style={{ flex: 12 }}>
              <Cart />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.apricot_peach, },
  LeftContainer: { backgroundColor: '#d9d9d9', flex: 2, flexDirection: 'column', padding: 0, shadowColor: "#000", shadowOpacity: .7, shadowRadius: 1, shadowOffset: { height: 1, width: 1 } },
  RightContainer: { backgroundColor: '#d9d9d9', flex: 1, flexDirection: 'column', padding: 0, shadowColor: "#000", shadowOpacity: .7, shadowRadius: 1, shadowOffset: { height: 1, width: 1 } },
  menuBarContainer: { flexDirection: 'row', flex: 1, height: 20 },

});
// ======================== REDUX CONNECTORS ========================
const mapStateToProps = (state) => {
  return {
    floating: state.receipt.floating,
    item: state.receipt.item,
    table: state.receipt.table
  };
};

// ==================================================================
export default connect(mapStateToProps)(Main);