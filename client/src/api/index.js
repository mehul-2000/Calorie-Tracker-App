import axios from 'axios'


// const API = axios.create({ baseURL: 'http://localhost:5000' })
//to avoid cors policy error
const API = axios.create({ withCredentials: true })
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile'))
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    return req;
})


//api call for displaying list of meals (returning meals in database for rach user)
export const fetchMeals = () => API.get('/meal')
//api call for creating a meal

export const createMeal = (newPost) => {
    const payLoad = {
        name: newPost.name,
        calories: newPost.calories,
        date: newPost.date,
        createdBy: newPost.user_id,
    }
    const res = API.post('/meal', payLoad)
    return res;
}

export const updateMeal = (id, updatedMeal) => API.patch(`/meal/${id}`, updatedMeal)
export const deleteMeal = (id) => API.delete(`/meal/${id}`)



//For User API calls
export const signIn = (formData) => API.post('/user/signIn', formData)
export const signUp = (formData) => API.post('/user/signUp', formData)