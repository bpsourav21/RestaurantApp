import React, { Component } from 'react';
import { Platform, StyleSheet, View, Picker, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { Container, Header, Content, Button, Item, Icon, Input, Card, CardItem, Thumbnail, Body, Left, Drawer, Col, Row, Grid } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//importing actions
import { getAllItem, getAllCategory, getAllTag, getSpecificItems } from '../../actions/inventory'
//importing variables
import { Colors } from '../../constant.js';
const cardImage = require('../../assets/item.jpg');

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.props.dispatch(getAllItem())
    this.props.dispatch(getAllCategory())
    this.props.dispatch(getAllTag())
  }
  componentWillReceiveProps(newProps) {
    this.setState({
    })
    // this.props.dispatch(getAllItem())
    // this.props.dispatch(getAllCategory())
    // this.props.dispatch(getAllTag())
  }
  render() {
    var allItem = this.props.allItem
    var cardItem = []
    var rowItems = []
    var clmItems = []
    var nth = 5
    var iteraton = 0
    if (this.props.selectedCategory == "All") {
      cardItem = allItem
    }
    else {
      for (var itemIx = 0; itemIx < allItem.length; itemIx++) {
        if (this.props.selectedCategory == allItem[itemIx]["category"]) {
          cardItem.push(allItem[itemIx])
        }
      }
    }
    for (let rowIx = 0; rowIx < cardItem.length; rowIx += nth) {
      iteraton = 0
      for (let index = rowIx; index < cardItem.length; index++) {
        iteraton++
        clmItems.push(<View key={"col" + index} style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity activeOpacity={.5} onPress={() => this.props.dispatch({ type: "ADD_ITEM_TO_ORDER", payload: { item: cardItem[index] } })} >
            <Image style={styles.thumbImg} source={cardImage} />
          </TouchableOpacity>
          <Text style={{ color: Colors.black, fontSize: 17, textAlign: "center" }}>{cardItem[index].name}</Text>
          <Text style={{ color: Colors.black, fontSize: 15, textAlign: "center" }} note>৳{cardItem[index].price}</Text>
        </View>)
        if (iteraton == 5) {
          break
        }
      }
      rowItems.push(<View style={{ flexDirection: "row", padding: 10, }} key={"row" + rowIx}>
        {clmItems}
      </View>)

      clmItems = []

    }
    showItems = (<ScrollView>{rowItems}</ScrollView>)
    return (
      <View style={{ flex: 1, }}>
        <View style={{ backgroundColor: Colors.apricot_peach, padding: 2, paddingTop: 4, paddingBottom: 5, flex: 11 }}>
          <View style={{ backgroundColor: Colors.white, flex: 1, borderRadius: 3 }}>
            {showItems}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  thumbImg: { height: 100, width: 100 }

});
// ======================== REDUX CONNECTORS ========================
const mapStateToProps = (state) => {
  return {
    allItem: state.inventory.allItem,
    showingItems: state.inventory.showingItems,
    selectedCategory: state.filter.selectedCategory
  };
};

// ==================================================================
export default connect(mapStateToProps)(MainMenu);