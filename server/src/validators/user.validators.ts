import { body } from "express-validator";

const createUserValidator = [
    body("name")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long"),
    body("email")
        .isEmail()
        .withMessage("Invalid email"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])[0-9a-zA-Z@$!%*#?&]{6,}$/)
        .withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
]

const loginUserValidator = [
    body('email')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .notEmpty()
        .withMessage("Password is required"),
]

export {
    createUserValidator,
    loginUserValidator
}