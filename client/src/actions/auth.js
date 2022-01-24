
import * as api from '../api'
import { displaySignInError } from './alert'

export const signIn = (formData, history) => async (dispatch) => {
    try {
        //signIn the user

        const { data } = await api.signIn(formData)

        if (!data) {
            window.alert('Invalid Credentials')
        }

        dispatch({
            type: 'USER_SIGNIN',
            data
        })
        history('/')
    }
    catch (error) {
        dispatch(displaySignInError())
        console.log(error)
    }
}

export const signUp = (formData, history) => async (dispatch) => {
    try {
        //signUp the user
        const { data } = await api.signUp(formData)
        dispatch({
            type: 'USER_SIGNIN',
            data
        })
        history('/')
    }
    catch (error) {
        console.log(error)
    }
}