import React from 'react';
import {FormGroup, Input} from 'reactstrap';
import './loginForm.css';
import {FormErrors} from './FormErrors';
import axios from 'axios';
import { ALGORITHM, TOKEN, EMAIL_ERROR_MSG, PASSWORD_ERROR_MSG, PASSWORD_REGEX, EMAIL_REGEX, LOGIN_POST } from '../constants/constants';
export default class LoginForm extends React.Component {
    

    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
    }

    handleOnChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, 
            () => { this.validateField(name, value) });
    };

    handleOnPress = (event) => {
        if(event.key === 'Enter' && this.state.formValid) {
            this.handleSubmit()
        }
    }

    handleSubmit = async event => {
        axios
            .post(LOGIN_POST, {email:this.state.email, password:this.state.password})
            .then(res => {
                if(res.status===200){
                    localStorage.setItem(TOKEN, res.data.token);
                    this.props.history.push(ALGORITHM);
                    console.log(res.data.token);
                }
                else {
                    console.log("error");
                }
            })

    }
        

 


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
      
        switch(fieldName) {
          case 'email':
            emailValid = value.match(EMAIL_REGEX);
            fieldValidationErrors.email = emailValid ? '' : EMAIL_ERROR_MSG;
            break;
          case 'password':
            passwordValid = value.match(PASSWORD_REGEX);
            fieldValidationErrors.password = passwordValid ? '': PASSWORD_ERROR_MSG;
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid
                      }, this.validateForm);
      }
      
      validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
      }
      

    render(){

        return(
            <div class="main">
                <div class="window">
            <h1>Login</h1>
                <FormGroup>
                    <div align="center">
                        <Input type='text' name='email' placeholder='E-mail' autoComplete="off"
                               value={this.state.email}
                               onChange = {this.handleOnChange}
                               
                        />
                        <Input type='password' name='password' placeholder='Password'
                               value={this.state.password}
                               onChange = {this.handleOnChange}
                               onKeyPress ={this.handleOnPress}

                        />
                    </div>

                        <div align="center"> <p> </p>
                        <button variant="success" className="btn btn-primary" 
                        onClick={this.handleSubmit}
  disabled={!this.state.formValid}>Login</button>
                        </div>
                </FormGroup>

                
            </div>
            <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
            </div>

        );
    }
}