import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Picker, TouchableOpacity, ToastAndroid } from 'react-native';
import { Container, Header, Content, Button, Item, Icon, Input, Card, CardItem, Thumbnail, Body, Left, Drawer } from 'native-base';
import { FormLabel, FormInput } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//importing actions
import { setNewTag, getAllTag } from '../../actions/inventory'
//importing variables
import { Colors } from '../../constant.js';


class AddTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: ""
        }
    }
    addNewTag() {
        console.log("Tag:added");
        var newTag = {}
        newTag['name'] = this.state.name
        this.props.dispatch(setNewTag(newTag))
        // if(this.state.name=="" || this.state.price==""){
        //     ToastAndroid.show("field can't be blank", ToastAndroid.SHORT);
        // }else{
        ToastAndroid.show(this.state.name + " added", ToastAndroid.SHORT);
        // }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginLeft: 30, marginRight: 30, flexDirection: 'row', flex: 8 }}>
                    <Text style={{ fontSize: 20, color: Colors.white, margin: 15, flex: 1 }}>Name of Tag :</Text>
                    <View style={{ flex: 5 }}>
                        <FormInput
                            keyboardType={"default"}
                            placeholder="ex : lunch,drink,coffee"
                            defaultValue={this.state.name}
                            inputStyle={{ color: Colors.white, fontSize: 16, }}
                            onChange={(e) => this.setState({ name: e.nativeEvent.text })}
                        />
                    </View>
                </View>
                <View style={{ flex: 2 }}>
                    <Button style={{ backgroundColor: Colors.sushi, margin: 20, alignSelf: 'center' }}
                        onPress={() => { this.addNewTag() }}>
                        <Text style={{ margin: 20, textAlign: 'center', color: Colors.white, fontSize: 20 }}>ADD CONFIRM</Text>
                    </Button>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.Brown_Rust },

});

// ======================== REDUX CONNECTORS ========================
const mapStateToProps = (state) => {
    return {

    };
};

// ==================================================================
export default connect(mapStateToProps)(AddTag);