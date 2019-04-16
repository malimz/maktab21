import React from 'react';
import Axios from 'axios'
import '../styles/usercss.css';
import UserInfo from './UserInfo'
import PostContent from './PostContent'
import PostInfo from './PostInfo'
import Comments from './Comments'
import CommentInput from './CommentInput'
import Postedite from "./Postedite"

class Post extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
          commentsExpanded: false,
          isHidden: true,
          userdata:{}
         };
         
       this.showComments = this.showComments.bind(this);
       this.hideComment = this.hideComment.bind(this);
       this.addCommentDecorator = this.addCommentDecorator.bind(this);
       this.toggleVisibility = this.toggleVisibility.bind(this);

       const data ={}
       Axios.post('//localhost:3000/whoAmI', data)
            .then(response => {
                if (response.data.success) {
                   console.log(response.data.user)
                    this.setState({ userdata: response.data.user });
                }
                else { this.setState({ error: true });}
            })
    }
 
    showComments(e) {
       e.preventDefault();
       this.setState({ commentsExpanded: true });
    }
    hideComment(e) {
       e.preventDefault();
       this.setState({ commentsExpanded: false });
    }
 
    addCommentDecorator(e) {
       e.preventDefault();
       this.showComments(e);
       this.props.args.addCommentHandler(e);
    }
    
    toggleVisibility(e){
       e.preventDefault();
       this.setState({ isHidden:!this.state.isHidden })
    }
 
    render() {
       let articles = this.props.data
       return (
         articles.map((article, index) => {
            return (
               <div className="post" id={this.props.id}>

                  <div className="post-wrapper">
                     <div className="delete-button"><a href="#" title="Delete or Edite" onClick={this.toggleVisibility}><i class="fas fa-ellipsis-v"></i></a></div>
                     {!this.state.isHidden && <Postedite />}
                     <UserInfo username={this.state.userdata.username} />
                     <PostContent content={article.text} pic ={article.picture} />

                     {/* <PostInfo likes={this.props.args.likes}  
                     commentsCount={this.props.args.commentsCount} 
                     likeHandler={this.props.args.likeHandler} 
                     isLiked={this.props.args.isLiked} />*/}
                     
                     {/* <Comments comments={this.props.args.comments} isExpanded={this.state.commentsExpanded} hideComment={this.hideComment} /> */}
                     <CommentInput addCommentHandler={this.addCommentDecorator} articleInfo = {article.picture}/> 
                  </div>
               </div>
            );
    }))
 }
}
 export default Post;