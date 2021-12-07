import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../components/sidebar/sidebar';
export const AppContainer = (props) => {

    return (

        <div className="logincontainer">
            <div className="logoarea">
                <Link to="/login">
                    <img src="assets/logo.png" alt="momeymie logo" />
                </Link>
            </div>
            <div>
                {props.children}
            </div>
        </div>

    )
}
export const Container = (props) => {
    return (
        <div className="app-container">
            <SideBar itemKey={props.page}/>
            <div className="app-box">
                {props.children}
            </div>
        </div>
    )
}