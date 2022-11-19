import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import linkStyleStyle from './LinkStyle.module.scss';

const LinkStyle = ({ href, text, primary, className, onClick }) => {
  return (
    <Link
      to={`${href}`}
      className={`${linkStyleStyle['link']} ${classNames({
        [linkStyleStyle['primary']]: primary,
        [className]: className,
      })}`}
      onClick={onClick}
    >
      {text}
    </Link>
  );
};

LinkStyle.defaultProps = {
  href: '',
  text: '',
  primary: false,
  className: null,
  onClick: () => {},
};

LinkStyle.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
  primary: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default LinkStyle;
