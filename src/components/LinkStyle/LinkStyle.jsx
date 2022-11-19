import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

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
export default LinkStyle;
