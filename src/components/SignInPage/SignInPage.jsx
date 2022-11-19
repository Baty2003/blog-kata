import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Link, withRouter } from 'react-router-dom';
import Password from 'antd/lib/input/Password';

import { loginUserRequest } from '../../blogApi';
import { validateEmail } from '../../validateRules';

import signPageStyle from './SignInPage.module.scss';

const SignInPage = ({ loginUser, history }) => {
  const [errors, setErrors] = useState({});

  const errorDetail = (name) => {
    if (errors[name]) {
      return <div className="ant-form-item-explain-error">{name + ' ' + errors[name]}</div>;
    }
    return;
  };

  const loginFunction = ({ email, password }) => {
    loginUserRequest(email, password)
      .then(({ user: { email, token, username } }) => {
        loginUser(email, token, username);
        document.cookie = `token=${token}`;
        history.push('/');
      })
      .catch((error) => {
        setErrors(error?.errors);
      });
  };

  return (
    <Form name="login" initialValues={{ remember: true }} onFinish={loginFunction} className={signPageStyle['form']}>
      <h2 className={signPageStyle['title']}>Sign In</h2>
      {errorDetail('email or password')}
      <Form.Item
        label="Email address"
        name="email"
        className={signPageStyle['label']}
        labelAlign="left"
        rules={validateEmail}
      >
        <Input
          placeholder="Email address"
          className={(errors['email'] || errors['email or password']) && 'ant-input-status-error'}
        />
      </Form.Item>
      {errorDetail('email')}
      <Form.Item
        label="Password"
        name="password"
        className={signPageStyle['label']}
        labelAlign="left"
        rules={[{ required: true, message: 'Это поле обязательное' }]}
      >
        <Password placeholder="Password" />
      </Form.Item>
      {errorDetail('password')}
      <Form.Item className={signPageStyle['label']}>
        <Button type="primary" size="large" htmlType="submit" className={signPageStyle['button-submit']}>
          Login
        </Button>
        <p className={signPageStyle['secondary-text']}>Don’t have an account? {<Link to="sign-up">Sign Up</Link>}</p>
      </Form.Item>
    </Form>
  );
};
export default withRouter(SignInPage);
