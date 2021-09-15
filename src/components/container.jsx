import React,{useState} from 'react';
import { Link } from 'react-router-dom';

export const AppContainer = (props) => {
    
    console.log(props.active);
    return (
        
            <div className="logincontainer">
                <div className="logoarea">
                    <Link to="/login">
                        <img src="assets/logo.png"/>
                    </Link>
                </div>
                <div>
                    {props.children}
                </div>
            </div>
        
    )
}