import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { getArticles } from '../../redux/actions';
import { changeFavoriteBySlug } from '../../blogApi';

const GetArticlesForComponent = ({ Component, getArticles, currentPage, articles = [], loading, token, isLoggin }) => {
  useEffect(() => {
    getArticles(currentPage);
  }, []);

  const changeFavoriteFunction = (slug, status) => {
    changeFavoriteBySlug(slug, token, status);
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;
  if (loading) return <Spin indicator={antIcon} style={{ display: 'flex', justifyContent: 'center' }} />;
  return (
    <Component items={articles} changeFavoriteFunction={changeFavoriteFunction} disableChangeFavorite={!isLoggin} />
  );
};

const mapsStateToProps = (state) => {
  return {
    articles: state.articles.articlesItems,
    currentPage: state.articles.currentPage,
    loading: state.articles.isFetching,
    token: state.user.token,
    isLoggin: state.user.isLoggin,
  };
};

const mapsStateToDispatch = (dispatch) => {
  const COUNT_ARTICLES_ON_LIST = 20;
  return {
    getArticles: (page) => dispatch(getArticles(page * COUNT_ARTICLES_ON_LIST - COUNT_ARTICLES_ON_LIST)),
  };
};
export default connect(mapsStateToProps, mapsStateToDispatch)(GetArticlesForComponent);
