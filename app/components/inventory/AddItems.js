import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Picker, TouchableOpacity, ToastAndroid } from 'react-native';
import { Container, Header, Content, Button, Item, Icon, Input, Card, CardItem, Thumbnail, Body, Left, Drawer } from 'native-base';
import { FormLabel, FormInput } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//importing actions
import { setNewItem, getAllItem, getAllCategory } from '../../actions/inventory'
//importing variables
import { Colors } from '../../constant.js';
const cardImage = require('../../assets/item.jpg');

class AddItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            category: "",
            sub_category: "aaaaa",
            barcode: "aaaaa",
            img_url: "../../assets/item.jpg",
            discount: "none",
            tag: "none"
        }
        this.props.dispatch(getAllCategory())
    }

    addNewItem() {
        var price = parseFloat(this.state.price)
        price = price.toFixed(2)
        var parsedprice = parseFloat(price)
        var newItem = {}
        newItem['name'] = this.state.name
        newItem['price'] = parsedprice
        newItem['category'] = this.state.category
        newItem['sub_category'] = this.state.sub_category
        newItem['barcode'] = this.state.barcode
        newItem['img_url'] = this.state.img_url
        newItem['discount'] = this.state.discount
        newItem['tag'] = this.state.tag

        // if (this.state.name == "" || this.state.category == "" || this.state.subcategory == "" || this.state.price == "" || this.state.code == "" || this.state.barcode == "" || this.state.discount == "" || this.state.tag == "") {
        //     ToastAndroid.show("field can't be blank", ToastAndroid.SHORT);
        // } else {
        ToastAndroid.show(this.state.name + " added", ToastAndroid.SHORT);
        // console.log(this.state.name);
        // console.log(this.state.category);
        // console.log(this.state.subcategory);
        // console.log(this.state.price);
        // console.log(this.state.code);
        // console.log(this.state.barcode);
        // console.log(this.state.discount);
        // console.log(this.state.tag);
        //}
        // console.log(newItem);
        this.props.dispatch(setNewItem(newItem))
    }

    viewItem() {
        this.props.dispatch(getAllItem())
        console.log("views item")
        this.props.dispatch(getAllOrder())
        // console.log(Model.objects('Item').length)
        // console.log(JSON.stringify(Model.objects('Item')))
        // console.log( JSON.stringify(Model.objects('Item').filtered('price = "11"  AND name BEGINSWITH "T"')))
    }
    onValueChange(val) {
        this.setState({ category: val })
    }

    render() {
        var allCategory = this.props.allCategory
        var showCatItem = []
        for (var item = 0; item < Object.keys(allCategory).length; item++) {
            showCatItem.push(<Item key={item} label={allCategory[item].name} color="black" value={allCategory[item].name} />)
        }
        return (
            <View style={styles.container}>
                {/*<ScrollView>*/}
                <View style={{ flex: 8 }}>
                    <View style={{ marginLeft: 30, marginRight: 30, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, color: Colors.white, margin: 15, flex: 1 }}>NAME :</Text>
                        <View style={{ flex: 5 }}>
                            <FormInput
                                keyboardType={"default"}
                                placeholder="ex : Beef Cheese Delight"
                                defaultValue={this.state.name}
                                inputStyle={{ color: Colors.white, fontSize: 16, }}
                                onChange={(e) => this.setState({ name: e.nativeEvent.text })} />
                        </View>
                    </View>

                    <View style={{ marginLeft: 30, marginRight: 30, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, color: Colors.white, margin: 15, flex: 1 }}>CATEGORY :</Text>
                        <View style={{ flex: 5 }}>
                            <Picker
                                mode="dropdown"
                                placeholder="Select One"
                                selectedValue={this.state.category}
                                onValueChange={(val) => this.onValueChange(val)}
                                style={{ color: Colors.white }} >
                                {showCatItem}
                            </Picker>
                        </View>
                    </View>
                    <View style={{ marginLeft: 30, marginRight: 30, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, color: Colors.white, margin: 15, flex: 1 }}>SUB CATEGORY :</Text>
                        <View style={{ flex: 5 }}>
                            <FormInput
                                keyboardType={"default"}
                                placeholder="ex : Burger"
                                defaultValue={this.state.sub_category}
                                inputStyle={{ color: Colors.white, fontSize: 16, }}
                                onChange={(e) => this.setState({ sub_category: e.nativeEvent.text })} />
                        </View>
                    </View>
                    <View style={{ marginLeft: 30, marginRight: 30, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, color: Colors.white, margin: 15, flex: 1 }}>PRICE :</Text>
                        <View style={{ flex: 5 }}>
                            <FormInput
                                keyboardType={"phone-pad"}
                                placeholder="ex : 220"
                                defaultValue={this.state.price}
                                inputStyle={{ color: Colors.white, fontSize: 16, }}
                                onChange={(e) => this.setState({ price: e.nativeEvent.text })} />
                        </View>
                    </View>
                    <View style={{ marginLeft: 30, marginRight: 30, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, color: Colors.white, margin: 15, flex: 1 }}>BARCODE :</Text>
                        <View style={{ flex: 5 }}>
                            <FormInput
                                keyboardType={"default"}
                                placeholder="ex : FB110b"
                                defaultValue={this.state.barcode}
                                inputStyle={{ color: Colors.white, fontSize: 16, }}
                                onChange={(e) => this.setState({ barcode: e.nativeEvent.text })} />
                        </View>
                    </View>
                    <View style={{ marginLeft: 30, marginRight: 30, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, color: Colors.white, margin: 15, flex: 1 }}>IMAGE :</Text>
                        <View style={{ flex: 5 }}>
                            <FormInput
                                keyboardType={"default"}
                                placeholder="ex : FB110b"
                                defaultValue={this.state.img_url}
                                inputStyle={{ color: Colors.white, fontSize: 16, }}
                                onChange={(e) => this.setState({ img_url: e.nativeEvent.text })} />
                        </View>
                    </View>
                    <View style={{ marginLeft: 30, marginRight: 30, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, color: Colors.white, margin: 15, flex: 1 }}>DISCOUNT :</Text>
                        <View style={{ flex: 5 }}>
                            <FormInput
                                keyboardType={"default"}
                                placeholder="ex : 10%"
                                defaultValue={this.state.discount}
                                inputStyle={{ color: Colors.white, fontSize: 16, }}
                                onChange={(e) => this.setState({ discount: e.nativeEvent.text })} />
                        </View>
                    </View>
                    <View style={{ marginLeft: 30, marginRight: 30, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, color: Colors.white, margin: 15, flex: 1 }}>TAG :</Text>
                        <View style={{ flex: 5 }}>
                            <FormInput
                                keyboardType={"default"}
                                placeholder="ex : fastfood,burger,cheese,beef"
                                defaultValue={this.state.tag}
                                inputStyle={{ color: Colors.white, fontSize: 16, }}
                                onChange={(e) => this.setState({ tag: e.nativeEvent.text })} />
                        </View>
                    </View>
                </View>
                <View style={{ flex: 2 }}>
                    <Button style={{ backgroundColor: Colors.sushi, margin: 20, alignSelf: 'center' }}
                        onPress={() => {
                            this.addNewItem()
                        }}>
                        <Text style={{ margin: 20, textAlign: 'center', color: Colors.white, fontSize: 20 }}>ADD CONFIRM</Text>
                    </Button>
                </View>
                {/*</ScrollView>*/}
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.Brown_Rust, },

});

