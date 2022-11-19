import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';
import Password from 'antd/lib/input/Password';
import PropTypes from 'prop-types';

import { validateEmail, validatePasswordEdit, validateUsernameRegister } from '../../validateRules';

import editPageStyle from './EditProfilePage.module.scss';

const EditProfilePage = ({ loginUser, history, token, user, updateProfileUser }) => {
  const [errors, setErrors] = useState(false);

  const editProfileFunction = async ({ email, password, username, avatar }) => {
    updateProfileUser(email, password, username, avatar, token)
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
    <Form
      initialValues={{ username: user?.username, email: user?.email, avatar: user?.img }}
      name="login"
      onFinish={editProfileFunction}
      className={editPageStyle['form']}
    >
      <h2 className={editPageStyle['title']}>Edit Profile</h2>
      <Form.Item
        label="Username"
        name="username"
        rules={validateUsernameRegister}
        className={editPageStyle['label']}
        labelAlign="left"
      >
        <Input placeholder="some username" className={errors['username'] && 'ant-input-status-error'} />
      </Form.Item>
      {errors && errorDetail('username')}
      <Form.Item
        label="Email address"
        name="email"
        rules={validateEmail}
        className={editPageStyle['label']}
        labelAlign="left"
      >
        <Input placeholder="Email address" className={errors['email'] && 'ant-input-status-error'} />
      </Form.Item>
      {errors && errorDetail('email')}
      <Form.Item
        label="New password"
        name="password"
        rules={validatePasswordEdit}
        className={editPageStyle['label']}
        labelAlign="left"
      >
        <Password placeholder="New password" />
      </Form.Item>
      {errors && errorDetail('password')}

      <Form.Item
        label="Avatar image (url)"
        name="avatar"
        className={editPageStyle['label']}
        labelAlign="left"
        rules={[{ type: 'url', message: 'Неккоректная ссылка' }]}
      >
        <Input placeholder="Avatar Image" className={errors['avatar'] && 'ant-input-status-error'} />
      </Form.Item>

      <Form.Item className={editPageStyle['label']}>
        <Button type="primary" size="large" htmlType="submit" className={editPageStyle['button-submit']}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

EditProfilePage.defaultProps = {
  loginUser: () => {},
  token: '',
  user: {
    username: null,
    email: null,
    img: null,
  },
  history: {},
  updateProfileUser: () => Promise.reject(),
};
EditProfilePage.propTypes = {
  loginUser: PropTypes.func,
  token: PropTypes.string,
  user: PropTypes.object,
  history: PropTypes.object,
  updateProfileUser: PropTypes.func,
};

export default withRouter(EditProfilePage);
