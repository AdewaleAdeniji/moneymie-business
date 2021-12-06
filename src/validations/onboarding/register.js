import * as Yup from 'yup';


const passwordValidator = new RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
export const validateRegister = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email address is required"),
    password: Yup.string().required("Password is required").min(8, "Password is too short").matches(passwordValidator, "Password must contain one uppercase letter, one lowercase letter, a number and a symbol")
})


