import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/user';
const Logout = async (props) => {
    localStorage.removeItem('user_meta');
    window.location.href='/login';
    return (
        <div>Logging Out...</div>
    )
}
export default Logout;