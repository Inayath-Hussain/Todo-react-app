import React from 'react';
import Joi from 'joi-browser';
import jwtDecode from 'jwt-decode'
import Form from '../common/form'
import { register } from '../services/authentication';
import { Link } from 'react-router-dom';

class RegisterForm extends Form {
    state = {
        data: {
            email: '', password: '', username: ''
        },
        errors: {}

    }

    schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
        username: Joi.string().required()
    }

    doSubmit = async () => {
        // call the server
        const { data } = this.state
        const result = await register(data.email, data.password, data.username)
        localStorage.setItem('access', result.data.access)

        const decoded_result = jwtDecode(result.data.access)
        localStorage.setItem('user_id', decoded_result.user_id)
        localStorage.setItem('username', data.username)
        this.props.history.replace('/')
    }

    render() {
        return (
            <div className='container'>
                <div className="card1">
                    <h1>Register</h1>
                    <form onSubmit={this.handlesubmit}>
                        {this.renderInput('email', 'Email', 'email')}
                        {this.renderInput('password', 'Password', 'password')}
                        {this.renderInput('username', 'Username')}
                        {this.renderButton()}
                        <p className="Registerlink">Already have an account ? <Link to='/login'>Login</Link></p>
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterForm;