import Realm from 'realm';
import Model from '../model/Model'
const uuidv4 = require('uuid/v4');
var date = new Date()
// ------------------------------------------------------------------
export function addAccountInfoIntoDb(account, callback) {
     console.log("accoun000000000000000000000000000000000000000")
    console.log(account)
    try {
        Model.write(() => {
            Model.create('Account', {
                //_id: uuidv4(),
                _id: "accountinfo_"+ account._id,
                shop_name: account.shop_name,
                address: account.address,
                vat_registration_number: account.vat_registration_number,
                vat_active: account.vat_active,
                backup_database: account.backup_database,
                vat_rate: account.vat_rate,
                report_password: "1", //account.report_password,
                phone_number: account.phone_number,
                cashier_subscription_expiry: account.cashier_subscription_expiry,
                last_backup: new Date(),
                created_at: new Date()
            });
        });
        var res = "new account added"
        callback(false, res);
    }
    catch (err) {
        callback(err, null);
    }
}
// ------------------------------------------------------------------
export function getAccountInfoFromDb(callback) {
    try {
        var res = JSON.stringify(Model.objects('Account'))
        callback(false, res)
    }
    catch (err) {
        callback(err, null)
    }
}
// ------------------------------------------------------------------
export function editAccountInfoInDb(new_account, callback) {
    DB.get('accountinfo').then(function (doc) {
        console.log(doc);
        new_account._id = doc._id;
        new_account._rev = doc._rev;
        console.log(new_account);
        DB.put(new_account).then(function (resp) {
            console.log(resp)
            DB.get('accountinfo').then(function (resp) {
                callback(false, resp)
            })
        }).catch(function (err) {
            console.log(err);
            callback(err, null)
        })
    }).catch(function (err) {
        console.log(err);
        callback(err, null)
    });
}