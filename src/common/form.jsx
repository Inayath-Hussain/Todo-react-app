import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    validate = () => {
        const result = Joi.validate(this.state.data, this.schema, { abortEarly: false });
        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }

    validatechange = (input) => {

        const obj = { [input.id]: input.value }
        const schema = { [input.id]: this.schema[input.id] }
        const result = Joi.validate(obj, schema)

        return result.error ? result.error.details[0].message : null;
    }

    handlesubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} })
        if (errors) return;

        this.doSubmit()
    }

    handleChange = e => {
        const data = { ...this.state.data }
        const errors = { ...this.state.errors }
        const errormessage = this.validatechange(e.currentTarget)

        data[e.currentTarget.id] = e.currentTarget.value;
        if (errormessage)
            errors[e.currentTarget.id] = errormessage
        else
            delete errors[e.currentTarget.id]
        this.setState({ data, errors })
    }

    renderButton = () => {
        return (
            <button disabled={this.validate()} className="btn btn-primary">Submit</button>
        )
    }

    renderInput = (name, label, type = 'text') => {
        return (
            <Input name={name} label={label} value={this.state.data[name]} type={type}
                onChange={this.handleChange} error={this.state.errors[name]} />
        )
    }

}

export default Form;