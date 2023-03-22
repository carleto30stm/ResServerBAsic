import { Router } from "express";
import { check } from "express-validator";

import {validateRole,
        validateEmail,
        validateUserId} from "../helpers/validateCustom.js";
import { register,
         update,
         getUsers,
         deleteUser
         } from "../controllers/userController.js";

import { checkForm } from "../middleware/checkForm.js";


const router = Router();


router.post('/',[
    check('email','the email is not a valid format').isEmail(),
    check('email').custom(validateEmail),
    check('password','Password must contain a minimun of 6 characters').isLength({min:6}),
    check('role').custom(validateRole),
    checkForm
],
register);
router.put('/:_id',[
    check('_id','Id is not mongoId').isMongoId(),
    check('_id').custom(validateUserId),
    checkForm
], update);
router.get('/',getUsers);

router.delete('/:_id',[
    check('_id','Id is not mongoId').isMongoId(),
    check('_id').custom(validateUserId),
    checkForm
],deleteUser)

export default router;