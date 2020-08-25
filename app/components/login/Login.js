import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Picker, TouchableOpacity, Image, TextInput } from 'react-native';
import { Container, Header, Content, Button, Item, Icon, Input, Card, CardItem, Thumbnail, Body, Left, Drawer } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//importing actions
import { login } from '../../actions/auth';
//importing variables
import { Colors } from '../../constant.js';

const cardImage = require('../../assets/logo2.png');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phonenumber: 'phone',
      pin: 'pin'
    };
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={{ flex: 1, backgroundColor: Colors.Brown_Rust, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{ width: 200, height: 200 }}
            source={cardImage}
          />
        </View>

        <View style={{ flex: 2, backgroundColor: '#fff' }}>
          <View style={{ flex: 2, backgroundColor: Colors.white }}>
            <Item regular style={{ padding: 10 }}>
              <Input placeholder='Phone Number' keyboardType={"phone-pad"}
                onChangeText={(phonenumber) => this.setState({ phonenumber })}
              />
            </Item>
            <Item regular style={{ padding: 10 }}>
              <Input placeholder='User PIN' keyboardType={"phone-pad"}
                onChangeText={(pin) => this.setState({ pin })}
              />
            </Item>
            <Button success onPress={() => { this.props.dispatch(login(this.state.phonenumber, this.state.pin)) }}
              style={{ padding: 10, alignSelf: 'center', marginTop: 10 }}
            >
              <Text style={{ fontSize: 20, color: Colors.white }}>LOGIN</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5FCFF', },
  RightContainer: {
    backgroundColor: '#d9d9d9', flex: 1, flexDirection: 'column',
    padding: 0, shadowColor: "#000", shadowOpacity: .7, shadowRadius: 1, shadowOffset: { height: 1, width: 1 }
  },
  menuBarContainer: { flexDirection: 'row', flex: 1, height: 20 },

});

// ======================== REDUX CONNECTORS ========================
const mapStateToProps = (state) => {
  return {
    authenticating: state.auth.authenticating,
    authenticated: state.auth.authenticated,
    log: state.log.log,
    user: state.auth.user
  };
};

// ==================================================================
export default connect(mapStateToProps)(Login);