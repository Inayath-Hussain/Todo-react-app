import React from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import { ToastContainer, toast } from 'react-toastify'
import Form from '../common/form';
import { login } from '../services/authentication';
import jwtDecode from 'jwt-decode';

class LoginForm extends Form {
    state = {
        data: {
            email: '', password: ''
        },
        errors: {},
        username: ''
    }

    schema = {
        email: Joi.string().required().email().label('Email'),
        password: Joi.string().required().label('Password')
    }


    doSubmit = async () => {
        // call the server
        const { data } = this.state
        const result = await login(data.email, data.password)
        if (result.data.error) {
            toast.dark(result.data.error)
            return null;
        }
        localStorage.setItem('refresh', result.data.refresh)
        localStorage.setItem('access', result.data.access)

        const decoded_result = jwtDecode(result.data.access)
        localStorage.setItem('user_id', decoded_result.user_id)
        this.setState({ username: decoded_result.username })
        localStorage.setItem('username', decoded_result.username)

        this.props.history.replace('/');
    }



    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                <div className='container'>
                    <div className='card1'>
                        <h1>Login</h1>
                        <form onSubmit={this.handlesubmit}>
                            {this.renderInput('email', 'Email')}
                            {this.renderInput('password', 'Password', 'password')}
                            {this.renderButton()}
                            <p className='Registerlink'>New User ? <Link to='/register'>Register</Link></p>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default LoginForm;