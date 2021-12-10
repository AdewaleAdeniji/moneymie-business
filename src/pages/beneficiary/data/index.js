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
export const deleteBen =  async (beneficiary_id) => {
    var token = JSON.parse(localStorage.getItem('user_meta')); 
    token = token?.token ? token.token : ''
    const res = await axios.delete(`${config.baseUrl}/beneficiary/company/${beneficiary_id}`,{
        headers: { Authorization: `Bearer ${token}` }
    })
    return res;
}
export const updateBen = async (payload) => {
    var token = JSON.parse(localStorage.getItem('user_meta')); 
    token = token?.token ? token.token : ''
    const res = await axios.post(`${config.baseUrl}/beneficiary/company/${payload.id}`, payload,{
        headers: { Authorization: `Bearer ${token}` }
    })
    return res;
}