import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Picker, TouchableOpacity, ScrollView, TextInput, ToastAndroid, TouchableHighlight } from 'react-native';
import { Container, Header, Content, Button, Item, Icon, Input, Card, CardItem, Thumbnail, Body, Left, Drawer } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Swipeable from 'react-native-swipeable';
//importing actions
import { setNewOrder_DB, holdSale, removeItemFromOrder } from '../../actions/order'
//importing variables
import { Colors } from '../../constant.js';
import { ConfirmPayment } from './ConfirmPayment.js'
// Buttons
var swipeoutBtns = [
    {
        text: 'REMOVE',
        type: "delete",
        // backgroundColor: 'red',
        //  underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => { console.log("delete") }
    }
]

class Cart extends Component {
    constructor(props) {
        super(props);
        var order = []
        if (this.props.order.order.length != 0) order = this.props.order.order
        this.state = {
            order: order
        }
    }
    //-------------------------------------------------------------------------
    componentWillReceiveProps(newProps) {
        this.setState({
            order: newProps.order.order,
        })
    }
    //------------------------------------------------------------------------
    addNewOrder(sub_total, tax, discount, total_price) {
        if (this.state.order.length != 0) {
            var table = this.props.order.tableName
            var sub_total = sub_total.toFixed(2)
            var tax = tax.toFixed(2)
            var discount = discount.toFixed(2)
            var total_price = total_price.toFixed(2)
            var newItem = {}
            newItem["order"] = this.state.order
            newItem["table"] = table
            newItem["sub_total"] = parseFloat(sub_total)
            newItem["tax"] = parseFloat(tax)
            newItem["discount"] = parseFloat(discount)
            newItem["total_price"] = parseFloat(total_price)
            this.props.dispatch(holdSale(newItem))

            console.log("NAVIGATING TO CONFIRM PAYMENT")
            console.log(newItem)
            if (table == null) {
                ToastAndroid.show("Please select Table", ToastAndroid.SHORT);
            }
            else { this.props.dispatch({ type: "NAVIGATE_TO", payload: { link: 'ConfirmPayment' } }) }
        }
        else {
            ToastAndroid.show("Please add some order", ToastAndroid.SHORT);
        }
    }
    //------------------------------------------------------------------------
    deleteItem(index) {
        this.props.dispatch(removeItemFromOrder(index))
    }

    //------------------------------------------------------------------------
    render() {
        var itemizations = this.state.order
        var arr = []
        var subTotalPrice = 0
        var vat = 0
        var totalPrice = 0
        var discount = 0
        for (let i = 0; i < itemizations.length; i++) {
            var itemTemp = itemizations[i];
            var item = (
                <Swipeable style={{ backgroundColor: "#eee", margin: 2}} onRef={ref => this.swipeable = ref} onRightActionRelease={() => { this.deleteItem(i) }}
                    rightContent={
                        <TouchableHighlight style={{ backgroundColor: 'red', flex: 1, justifyContent: 'center' }} sl={i} underlayColor={'orange'}>
                            <Icon name="close" backgroundColor={Colors.white} size={32} style={{ margin: 4, marginLeft: 34, color: Colors.white }} />
                        </TouchableHighlight>}
                    rightButtonWidth={100} key={i + 1}>
                    <View key={i + 1} style={{ flexDirection: 'row', marginLeft: 5, marginRight: 5}}>
                        <Text style={{ color: Colors.black, flex: 1, fontSize: 16 }}>
                            {itemizations[i].name}
                        </Text>
                        <TextInput style={{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 16 }}
                            onChangeText={(text) => this.props.dispatch({ type: "UPDATE_QUANTITY_IN_ORDER", payload: { item: itemTemp, newqty: text } })}>
                            {itemizations[i].quantity}
                        </TextInput>
                        <Text style={{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 16 }}>
                            ৳{itemizations[i].price}
                        </Text>
                        <Text style={{ color: Colors.black, flex: 1, textAlign: 'right', fontSize: 16 }}>
                            ৳{itemizations[i].price * itemizations[i].quantity}
                        </Text>
                    </View>
                </Swipeable>
            )
            subTotalPrice = subTotalPrice + (itemizations[i].price * itemizations[i].quantity);
            vat = ((15 / 100) * subTotalPrice);
            totalPrice = subTotalPrice + vat;
            arr.push(item);
        }
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: Colors.apricot_peach, padding: 2, paddingTop: 4, paddingBottom: 5, flex: 11 }}>
                    <View style={{ backgroundColor: Colors.white, flex: 1, borderRadius: 3 }}>
                        <View style={{ flexDirection: 'row', marginTop: 7, marginBottom: 7, marginLeft: 5, marginRight: 5, }}>
                            <Text style={{ color: Colors.sushi, flex: 1, fontSize: 18 }}>NAME</Text>
                            <Text style={{ color: Colors.sushi, flex: 1, fontSize: 18, textAlign: 'center' }}>QTY</Text>
                            <Text style={{ color: Colors.sushi, flex: 1, fontSize: 18, textAlign: 'center' }}>UNIT PRICE</Text>
                            <Text style={{ color: Colors.sushi, flex: 1, fontSize: 18, textAlign: 'right' }}>TOTAL</Text>
                        </View>
                        <ScrollView>
                            {arr}
                        </ScrollView>

                        <View style={{ padding: 2, }}>
                            <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 2, marginBottom: 2 }}>
                                <Text style={{ flex: 1, fontSize: 18, textAlign: 'left' }}>SUB TOTAL</Text>
                                <Text style={{ flex: 1, fontSize: 16, textAlign: 'right' }}>৳{subTotalPrice.toFixed(2)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 2, marginBottom: 2 }}>
                                <Text style={{ flex: 1, fontSize: 18, textAlign: 'left' }}>VAT</Text>
                                <Text style={{ flex: 1, fontSize: 16, textAlign: 'right' }}>৳{vat.toFixed(2)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 2, marginBottom: 2 }}>
                                <Text style={{ flex: 1, fontSize: 18, textAlign: 'left' }}>DISCOUNT</Text>
                                <Text style={{ flex: 1, fontSize: 16, textAlign: 'right' }}>৳{discount.toFixed(2)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 2, marginBottom: 2 }}>
                                <Text style={{ flex: 1, fontSize: 22, textAlign: 'left', color: Colors.black }}>TOTAL</Text>
                                <Text style={{ flex: 1, fontSize: 20, textAlign: 'right', color: Colors.black }}>৳{totalPrice.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ backgroundColor: Colors.white, flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Button style={{ backgroundColor: Colors.sushi, flex: 1, height: 50 }} onPress={() => this.addNewOrder(subTotalPrice, vat, discount, totalPrice)}>
                            <Text style={{ flex: 1, textAlign: 'center', color: Colors.white, fontSize: 20 }}>PROCEED</Text>
                        </Button>
                        <Button style={{ backgroundColor: Colors.sushi, flex: 1, height: 50 }}>
                            <Text style={{ flex: 1, textAlign: 'center', color: Colors.white, fontSize: 20 }}>PENDING</Text>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

// ======================== REDUX CONNECTORS ========================
const mapStateToProps = (state) => {
    return {
        order: state.order
    };
};

// ==================================================================
export default connect(mapStateToProps)(Cart);