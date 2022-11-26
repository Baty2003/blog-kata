import { Button, Form, Input, Checkbox } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Password from 'antd/lib/input/Password';

import {
  onlyRequired,
  validateCheckboxRequired,
  validateEmail,
  validatePasswordRegister,
  validateRepeatPassword,
  validateUsernameRegister,
} from '../../utils/validateRules';
import { errorDetail, setCookie } from '../../utils/helpFunctions';

import signPageStyle from './SignUpPage.module.scss';

const SignUpPage = ({ loginUser, history, registerUserRequest }) => {
  const [errors, setErrors] = useState(false);

  const registerFunction = async ({ email, password, username }) => {
    registerUserRequest(username, email, password)
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
    <Form name="login" initialValues={{ remember: true }} onFinish={registerFunction} className={signPageStyle['form']}>
      <h2 className={signPageStyle['title']}>Create new account</h2>
      <Form.Item
        label="Username"
        name="username"
        rules={validateUsernameRegister}
        className={signPageStyle['label']}
        labelAlign="left"
      >
        <Input placeholder="some username" className={errors['username'] && 'ant-input-status-error'} />
      </Form.Item>
      {errors && errorDetail('username', errors)}
      <Form.Item
        label="Email address"
        name="email"
        rules={validateEmail}
        className={signPageStyle['label']}
        labelAlign="left"
      >
        <Input placeholder="Email address" className={errors['email'] && 'ant-input-status-error'} />
      </Form.Item>
      {errors && errorDetail('email', errors)}
      <Form.Item
        label="Password"
        name="password"
        rules={validatePasswordRegister}
        className={signPageStyle['label']}
        labelAlign="left"
      >
        <Password placeholder="Password" />
      </Form.Item>
      {errors && errorDetail('password', errors)}
      <Form.Item
        label="Repeat password"
        name="repeat-password"
        rules={[...onlyRequired, validateRepeatPassword]}
        className={signPageStyle['label']}
        labelAlign="left"
      >
        <Password placeholder="Repeat password" />
      </Form.Item>

      <Form.Item
        name="agree"
        className={`${signPageStyle['label']} ${signPageStyle['label-checkbox']}`}
        valuePropName="checked"
        rules={validateCheckboxRequired}
      >
        <Checkbox className={signPageStyle['checkbox']}>I agree to the processing of my personal information</Checkbox>
      </Form.Item>

      <Form.Item className={signPageStyle['label']}>
        <Button type="primary" size="large" htmlType="submit" className={signPageStyle['button-submit']}>
          Create
        </Button>
        <p className={signPageStyle['secondary-text']}>Already have an account? {<Link to="/sign-in">Sign In</Link>}</p>
      </Form.Item>
    </Form>
  );
};

SignUpPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  registerUserRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(SignUpPage);
