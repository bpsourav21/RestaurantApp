import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';
// CONSTANTS
import { Colors, Fonts } from '../../constant';
// CHILD COMPONENTS
import NotificationModal from '../dialogs/NotificationModal';
// ACTIONS
import { printReceipt } from '../../actions/print';
import { resetToHome } from '../../actions/navigation';
// ------------------------------------------------------------------
class PrintingReceipt extends Component {
    constructor() {
        super();
        this.state = {
            print_completed: false
        }
    }
    // .........................................
    componentWillReceiveProps(nextProps) {
        var that = this;
        if (nextProps.due_client_name != this.props.due_client_name){
            printReceipt(this.props.processed_sale_order, this.props.account,nextProps.due_client_name, nextProps.due_client_number, function () {
                that.setState({ print_completed: true })
            })
        }
    }
    // .........................................
    componentDidMount() {
        var that = this;
        if (this.props.processed_sale_order != null) {
            if (this.props.processed_sale_order.due > 0) {
                if (this.props.due_client_name != null){
                    printReceipt(this.props.processed_sale_order, this.props.account, this.props.processed_sale_order.customer_name, this.props.processed_sale_order.customer_phone, function () {
                        that.setState({ print_completed: true })
                    })
                }
            } else {
                printReceipt(this.props.processed_sale_order, this.props.account, this.props.processed_sale_order.customer_name, this.props.processed_sale_order.customer_phone, function () {
                    that.setState({ print_completed: true })
                })
            }
        }
    }
    // .........................................
    componentWillUnmount(){
        this.props.dispatch({type: "RESET_DUES_REDUCER"});
    }
    // .........................................
    printAgain() {
        var that = this;
        this.setState({ print_completed: false }, function () {
            printReceipt(this.props.processed_sale_order, this.props.account, this.props.processed_sale_order.customer_name, this.props.processed_sale_order.customer_phone, function () {
                that.setState({ print_completed: true })
            })
        })
    }
    // .........................................
    exitPrintScreen() {
        this.props.dispatch(resetToHome());
    }
    // .........................................
    render() {
         console.log("dsagfdgsdfgafg")
        console.log(this.props.processed_sale_order)
         console.log(this.props.account)
        var buttons_to_show = [];
        var print_again_button = (<Icon.Button key={11} size={28} name="print" backgroundColor={Colors.light} iconStyle={[styles.printbuttons, { color: Colors.main_color_1 }]} borderRadius={0} onPress={() => { this.printAgain() }} style={{ marginBottom: 5 }}><Text style={{ fontFamily: Fonts.title, flex: 1, fontSize: 28, color: Colors.main_color_1, textAlign: 'center' }}>Print Again</Text></Icon.Button>);
        var go_back_button = (<Icon.Button key={22} size={28} name="plus" backgroundColor={Colors.primary} iconStyle={[styles.printbuttons, { color: Colors.main_color_1 }]} borderRadius={0} onPress={() => { this.exitPrintScreen() }} style={{ marginTop: 5 }}><Text style={{ fontFamily: Fonts.title, flex: 1, fontSize: 28, color: Colors.main_color_4, textAlign: 'center' }}>New Order</Text></Icon.Button>);
        var comp_to_show = [];
        var printing_comp = [<Text key={13} style={styles.printing}>Printing</Text>]
        buttons_to_show = [<Text key={14} style={styles.printing}>Printing Completed</Text>, print_again_button, go_back_button];
        if (this.state.print_completed) {
            printing_comp = buttons_to_show;
        }
        return (
            <View style={styles.main_container}>
                <Image key={22} style={styles.logo} source={require('../../assets/print.png')} />
                {printing_comp}
            </View>
        )
    }
}
// =========================== STYLESHEET ===========================
var styles = StyleSheet.create({
    main_container: { backgroundColor: '#121721', flex: 1, flexDirection: 'column' },
    icon: { height: 150, resizeMode: 'contain', alignSelf: 'center', margin: 20, flex: 7, backgroundColor: 'rgba(0,0,0,0)' },
    printing: { textAlign: 'center', fontSize: 42, margin: 20, color: 'white', fontFamily: Fonts.brand, flex: 1 },
    printbuttons: {},
    logo: { width: 200, resizeMode: 'contain', alignSelf: 'center', flex: 2 },
})
// ======================== REDUX CONNECTORS ========================
const mapStateToProps = (state) => {
    return {
        processed_sale_order: state.order.processed_sale_order,
        account: state.auth.account,
        due_client_name: state.order.due_client_name,
        due_client_number: state.order.due_client_number
    };
};
// ==================================================================
export default connect(mapStateToProps)(PrintingReceipt);