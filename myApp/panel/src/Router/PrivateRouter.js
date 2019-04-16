import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import Axios from 'axios';
import '../styles/App.css';

export default class PrivateRouter extends Component{
    constructor(props) {
        super(props);
        this.state={
            isAllow: !!localStorage.loginData,
            isRequest: !!localStorage.loginData,
        }
        if (localStorage.loginData) {
            const data = JSON.parse(localStorage.loginData);
            Axios.post('//localhost:3000/login',data)
            .then(response=>{
                this.setState({
                    isAllow : response.data.success,
                    isRequest : false
                })
            })
        }
    }

    render() {
        const {path,component} = this.props;
        const {isAllow,isRequest} = this.state;
        if (isRequest) {
            return <h1>Waiting ...</h1>
        }
        if (isAllow){
            return <Route path={path} component={component}/>
        }
        return <Redirect to="login"/>
    }
}