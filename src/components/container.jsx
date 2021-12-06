import React from 'react';
import { Link } from 'react-router-dom';

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