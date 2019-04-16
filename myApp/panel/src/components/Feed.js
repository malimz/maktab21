import React from 'react';
import PostWall from "./PostWall"
import Controls from './Controls'
import '../styles/usercss.css';
import Addarticle from "./Addarticle"

class Feed extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
          stopUpload: false,
 
          postsOnScreen: 0,
          totalPosts: 0
       }
       this.changePostsCount = this.changePostsCount.bind(this);
       this.manualUpdateWall = this.manualUpdateWall.bind(this);
    }
 
    manualUpdateWall() {
       this.setState({ autoUpdate: true });
       setTimeout(() => {
          this.setState({ autoUpdate: false });
       }, 1000);
    }
 
    changePostsCount(current, total) {
       this.setState({ postsOnScreen: current, totalPosts: total });
    }
 
    render() {
       return <div id="feed">
          <div className="content-wrapper feed-wrapper">
          {<Addarticle />} 
             <PostWall autoUpdate={this.state.autoUpdate} changeCount={this.changePostsCount} manualUpdate={this.manualUpdateWall}  />
             {/* <Controls postsOnScreen={this.state.postsOnScreen} totalPosts={this.state.totalPosts} /> */}
          </div>
       </div>
    }
 }

 export default Feed;
 