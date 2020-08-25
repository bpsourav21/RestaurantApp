import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Picker, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Container, Header, Content, Button, Item, Icon, Input, Card, CardItem, Thumbnail, Body, Left, Drawer } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//importing actions
import { setNewSaleOrder } from '../../actions/order'
//importing variables
import { Colors } from '../../constant.js';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillReceiveProps(newProps) {
        this.setState({
        })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: Colors.sushi, flexDirection: 'row' }}>
                <Text style={{ flex: 1, margin: 10, backgroundColor: Colors.sushi, fontSize: 22, color: Colors.white, textAlign: 'center' }}>Setting</Text>
            </View>
        </View>
        );
    }
}

// ======================== REDUX CONNECTORS ========================
const mapStateToProps = (state) => {
    return {
       
    };
};

// ==================================================================
export default connect(mapStateToProps)(Settings);