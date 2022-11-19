import React from 'react';
import { format } from 'date-fns';
import classNames from 'classnames';

import linkHeaderStyle from './ProfileInCard.module.scss';

const ProfileInCard = ({ username, date, img, notDate }) => {
  return (
    <div className={linkHeaderStyle['container']}>
      <div
        className={`${linkHeaderStyle['text-container']} ${classNames({
          [linkHeaderStyle['vertical-center-flex']]: notDate,
        })}`}
      >
        <span className={linkHeaderStyle['name']}>{username}</span>
        {!notDate && <span className={linkHeaderStyle['date']}>{format(new Date(date), 'MMM d, yyyy')}</span>}
      </div>
      <div className={linkHeaderStyle['img-container']}>
        <img src={img} alt="" className={linkHeaderStyle['img-profile']} />
      </div>
    </div>
  );
};
export default ProfileInCard;
