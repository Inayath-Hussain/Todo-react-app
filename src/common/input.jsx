import React from 'react';

const Input = (props) => {

    return (
        <div className="mb-3"><label htmlFor={props.name}>{props.label}</label>
            <input value={props.value} onChange={props.onChange}
                id={props.name} type={props.type} className="form-control" />
            {props.error && <div className="alert alert-danger">{props.error}</div>}
        </div>
    );
}

export default Input;