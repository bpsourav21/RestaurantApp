export default function reducer(state = {
    notification: null,
    notification_type: null
}, action) {
    switch (action.type){
        // ------------------------------------------------------------------
        case "UPDATE_NOTIFICATION": {
            console.log(action.payload)
            return {
                ...state,
                notification: action.payload.notification,
                notification_type: action.payload.notification_type
            }
        }
        // ------------------------------------------------------------------
        case "CLEAR_NOTIFICATION": {
            return {
                ...state,
                notification: null,
                notification_type: "notification"
            }
        }
        default:
            return state;
    }
}