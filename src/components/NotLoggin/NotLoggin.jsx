import React from 'react';
import PropTypes from 'prop-types';

import notLogginStyle from './NotLoggin.module.scss';
const NotLoggin = ({ text }) => {
  return (
    <p className={notLogginStyle['message']}>
      {!text ? 'Эта страница доступна только для авторизированных пользователей!' : text}
    </p>
  );
};

NotLoggin.propTypes = {
  text: PropTypes.string,
};
export default NotLoggin;
