import Realm from 'realm';
import Model from '../model/Model'
const uuidv4 = require('uuid/v4');
var date = new Date()
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
// .........................................
export function setNewOrder_DB(order, callback) {
    try {
        Model.write(() => {
            Model.create('Sale', {
                _id: order._id,
                invoice_no: order.invoice_no,
                order: order.order,
                table: order.table,
                sub_total: order.sub_total,
                tax: order.tax,
                discount: order.discount,
                total_price: order.total_price,
                customer_name: order.customer_name,
                customer_phone: order.customer_phone,
                waiter: order.waiter,
                order_status: "approved",
                day: days[date.getDay()],
                month: months[date.getMonth()],
                year: date.getFullYear(),
                created_at: new Date()
            });
        });
        var res = "a new sale added"
        callback(false, res);
    }
    catch (err) {
        callback(err, null);
    }

}
// .........................................
export function getAllOrder_DB(callback) {
    try {
        var res = JSON.stringify(Model.objects('Sale'))
        callback(false, res)
    }
    catch (err) {
        callback(err, null)
    }
}