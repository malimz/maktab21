import React from 'react';
import '../styles/usercss.css';
import PostObj from './PostObj'
import Posts from './Posts'
import Axios from 'axios'

class PostWall extends React.Component {
   constructor(props) {
      super(props);
      this.state = { error: null, articles: [] }
      const data = {}
      const userdata = {}
      Axios.post('//localhost:3000/myArticles', data).then(response => {
              if (response.data.success) {
                   const articles = response.data.content;
                   console.log(articles)   
                  this.setState({ articles: response.data.content });
              } else {
                  this.setState({ error: true });
              }
          })
  }
   render(){
      return(
      <div className='postwall'> 
         <Posts data = {this.state.articles} />
      </div>
      )
   }

}
 

 export default PostWall;