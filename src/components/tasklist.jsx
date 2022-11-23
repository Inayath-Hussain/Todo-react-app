import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { deletetask, new_access, tasklist } from '../services/authentication';


class TaskList extends Component {
    state = {
        user_id: 0,
        username: '',
        tasks: [],
        search_value: ''
    }

    async componentDidMount() {
        this.setState({ user_id: localStorage.getItem('user_id'), username: localStorage.getItem('username') })
        const tasks = await tasklist().catch(async () => {
            if (localStorage.getItem('refresh')) {
                const response = await new_access(localStorage.getItem('refresh')).catch(() => {
                    localStorage.clear()
                    window.location = '/login'
                })
                localStorage.removeItem('refresh')
                localStorage.removeItem('access')
                localStorage.setItem('refresh', response.data.refresh)
                localStorage.setItem('access', response.data.access)
                this.componentDidMount()
            }
        })
        this.setState({ tasks: [...tasks.data] })
    }

    logOut() {
        localStorage.clear()
        window.location = '/login';
    }

    async delete(task) {
        deletetask(task.id).then(() => this.componentDidMount())
        toast.success(`${task.title} task removed`)
    }

    search = (e) => {
        this.setState({ search_value: e.currentTarget.value })
    }

    render() {
        const pending_tasks = this.state.search_value === '' ? this.state.tasks.filter(task => task.status === 'P') : this.state.tasks.filter(task => task.status === 'P' && task.title.includes(this.state.search_value));
        const completed_tasks = this.state.search_value === '' ? this.state.tasks.filter(task => task.status === 'C') : this.state.tasks.filter(task => task.status === 'C' && task.title.includes(this.state.search_value));
        return (
            <React.Fragment>
                <ToastContainer />
                <div className="container1">
                    <div className="header">
                        <h4>Hello {localStorage.getItem('username')}</h4>
                        <p className='tasks'>You have {
                            pending_tasks.length === 1 ? `${pending_tasks.length} pending task` : `${pending_tasks.length} pending tasks`
                        }</p>
                        <p onClick={this.logOut} className='logout'>LOGOUT</p>
                    </div>
                    <div className="search-bar">
                        <form >
                            <input type="text" onChange={this.search} className="search-area" />
                            <button className='button'>Search</button>
                        </form>
                        <h3 className='Add'><Link to='/newtask'>&#x2b;</Link></h3>
                    </div>
                    {pending_tasks.map(task => {
                        return (
                            <div key={task.id} className="task-wrapper">
                                <div className="task-title">
                                    <div className="task-incomplete-icon"></div>
                                    <Link to={{ pathname: `/${task.title}`, taskdetail: task }}>{task.title}</Link>
                                </div>
                                <h4 className='Add' onClick={() => this.delete(task)}>&#215;</h4>
                            </div>
                        )
                    })
                    }
                    {completed_tasks.map((task) => {
                        return (
                            <div key={task.id} className="task-wrapper">
                                <div className="task-title">
                                    <div className="task-complete-icon"></div>
                                    <Link to={{ pathname: `/${task.title}`, taskdetail: task }}>{task.title}</Link>
                                </div>
                                <h4 className='Add' onClick={() => this.delete(task.id)}>&#215;</h4>
                            </div>
                        )
                    })}
                </div>
            </React.Fragment >
        );
    }
}

export default TaskList;