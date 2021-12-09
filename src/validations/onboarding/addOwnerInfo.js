import * as Yup from 'yup';


export const validateAddOwner = Yup.object({
    name: Yup.string().required("Name is required"),
    phone_number: Yup.string().required("Phone Number is required"),
    address: Yup.string().required("Address is required")
})
