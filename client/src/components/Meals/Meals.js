
import { useEffect } from 'react'

import Meal from './Meal'
//fetching from global store
//using selector to fetch all the meals as updated in the store
import { useSelector, useDispatch } from 'react-redux'
import Wrapper from '../../assets/wrappers/MealsContainer'
import { getMeals } from '../../actions/meal'

const Meals = ({ setCurrentId, currentId }) => {

  const oldMeals = useSelector((state) => state.meals)
  //for updating main list
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMeals())
  }, [oldMeals])

  const calculateCalories = (arr) => {
    const sum = arr.map(item => item.calories).reduce((prev, curr) => prev + curr, 0)
    if (sum <= 2000)
      return 'success'
    else
      return 'danger'
  }
  const meals = useSelector((state) => state.meals)
  const user = JSON.parse(localStorage.getItem('profile'))
  const currentUserMeals = meals.filter((meal) => meal.createdBy === user.result._id);
  if (meals.length === 0) {
    return (
      <Wrapper>
        <h2>No Meals to display...</h2>
      </Wrapper>
    )
  }
  const groups = currentUserMeals.reduce((groups, meal) => {
    const date = meal.date.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(meal);
    return groups;
  }, {});

  // Edit: to add it in the array format instead
  const groupArrays = Object.keys(groups).sort().map((date) => {
    return {
      date,
      mealItem: groups[date]
    };
  });

  const totalMeals = currentUserMeals.length

  let sign = ''
  return (
    !currentUserMeals.length ? <h2>No Meals to display...</h2> :
      <Wrapper>
        <h5>
          {totalMeals} meal{currentUserMeals.length > 1 && 's'} found
        </h5>

        <div className='meals-datewise'>
          {groupArrays.map(({ date, mealItem }) => {
            //eslint-disable-next-line
            { sign = calculateCalories(mealItem) }
            return (
              <div className='meals-list'>

                {date}
                {mealItem.map((meal) => {

                  return <Meal key={meal._id} meal={meal} color={sign} currentId={currentId} setCurrentId={setCurrentId} />

                })}
              </div>
            )

          })}
        </div>
      </Wrapper>
  )
}

export default Meals
