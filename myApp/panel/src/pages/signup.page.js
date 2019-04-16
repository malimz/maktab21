import React, { Component } from 'react';
import Axios from 'axios';
import '../styles/App.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', pass: '', email: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();   
    const data = {
        username: event.target["username"].value,
        pass: event.target["pass"].value,
        email: event.target["email"].value,
    }
    console.log(data)
    
    Axios.post('//localhost:3000/signup', data).then(response => {
            console.log(response)
            if (response.data.success) {
                window.location = '/panel/login';
            } else {
                this.setState({ error:true});
            }
        })
}

  render() {
    return (
      <form className='box' onSubmit={this.handleSubmit} method='post'>
        <h1>Sign-up</h1>
        <h3>Sign up to see photos and articles from your friends.</h3>
        <br/>
        <input type="text" name="username" id="username" placeholder="Username" autocomplete="off" 
          value={this.state.value} onChange={this.handleChange}
        />
        <input type="password" name="pass" id="pass" placeholder="Password" autocomplete="off" 
          value={this.state.value} onChange={this.handleChange}
        />
        <input type="email" name="email" id="email" placeholder="E-Mail" autocomplete="off" 
          value={this.state.value} onChange={this.handleChange}
        />
        <br />
        <input type="submit" id="submit" value="Submit" />
      </form>
    );
  }
}

export { SignUp }





