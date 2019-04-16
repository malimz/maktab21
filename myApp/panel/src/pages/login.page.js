import React, { Component } from 'react';
import Axios from 'axios';
import '../styles/App.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', pass: '', error: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = (event) => {
      event.preventDefault();
      const data = {
            username: event.target["username"].value,
            password: event.target["pass"].value,
            FCM: '1'
      }
      Axios.post('//localhost:3000/login', data).then(response => {
          if (response.data.success) {
            console.log('success')
            localStorage.setItem('loginData', JSON.stringify(data));
            window.location = '/panel/dashboard';
          } else {
            this.setState({ error: true })
            console.log(this.state.error)
          }
      })
  }
    
    handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
      console.log('writing')
    }

    render() {
        return (
          <form className="box" onSubmit={this.handleSubmit}>
            <h1>Sign-in</h1>
            {!this.state.error && <h3>Welcom to Our Web Application</h3>}
            {this.state.error && <h3>Username or Password is incorrect</h3>}
            <br />
            <input type="text" name="username" id="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
            <input type="password" name="pass" id="pass" placeholder="Password" value={this.state.pass} onChange={this.handleChange}/>
            <br />
            <button type="submit" id="submit">Submit</button>
          </form>
        )
    }
}

export { LoginPage }