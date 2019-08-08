import React, {Component} from 'react';

import {inputLength, required, validateForm} from "../validate"
import './Form.css';

class Form extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            password: '',
            errors: {},
        };
        this.checkBox = React.createRef();
    }

    // handle input change
    handleChange = e => {
        e.preventDefault();

        const {name, value} = e.target;
        const {errors} = this.state;

        this.validateFields(name, errors, value); // also validate fields on form change stage
        errors.checked = required(this.checkBox.current.checked);

        this.setState({[name]: value, errors})
    }

    // when all fields are filled and validated let log a success message
    // and reset fields (state) and checkbox ref too
    handleSubmit = e => {
        e.preventDefault();

        const {errors} = this.state;

        if (validateForm(this.state.errors) && this.canBeSubmitted()) {
            console.log('SUBMITTED');
            this.setState({name: '', email: '', password: ''}); // reset fields
            this.checkBox.current.checked = false
        } else {
            this.validateFields(null, errors, this.state) // validate fields on form submit
        }
    }

    // make fields validation
    validateFields = (...args) => {
        switch (args[0]) {
            case 'name':
                args[1].name = required(args[2]);
                break;
            case 'email':
                args[1].email = required(args[2]);
                break;
            case 'password':
                args[1].password = inputLength(args[2], 6, 12);
                break;
            case null:
                args[1].name = required(args[2].name);
                args[1].email = required(args[2].email);
                args[1].password = inputLength(args[2].password, 6, 12);
                break;
            default:
                break;
        }
        args[1].checked = required(this.checkBox.current.checked);

        this.setState({errors: args[1]})
    }

    // check form for input emptiness
    canBeSubmitted = () => {
        const {name, email, password} = this.state;
        const isChecked = this.checkBox.current !== null && this.checkBox.current.checked;

        return !(!name || !email || !password || !isChecked);
    }

    render() {
        const {name, email, password, errors} = this.state;

        return (
            <div className='form-page'>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={name} name='name' type='text'/><br/>
                    {errors.name && <span>{errors.name}<br/></span>}
                    <input onChange={this.handleChange} value={email} name='email' type='text'/><br/>
                    {errors.email && <span>{errors.email}<br/></span>}
                    <input onChange={this.handleChange} value={password} name='password' type='password'/><br/>
                    {errors.password && <span>{errors.password}<br/></span>}
                    <input ref={this.checkBox} type='checkbox'/><br/>
                    {errors.checked && <span>{errors.checked}<br/></span>}
                    <input type='submit'/>
                </form>
            </div>
        );
    }
}

export default Form;
