import React from "react";

import './Button.css';

const Button = (props)=>{

    return (
        <button className={`Btn ${props.addClass} ${props.isActive ? props.isActive : ''} ${props.isValide ? '' : 'error' }`} onClick={props.onClick}  type={props.type}><span>{props.text}</span></button>
    )
}

export default Button;