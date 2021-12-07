import React from 'react';
import Fade from 'react-reveal/Fade';
import { useHistory } from 'react-router';

export const FormArea = (props) => {
    let history = useHistory();

    return (
        props.show ?
            <Fade right duration={700}>
                <div className="form-area">
                    {
                        props.showBackButton ? <a href="#" className="back-btn" onClick={() => history.goBack()}>
                            &#8592; Back
                        </a> : ''
                    }
                    <div className={`form-title ${props.position ? props.position : 'align-left'}`}>
                        {props.title}
                    </div>
                    {props.children}
                </div>
            </Fade> : ''

    )
}
export const FormField = (props) => {
    return (
        <div className="form-field">
            <label htmlFor="input">
                {props.title}
            </label>
            {props.children}
        </div>
    )
}