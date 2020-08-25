//const base64 = require('base-64');
import axios from 'axios';
import { logger } from '../actions/logger.js';
import { addAccountInfoIntoDb, getAccountInfoFromDb } from './dbAccount';
import { updateNotification } from '../actions/notification';
import * as Keychain from 'react-native-keychain';
//import DB from './dbConfig';
// ------------------------------------------------------------------
export function getUserFromServerDb(url, phonenumber, pin, dispatch, callback) {
    axios.get(url, {
        headers: { "Content-Type": "application/json" },
        auth: {
            username: phonenumber,
            password: pin
        },
        timeout: 10000
    }).then((response) => {
        logger(dispatch, 'obtained response');
        console.log("response.data")
        console.log(response.data)
        return response.data
    }).then((resp) => {
        logger(dispatch, 'setting keychain');
        // SET IN KEYCHAIN -------------------------------------
        var nameObj = { "cashier_subscription_expiry": resp.cashier_subscription_expiry, 'phonenumber': resp.name };
        var username = JSON.stringify(nameObj);
        Keychain
            .setGenericPassword(username, pin)
            .then(function (res) {
            }).catch((err) => {
                console.log(err);
            });;

        // -----------------------------------------------------
        // resp._id = "accountinfo";
        // var vat = 0;
        // var report_password = "";
        // if (resp.vat_rate != null) vat = resp.vat_rat;
        // if (resp.report_password) report_password = resp.report_password;
        // var d = new Date().toLocaleDateString()
        // var accountinfo = {
        //     _id: "accountinfo",
        //     shop_name: resp.shop_name,
        //     address: resp.address,
        //     vat_registration_number: resp.vat_registration_number,
        //     vat_active: resp.vat_active,
        //     backup_database: resp.backup_database,
        //     vat_rate: resp.vat_rate,
        //     report_password: report_password,
        //     phone_number: resp.phone_number,
        //     cashier_subscription_expiry: resp.cashier_subscription_expiry,
        //     last_backup: d
        // }
        addAccountInfoIntoDb(resp, function (err, response) {
            if (err) {
                console.log(err)
                updateNotification(dispatch, "error", err.message);
            } else {
                getAccountInfoFromDb(function (err, response) {
                    var res = JSON.parse(response)
                    if (err) {
                        console.log(err)
                        updateNotification(dispatch, "error", err.message);
                    } else {
                        dispatch({
                            type: "SET_INITIAL_ACCOUNT_STATE",
                            payload: {
                                account: res[0]
                            }
                        })
                    }
                })
                dispatch({
                    type: "SET_VAT_RATE",
                    payload: {
                        vat_rate: resp.vat_rate
                    }
                })
                dispatch({
                    type: "SET_VAT_ACTIVE",
                    payload: {
                        vat_active: resp.vat_active
                    }
                })
                // DISPATCHER END -----------------------
                return callback("success", null);
            }
        })
    }).catch((err) => {
        // There is no account on the Cashier Server
        console.log(err)
        var errormsg = err.message
        if (err.message == "Network Error") {
            errormsg = errormsg + ". Please try again later."
        } else {
            errormsg = err.message
        }
        dispatch({
            type: "LOGIN_REJECTED",
            payload: {
                subscription_active: false,
            }
        })
        return callback("error", errormsg)
        // updateNotification(dispatch, "error", errormsg);
    });
}