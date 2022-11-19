import React from 'react';
import PropTypes from 'prop-types';

import { ArticleCard } from '../ArticleCard';

import articlesListStyle from './ArticlesList.module.scss';

const ArticlesList = ({ items, changeFavoriteFunction, disableChangeFavorite }) => {
  return (
    <div className={articlesListStyle['list']}>
      {items.map((article) => {
        return (
          <ArticleCard
            key={article.slug}
            articleObj={article}
            changeFavoriteFunction={(status) => changeFavoriteFunction(article.slug, status)}
            disableChangeFavorite={disableChangeFavorite}
          />
        );
      })}
    </div>
  );
};

ArticlesList.defaultProps = {
  items: [],
  changeFavoriteFunction: () => Promise.reject(),
  disableChangeFavorite: false,
};

ArticlesList.propTypes = {
  items: PropTypes.array,
  changeFavoriteFunction: PropTypes.func,
  disableChangeFavorite: PropTypes.bool,
};

export default ArticlesList;
