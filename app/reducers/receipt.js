export default function reducer(state = {
    floating: true,
    item: [],
    table:[],
}, action) {
    switch (action.type){
        // ------------------------------------------------------------------
        case "RECEIPT_ADD_ITEM":{
            var newItem=state.item;
            newItem.push(action.payload.item)
            return {
                ...state,
                item:newItem,
            }
        }
        // ------------------------------------------------------------------
        case "RECEIPT_SET_TABLE":{
            return {
                ...state,
                // table:action.payload.table
            }
        }
        // ------------------------------------------------------------------
        case "RECEIPT_PAY_BILL": {
            return {
                ...state,
                // floating: false
            }
        }
        // ------------------------------------------------------------------
        default:
            return state;
    }
}
