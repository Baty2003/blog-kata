import { Button, Form, Input, Checkbox } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Link, withRouter } from 'react-router-dom';
import Password from 'antd/lib/input/Password';

// import { registerUserRequest } from '../../blogApi';

import {
  onlyRequired,
  validateCheckboxRequired,
  validateEmail,
  validatePasswordRegister,
  validateRepeatPassword,
  validateUsernameRegister,
} from '../../validateRules';
import { registerUserRequest } from '../../blogApi';

import signPageStyle from './SignUpPage.module.scss';

const SignUpPage = ({ loginUser, history }) => {
  const [errors, setErrors] = useState(false);

  const registerFunction = async ({ email, password, username }) => {
    registerUserRequest(username, email, password)
      .then(({ user: { email, token, username } }) => {
        loginUser(email, token, username);
        document.cookie = `token=${token}`;
        history.push('/');
      })
      .catch((error) => {
        setErrors(error?.errors);
      });
  };

  const errorDetail = (name) => {
    if (!errors) return;
    if (errors[name]) {
      return <div className="ant-form-item-explain-error">{name + ' ' + errors[name]}</div>;
    }
    return;
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
      {errors && errorDetail('username')}
      <Form.Item
        label="Email address"
        name="email"
        rules={validateEmail}
        className={signPageStyle['label']}
        labelAlign="left"
      >
        <Input placeholder="Email address" className={errors['email'] && 'ant-input-status-error'} />
      </Form.Item>
      {errors && errorDetail('email')}
      <Form.Item
        label="Password"
        name="password"
        rules={validatePasswordRegister}
        className={signPageStyle['label']}
        labelAlign="left"
      >
        <Password placeholder="Password" />
      </Form.Item>
      {errors && errorDetail('password')}
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

export default withRouter(SignUpPage);
