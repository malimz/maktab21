import React from 'react';
import '../styles/usercss.css';
import Axios from 'axios';


class Header extends React.Component { 
   constructor(props) {
      super(props);
      this.state = {
          error: null,
          userData:[],
      }
   }
   componentDidMount() {
      const data = {}
      Axios.post('//localhost:3000/whoAmI', data).then(response => {
         if (response.data.success) {
               this.setState({ userData: response.data.user });
         } else { this.setState({ error: true });}
      })
   }

   
    render() {
      const {userData} = this.state;
      console.log(userData)
       return (
          <div id="header">
             <div className= "fixed-header">
                <div className="content-wrapper header-content">
                   <div className="app-title">
                      <div className="title">Hi {userData.username}</div>
                   </div>
                   <div className="header-right-side">
                      <div className="user-avatar">
                         <img src="" alt="user-avatar"></img>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       );
    }
 }
 
 export default Header;