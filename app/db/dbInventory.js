import Realm from 'realm';
import Model from '../model/Model'
const uuidv4 = require('uuid/v4');
var date = new Date()

//==========================Item==================================================
// .........................................
export function setNewItem_DB(item, callback) {
    try {
        Model.write(() => {
            Model.create('Item', {
                _id: uuidv4(),
                name: item.name,
                price: item.price,
                category: item.category,
                sub_category: item.sub_category,
                barcode: item.barcode,
                img_url: item.img_url,
                discount: item.discount,
                tag: item.tag,
                // quantity: 1,
                // total_price:item.price,
                created_at: new Date()
            });
        });
        var res = "new item added"
        callback(false, res);
    }
    catch (err) {
        callback(err, null);
    }
}
// .........................................
export function getAllItem_DB(callback) {
    try {
        var res = JSON.stringify(Model.objects('Item'))
        callback(false, res)
    }
    catch (err) {
        callback(err, null)
    }
}
//==========================Category==================================================
// .........................................
export function setNewCategory_DB(category, callback) {
    try {
        Model.write(() => {
            Model.create('Category', {
                _id: uuidv4(),
                name: category.name,
                // price: category.price,
                created_at: new Date()
            });
        });
        var res = "new category added"
        callback(false, res);
    }
    catch (err) {
        callback(err, null);
    }

}
// .........................................
export function getAllCategory_DB(callback) {
    try {
        var res = JSON.stringify(Model.objects('Category'))
        callback(false, res)
    }
    catch (err) {
        callback(err, null)
    }
}
//==========================Tag================================================
// .........................................
export function setNewTag_DB(tag, callback) {
    try {
        Model.write(() => {
            Model.create('Tag', {
                _id: uuidv4(),
                name: tag.name,
                // price: tag.price,
                created_at: new Date()
            });
        });
        var res = "new tag added"
        callback(false, res);
    }
    catch (err) {
        callback(err, null);
    }
}
// .........................................
export function getAllTag_DB(callback) {
    try {
        var res = JSON.stringify(Model.objects('Tag'))
        callback(false, res)
    }
    catch (err) {
        callback(err, null)
    }
}