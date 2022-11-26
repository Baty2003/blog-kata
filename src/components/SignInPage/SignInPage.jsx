import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Link, withRouter } from 'react-router-dom';
import Password from 'antd/lib/input/Password';
import PropTypes from 'prop-types';

import { validateEmail } from '../../utils/validateRules';
import { errorDetail, setCookie } from '../../utils/helpFunctions';

import signPageStyle from './SignInPage.module.scss';

const SignInPage = ({ loginUser, history, loginUserRequest }) => {
  const [errors, setErrors] = useState({});
  const loginFunction = ({ email, password }) => {
    loginUserRequest(email, password)
      .then(({ user: { email, token, username } }) => {
        loginUser(email, token, username);
        setCookie('token', token, { path: '/' });
        history.push('/');
      })
      .catch((error) => {
        setErrors(error?.errors);
      });
  };

  return (
    <Form name="login" initialValues={{ remember: true }} onFinish={loginFunction} className={signPageStyle['form']}>
      <h2 className={signPageStyle['title']}>Sign In</h2>
      {errors && errorDetail('email or password', errors)}
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
      {errors && errorDetail('email', errors)}
      <Form.Item
        label="Password"
        name="password"
        className={signPageStyle['label']}
        labelAlign="left"
        rules={[{ required: true, message: 'Это поле обязательное' }]}
      >
        <Password placeholder="Password" />
      </Form.Item>
      {errors && errorDetail('password', errors)}
      <Form.Item className={signPageStyle['label']}>
        <Button type="primary" size="large" htmlType="submit" className={signPageStyle['button-submit']}>
          Login
        </Button>
        <p className={signPageStyle['secondary-text']}>Don’t have an account? {<Link to="sign-up">Sign Up</Link>}</p>
      </Form.Item>
    </Form>
  );
};

SignInPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  loginUserRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(SignInPage);
