import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { deleteArticleBySlug, changeFavoriteBySlug } from '../../blogApi';
import { getArticle } from '../../redux/actions';
import { Loader } from '../../components/Loader';
import ArticlePage from '../../components/ArticlePage/ArticlePage';
const ArticlePageGetDataAndRender = ({
  slug,
  getArticleOnSlug,
  article,
  author,
  token,
  history,
  isLoggin,
  loading,
}) => {
  useEffect(() => {
    getArticleOnSlug(slug);
  }, []);

  if (loading) return <Loader />;
  return (
    <ArticlePage
      item={article}
      author={author}
      deleteArticleFunc={() => {
        setTimeout(() => {
          deleteArticleBySlug(slug, token);
          history.push('/');
        }, 200);
      }}
      changeFavoriteFunction={(status) => {
        changeFavoriteBySlug(slug, token, status);
      }}
      disableChangeFavorite={!isLoggin}
    />
  );
};

const mapsStateToProps = (state) => {
  return {
    article: state.articles.currentArticle,
    loading: state.articles.isFetching,
    author: state.user.username,
    token: state.user.token,
    isLoggin: state.user.isLoggin,
  };
};
const mapsStateToDispatch = (dispatch) => {
  return {
    getArticleOnSlug: (slug) => dispatch(getArticle(slug)),
  };
};

export default withRouter(connect(mapsStateToProps, mapsStateToDispatch)(ArticlePageGetDataAndRender));
