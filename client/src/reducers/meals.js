const intialState = {
    meals: [],
    mealData: {
        name: '',
        calories: '',
        date: '',
        createdBy: '',
    }
}


//eslint-disable-next-line
export default (meals = [], action) => {
    switch (action.type) {
        case 'FETCH_MEAL':
            return action.payload;
        case 'CREATE_MEAL':
            return [...meals, action.payload];
        case 'UPDATE_MEAL':
            return meals.map(meal => meal._id === action.payload._id ? action.payload : meal)
        case 'DELETE':
            return meals.filter(meal => meal._id !== action.payload)
        default:
            return meals;
    }
}