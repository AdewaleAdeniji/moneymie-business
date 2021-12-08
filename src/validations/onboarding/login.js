import * as Yup from 'yup';
import { passwordValidator } from '../validators';


export const validateLogin = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email address is required"),
    // password: Yup.string().required("Password is required").min(8, "Password is too short").matches(passwordValidator, "Password must contain one uppercase letter, one lowercase letter, a number and a symbol")
})


