import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/user';
const Logout = async (props) => {
    const dispatch = useDispatch();
    localStorage.removeItem('user_meta');
    await dispatch(logoutUser());
    return props.history.push('/login');
}
export default Logout;