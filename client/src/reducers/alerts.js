const intialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
}
//eslint-disable-next-line
export default (state = intialState, action) => {
    if (action.type === 'DISPLAY_ALERT') {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Please provide all values!',
        }
    }
    if (action.type === 'CLEAR_ALERT') {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '',
        }
    }
    if (action.type === 'SETUP_USER_BEGIN') {
        return { ...state, isLoading: true }
    }
    if (action.type === 'SETUP_USER_SUCCESS') {
        return {
            ...state,
            isLoading: true,
            showAlert: true,
            alertType: 'success',
            alertText: action.alertText,
        }
    }
    if (action.type === 'LOGIN_SUCCESS') {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: action.alertText,
        }
    }
    if (action.type === 'LOGIN_ERROR') {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.alertText,
        }
    }
    return state;
}
