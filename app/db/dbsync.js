import DB from './dbConfig';
import { editAccountInfoInDb, getAccountInfoFromDb } from './dbAccount';
import config from '../config';
var base64 = require('base-64');
//Requiring the package
import PouchDB from 'pouchdb-react-native';
//Creating local database object
// ------------------------------------------------------------------
export function syncDatabase(phoneNumber, pin, callback){
    //Creating remote database object
    var remoteDB = new PouchDB(config.SERVER_URL+'/'+'userdb'+phoneNumber, {
        skipSetup: true,
        ajax: {
            headers: {
                'Authorization': 'Basic ' + base64.encode(phoneNumber+":"+pin)
            }
        }
    });
    // ------------------------------------------------------------------
    //Synchronising both databases
    DB.replicate.to(remoteDB, {
        filter: function (doc) {
          return doc._id !== 'accountinfo';
        }
      }).on('complete', function(resp){
        console.log("Databases synchronized successfully");
        getAccountInfoFromDb(function(err, acc){
            if (err){
                printError(err)
            } else {
                var new_acc = acc;
                var d = new Date().toLocaleDateString();
                new_acc.last_backup = d;
                editAccountInfoInDb(new_acc, function(err, resp){
                    if (err){
                        printError(err)
                        updateNotification(dispatch, "error", err.message);
                    } else {
                        console.log("Account info updated with new backup date")
                        callback(false, resp)
                    }
                })    
            }
        })
    }).on('error', function(err){
        console.log(err);
        callback(err, null)
    });    
}
// ------------------------------------------------------------------
export function syncFromDatabase(phoneNumber, pin, callback){
    // Creating remote database object
    var remoteDB = new PouchDB(config.SERVER_URL+'/'+'userdb'+phoneNumber, {
        skipSetup: true,
        ajax: {
            headers: {
                'Authorization': 'Basic ' + base64.encode(phoneNumber+":"+pin)
            }
        }
    });
    //Synchronising both databases
    DB.replicate.from(remoteDB).on('complete', function(resp){
        console.log("Databases synchronized successfully");
        callback(false, resp)
    }).catch(function(err){
        console.log(err);
        callback(err, null)
    });
    
}