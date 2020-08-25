import React, { Component } from 'react';
import { Platform, StyleSheet, View, Picker, TouchableOpacity } from 'react-native';
//import { Container, Header, Content, Button, Item, Icon, Input, Card, CardItem, Thumbnail, Body, Left, Drawer } from 'native-base';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Colors, Fonts } from '../../constant.js';

class BottomQuickLinks extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Footer >
          <FooterTab style={{ backgroundColor: Colors.Brown_Rust }}>
            <Button vertical
              onPress={() => {
                this.props.dispatch({ type: "NAVIGATE_TO", payload: { link: 'Add' } })
              }}>
              <Icon name="add-circle" />
              <Text>ADD</Text>
            </Button>
            <Button badge vertical
              onPress={() => {
                this.props.dispatch({ type: "NAVIGATE_TO", payload: { link: 'Offer' } })
              }}>
              <Badge ><Text>5</Text></Badge>
              <Icon active name="briefcase" />
              <Text>OFFER</Text>
            </Button>
            <Button badge vertical
              onPress={() => {
                this.props.dispatch({ type: "NAVIGATE_TO", payload: { link: 'Discount' } })
              }}>
              <Badge ><Text>51</Text></Badge>
              <Icon active name="ribbon" />
              <Text>Discount</Text>
            </Button>
            <Button vertical
              onPress={() => {
                this.props.dispatch({ type: "NAVIGATE_TO", payload: { link: 'Reports' } })
              }}>
              <Icon name="paper" />
              <Text>REPORT</Text>
            </Button>
            <Button vertical
              onPress={() => {
                this.props.dispatch({ type: "NAVIGATE_TO", payload: { link: 'Settings' } })
              }}>
              <Icon name="settings" />
              <Text>SETTINGS</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    )
  }
}
// ======================== REDUX CONNECTORS ========================
const mapStateToProps = (state) => {
  return {
  };
};

// ==================================================================
export default connect(mapStateToProps)(BottomQuickLinks);