import * as api from '../api'

//action creator

export const getMeals = () => async (dispatch) => {

    try {
        const { data } = await api.fetchMeals()
        // console.log(data)
        dispatch({
            type: 'FETCH_MEAL',
            payload: data
        })
    } catch (e) {
        console.log(e)
    }


}

//action for creating a meal
export const createMeal = (meal) => async (dispatch) => {
    try {
        const data = await api.createMeal(meal)
        // console.log(data)
        dispatch({
            type: 'CREATE_MEAL',
            payload: meal
        })

    } catch (e) {
        console.log(e)
    }
}


//action for updating Meals
export const updateMeal = (id, meal) => async (dispatch) => {
    try {
        const { data } = await api.updateMeal(id, meal)
        dispatch({
            type: 'UPDATE_MEAL',
            payload: data
        })
    }
    catch (e) {
        console.log(e)
    }
}

export const deleteMeal = (id) => async (dispatch) => {
    try {
        await api.deleteMeal(id)
        dispatch({ type: 'DELETE', payload: id })
    } catch (e) {
        console.log(e)
    }
}