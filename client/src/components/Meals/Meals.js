
import Meal from './Meal'
//fetching from global store
//using selector to fetch all the meals as updated in the store
import { useSelector } from 'react-redux'
import Wrapper from '../../assets/wrappers/MealsContainer'


const Meals = ({ setCurrentId, currentId, setList }) => {

  const calculateCalories = (arr) => {
    const sum = arr.map(item => item.calories).reduce((prev, curr) => prev + curr, 0)
    if (sum <= 2000)
      return 'success'
    else
      return 'danger'
  }
  const meals = useSelector((state) => state.meals)
  const user = JSON.parse(localStorage.getItem('profile'))
  let currentUserMeals = meals.filter((meal) => meal.createdBy === user.result._id);


  const groups = currentUserMeals.reduce((groups, meal) => {
    // const currDate = new Date(meal.date).toISOString()
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
              <div>

                <h3>{date}</h3>
                <div className='meals-list'>
                  {mealItem.map((meal) => {

                    return <Meal key={meal._id} meal={meal} color={sign} date={date} setList={setList} setCurrentId={setCurrentId} />

                  })}
                </div>
              </div>
            )

          })}
        </div>
      </Wrapper>
  )
}

export default Meals
