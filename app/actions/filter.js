// ------------------------------------------------------------------
export function selectCategory(category) {
    return (dispatch) => {
        dispatch({
            type: "SELECTED_CATEGORY",
            payload: {
                selectedCategory: category
            }
        })
    }
}
// ------------------------------------------------------------------
export function showingItems(items) {
    return (dispatch) => {
        dispatch({
            type: "SELECTED_CATEGORY",
            payload: {
                showingItems: items
            }
        })
    }
}