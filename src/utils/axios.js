import axios from 'axios';

import config from '../config'
import { getToken } from '../redux/user';


const client = axios.create({ baseURL: config.baseURL })


export const request = async ({ ...options }) => {
    const token = getToken()
    if (token !== null) {
        client.defaults.headers.common.Authorization = token
    }

    const onSuccess = response => response
    const onError = error => {
        //catch errors or add additional logging
        return error
    }
    return await client(options).then(onSuccess).catch(onError)
}