import React from 'react'
import '../styles/usercss.css';

class ShowNewPosts extends React.Component {
    render() {
       return (
          <div className="message">
             <div className="show-new-button">
                <a href="#" onClick={this.props.eventHandler}>Show <span style={{ fontWeight: "bold" }}>{this.props.count}</span> new posts</a>
             </div>
          </div>
       );
    }
 }

 export default ShowNewPosts
 