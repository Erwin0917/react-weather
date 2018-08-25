import React, {Component} from "react";

import classes from './Button.css';

class Button extends Component{


    render(){
        return (
            <button ref={this.ref} className={`${classes.Btn} ${this.props.addClass  === "search" ? classes.Btn__search : ''} ${this.props.isActive ? classes.active : ''} ${this.props.isValide ? '' : classes.error }`} onClick={this.props.onClick}  type={this.props.type}><span>{this.props.text}</span></button>
        )
    }
}

export default Button;