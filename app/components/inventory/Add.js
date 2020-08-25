import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Picker, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Item, Icon, Input, Card, CardItem, Thumbnail, Body, Left, Drawer } from 'native-base';
import { FormLabel, FormInput } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//importing actions
import { getAllItem, getAllCategory, getAllTag } from '../../actions/inventory'
import { getAllSaleOrder } from '../../actions/order'
import { getAllDailyReport,getAllMonthlyReport,getAllYearlyReport } from '../../actions/report'
//importing variables
import { Colors } from '../../constant.js';


class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: ""
        }
    }
    whatToAdd(item) {
        console.log(item)
    }
    viewAllinfo() {
        this.props.dispatch(getAllItem())
        this.props.dispatch(getAllCategory())
        this.props.dispatch(getAllTag())
        this.props.dispatch(getAllSaleOrder())
        this.props.dispatch(getAllDailyReport())
        this.props.dispatch(getAllMonthlyReport())
        this.props.dispatch(getAllYearlyReport())
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Button style={{ backgroundColor: Colors.sushi, margin: 20, flex: 1, height: 200 }}
                        onPress={() => {
                            this.props.dispatch({ type: "NAVIGATE_TO", payload: { link: 'AddItems' } })
                        }}>
                        <Text style={{ flex: 1, textAlign: 'center', color: Colors.white, fontSize: 50 }}>ADD ITEM</Text>
                    </Button>
                    <Button style={{ backgroundColor: Colors.sushi, margin: 20, flex: 1, height: 200 }}
                        onPress={() => {
                            this.props.dispatch({ type: "NAVIGATE_TO", payload: { link: 'AddCategory' } })
                        }}>
                        <Text style={{ flex: 1, textAlign: 'center', color: Colors.white, fontSize: 50 }}>ADD CATEGORY</Text>
                    </Button>
                    <Button style={{ backgroundColor: Colors.sushi, margin: 20, flex: 1, height: 200 }}
                        onPress={() => {
                            this.props.dispatch({ type: "NAVIGATE_TO", payload: { link: 'AddTag' } })
                        }}>
                        <Text style={{ flex: 1, textAlign: 'center', color: Colors.white, fontSize: 50 }}>ADD TAG</Text>
                    </Button>
                </View>
                <Button style={{ backgroundColor: Colors.sushi, margin: 20, height: 25 }}
                    onPress={() => {
                        this.viewAllinfo()
                    }}>
                    <Text style={{ flex: 1, textAlign: 'center', color: Colors.white, fontSize: 15 }}>View all Info</Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', backgroundColor: '#F5FCFF' },
});

// ======================== REDUX CONNECTORS ========================
const mapStateToProps = (state) => {
    return {
    };
};
// ==================================================================
export default connect(mapStateToProps)(Add);