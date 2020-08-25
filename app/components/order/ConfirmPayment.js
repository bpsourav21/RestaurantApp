import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Container, Header, Content, Button, Picker, Item, Icon, Input, Card, CardItem, Thumbnail, Body, Left, Drawer } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import Sidebar from './Sidebar.js';
import CategoryPicker from '../picker/CategoryPicker.js'
import MainMenu from '../menu/MainMenu.js'
import BottomQuickLinks from '../menu/BottomQuickLinks.js'
import ConfirmCart from './ConfirmCart.js';
//importing actions
import { setNewSaleOrder } from '../../actions/order'
//importing variables
import { Colors } from '../../constant.js';


class ConfirmPayment extends Component {
    constructor(props) {
        super(props);
        var hold_sale_order = []
        if (this.props.order.hold_sale_order.length != 0) hold_sale_order = this.props.order.hold_sale_order
        this.state = {
            hold_sale_order: hold_sale_order,
            customer_name: "none",
            customer_phone: "none",
            waiter_name: "none",
            offer_name: "none",
            discount: "none"
        }
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            hold_sale_order: newProps.order.hold_sale_order
        })
    }
    addNewOrder() {
        var order = []
        var newItem = []
        newItem["order"] = this.state.hold_sale_order.order
        newItem["invoice_no"] = this.state.hold_sale_order.invoice_no
        newItem["table"] = this.state.hold_sale_order.table
        newItem["sub_total"] = this.state.hold_sale_order.sub_total
        newItem["tax"] = this.state.hold_sale_order.tax
        newItem["discount"] = this.state.hold_sale_order.discount
        newItem["total_price"] = this.state.hold_sale_order.total_price
        newItem["due"] = 0
        newItem["customer_name"] = this.state.customer_name
        newItem["customer_phone"] = this.state.customer_phone
        newItem["waiter"] = this.state.waiter_name
        newItem["offer_name"] = this.state.offer_name
        if (this.props.amount >= this.state.hold_sale_order.total_price) {
            newItem["paid"] = this.props.amount
            newItem["change"] = this.props.amount - this.state.hold_sale_order.total_price
        }
        else {
            newItem["paid"] = 0
            newItem["change"] = 0
        }
        console.log("newItem")
        console.log(newItem)
        this.props.dispatch(setNewSaleOrder(newItem))
    }
    onValueChange(val) {
        this.setState({ waiter_name: val })
    }
    render() {
        var invoice = this.state.hold_sale_order.invoice_no
        var vatRegNo = "3232323232";
        var tableNo = this.state.hold_sale_order.table
        var offer = "Winter Offer"; //this will come from dropdown
        var discount = "250"; //auto select, based on offer's dropdown selection

        return (

            <View style={styles.container}>
                {/* MAIN CONTAINER */}
                <View style={styles.menuBarContainer}>
                    {/* SUB CONTAINER LEFT */}
                    {/* <Sidebar /> */}
                    <View style={{ backgroundColor: Colors.white, flex: 2, padding: 10 }}>
                        <View style={{ backgroundColor: Colors.sushi, flexDirection: 'row' }}>
                            <Text style={{ flex: 1, margin: 10, backgroundColor: Colors.sushi, fontSize: 22, color: Colors.white, textAlign: 'center' }}>Other's Information</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ flexDirection: 'row', alignSelf: 'center', textAlign: 'left', fontSize: 18, flex: 1 }}>INVOICE ID :</Text>
                            <Text style={{ flexDirection: 'row', padding: 5, alignSelf: 'center', fontSize: 18, flex: 1 }}>{invoice}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ flexDirection: 'row', alignSelf: 'center', textAlign: 'left', fontSize: 18, flex: 1 }}>TABLE NO :</Text>
                            <Text style={{ flexDirection: 'row', padding: 5, alignSelf: 'center', fontSize: 18, flex: 1 }}>{tableNo}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ flexDirection: 'row', alignSelf: 'center', textAlign: 'left', fontSize: 18, flex: 1 }}>CUSTOMER NAME :</Text>
                            <TextInput style={{ flexDirection: 'row', padding: 5, alignSelf: 'center', fontSize: 18, flex: 1 }}
                                onChange={(e) => this.setState({ customer_name: e.nativeEvent.text })}
                                placeholder="Customer Name"></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ flexDirection: 'row', alignSelf: 'center', textAlign: 'left', fontSize: 18, flex: 1 }}>CUSTOMER PHONE :</Text>
                            <TextInput style={{ flexDirection: 'row', padding: 5, alignSelf: 'center', fontSize: 18, flex: 1 }}
                                onChange={(e) => this.setState({ customer_phone: e.nativeEvent.text })}
                                placeholder="Customer Phone"
                                keyboardType="phone-pad" />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ flexDirection: 'row', alignSelf: 'center', textAlign: 'left', fontSize: 18, flex: 1 }}>SERVED BY :</Text>
                            <Picker
                                mode="dropdown"
                                placeholder="Select Waiter name"
                                selectedValue={this.state.waiter_name}
                                onValueChange={(val) => this.onValueChange(val)}
                                style={{ color: Colors.black, flex: 1 }} >
                                <Item label="Please Select a Waiter" false color="black" value="key0" />
                                <Item label="Rahim" color="black" value="Rahim" />
                                <Item label="Karim" color="black" value="Karim" />
                                <Item label="Kalam" color="black" value="Kalam" />
                            </Picker>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ flexDirection: 'row', alignSelf: 'center', textAlign: 'left', fontSize: 18, flex: 1 }}>OFFER :</Text>
                            <TextInput style={{ flexDirection: 'row', padding: 5, alignSelf: 'center', fontSize: 18, flex: 1 }}
                                onChange={(e) => this.setState({ offer_name: e.nativeEvent.text })}
                                placeholder="Offer Name"></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ flexDirection: 'row', alignSelf: 'center', textAlign: 'left', fontSize: 18, flex: 1 }}>DISCOUNT :</Text>
                            <TextInput style={{ flexDirection: 'row', padding: 5, alignSelf: 'center', fontSize: 18, flex: 1 }}
                                onChange={(e) => this.setState({ discount: e.nativeEvent.text })}
                                placeholder="Discount"></TextInput>
                        </View>

                    </View>
                    {/* SUB CONTAINER RIGHT */}
                    <View elevation={10} style={[styles.RightContainer, { padding: 10, backgroundColor: Colors.white, }]}>
                        <ConfirmCart />
                    </View>
                </View>
                <View style={{ backgroundColor: Colors.white, flexDirection: 'row' }}>
                    <Button style={{ backgroundColor: Colors.sushi, flex: 1 }}>
                        <Text style={{ flex: 1, textAlign: 'center', color: Colors.white, fontSize: 20 }} onPress={() => this.addNewOrder()}>PROCEED</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF', },
    RightContainer: {
        backgroundColor: '#d9d9d9', flex: 1, flexDirection: 'column',
        padding: 0, shadowColor: "#000", shadowOpacity: .7, shadowRadius: 1, shadowOffset: { height: 1, width: 1 }
    },
    menuBarContainer: { flexDirection: 'row', flex: 1, height: 20 },

});
// ======================== REDUX CONNECTORS ========================
const mapStateToProps = (state) => {
    return {
        order: state.order,
        amount: state.order.amount
    };
};

// ==================================================================
export default connect(mapStateToProps)(ConfirmPayment);