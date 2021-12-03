import {getLoggedInUser} from '../auth/index';

const user = getLoggedInUser() ? getLoggedInUser() : {token: ''};

export const httpGet = (url) => {
    return  fetch(url, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer '+user.token,
            'Content-Type': 'application/json'
        }),
    });
};
export const httpGetWithBody = (url,body={}) => {
    return  fetch(url, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer '+user.token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(body)
    });
};
export const httpPost = (url, body = {}) => {
    return  fetch(url, {
        method: 'post',
        headers: new Headers({
            'Authorization': 'Bearer '+user.token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(body)
    });
};

export const httpPostMultipart = (url, formData) => {

    return  fetch(url, {
        method: 'post',
        body: formData,
        headers: new Headers({
            'Authorization': 'Bearer '+user.token,
        }),

    });
};

export const httpPut = (url, body = {}) => {
    return  fetch(url, {
        method: 'put',
        headers: new Headers({
            'Authorization': 'Bearer '+user.token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(body)
    });
};

export const httpPutMultipart = (url, formData) => {
    return  fetch(url, {
        method: 'put',
        body: formData,
        headers: new Headers({
            'Authorization': 'Bearer '+user.token,
        })
    });
};

export const httpDelete = (url, body = {}) => {
    return  fetch(url, {
        method: 'delete',
        headers: new Headers({
            'Authorization': 'Bearer '+user.token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(body)
    });
};