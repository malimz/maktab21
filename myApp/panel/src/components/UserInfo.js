import React from 'react'
import '../styles/usercss.css';

class UserInfo extends React.Component {
    render() {
       console.log(this.props.username)
       return (
          <div className="user-info">
 
             <div className="user-avatar">
                <img src='' alt="author"></img>
             </div>
 
             <div className="user-data">
                <div className="username">
                   <svg width='20' height="15">
                      <rect width="100%" height="100%" style={{ fill: "#dbdbdb" }} />
                      <p>username</p>
                   </svg>
                </div>
 
                <div className="post-date">
                   {this.props.date}
                </div>
             </div>
 
          </div>
       );
    }
 }

 export default UserInfo