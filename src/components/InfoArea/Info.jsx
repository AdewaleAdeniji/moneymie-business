import React,{useState} from 'react';

export const InfoBox = (props) => {
    const {error, success,show} = props;
    var [showelem, setShow] = useState(show);
    if(error||success){
        setTimeout(()=>{
          //  setShow(false);
        },5000);
    }
    // console.log(props);
    const align = props.align ? props.align : '';
    console.log(props.align, align);
    return (
        props.children.length!==0 ? <div className={`${showelem ?   props.error ? 'infobox errorbox' : props.success ? 'infobox successbox' : 'infobox' : 'hidden'} ${align}`}>
            {props.children}
        </div> : ''
    )
}