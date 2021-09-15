import React from 'react';
import { Link } from 'react-router-dom';
export const BreadCrumb = (props)  => {
    const {active, label , path, showpath,current} = props;
    
    const Bread = ({active,label,current}) => {
        console.log(current);
        return (
            <>
            <div className={`${active=='error' ? 'crumb error' : active ? 'active crumb' : 'inactive crumb'} ${current ? 'current-bread' : ''}`}>
                    <i className={active=='fa fa-exclamation-mark' ? '!' : active ? 'fa fa-check' : ''}></i>
                </div>
                <div className="label-crumb">
                    {label}
                </div>
            </>
        )
    }
    return (
        <div className={`breadcrumb ${current ? 'current-bread' : ''}`}>
            
            {
                
                showpath ? 
                <Link to={path}>
                    <Bread active={active} label={label} current={current}/> 
                </Link> 
                :
                <Bread active={active} label={label} current={current}/> 
            
                
            }
            
           
        </div>
    )

}