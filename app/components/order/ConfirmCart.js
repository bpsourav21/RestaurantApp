import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Picker, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Container, Header, Content, Button, Item, Icon, Input, Card, CardItem, Thumbnail, Body, Left, Drawer } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//importing actions
import { setNewSaleOrder, paidAmount } from '../../actions/order'
//importing variables
import { Colors } from '../../constant.js';

class ConfirmCart extends Component {
    constructor(props) {
        super(props);
        var hold_sale_order = []
        if (this.props.order.hold_sale_order.length != 0) hold_sale_order = this.props.order.hold_sale_order
        this.state = {
            hold_sale_order: hold_sale_order,
        }
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            hold_sale_order: newProps.order.hold_sale_order
        })
    }
    paidAmount(amount) {
        console.log(amount)
        this.props.dispatch(paidAmount(amount))
    }
    render() {
        var itemizations = this.state.hold_sale_order.order
        var arr = []
        for (var i = 0; i < itemizations.length; i++) {
            var item = (
                <View key={i + 1} style={{ flexDirection: 'row', marginLeft: 5, marginRight: 5 }}>
                    <Text style={{ color: Colors.black, flex: 1, fontSize: 16 }}>
                        {itemizations[i].name}
                    </Text>
                    <Text style={{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 16 }}>
                        {itemizations[i].quantity}
                    </Text>
                    <Text style={{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 16 }}>
                        ৳{itemizations[i].price}
                    </Text>
                    <Text style={{ color: Colors.black, flex: 1, textAlign: 'right', fontSize: 16 }}>
                        ৳{itemizations[i].price * itemizations[i].quantity}
                    </Text>
                </View>
            )
            arr.push(item)
        }
        var subTotalPrice = this.state.hold_sale_order.sub_total
        var vat = this.state.hold_sale_order.tax
        var totalPrice = this.state.hold_sale_order.total_price
        var discount = this.state.hold_sale_order.discount
        if (this.props.amount >= totalPrice) {
            var ret = this.props.amount - totalPrice
        }
        else {
            var ret = 0
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: Colors.sushi, flexDirection: 'row' }}>
                    <Text style={{ flex: 1, margin: 10, backgroundColor: Colors.sushi, fontSize: 22, color: Colors.white, textAlign: 'center' }}>ORDER DETAILS</Text>
                </View>
                <View style={{ backgroundColor: Colors.white, flexDirection: 'column', flex: 1 }}>
                    <View style={{ backgroundColor: Colors.white, flex: 10, flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', marginTop: 7, marginBottom: 7, marginLeft: 5, marginRight: 5, backgroundColor: Colors.white }}>
                            <Text style={{ color: Colors.sushi, flex: 1, fontSize: 18 }}>NAME</Text>
                            <Text style={{ color: Colors.sushi, flex: 1, fontSize: 18, textAlign: 'center' }}>QTY</Text>
                            <Text style={{ color: Colors.sushi, flex: 1, fontSize: 18, textAlign: 'center' }}>UNIT PRICE</Text>
                            <Text style={{ color: Colors.sushi, flex: 1, fontSize: 18, textAlign: 'right' }}>TOTAL</Text>
                        </View>
                        <ScrollView>
                            {arr}
                        </ScrollView>
                        <View>
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
                        <View>
                            <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 2, marginBottom: 2 }}>
                                <Text style={{ flex: 1, fontSize: 22, textAlign: 'left', color: Colors.black }}>PAID</Text>
                                {/*<Text style={{ flex: 1, fontSize: 20, textAlign: 'right', color: Colors.black }}>৳ */}
                                <TextInput style={{ width: 70, fontSize: 20, textAlign: "right" }}
                                    clearButtonMode={"always"}
                                    clearTextOnFocus={true}
                                    onChange={(e) => this.paidAmount(e.nativeEvent.text)}
                                    keyboardType="phone-pad" >{this.props.amount}</TextInput>
                                {/*</Text>*/}
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 2, marginBottom: 2 }}>
                                <Text style={{ flex: 1, fontSize: 22, textAlign: 'left', color: Colors.black }}>RETURN</Text>
                                <Text style={{ flex: 1, fontSize: 20, textAlign: 'right', color: Colors.black }}>৳{ret.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

// ======================== REDUX CONNECTORS ========================
const mapStateToProps = (state) => {
    return {
        order: state.order,
        amount: state.order.amount
    };
};

// ==================================================================
export default connect(mapStateToProps)(ConfirmCart);