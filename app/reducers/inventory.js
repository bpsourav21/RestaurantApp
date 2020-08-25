const cardImage = require('../assets/coffee.jpg');
const cardImage1 = require('../assets/coffee1.jpg');
const cardImage2 = require('../assets/burger.jpg');
const cardImage3 = require('../assets/burger2.jpg');
const cardImage4 = require('../assets/pizza1.jpg');
const cardImage5 = require('../assets/pizza2.jpg');
const cardImage6 = require('../assets/pizza3.jpg');
const cardImage7 = require('../assets/juice1.jpg');

const cardItem = [
    { name: "Cappuccino", price: 120, quantity: 1, img_src: cardImage, total_price: 120 },
    { name: 'Americano', price: 220, quantity: 1, img_src: cardImage, total_price: 220 },
    { name: 'B.C.Burger', price: 320, quantity: 1, img_src: cardImage1, total_price: 320 },
    { name: "Kacchi Biriyani", price: 140, quantity: 1, img_src: cardImage2, total_price: 140 },
    { name: "Borhani", price: 100, quantity: 1, img_src: cardImage3, total_price: 100 },
    { name: "2Cappuccino", price: 120, quantity: 1, img_src: cardImage, total_price: 120 },
    { name: 'Americano', price: 220, quantity: 1, img_src: cardImage, total_price: 220 },
    { name: 'B.C.Burger', price: 320, quantity: 1, img_src: cardImage1, total_price: 320 },
    { name: "Kacchi Biriyani", price: 140, quantity: 1, img_src: cardImage2, total_price: 140 },
    { name: "Borhani", price: 100, quantity: 1, img_src: cardImage3, total_price: 100 },
    { name: "3Cappuccino", price: 120, quantity: 1, img_src: cardImage, total_price: 120 },
    { name: 'Americano', price: 220, quantity: 1, img_src: cardImage, total_price: 220 },
    { name: 'B.C.Burger', price: 320, quantity: 1, img_src: cardImage1, total_price: 320 },
    { name: "Kacchi Biriyani", price: 140, quantity: 1, img_src: cardImage2, total_price: 140 },
    { name: "Borhani", price: 100, quantity: 1, img_src: cardImage3, total_price: 100 },
    { name: "4Cappuccino", price: 120, quantity: 1, img_src: cardImage, total_price: 120 },
    { name: 'Americano', price: 220, quantity: 1, img_src: cardImage, total_price: 220 },
    // { name: 'B.C.Burger', price: 320, quantity: 1, img_src: cardImage1, total_price: 320 },
    // { name: "Kacchi Biriyani", price: 140, quantity: 1, img_src: cardImage2, total_price: 140 },
    // { name: "Borhani", price: 100, quantity: 1, img_src: cardImage3, total_price: 100 }

]

export default function reducer(state = {
    allItem: [],
    allCategory: [],
    allTag: [],
    showingItems: cardItem
}, action) {
    switch (action.type) {
        // ------------------------------------------------------------------
        case "GET_ALL_ITEM": {
            return {
                ...state,
                allItem: action.payload.allItem
            }
        }
        // ------------------------------------------------------------------
        case "GET_ALL_CATEGORY": {
            return {
                ...state,
                allCategory: action.payload.allCategory
            }
        }
        // ------------------------------------------------------------------
        case "GET_ALL_TAG": {
            return {
                ...state,
                allTag: action.payload.allTag
            }
        }
        // ------------------------------------------------------------------
        case "SHOWING_SPECIFIC_ITEMS": {
            // var newarr = []
            // var category = action.payload.showingItemsByCategory
            // var items = state.allItem
            // for (var i = 0; i < items.length; i++) {
            //     if (item[i].category == category) {
            //         newarr.push(item[i])
            //     }
            // }
              var newarr = [
                { name: "Cappuccino", price: 120, quantity: 1, img_src: cardImage, total_price: 120 },
                { name: 'Americano', price: 220, quantity: 1, img_src: cardImage, total_price: 220 },
                { name: 'B.C.Burger', price: 320, quantity: 1, img_src: cardImage1, total_price: 320 },
                { name: "Kacchi Biriyani", price: 140, quantity: 1, img_src: cardImage2, total_price: 140 },]
            return {
                ...state,
            //    showingItems: newarr
            }
        }
        // ------------------------------------------------------------------
        default:
            return state;
    }
}

