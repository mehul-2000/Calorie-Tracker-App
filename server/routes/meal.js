import express from 'express';
//getting controllers from controller
import { getMeals, createMeal, updateMeal, deleteMeal } from '../controllers/meal.js'
import auth from '../middleware/auth.js'
const router = express.Router();

router.get('/', getMeals);
router.post('/', auth, createMeal);
router.patch('/:id', auth, updateMeal)
router.delete('/:id', auth, deleteMeal)
export default router