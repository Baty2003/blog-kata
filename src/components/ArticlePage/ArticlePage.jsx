import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

import { ArticleCard } from '../ArticleCard';

import articlePageStyle from './ArticlePage.module.scss';
const ArticlePage = ({ item, author, deleteArticleFunc, changeFavoriteFunction, disableChangeFavorite }) => {
  const countItem = Object.keys(item).length;
  return (
    <div className={articlePageStyle['container']}>
      {countItem && (
        <ArticleCard
          articleObj={item}
          articlePage
          deleteArticle={deleteArticleFunc}
          withButton={item.author.username === author && true}
          changeFavoriteFunction={changeFavoriteFunction}
          disableChangeFavorite={disableChangeFavorite}
        />
      )}
      <div className={articlePageStyle['markdown']}>
        <ReactMarkdown>{item.body}</ReactMarkdown>
      </div>
    </div>
  );
};

ArticlePage.defaultProps = {
  author: 'none',
  item: {
    body: '',
    author: {},
  },
  deleteArticleFunc: () => Promise.reject(),
  changeFavoriteFunction: () => Promise.reject(),
  disableChangeFavorite: false,
};

ArticlePage.propTypes = {
  author: PropTypes.string,
  item: PropTypes.object,
  deleteArticleFunc: PropTypes.func,
  changeFavoriteFunction: PropTypes.func,
  disableChangeFavorite: PropTypes.bool,
};

export default ArticlePage;
