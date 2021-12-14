import axios from 'axios';

import config from '../config'
import { getToken } from '../redux/user';


const client = axios.create({ baseURL: config.baseUrl })



export const request = async ({ ...options }) => {
    const token = getToken()
    if (token !== null) {
        client.defaults.headers.common.Authorization = `Bearer ${token}`
    }

    const onSuccess = response => {
        return response
    }
    const onError = error => {
        //catch errors or add additional logging
        throw new Error(error.response.data.message)
    }
    return await client(options).then(onSuccess).catch(onError)
}


export const fetcher = (url) => {
    return request({ url: url })
}






// export const useSuperheroes = (onSuccess, onError) => {
//     return useQuery('super-heroes', fetcher,
//         {
//             // enabled: false //dont fire request immediately
//             // refetchOnMount: true, similar to traditional
//             // refetchOnWindowFocus: false,
//             // staleTime: 30000 how long results stay fresh for, default is 0, 
//             // refetchInterval: 2000, polling
//             // refetchIntervalInBackground: true poll in backgroun
//             // cacheTime: 5000 invalidate cache after 5 seconds
//             onSuccess,
//             onError,
//             // select: (data) => {
//             //     const superheroNames = data.data.map(hero => hero.name);
//             //     return superheroNames
//             // }
//         })
// }