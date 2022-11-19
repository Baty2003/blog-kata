import { Pagination } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { getArticles, setCurrentPage } from '../../redux/actions';

import 'antd/dist/antd.css';
import footerStyle from './Footer.module.scss';

const Footer = (props) => {
  const { currentPage, totalPage, changeCurrentPage, loading } = props;
  if (loading) return;
  return (
    <footer className={`${props.className ? props.className : null} ${footerStyle['footer']}`}>
      <Route
        exact
        path={['/', '/articles']}
        render={() => (
          <Pagination current={currentPage} total={totalPage * 10} onChange={(id) => changeCurrentPage(id)} />
        )}
      />
    </footer>
  );
};

const mapsStateToProps = (state) => {
  return {
    currentPage: state.articles.currentPage,
    totalPage: Math.round(state.articles.articlesCount / 20),
    loading: state.articles.isFetching,
  };
};

const mapsStateToDispatch = (dispatch) => {
  const COUNT_ARTICLES_ON_LIST = 20;
  return {
    changeCurrentPage: (page) => {
      dispatch(setCurrentPage(page));
      dispatch(getArticles(page * COUNT_ARTICLES_ON_LIST - COUNT_ARTICLES_ON_LIST));
    },
  };
};
export default connect(mapsStateToProps, mapsStateToDispatch)(Footer);
