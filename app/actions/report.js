import { printError, printResponse } from './logHelpers';
import { updateNotification } from './notification.js';
//importing DB_actions
import { getAllDailyReport_DB, getAllMonthlyReport_DB, getAllYearlyReport_DB } from '../db/dbReport'
// .........................................
export function getAllDailyReport() {
    return (dispatch) => {
        getAllDailyReport_DB((err, res) => {
            if (err) {
                printError(err)
            }
            else {
                // printResponse(res)
                dispatch({
                    type: "GET_ALL_DAILY_REPORT",
                    payload: {
                        dailyReport: JSON.parse(res)
                    }
                })
            }
        })
    }
}
// .........................................
export function getAllMonthlyReport() {
    return (dispatch) => {
        getAllMonthlyReport_DB((err, res) => {
            if (err) {
                printError(err)
            }
            else {
                // printResponse(res)
                dispatch({
                    type: "GET_ALL_MONTHLY_REPORT",
                    payload: {
                        monthlyReport: JSON.parse(res)
                    }
                })
            }
        })
    }
}
// .........................................
export function getAllYearlyReport() {
    return (dispatch) => {
        getAllYearlyReport_DB((err, res) => {
            if (err) {
                printError(err)
            }
            else {
                // printResponse(res)
                dispatch({
                    type: "GET_ALL_YEARLY_REPORT",
                    payload: {
                        yearlyReport: JSON.parse(res)
                    }
                })
            }
        })
    }
}