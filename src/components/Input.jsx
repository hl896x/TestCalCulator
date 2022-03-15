import React from 'react';
import './Input.css';

export const Input = (props) => (
    
    <div className="input">
        {props.label}<br /> {props.input } 
    </div>
)

export default Input;