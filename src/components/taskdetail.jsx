import React from 'react';
import { useState } from 'react';
import Joi from 'joi-browser';
import { ToastContainer, toast } from 'react-toastify'
import { createtask, updatetask } from '../services/authentication';
import TaskDetailInput from './taskdetail-input';
import 'react-toastify/dist/ReactToastify.css'

const TaskDetail = (props) => {
    const [task, useTask] = useState(props.location.taskdetail || {
        title: '',
        description: '',
        due_date: '',
        status: 'P'
    })

    const schema = {
        title: Joi.string().required().label('Title'),
        due_date: Joi.date().required().label('Due On')
    }

    const validateSubmit = (name, value) => {
        const obj = { [name]: value }
        const sch = { [name]: schema[name] }
        const result = Joi.validate(obj, sch)

        return result.error ? result.error.details[0].message : null;
    }

    const update = async () => {
        const error_msg_title = validateSubmit('title', task['title'])
        const error_msg_date = validateSubmit('due_date', task['due_date'])

        if (error_msg_title || error_msg_date) {
            if (error_msg_title)
                toast.error(error_msg_title)
            if (error_msg_date)
                toast.error(error_msg_date)
            return null;
        }

        if (props.match.params.title === 'newtask') {
            const response = await createtask(task)
            if (response.status === 200) {
                props.history.push('/')
                return null;
            }
        }
        const response = await updatetask(task)
        if (response.status === 200) {
            props.history.push('/')
        }
    }

    const HandleChange = e => {
        const t = { ...task }
        t[e.currentTarget.id] = e.currentTarget.value
        useTask({ ...t })
    }

    return (
        <React.Fragment>
            <ToastContainer />
            <div className="container1">
                <div className="header">
                    <h3>hello</h3>
                </div>
                <div className="card1">
                    <TaskDetailInput datatype='title' inputtype='text' label={'Title'} onChange={HandleChange} value={task.title} />
                    <TaskDetailInput datatype='description' inputtype='textarea' label={'Description'} onChange={HandleChange} value={task.description} />
                    <TaskDetailInput datatype='due_date' inputtype='date' label={'Due On'} onChange={HandleChange} value={task.due_date} />

                    <label htmlFor="Status">Status</label>
                    <select className='detail-edit status' name="status" id="status" onChange={HandleChange}>
                        <option selected={task.status === 'P'} value="P">Pending</option>
                        <option selected={task.status === 'C'} value="C">Completed</option>
                    </select>
                    <button className='submit btn btn-primary' onClick={update}>Submit</button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default TaskDetail;