import React from 'react'
import '../styles/usercss.css';

class PostContent extends React.Component {
   constructor(props) {
      super(props);
   }
    render() {
       return (
          <div className="mainpost">
            <div className="post-content">
               <img src={"../../../images/article-images/" + this.props.pic} alt="" />
            </div>
            <div className='post-text'>
               <p> {this.props.content}</p>    
                  {/* data (image and text) is called from db and shown in these <img> and <p> tags */}
            </div>
          </div>
       );
    }
 }
 export default PostContent