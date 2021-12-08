import axios from "axios";
import { GetUserToken } from "../../../utils/user";
import config from '../../../config'
const token = JSON.parse(localStorage.getItem('user_meta'))?.token ?? "";

export const beneficiaries = async (companyid) => {
    const res = await axios.get(`${config.baseUrl}/beneficiary/getByCompanyId/${companyid}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res;
}