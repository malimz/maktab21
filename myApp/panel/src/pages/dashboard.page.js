import React, { Component } from 'react';
import '../styles/usercss.css';
import Header from "../components/Header"
import Feed from "../components/Feed"



class ProfilePage extends React.Component {
    constructor(props) {
       super(props);
    }
    render() {
       return (
          <div className="wrapper">
          {<Header />}   
          {<Feed />}
          </div>
       )
    }
 }
 
 export { ProfilePage }