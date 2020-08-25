// ------------------------------------------------------------------
export function goBack() {
    return (dispatch) => {
        dispatch({
            type: "GO_BACK"
        })
    }
}
// ------------------------------------------------------------------
export function resetToHome() {
    return (dispatch) => {
        dispatch({
            type: "CLEAR_ALL_ORDER"
        })
        dispatch({
            type: "RESET_TO_HOME"
        })

    }
}
