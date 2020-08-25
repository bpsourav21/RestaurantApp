import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Picker, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Item, Icon, Input, Card, CardItem, Thumbnail, Body, Left, Drawer } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Colors, Fonts } from '../../constant.js';

class AddPicker extends Component {
    render() {
        return (
            <View>
                <Item style={{ flex: 1 }}>
                    <Picker style={{ color: Colors.Brown_Rust, flex: 4 }} >
                        <Picker.Item label="ADD" color="black" value="null" />
                        <Picker.Item label="ADD CATEGORY" color="black" value="category2" />
                        <Picker.Item label="ADD WHAT 1" color="black" value="category3" />
                        <Picker.Item label="ADD WHAT 2" color="black" value="category4" />
                        <Picker.Item label="ADD WHAT 3" color="black" value="category5" />
                    </Picker>
                </Item>
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
export default connect(mapStateToProps)(AddPicker);