import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { app } from "../firebase";
import 'antd/dist/antd.css';
import './Login.css';
import { Link } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
  

    <div className="background">
    <div
    name="normal_login"
    className="login-form"> 
    <img 
    src="./images/user-icon.png"
    className="user-icon"
    alt="usericon"
    >

    </img>
    <h1 className="text-signup">Sign Up </h1>
    <form onSubmit={handleSignUp}
  
     
     
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input name="email" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input name="password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
       
        </Form.Item>

       
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign Up
        </Button>
        Or <Link to="/login"  style={{color:'#F7EFEC'}}>Login</Link>
      </Form.Item>
    </form>
    </div>
    </div>
  );
};

export default withRouter(SignUp);
