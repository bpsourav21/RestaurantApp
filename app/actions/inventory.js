import { printError, printResponse } from './logHelpers';
import { updateNotification } from './notification.js';
//importing DB_actions
import { setNewItem_DB, getAllItem_DB, setNewCategory_DB, getAllCategory_DB, setNewTag_DB, getAllTag_DB } from '../db/dbInventory'
const uuidv4 = require('uuid/v4');
var date = new Date()

//==========================Item==================================================
// .........................................
export function setNewItem(item) {
    return (dispatch) => {
        setNewItem_DB(item, (err, res) => {
            if (err) {
                printError(err)
            }
            else {
                // printResponse(res)
                dispatch({
                    type: "SET_NEW_ITEM",
                    payload: {
                        message: res
                    }
                })
                dispatch({ type: "NAVIGATE_TO", payload: { link: 'Main' } })
            }
        })
    }
}
// .........................................
export function getAllItem() {
    return (dispatch) => {
        getAllItem_DB((err, res) => {
            if (err) {
                printError(err)
            }
            else {
                // printResponse(res)
                var newarr = []
                var data = JSON.parse(res)
                for (var item = 0; item < Object.keys(data).length; item++) {
                    newarr.push(data[item])
                }
                dispatch({
                    type: "GET_ALL_ITEM",
                    payload: {
                        allItem: newarr
                    }
                })
            }
        })
    }
}
// .........................................
export function getSpecificItems(items) {
    console.log("get specif items called" + items)
    return (dispatch) => {
        dispatch({
            type: "SHOWING_SPECIFIC_ITEMS",
            payload: {
                showingItemsByCategory: items
            }
        })
    }
}
//==========================Category==================================================
// .........................................
export function setNewCategory(category) {
    return (dispatch) => {
        setNewCategory_DB(category, (err, res) => {
            if (err) {
                printError(err)
            }
            else {
                // printResponse(res)
                dispatch({
                    type: "SET_NEW_CATEGORY",
                    payload: {
                        message: res
                    }
                })
                dispatch({ type: "NAVIGATE_TO", payload: { link: 'Main' } })
            }
        })
    }
}
// .........................................
export function getAllCategory() {
    return (dispatch) => {
        getAllCategory_DB((err, res) => {
            if (err) {
                printError(err)
            }
            else {
                // printResponse(res)
                dispatch({
                    type: "GET_ALL_CATEGORY",
                    payload: {
                        allCategory: JSON.parse(res)
                    }
                })

            }
        })
    }
}
//==========================Tag================================================
// .........................................
export function setNewTag(tag) {
    return (dispatch) => {
        setNewTag_DB(tag, (err, res) => {
            if (err) {
                printError(err)
            }
            else {
                // printResponse(res)
                dispatch({
                    type: "SET_NEW_TAG",
                    payload: {
                        message: res
                    }
                })
                dispatch({ type: "NAVIGATE_TO", payload: { link: 'Main' } })
            }
        })
    }
}
// .........................................
export function getAllTag() {
    return (dispatch) => {
        getAllTag_DB((err, res) => {
            if (err) {
                printError(err)
            }
            else {
                // printResponse(res)
                dispatch({
                    type: "GET_ALL_TAG",
                    payload: {
                        allTag: JSON.parse(res)
                    }
                })
            }
        })
    }
}