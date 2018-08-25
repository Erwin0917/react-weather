import React from "react";

import classes from './Button.css';

const Button = (props)=>{

    return (
        <button className={`${classes.Btn} ${props.addClass  === "search" ? classes.Btn__search : ''} ${props.isActive ? classes.active : ''} ${props.isValide ? '' : classes.error }`} onClick={props.onClick}  type={props.type}><span>{props.text}</span></button>
    )
}

export default Button;