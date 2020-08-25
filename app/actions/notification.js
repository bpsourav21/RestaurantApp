export function clearNotification() {
    return (dispatch) => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
    }
}
// .........................................
export function updateNotification(dispatch, notification_type, msg) {
    return dispatch({ type: "UPDATE_NOTIFICATION", payload: { notification: msg, notification_type: notification_type }})
}