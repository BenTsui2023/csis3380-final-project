import { Router } from 'express';
import { auth } from '../../config/passport.js';
import orderedMeals from '../../models/orderedMealsModel.js'; 
import User from '../../models/UsersModel.js'; 
const router = Router();

router.post('/', auth, (req, res) => { 
    const { type, name } = req.body; 
    if (!type || !name) { 
        return res.status(400).send({ err: 'Type and Name are required' }); 
    } 
    const newOrderedMeals = new orderedMeals({ 
        type: type, 
        name: name, 
        owner: req.user._id 
    }); 
    //Room for more code
    newOrderedMeals.save(function (err, savedOrderedMeals) { 
        if (err) return res.status(400).send({ err });

        User.findByIdAndUpdate(req.user._id, { $push: { orderedMeals: savedOrderedMeals._id } }, 
        function (err) { 
            return res.send(savedOrderedMeals); 
        }); 
    });  
});

export default router; 