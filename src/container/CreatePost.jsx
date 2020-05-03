import React from "react";
import "../App.css";
import { db, app } from "../firebase";
import { Form, Input, InputNumber, Button, Layout} from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};
    
const validateMessages = {
    required: '${label} is required!',
};
      

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

    addArticle = values => {
        this.setState({
            title: values.title,
            author: values.author,
            imageUrl: values.imageUrl,
            content: values.content,
        });
        console.log(this.state.title);
        console.log("check");

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

        console.log("check2");

        this.setState({
            title: '',
            author: '',
            imageUrl: '',
            content: '',
        });

        console.log("check3");
    };

    onFinish = values => {
        this.setState({
            title: values.title,
            author: values.author,
            imageUrl: values.imageUrl,
            content: values.content,
        });
    };

    render () {
        return (
            <div>
                <Content className="content">
                    <h1>Create Article</h1>
                    <Form {...layout} name="nest-messages" onFinish={this.addArticle} validateMessages={validateMessages}>
                        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="imageUrl" label="Image URL" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="author" label="Author" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="content" label="Content">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                            <Button type="primary" htmlType="submit">
                                <Link to='/'>Submit</Link>
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
                
            </div>
            
        );
    }
    
}
  
export { CreatePost } 