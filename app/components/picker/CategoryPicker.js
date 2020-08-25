import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Picker, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Item, Icon, Input, Card, CardItem, Thumbnail, Body, Left, Drawer } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//importing actions
import { selectCategory } from '../../actions/filter'
//importing variables
import { Colors } from '../../constant.js';


class CategoryPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // selectedCategory: 'All Items',
    }
  }
  onValueChange(val) {
    // this.setState({ selectedCategory: val })
    this.props.dispatch(selectCategory(val))
  }
  render() {
    var allCategory = this.props.allCategory
    var showCatItem = []
    for (var item = 0; item < Object.keys(allCategory).length; item++) {
      showCatItem.push(<Item key={item + 1} label={allCategory[item].name} color="black" value={allCategory[item].name} />)
    }
    return (
      <View style={{ backgroundColor: Colors.sushi, flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <Picker
            mode="dropdown"
            placeholder="Select One"
            selectedValue={this.props.selectedCategory}
            onValueChange={(val) => this.onValueChange(val)}
            style={{ color: Colors.white, flex: 4 }} >
            <Item key={0} label={"All Category"} color="black" value={"All"} />
            {showCatItem}
          </Picker>
          <Icon name="search" style={{ padding: 10 }} />
          <Input style={{ flex: 4 }} placeholder="Search" />
        </View>
      </View>
    );
  }
}
// ======================== REDUX CONNECTORS ========================
const mapStateToProps = (state) => {
  return {
    allCategory: state.inventory.allCategory,
    selectedCategory: state.filter.selectedCategory
  };
};

// ==================================================================
export default connect(mapStateToProps)(CategoryPicker);