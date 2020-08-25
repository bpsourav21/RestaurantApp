import * as Keychain from 'react-native-keychain';
import config from '../config.js';
import { logger } from './logger.js';
// import { updateNotification } from './notification.js';
// import { setInitialState } from './inventory.js';
// import { printError, printResponse } from './logHelpers'
// // DB
import { getUserFromServerDb } from '../db/dbFunctions';
// import { getAllProductsFromDb, getAllCategoriesFromDb, getAllUnitsFromDb } from '../db/dbInventory';
// import { getAllDuesFromDb } from '../db/dbOrder';
import { getAccountInfoFromDb, editAccountInfoInDb } from '../db/dbAccount';
import { getAllItem, getAllCategory, getAllTag } from './inventory'
// import { setNewItem_DB, getAllItem_DB, setNewCategory_DB, getAllCategory_DB, setNewTag_DB, getAllTag_DB } from '../db/dbInventory'
// import { syncDatabase } from "../db/dbsync"



import { printError, printResponse } from './logHelpers';
import { updateNotification } from './notification.js';
//importing DB_actions
// import { getAllDailyReport_DB, getAllMonthlyReport_DB, getAllYearlyReport_DB } from '../db/dbReport'
// .........................................
// if there is a phone number in the keychain, then the user is registered
export function login(phonenumber, pin) {
    return (dispatch) => {
        console.log("==========================================");
        console.log(phonenumber)
        console.log(pin)
        // dispatch({ type: "LOGIN_FULFILLED" })
        // dispatch({ type: 'LOGIN' });
        //  logger(dispatch, 'logging in'); 
        Keychain
            .getGenericPassword()
            .then(function (value) {
                console.log('login');
                console.log(value);
                console.log('getting phonenumber from keychain');
                logger(dispatch, 'getting phonenumber from keychain');
                if ((value == null) || (value == undefined) || (value == false)) {
                    logger(dispatch, 'no phonenumber found in keychain');
                    getUserFromServer(dispatch, phonenumber, pin)
                } else {
                    console.log('phone number found locally in keychain');
                    logger(dispatch, "phone number found locally in keychain")
                    var password = value.password
                    if (password == pin) {
                        logger(dispatch, 'pin correct');
                        console.log('pin correct');
                        return checkSubscription(dispatch, phonenumber)
                    } else {
                        logger(dispatch, 'pin incorrect');
                        console.log('pin incorrect');
                        dispatch({ type: 'LOGIN_REJECTED', payload: { subscription_active: false } });
                        return updateNotification(dispatch, "error", "You have entered an invalid password");
                    }
                }
            });
    }
}
// .........................................
// Talk to the Cashier server and get the user details
function getUserFromServer(dispatch, phonenumber, pin) {
    logger(dispatch, 'getting user from server');
    var url = config.SERVER_URL + "/_users/" + "org.couchdb.user:" + phonenumber;
    logger(dispatch, 'getting user from server ' + url);
    getUserFromServerDb(url, phonenumber, pin, dispatch, function (resp_type, resp) {
        if (resp_type == " error") {
            return updateNotification(dispatch, "error", resp);
        } else {
            console.log("phonenumber=========")
            console.log(phonenumber)
            return checkSubscription(dispatch, phonenumber);
        }
    })
}
// .........................................
export function setInitialStateOfInventory(dispatch) {
    getAccountInfoFromDb(function (err, response) {
        var res = JSON.parse(response)
        if (err) {
            console.log(err)
            updateNotification(dispatch, "error", err.message);
        } else {
            dispatch({
                type: "SET_ACCOUNT_INFO",
                payload: {
                    account: res[0]
                }
            })
            //return setInitialCategoryState(dispatch)
            // getAllItem(dispatch)
            // getAllCategory(dispatch)
            // getAllTag(dispatch)
        }
    })
    //     }
    // })
}
// // .........................................
// export function setInitialCategoryState(dispatch) {
//     getAllCategoriesFromDb(function (err, categories) {
//         if (err) {
//             printError(err)
//             updateNotification(dispatch, "error", err.message);
//         } else {
//             printResponse(categories)
//             dispatch({ type: "GET_ALL_CATEGORIES_FULFILLED", payload: { categories: categories } });
//             return setInitialUnitsState(dispatch)
//         }
//     })
// }
// // .........................................
// export function setInitialUnitsState(dispatch) {
//     getAllUnitsFromDb(function (err, unit) {
//         if (err) {
//             printError(err)
//             updateNotification(dispatch, "error", err.message);
//         } else {
//             printResponse(unit)
//             dispatch({ type: "GET_ALL_UNITS_FULFILLED", payload: { units: unit } });
//             return setInitialDuesState(dispatch)
//         }
//     })
// }
// // .........................................
// export function setInitialDuesState(dispatch) {
//     getAllDuesFromDb(function (err, dues) {
//         if (err) {
//             printError(err)
//             updateNotification(dispatch, "error", err.message);
//         } else {
//             printResponse(dues)
//             dispatch({ type: "GET_ALL_DUES_FULFILLED", payload: { dues: dues } });
//             Keychain
//                 .getGenericPassword()
//                 .then(function (credentials) {
//                     console.log('login');
//                     var obj = JSON.parse(credentials.username)
//                     var phoneNum = obj.phonenumber
//                     var pin = credentials.password
//                     // syncDatabase(value.p)
//                     getAccountInfoFromDb(function (err, acc) {
//                         if (err) {
//                             printError(err)
//                             updateNotification(dispatch, "error", err.message);
//                         } else {
//                             if (acc.backup_database) {
//                                 console.log("----CHECKING LAST BACKUP DATE----")
//                                 console.log(acc)
//                                 console.log("----------------------------------")
//                                 console.log("Account info updated with new backup date")
//                                 var d = new Date().toLocaleDateString();
//                                 if (acc.last_backup != d) {
//                                     syncDatabase(phoneNum, pin, function (err, resp) {
//                                         if (err) {
//                                             printError(err)
//                                             updateNotification(dispatch, "error", err.message);
//                                         } else {
//                                             return dispatch({ type: "LOGIN_FULFILLED" })
//                                         }
//                                     })
//                                 } else {
//                                     console.log("Account was backed up today, no need to backup again")
//                                     return dispatch({ type: "LOGIN_FULFILLED" })
//                                 }
//                             } else {
//                                 return dispatch({ type: "LOGIN_FULFILLED" })
//                             }

