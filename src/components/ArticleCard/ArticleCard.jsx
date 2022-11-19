import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { ProfileInCard } from '../ProfileInCard';
import { LinkStyle } from '../LinkStyle';
import { ModalWindowConfirm } from '../ModalWindowConfirm';

import articleCardStyle from './ArticleCard.module.scss';

const ArticleCard = ({ articleObj, articlePage, withButton, deleteArticle }) => {
  const { username, image } = articleObj.author;
  const [showModalWindowDelete, setShowModalWindowDelete] = useState(false);
  const handlerButtonDelete = (e) => {
    e.preventDefault();
    setShowModalWindowDelete(true);
  };
  return (
    <div className={`${articleCardStyle['card']} ${classNames({ [articleCardStyle['card-in-page']]: articlePage })}`}>
      <div className={articleCardStyle['header-card']}>
        <div className={articleCardStyle['container-title']}>
          <div className={articleCardStyle['flex']}>
            <Link className={articleCardStyle['title']} to={`/article/${articleObj.slug}`}>
              {articleObj.title}
            </Link>
            <button className={articleCardStyle['button-like']}></button>
            <span className={articleCardStyle['counter-like']}>{articleObj.favoritesCount}</span>
          </div>
          <div>
            {articleObj.tagList.map((tag, index) => (
              <span key={index} className={articleCardStyle['tags']}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className={articleCardStyle['container-body']}>
          <ProfileInCard username={username} img={image} date={articleObj.createdAt} />
        </div>
      </div>
      <div className={`${articleCardStyle['flex']}`}>
        <div
          className={`${classNames({
            [articleCardStyle['grey-description']]: articlePage,
          })}`}
        >
          {articleObj.description}
        </div>
        {withButton && (
          <div className={`${articleCardStyle['flex']} ${articleCardStyle['container-button']}`}>
            <LinkStyle
              href={''}
              text={'Delete'}
              primary
              className={articleCardStyle['delete-button']}
              onClick={handlerButtonDelete}
            />
            <LinkStyle
              href={`/article/${articleObj.slug}/edit`}
              text={'Edit'}
              primary
              className={articleCardStyle['edit-button']}
            />
            {showModalWindowDelete && (
              <ModalWindowConfirm
                text={'Are You sure to delete this article?'}
                onClickNo={() => setShowModalWindowDelete(false)}
                onClickYes={deleteArticle}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default ArticleCard;
