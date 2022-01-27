import React, { useState, useEffect } from 'react'
import { FormRow, Alert } from './index'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { useDispatch, useSelector } from 'react-redux'
import { createMeal, updateMeal, getMeals } from '../actions/meal'
import { displayEntrySuccess, displayUpdateSuccess, invalidInput } from '../actions/alert'
const DashboardForm = ({ currentId, setCurrentId, setList }) => {
    const [meal, setMeal] = useState({
        name: '',
        calories: '',
        date: '',
        user_id: ''
    })
    const mealData = useSelector((state) => currentId ? state.meals.find(p => p._id === currentId) : null)

    const alert = useSelector((state) => state.alerts)
    const mealList = useSelector((state) => state.meals)
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))

    //handling the update in form
    useEffect(() => {
        if (mealData) {
            let date = new Date(mealData.date);
            let d = moment(date).format('yyyy-MM-DD');
            mealData.date = d;
            setMeal(mealData);
        }
    }, [currentId]);


    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(meal)
        if (meal.name === "" || meal.calories === "" || meal.date === "") {
            dispatch(invalidInput());
        }
        else {
            if (currentId) {
                //for updating already existing meal
                dispatch(updateMeal(currentId, meal))
                dispatch(displayUpdateSuccess())

            }
            else {
                //for inserting new meal
                meal.user_id = user.result._id;
                dispatch(createMeal(meal))
                //same time i am calling getMeals so that my state gets updated
                // dispatch(getMeals())
                dispatch(displayEntrySuccess())
            }
            setList(mealList)
            clearValues()
        }
    }

    const clearValues = () => {
        setCurrentId(null)
        setMeal({
            name: '',
            calories: '',
            date: '',
            user_id: ''
        })
    }
    return (
        <Wrapper>
            <form className='form' autoComplete='off' onSubmit={handleSubmit}>
                {alert.showAlert && <Alert />}
                <h3>{currentId ? 'Edit the form to update that meal' : 'Add'} Diet</h3>
                <div className='form-center'>
                    {/* Food Name */}
                    <FormRow
                        type='text'
                        name='mealName'
                        value={meal.name}
                        handleChange={(e) => setMeal({ ...meal, name: e.target.value })}
                    />

                    {/* Calorie */}
                    <FormRow
                        type='text'
                        name='calorie'
                        value={meal.calories}
                        handleChange={(e) => setMeal({ ...meal, calories: e.target.value })}
                    />
                    {/* Date */}
                    <FormRow
                        type='date'
                        labelText='Date of adding Meal'
                        name='date'
                        value={meal.date}
                        handleChange={(e) => setMeal({ ...meal, date: e.target.value })}
                    />
                    {/* <div className='form-row'>
                        <label htmlFor={meal.date} className='form-label'>
                            Date of adding Meal
                        </label>
                        <DatePicker
                            className="form-input"
                            maxDate={new Date()}
                            name="date"
                            value={meal.date}
                            onChange={(e) => setMeal({ ...meal, date: e.target.value })}
                        />
                    </div> */}
                    {/* btn container */}
                    <div className='btn-container'>
                        <button
                            type='submit'
                            className='btn btn-block submit-btn'
                            onClick={handleSubmit}
                        >
                            submit
                        </button>
                        <button
                            className='btn btn-block clear-btn'
                            onClick={(e) => {
                                e.preventDefault()
                                clearValues()
                            }}
                        >
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}

export default DashboardForm
