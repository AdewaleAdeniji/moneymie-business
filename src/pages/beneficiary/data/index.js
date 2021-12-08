import axios from "axios";
import { GetUserToken } from "../../../utils/user";
import config  from '../../../config'
export const beneficiaries =  async (companyid) => {
    var token = JSON.parse(localStorage.getItem('user_meta')); 
    token = token?.token ? token.token : ''
    const res = await axios.get(`${config.baseUrl}/beneficiary/getByCompanyId/${companyid}`,{
        headers: { Authorization: `Bearer ${token}` }
    })
    return res;
}
export const addBen = async (payload) => {
    var token = JSON.parse(localStorage.getItem('user_meta')); 
    token = token?.token ? token.token : ''
    const res = await axios.post(`${config.baseUrl}/user/beneficiary/add`, payload,{
        headers: { Authorization: `Bearer ${token}` }
    })
    return res;
}