export function logger(dispatch, msg) {
    return dispatch({ type: 'UPDATE_LOG', payload: { log: msg }});
}