import { Cookies } from 'react-cookie';

export const getCache = (key) => {
    const cookies = new Cookies();
    const cacheValue = cookies.get(key);
    return cacheValue;
}
export const saveCache = (key,value) => {
    let cookies = new Cookies();
    return cookies.set(key, value, { path: '/' });
}
