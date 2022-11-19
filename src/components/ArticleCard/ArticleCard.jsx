import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { ProfileInCard } from '../ProfileInCard';
import { LinkStyle } from '../LinkStyle';
import { ModalWindowConfirm } from '../ModalWindowConfirm';

import articleCardStyle from './ArticleCard.module.scss';

const ArticleCard = ({
  articleObj,
  articlePage,
  withButton,
  deleteArticle,
  changeFavoriteFunction,
  disableChangeFavorite,
}) => {
  const [showModalWindowDelete, setShowModalWindowDelete] = useState(false);
  const [countLike, setCountLike] = useState(articleObj.favoritesCount);
  const [favorite, setFavorite] = useState(!articleObj.favorited && false);

  const handlerButtonDelete = (e) => {
    e.preventDefault();
    setShowModalWindowDelete(true);
  };

  const handlerFavoriteButton = (e) => {
    changeFavoriteFunction(!favorite);
    setFavorite((state) => !state);
    setCountLike((state) => (e.target.checked ? state + 1 : state - 1));
  };
  const { username, image } = articleObj.author;
  return (
    <div className={`${articleCardStyle['card']} ${classNames({ [articleCardStyle['card-in-page']]: articlePage })}`}>
      <div className={articleCardStyle['header-card']}>
        <div className={articleCardStyle['container-title']}>
          <div className={articleCardStyle['flex']}>
            <Link className={articleCardStyle['title']} to={`/article/${articleObj.slug}`}>
              {articleObj.title}
            </Link>
            <label name="like">
              <input
                name="like"
                type="checkbox"
                className={articleCardStyle['checkbox']}
                checked={favorite}
                onChange={handlerFavoriteButton}
                disabled={disableChangeFavorite}
              />
              <span className={articleCardStyle['checkbox-like']}></span>
            </label>
            <span className={articleCardStyle['counter-like']}>{countLike}</span>
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
      <div className={`${articleCardStyle['flex']} ${articleCardStyle['space-between']}`}>
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

ArticleCard.defaultProps = {
  articleObj: {
    slug: null,
    favoritesCount: 0,
    favorited: null,
    author: {},
    description: '',
    title: '',
    tagList: [],
  },
  articlePage: false,
  withButton: false,
  deleteArticle: () => Promise.reject(),
  changeFavoriteFunction: () => Promise.reject(),
  disableChangeFavorite: false,
};
ArticleCard.propTypes = {
  articleObj: PropTypes.object,
  articlePage: PropTypes.bool,
  withButton: PropTypes.bool,
  deleteArticle: PropTypes.func,
  changeFavoriteFunction: PropTypes.func,
  disableChangeFavorite: PropTypes.bool,
};

export default ArticleCard;
