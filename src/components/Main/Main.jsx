import React from 'react';
import { connect } from 'react-redux';
// import { Route } from 'react-router-dom';

import { logoutUser, setImgLoginUser, setLoginUser } from '../../redux/actions';
// import { ArticlePageGetDataAndRender } from '../ArticlePageGetDataAndRender';
// import { ArticlesList } from '../ArticlesList';
// import { CreateArticlePage } from '../CreateArticlePage';
// import EditProfilePage from '../EditProfilePage/EditProfilePage';
// import { SignInPage } from '../SignInPage';
// import { SignUpPage } from '../SignUpPage';

// import mainStyle from './Main.module.scss';

const Main = () => {
  return <main className="container"></main>;
};

const mapsStateToProps = (state) => {
  return {
    articles: state.articles,
    loading: state.articles.isFetching,
    user: state.user,
    token: state.user.token,
  };
};

const mapsStateToDispatch = (dispatch) => {
  return {
    setLoginUser: (email, token, username) => {
      dispatch(setLoginUser(email, token, username));
      dispatch(setImgLoginUser(username));
    },
    logoutUserHeader: () => dispatch(logoutUser()),
  };
};

export default connect(mapsStateToProps, mapsStateToDispatch)(Main);
