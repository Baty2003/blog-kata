import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { deleteArticleBySlug } from '../../blogApi';
import { getArticle } from '../../redux/actions';
import ArticlePage from '../ArticlePage/ArticlePage';
const ArticlePageGetDataAndRender = ({ slug, getArticleOnSlug, article, loading, author, token, history }) => {
  useEffect(() => {
    getArticleOnSlug(slug);
  }, []);

  return (
    <ArticlePage
      item={article}
      loading={loading}
      author={author}
      deleteArticle={() => {
        deleteArticleBySlug(slug, token);
        history.push('/');
      }}
    />
  );
};

const mapsStateToProps = (state) => {
  return {
    article: state.articles.currentArticle,
    loading: state.articles.isFetching,
    author: state.user.username,
    token: state.user.token,
  };
};
const mapsStateToDispatch = (dispatch) => {
  return {
    getArticleOnSlug: (slug) => dispatch(getArticle(slug)),
  };
};

export default withRouter(connect(mapsStateToProps, mapsStateToDispatch)(ArticlePageGetDataAndRender));
