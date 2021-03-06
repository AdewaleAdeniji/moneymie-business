import React from 'react';


export const LargeButton = (props) => {
    return (
        <button className="btn btn-large" type={props.type} disabled={props.disabled || false} onClick={props.onClick}>
            {props.children}
        </button>
    )
}
export const LargeButtonGrey = (props) => {
    return (
        <button className="btn btn-large btn-grey" type={props.type} disabled={props.disabled || false} onClick={props.onClick}>
            {props.children}
        </button>
    )
}