import React from 'react';

const TaskDetailInput = ({ datatype, inputtype, value, onChange, label }) => {

    return (
        <React.Fragment>
            <label htmlFor={datatype}>{label}</label>
            <input className={`detail-edit ${datatype}`} id={datatype} type={inputtype} onChange={onChange} defaultValue={value} />
        </React.Fragment>
    );
}

export default TaskDetailInput;