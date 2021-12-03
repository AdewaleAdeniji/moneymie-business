import React from 'react';
import './loader.css';

export const Loader = ({text,show}) => {
    return (
        <div className={show ? 'block-ui' : 'hidden'}>
            <div className="loader-area">
                <div className="loader-svg">
                    <div className="lds-roller">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className="loader-text">
                    {text ? text : 'Loading..'}
                </div>
            </div>
        </div>
    )
}