// ======================== REDUX CONNECTORS ========================
const mapStateToProps = (state) => {
    return {
        allCategory: state.inventory.allCategory,
    };
};

// ==================================================================
export default connect(mapStateToProps)(AddItems);



/*render() {
    console.log(this.props.allItem)
    return (
        <View style={styles.container}>
            <View>
                <FormLabel >Item Name</FormLabel>
                <FormInput
                    keyboardType={"default"}
                    placeholder="Item Name"
                    defaultValue={this.state.name}
                    inputStyle={{ color: '#000', fontSize: 16, }}
                    onChange={(e) => this.setState({ name: e.nativeEvent.text })}
                />
            </View>
            <View>
                <FormLabel>Price</FormLabel>
                <FormInput
                    keyboardType={"phone-pad"}
                    placeholder="Price"
                    defaultValue={this.state.price}
                    inputStyle={{ color: '#000', fontSize: 16, }}
                    onChange={(e) => this.setState({ price: e.nativeEvent.text })}
                    focus={true}
                />
            </View>

            <TouchableOpacity onPress={() => {
                this.addNewItem("item")
            }}>
                <Text style={{ textAlign: "left" }}>save</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                this.viewItem()
            }}>
                <Text style={{ textAlign: "center" }}>view item</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                this.addNewOrder("order")
            }}>
                <Text style={{ textAlign: "right" }}>add order</Text>
            </TouchableOpacity>

        </View>
    );
}
}*/
