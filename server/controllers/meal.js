import Meal from '../models/Meal.js'
import mongoose from 'mongoose'

//for displaying list of meals
export const getMeals = async (req, res) => {
    try {

        const postMeals = await Meal.find()
        //to display whether meals are coming from database or not
        res.status(200).json(postMeals)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

//for creating new mwal component
export const createMeal = async (req, res) => {
    const { name, calories, date } = req.body
    if (!name || !calories) {
        throw new Error('Please provide all values')
    }
    // req.body.createdBy = req.user.email
    const meal = new Meal(req.body)
    try {
        await meal.save()
        res.status(201).json(meal)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

}

export const updateMeal = async (req, res) => {
    const { id: _id } = req.params
    const meal = req.body
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No Meal data with id.')

    const updatedMeal = await Meal.findByIdAndUpdate(_id, meal, { new: true })
    res.json(updatedMeal)


}

export const deleteMeal = async (req, res) => {
    const { id: _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No Meal data with id.')

    const deletedMeal = await Meal.findByIdAndDelete(_id, { new: true })
    res.json({ msg: 'Post deleted Successfully' })
}