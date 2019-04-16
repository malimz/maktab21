import React, { Component } from 'react';
import Add from "./Add"
import '../styles/usercss.css';

 class Addarticle extends React.Component {
    constructor(props) {
       super(props);
       this.state = {visibility:false}
       this.showtheFiled= this.showtheFiled.bind(this);
    }
    showtheFiled(e){
        this.setState({visibility : !this.state.visibility});
    }

    render() {
       return (
         <div className="add">
               <i class="far fa-plus-square" onClick={this.showtheFiled}></i>
            {this.state.visibility && <Add />}
          </div>
       );
    }
 }
export default Addarticle