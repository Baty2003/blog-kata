import React from 'react';

import modalWindowStyle from './ModalWindowConfirm.module.scss';

const ModalWindowConfirm = ({ text, onClickNo, onClickYes }) => {
  return (
    <div className={modalWindowStyle['container']}>
      <div className={modalWindowStyle['pseudo-container']}>
        <p className={modalWindowStyle['text']}>{text}</p>
        <div className={modalWindowStyle['container-button']}>
          <button className={modalWindowStyle['button']} onClick={onClickNo}>
            No
          </button>
          <button className={modalWindowStyle['button']} onClick={onClickYes}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalWindowConfirm;
