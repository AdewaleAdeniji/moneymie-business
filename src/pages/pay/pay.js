import axios from "axios";

import config from '../../config';
export const PayBeneficiary = async (amount, beneficiary_id, company_id, reason, document) => {
    let token = JSON.parse(localStorage.getItem('user_meta'));
    console.log(token);
    token = token?.token ? token.token : ''
    const payload = {
        "data": [
            {
                "amount": amount,
                "beneficiary_id": beneficiary_id,
                "currency": "USD",
                "company_id": company_id,
                "reason": reason,
                "document": document
            }
        ]
    };
    const res = await axios.post(`${config.baseUrl}/payment/pay`, payload, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res;
}