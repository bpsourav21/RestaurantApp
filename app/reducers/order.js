export default function reducer(state = {
    order: [],
    hold_sale_order: [],
    processed_sale_order: [],
    tableName: null,
    amount: 0.00
}, action) {
    switch (action.type) {
        // ------------------------------------------------------------------
        case "ADD_ITEM_TO_ORDER": {
            var neworder = state.order;
            var exists = false;
            var existsIndex = 0;
            for (var i = 0; i < neworder.length; i++) {
                if (neworder[i].name == action.payload.item.name) {
                    exists = true;
                    existsIndex = i;
                }
            }
            if (exists) {
                neworder[existsIndex].quantity++
                // neworder[existsIndex].total_price = neworder[existsIndex].price * neworder[existsIndex].quantity
            }
            else {
                var itemObj = action.payload.item
                itemObj["quantity"] = 1
                neworder.push(itemObj)
            }
            return {
                ...state,
                order: neworder,
            }
        }
        case "UPDATE_QUANTITY_TO_ORDER": {
            var neworder = state.order;
            for (var i = 0; i < neworder.length; i++) {
                if (neworder[i].name == action.payload.item.name) {
                    neworder[i].quantity = action.payload.newqty
                    neworder[i].total_price = neworder[i].price * neworder[i].quantity
                }
            }
            return {
                ...state,
                order: neworder,
            }

        }
        // ------------------------------------------------------------------
        case "REMOVE_ITEM_FROM_ORDER": {
            var order_copy = state.order
            order_copy.splice(action.payload.index, 1);
            return {
                ...state,
                order: order_copy
            }
        }
        // ------------------------------------------------------------------
        case "AMOUNT_PAID": {
            return {
                ...state,
                amount: action.payload.amount
            }
        }
        // ------------------------------------------------------------------
        case "HOLD_SALE_ORDER": {
            return {
                ...state,
                hold_sale_order: action.payload.hold_sale_order
            }
        }
        // ------------------------------------------------------------------
        case "PROCESSED_SALE_ORDER": {
            return {
                ...state,
                processed_sale_order: action.payload.processed_sale_order
            }
        }
        // ------------------------------------------------------------------
        case "CLEAR_ALL_ORDER": {
            return {
                ...state,
                order: [],
               // hold_sale_order: [],
                processed_sale_order: [],
                tableName: null,
                amount: 0.00
            }
        }
        // ------------------------------------------------------------------
        case "SELECT_TABLE_NAME": {
            return {
                ...state,
                tableName: action.payload.tableName

            }
        }
        // ------------------------------------------------------------------
        default:
            return state;
    }
}
