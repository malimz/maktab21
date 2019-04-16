import React from 'react'
import '../styles/usercss.css'
import Axios from 'axios';

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {articleText:'', picture:''}
        this.addArticle= this.addArticle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFile = this.handleFile.bind(this);
     } 
     handleChange(event) {
       this.setState({ [event.target.name]: event.target.value });
     }
 
     handleFile(event) {
        this.setState({ file: event.target.files[0] });
      }
 
      
     addArticle(event) {
        // event.preventDefault();
        const data = new FormData()
        data.append("picture", this.state.file)
        data.append("text",event.target["text"].value);
        
        Axios.post('//localhost:3000/createArticle', data).then(response => {
                if (response.data.success) {
                    console.log('success')
                } else {
                    this.setState({ error: true });
                    console.log(this.state.error)
                }
            })
    }

    render(){
        return(
            <form className='addform' onSubmit={this.addArticle}  enctype="multipart/form-data">
                  <input type="text" name="articleText" id="text" placeholder="Text" autocomplete="off" 
                     value={this.state.value} onChange={this.handleChange}
                  />
                  <input type="file" name="picture" id="pic" placeholder="" autocomplete="off" 
                     value={this.state.value} onChange={this.handleFile}
                  />
                  <input type="submit" id="sub" value="Submit" />
            </form>
        )
    }
}
export default Add