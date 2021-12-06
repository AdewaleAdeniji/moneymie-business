import * as Yup from 'yup';


export const validateAddCompanyInfo = Yup.object({
    registrant_name: Yup.string().required("Full Name is required"),
    company_name: Yup.string().required("Company name is required"),
    line_of_business: Yup.string().required("Line of business is required"),
    phone_number: Yup.string().required("Phone Number is required"),
    company_website: Yup.string().notRequired()
})
