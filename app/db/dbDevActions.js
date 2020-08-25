import DB from './dbConfig';
export function clearDB(callback) {
    DB.destroy().then(function (doc) {
        console.log(resp);
        callback(false, resp)
    }).catch(function (err) {
        console.log(err);
        callback(err, null)
    });
}