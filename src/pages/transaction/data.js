import axios from "axios";

import config  from '../../config';
export const getUserTransactions =  async () => {
    var token = JSON.parse(localStorage.getItem('user_meta')); 
    token = token?.token ? token.token : ''
    const res = await axios.get(`${config.baseUrl}/user/transaction`,{
        headers: { Authorization: `Bearer ${token}` }
    })
    return res;
}