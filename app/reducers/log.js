export default function reducer(state = {
    log: null
}, action) {
    switch (action.type){
        // ------------------------------------------------------------------
        case "UPDATE_LOG": {
            var tmp = state.log;
            if (tmp == null) {
                tmp = action.payload.log;
            } else {
                tmp = tmp + "\n"+ action.payload.log
            }
            return {
                ...state,
                log: tmp
            }
        }        
        // ------------------------------------------------------------------
        default:
            return state;
    }
}