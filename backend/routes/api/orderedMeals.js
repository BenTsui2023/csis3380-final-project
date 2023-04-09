import { Router } from 'express';
import { auth } from '../../config/passport.js';
import orderedMeals from '../../models/orderedMealsModel.js'; 
import User from '../../models/UsersModel.js'; 
const router = Router();

router.get('/', async (req, res) => { 
    const { username } = req.query;
    const user = await User.findOne({ username: username }).exec();
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    console.log(user.orderedMeals)
    return res.status(200).json(user.orderedMeals);
 });  



// router.post('/add', async (req, res) => {
//     const { mealName, quantity, username, mealId } = req.body;

//     try {
//         const orderedMeal = new orderedMeals({
//         mealName: mealName,
//         quantity: quantity,
//         mealId: mealId
//     });
  
//     const user = await User.findOne({ username: username }).exec();

//     if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//     }
    
//     if (!user.orderedMeals) {
//         user.orderedMeals = [];
//     }

//     user.orderedMeals.push(orderedMeal);
//     await user.save();

//     res.json({ message: 'Ordered meal added successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

router.post('/add',auth,  (req, res) => {
    const { mealName, quantity, mealId } = req.body;

    try {
        const orderedMeal = new orderedMeals({
            mealName: mealName,
            quantity: quantity,
            mealId: mealId
        });

        const updatedUser =  User.findByIdAndUpdate(
            { _id: req.user._id },
            { $push: { orderedMeals: orderedMeal } },
            { new: true }
        ).exec();

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'Ordered meal added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router; 