//                         }
//                     })
//                 })
//         }
//     })
// }
// .........................................
function checkSubscription(dispatch, phonenumber) {
    Keychain
        .getGenericPassword()
        .then(function (credentials) {
            console.log('checkSubscription');
            console.log(credentials);
            var valueStr = JSON.parse(credentials.username);
            var value = valueStr.cashier_subscription_expiry
            var todays_date = new Date();
            var expiry_date = new Date(value);
            var timeDiff = expiry_date.getTime() - todays_date.getTime();
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            if (diffDays < 0) {
                dispatch({ type: "LOGIN_REJECTED", payload: { subscription_active: false } });
                return updateNotification(dispatch, "expired", "Your subscription has expired. Please renew your subscription to continue.")
            } else {
                var notification = null;
                if (diffDays < 7) {
                    var day = "day";
                    if (diffDays > 1) day = "days";
                    notification = "You have " + diffDays + " " + day + " to back up your data to our server. Please back up or you will lose this month's data in " + diffDays + " " + day + ".";
                }
                setInitialStateOfInventory(dispatch)
                dispatch({ type: "SET_LOGIN_ITEMS", payload: { user: phonenumber, subscription_active: true } })

                return (updateNotification(dispatch, "notification", notification) && dispatch({ type: "LOGIN_FULFILLED" }))
            }
        })

}