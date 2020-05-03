import React from "react";
import "../App.css";
import { db, app } from "../firebase";
import { Form, Input, InputNumber, Button, Layout} from 'antd';
const { Header, Content, Footer } = Layout;

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
            <div>
                <Content>
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

                    <CreateForm/>
                </Content>
                
            </div>
            
        );
    }
    
}


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
    
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
      
const CreateForm = () => {
        const onFinish = values => {
        console.log(values);
    };
      
    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item
            name={['user', 'name']}
            label="Name"
            rules={[
            {
                required: true,
            },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name={['user', 'email']}
            label="Email"
            rules={[
            {
                type: 'email',
            },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name={['user', 'age']}
            label="Age"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },
            ]}
        >
            <InputNumber />
        </Form.Item>
        <Form.Item name={['user', 'website']} label="Website">
            <Input />
        </Form.Item>
        <Form.Item name={['user', 'introduction']} label="Introduction">
            <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </Form.Item>
        </Form>
    );
};
  
export { CreatePost, CreateForm } 