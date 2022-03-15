import React from 'react';
import './Button.css';
export const EmptyButton = (props) => (
    <div className="btn-wrapper" onClick={props.handleEmpty}>
        {props.children}
    </div>
)

export default EmptyButton;