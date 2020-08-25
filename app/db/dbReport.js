import Realm from 'realm';
import Model from '../model/Model'
const uuidv4 = require('uuid/v4');
var date = new Date()
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
// .........................................
export function setDailyReport_DB(dailyReport, callback) {
    try {
        Model.write(() => {
            Model.create('DailyReport', {
                _id: dailyReport._id,
                invoice_no: dailyReport.invoice_no,
                sale_id: dailyReport.sale_id,
                sub_total: dailyReport.sub_total,
                tax: dailyReport.tax,
                discount: dailyReport.discount,
                total_price: dailyReport.total_price,
                day: days[date.getDay()],
                created_at: new Date()
            });

        });
        var res = "daily report added"
        callback(false, res);

    }
    catch (err) {
        callback(err, null);
    }

}
// .........................................
export function getAllDailyReport_DB(callback) {
    try {
        var res = JSON.stringify(Model.objects('DailyReport'))
        callback(false, res)
    }
    catch (err) {
        callback(err, null)
    }
}
// .........................................
export function setMonthlyReport_DB(monthlyReport, callback) {
    try {
        Model.write(() => {
            Model.create('MonthlyReport', {
                _id: monthlyReport._id,
                daily_report: monthlyReport.daily_report,
                daily_total: monthlyReport.daily_total,
                month: months[date.getMonth()],
                created_at: new Date()
            });
        });
        var res = "monthly report added"
        callback(false, res);
    }
    catch (err) {
        callback(err, null);
    }

}
// .........................................
export function getAllMonthlyReport_DB(callback) {
    try {
        var res = JSON.stringify(Model.objects('MonthlyReport'))
        callback(false, res)
    }
    catch (err) {
        callback(err, null)
    }
}
// .........................................
export function setYearlyReport_DB(yearlyReport, callback) {
    try {
        Model.write(() => {
            Model.create('YearlyReport', {
                _id: yearlyReport._id,
                monthly_report: yearlyReport.monthly_report,
                monthly_total: yearlyReport.monthly_total,
                year: date.getFullYear(),
                created_at: new Date()
            });
        });
        var res = "yearly report added"
        callback(false, res);
    }
    catch (err) {
        callback(err, null);
    }

}
// .........................................
export function getAllYearlyReport_DB(callback) {
    try {
        var res = JSON.stringify(Model.objects('YearlyReport'))
        callback(false, res)
    }
    catch (err) {
        callback(err, null)
    }
}