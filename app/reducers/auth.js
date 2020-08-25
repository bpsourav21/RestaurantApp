const accountInfo = {
    shop_name: "Super Star Restaurant",
    address: "44/A,47 Kazi Nazrul Islam Ave,Dhaka 1215",
    phone_number: "02-9125955",
    vat_registration_number: "4634645245245",
    vat_active: true
}
export default function reducer(state = {
    authenticating: false,
    authenticated: false,
    user: null,
    subscription_active: false,
    account: accountInfo //null
}, action) {
    switch (action.type) {
        // ------------------------------------------------------------------
        case "LOGIN": {
            return {
                ...state,
                authenticating: true
            }
        }
        // ------------------------------------------------------------------
        case "SET_LOGIN_ITEMS": {
            return {
                ...state,
                user: action.payload.user,
                subscription_active: true,
            }
        }
        // ------------------------------------------------------------------
        case "LOGIN_FULFILLED": {
            return {
                ...state,
                authenticating: false,
                authenticated: true
            }
        }
        // ------------------------------------------------------------------
        case "LOGIN_REJECTED": {
            return {
                ...state,
                authenticating: false,
                subscription_active: action.payload.subscription_active,
            }
        }
        // ------------------------------------------------------------------
        case 'SET_INITIAL_ACCOUNT_STATE': {
            return {
                ...state,
                account: action.payload.account
            }
        }
        // ------------------------------------------------------------------
        case 'SET_ACCOUNT_INFO': {
            return {
                ...state,
                account: action.payload.account
            }
        }
        // ------------------------------------------------------------------
        default:
            return state
    }
}