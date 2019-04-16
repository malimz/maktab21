import React from 'react'
import Axios from 'axios'
import '../styles/usercss.css';

class CommentInput extends React.Component {
   constructor(props) {
      super(props);
      this.state = {error: false};
        
      this.addCommentHandler = this.addCommentHandler.bind(this);
   }

   addCommentHandler(event) {
      event.preventDefault();
      const data = {
         user: event.target["user"].value,
         text: event.target["text"].value,
         artInfo : this.props.articleInfo
     }
      
      // console.log(event.target["text"].value)
      // console.log(event.target["user"].value)
      console.log(data)
      Axios.post('//localhost:3000/createComment', data).then(response => {
              if (response.data.success) {
                  console.log('success')
              } else {
                  this.setState({ error: true });
                  console.log(this.state.error)
              }
          })
   }

    render() {
       return (
          <div className="comment-input">
             <form onSubmit={this.addCommentHandler}>
                <input name="user" type="text" maxLength="200" placeholder="Write your username here" />
                <input name="text" type="text" maxLength="200" placeholder="Write your comment here" />
                <button className="submit-button" type="submit"></button>
             </form>
          </div>
       );
    }
 }

 export default CommentInput