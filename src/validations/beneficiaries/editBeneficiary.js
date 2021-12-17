import * as Yup from 'yup';


export const validateEditBeneficiary = Yup.object({
    contact_name: Yup.string().required("Contact Name is required"),
    address: Yup.string().required("Address is required"),
    payment_type: Yup.string().required("Payment Type is required"),
    account_number: Yup.string().required("Account Number is required"),
    further_credit: Yup.string().required("Further Credit is required"),
    further_credit_address: Yup.string().required("Further Credit Address is required"),
    swift_code: Yup.string().required("SWIFT code is required"),
    bank_name: Yup.string().required("Bank Name is required"),
    phone_number: Yup.string().required("Phone Number is required"),
    bank_country: Yup.string().required("Bank Country is required"),
})
