import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { app } from "../firebase";
import { AuthContext } from "../Auth";
import 'antd/dist/antd.css';
import './Login.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  
  

  return (
    // <div>
    //   <h1>Log in</h1>
    //   <form onSubmit={handleLogin}>
    //     <label>
    //       Email
    //       <input name="email" type="email" placeholder="Email" />
    //     </label>
    //     <label>
    //       Password
    //       <input name="password" type="password" placeholder="Password" />
    //     </label>
    //     <button type="submit">Log in</button>
    //   </form>
    // </div>

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
    <h1 className="text-login">Login </h1>
    <form onSubmit={handleLogin}
  
     
     
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
        <Input name="email" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
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
        {/* <Form.Item name="remember" valuePropName="checked" noStyle>
         
        </Form.Item> */}

        
      </Form.Item>

      <Form.Item>
        <Button  htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="/signup">register now!</a>
      </Form.Item>
    </form>
    </div>
    </div>
    
  );
};

export default withRouter(Login);
