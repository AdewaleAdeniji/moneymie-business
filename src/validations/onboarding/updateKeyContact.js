import * as Yup from 'yup';


export const validateUpdateKeyContact = Yup.object({
    full_name: Yup.string().required("Full Name is required"),
    phone_number: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Invalid email address").required("Registration Number is required"),
    country_of_citizenship: Yup.string().required("Country name is required"),

})
