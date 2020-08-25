'use strict';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Fonts } from '../../constant';
// ACTIONS
import { clearNotification } from '../../actions/notification';
// CONSTANTS
const window = Dimensions.get('window');
// ------------------------------------------------------------------
class NotificationModal extends Component {
    _hideModal = () => this.props.dispatch(clearNotification());
    render() {
        var buttonsview = null;
        var alertstring = this.props.notification
        var alert = null
        if (this.props.notification != null){
            if ((this.props.type == "functionalModal")) {
                alert = Alert.alert(
              'Alert',
              alertstring,
              [
                {text: 'Yes', onPress: () => {this.props.callFunction(); this._hideModal(); }},
                {text: 'No', onPress: () => {this._hideModal()}}
              ],
              { cancelable: false }
            )} else {
                alert = Alert.alert(
                    'Alert',
                    alertstring,
                    [
                      {text: 'OK', onPress: () => {this._hideModal()}},
                    ],
                    { cancelable: false }
                  )
            }
        }
        return (
            <View>{alert}</View>
        );
    }
}
// =========================== STYLESHEET ===========================
var styles = StyleSheet.create({
    modal: {
        height: (window.height / 3),
        backgroundColor: Colors.dark,
        alignItems: 'center',
        flexDirection: 'column',
    },
    icon: {
        marginTop: 20,
        marginBottom: 20,
        height: 10,
        flex: .5,
        resizeMode: 'contain',
    },
    textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    },
    modalText: {
        textAlign: 'center',
        fontSize: 24,
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: Fonts.title,
        color:Colors.white
    }
});
// ======================== REDUX CONNECTORS ========================
const mapStateToProps = (state) => {
    return {
        notification: state.notification.notification,
        notification_type: state.notification.notification_type
    };
};
const dispatchToProps = (dispatch) => {
    let actions = bindActionCreators({
        clearNotification
    })
    return { ...actions, dispatch }
};
// ==================================================================
export default connect(mapStateToProps, dispatchToProps)(NotificationModal);