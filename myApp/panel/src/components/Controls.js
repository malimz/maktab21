import React, { Component } from 'react';
import '../styles/usercss.css';

 class Controls extends React.Component {
    constructor(props) {
       super(props);
      //  this.state = {
      //     count: 0
      //  }
    }
 
    render() {
       return (
          <div className="right-side">
             <div className="controls" onChange={this.props.change}>
                <div className="controls-title"><b>Edite your profile</b></div>
                <div className="edite"><a>Change your avatar</a></div>
                <div className="edite"><a>Change your username</a></div>
                <div className="edite"><a>Change your password</a></div>
                  
                <div className="controls-title"><b>App info</b></div>
                <div className="row">
                   <span className="edite">Total posts:</span>
                   <span>{this.props.totalPosts}</span>
                </div>
             </div>
 
          </div>
       );
    }
 }
export default Controls