
export const displayAlert = () => (dispatch) => {
    dispatch({ type: 'DISPLAY_ALERT' })
    dispatch(clearAlert())
}

export const clearAlert = () => (dispatch) => {
    setTimeout(() => {
        dispatch({ type: 'CLEAR_ALERT' })
    }, 3000)
}

export const showUserSignUpSuccess = () => async (dispatch) => {

    dispatch({ type: 'SETUP_USER_SUCCESS', alertText: 'Verfying Details...' })

}

export const displaySignInSuccess = () => (dispatch) => {
    dispatch({ type: 'LOGIN_SUCCESS', alertText: 'Verfying Details...' })
    setTimeout(() => {
        dispatch({ type: 'CLEAR_ALERT' })
    }, 1000)
}
export const displaySignInError = () => async (dispatch) => {
    dispatch({ type: 'LOGIN_ERROR', alertText: 'Invalid Credentials' })
    dispatch(clearAlert())
}
export const displayEntrySuccess = () => (dispatch) => {
    dispatch({ type: 'LOGIN_SUCCESS', alertText: 'Data entered Successfully' })
    dispatch(clearAlert())
}

export const displayUpdateSuccess = () => (dispatch) => {
    dispatch({ type: 'LOGIN_SUCCESS', alertText: 'Data updated Successfully.' })
    dispatch(clearAlert())
}


