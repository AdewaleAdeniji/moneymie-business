import * as Yup from 'yup';


export const validateUpdateCompanyInfo = Yup.object({
    reg_no: Yup.string().required("Registration Number is required"),
    country_of_operations: Yup.string().required("Company name is required"),
    company_address: Yup.string().required("Company Address is required"),
    ein: Yup.string().required("EIN is required"),
})
