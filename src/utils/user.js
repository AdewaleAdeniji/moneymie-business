import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/user';

export const GetLoggedInUser = () => {
    const {user} = useSelector((state) => state.user);
    return user;
}
export const GetUserToken = () => {
    const {token} = useSelector((state) => state.user);
    return token;
}
export const GetUserCompany = () => {
    const {user} = useSelector((state) => state.user);
    return user.data.company_id;
}
export const useStatus = (status) => {
    const dispatch = useDispatch();
    if(status===401){
        dispatch(logoutUser);
    }
}