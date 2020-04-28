import React from "react";
import "../App.css";
import { db, app } from "../firebase";

class CreatePost extends React.Component {

    constructor() {
        super();
        this.state = {
            title : '',
            imageUrl : '',
            author : '',
            content : '',
        };
    }

    updateInput = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    addArticle = e => {
        e.preventDefault();
        const user = app.auth().currentUser; 

        db.settings({
            timestampsInSnapshots: true
        });
        
        db.collection('articles').add({
            title: this.state.title,
            author: user.displayName,
            imageUrl: this.state.imageUrl,
            content: this.state.content,
            uid: user.uid
        });  

        console.log("check");

        this.setState({
            title: '',
            author: '',
            imageUrl: '',
            content: '',
        });
    };

    render () {
        return (
            <form onSubmit={this.addArticle}>
                <input
                    name="title"
                    placeholder="title"
                    onChange={this.updateInput}
                    value={this.state.title}
                /><br/>
    
                <input
                    name="imageUrl"
                    placeholder="imageUrl"
                    onChange={this.updateInput}
                    value={this.state.imageUrl}
                /><br/>
    
                <input
                    name="author"
                    placeholder="author"
                    onChange={this.updateInput}
                    value={this.state.author}
                /><br/>

                <input
                    name="content"
                    placeholder="content"
                    onChange={this.updateInput}
                    value={this.state.content}
                /><br/>
                
                <button type="submit">Create</button>
            </form>
        );
    }
    
}
  
export default CreatePost