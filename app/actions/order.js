import { printError, printResponse } from './logHelpers';
import { updateNotification } from './notification.js';
//importing DB_actions
import { setNewOrder_DB, getAllOrder_DB } from '../db/dbOrder'
import { setDailyReport_DB, setMonthlyReport_DB, setYearlyReport_DB } from '../db/dbReport'
const uuidv4 = require('uuid/v4');
var date = new Date()
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

// .........................................
export function selectTable(tableName) {
    return (dispatch) => {
        dispatch({
            type: "SELECT_TABLE_NAME",
            payload: {
                tableName: tableName
            }
        })

    }
}
// .........................................
export function paidAmount(amount) {
    return (dispatch) => {
        dispatch({
            type: "AMOUNT_PAID",
            payload: {
                amount: parseFloat(amount)
            }
        })

    }
}
// .........................................
export function holdSale(order) {
    var today = date.toString().split(" ")
    var getMonth = date.getMonth() + 1
    if (getMonth < 10) {
        var getMonthStr = "0" + getMonth.toString()
    }
    else {
        var getMonthStr = getMonth.toString()
    }
    var invoice_no = today[3] + getMonthStr + today[2] + uuidv4().split("-")[4].toUpperCase()
    order["invoice_no"] = invoice_no
    return (dispatch) => {
        dispatch({
            type: "HOLD_SALE_ORDER",
            payload: {
                hold_sale_order: order
            }
        })
    }
}
// .........................................
export function processedSale(order) {
    // var today = date.toString().split(" ")
    // var getMonth = date.getMonth() + 1
    // if (getMonth < 10) {
    //     var getMonthStr = "0" + getMonth.toString()
    // }
    // else {
    //     var getMonthStr = getMonth.toString()
    // }
    // var invoice_no = today[3] + getMonthStr + today[2] + uuidv4().split("-")[4].toUpperCase()
    // order["invoice_no"] = invoice_no
    console.log("----------precessed sale=============")
    console.log(order)
    return (dispatch) => {
        dispatch({
            type: "PROCESSED_SALE_ORDER",
            payload: {
                processed_sale_order: order
            }
        })
    }
}
// .........................................
export function setNewSaleOrder(order) {
    var invoice_no = order.invoice_no
    var today = date.toString().split(" ")
    // var sale_id = "sale-" +invoice_no+ "_" + today[3] + "_" + today[1] + "_" + today[2] + "_" + today[0] + "|" + today[4]
    var sale_id = "sale-" + invoice_no + "|" + today[4]
    order["_id"] = sale_id
    return (dispatch) => {
        setNewOrder_DB(order, (err, res) => {
            if (err) {
                printError(err)
            }
            else {
                // printResponse(res)
                //  processedSale(order)
                dispatch({
                    type: "PROCESSED_SALE_ORDER",
                    payload: {
                        processed_sale_order: order
                    }
                })
                dispatch({
                    type: "SET_NEW_SALE",
                    payload: {
                        message: res
                    }
                })
                var dailyReport = order
                dailyReport["_id"] = "dailysale-" + invoice_no
                dailyReport["sale_id"] = sale_id
                setDailyReport_DB(dailyReport, (err, res) => {
                    if (err) {
                        printError(err)
                    }
                    else {
                        var monthlyReport = []
                        monthlyReport["_id"] = "monthlysale-" + invoice_no
                        monthlyReport["daily_report"] = dailyReport
                        monthlyReport["daily_total"] = 111111111
                        // monthlyReport["created_at"] = new Date()
                        // printResponse(res)
                        setMonthlyReport_DB(monthlyReport, (err, res) => {
                            if (err) {
                                printError(err)
                            }
                            else {
                                // printResponse(res)
                                var yearlyReport = []
                                yearlyReport["_id"] = "yearlysale-" + invoice_no
                                yearlyReport["monthly_report"] = monthlyReport
                                yearlyReport["monthly_total"] = 2222222
                                setYearlyReport_DB(yearlyReport, (err, res) => {
                                    if (err) {
                                        printError(err)
                                    }
                                    else {
                                        // printResponse(res)
                                        dispatch({
                                            type: "ALL_REPORT_ADDED",
                                            payload: {
                                                message: res
                                            }
                                        })
                                        dispatch({ type: "NAVIGATE_TO", payload: { link: 'PrintingReceipt' } })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
}
// .........................................
export function getAllSaleOrder() {
    return (dispatch) => {
        getAllOrder_DB((err, res) => {
            if (err) {
                printError(err)
            }
            else {
                // printResponse(res)
                dispatch({
                    type: "GET_ALL_SALE",
                    payload: {
                        allOrder: JSON.parse(res)
                    }
                })
            }
        })
    }
}
// .........................................
export function removeItemFromOrder(index) {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_ITEM_FROM_ORDER",
            payload: {
                index: index
            }
        })
    }
}