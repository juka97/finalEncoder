import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, } from 'reactstrap';
import './algorithm.css';
import axios from 'axios';
import { TOKEN, LOGIN, ENCODE_POST, getToken } from '../constants/constants';

export default class Algorithm extends React.Component {
    state = {
        input: '',
        output: ''
    };

    handleOnChange = event => {
        let state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    };

    handleOnPress = (event) => {
        if (event.key === 'Enter') {
            this.handleSubmit()
        }
    }

    handleSubmit = async event => {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': getToken()
        }
        axios
            .post(ENCODE_POST, { input: this.state.input }, {
                headers: headers
            })

            .then(res => {
                if (res.status === 200) {
                    this.state.output = res.data.encode;
                    this.setState({output:res.data.encode});
                }
            }).catch(error => {
                this.props.history.push(LOGIN);
                localStorage.removeItem(TOKEN);
                alert("Unauthorized")

            });
    };

    render() {
        return (
            <div class="main">
                <div class="window">
                    <h1>Encoder</h1>

                    <Input type='text' id='encoder' name='input' placeholder='Input'
                        value={this.state.input}
                        onChange={this.handleOnChange}
                    />
                    <button type="submit" className="btn btn-primary"
                        onClick={this.handleSubmit}
                        disabled={!this.state.input}>Submit</button>
                </div>
        {this.state.output ? <div>{this.state.output}</div> : null}
            </div>
        );
    }
}