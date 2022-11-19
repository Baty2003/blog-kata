import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { createNewArticle, loginUserRequest, registerUserRequest, updateArticle } from '../../blogApi';
import { logoutUser, setImgLoginUser, setLoginUser } from '../../redux/actions';
import ArticlePageGetDataAndRender from '../ArticlePageGetDataAndRender/ArticlePageGetDataAndRender';
import { ArticlesList } from '../ArticlesList';
import { CreateArticlePage } from '../CreateArticlePage';
import EditProfilePage from '../EditProfilePage/EditProfilePage';
import { GetArticlesForComponent } from '../GetArticlesForComponent';
import { SignInPage } from '../SignInPage';
import { SignUpPage } from '../SignUpPage';
import { NotLoggin } from '../NotLoggin';
import { GetAcrticleForEditArticlePage } from '../GetAcrticleForEditArticlePage';

const Main = ({ setLoginUser, user, token, isLoggin }) => {
  return (
    <main className="container">
      <Route exact path={['/', '/articles']} render={() => <GetArticlesForComponent Component={ArticlesList} />} />
      <Route
        exact
        path="/article/:id"
        render={({ match }) => {
          return <ArticlePageGetDataAndRender slug={match.params.id} />;
        }}
      />
      <Route
        path="/article/:id/edit"
        render={({ match }) => {
          return <GetAcrticleForEditArticlePage slug={match.params.id} />;
        }}
      />
      <Route
        path="/sign-in"
        render={() => <SignInPage loginUser={setLoginUser} loginUserRequest={loginUserRequest} />}
      />
      <Route
        path="/sign-up"
        render={() => <SignUpPage loginUser={setLoginUser} registerUserRequest={registerUserRequest} />}
      />
      <Route
        path="/profile"
        render={() => {
          if (!isLoggin) return <NotLoggin />;
          return <EditProfilePage loginUser={setLoginUser} token={token} user={user} />;
        }}
      />
      <Route
        path="/new-article"
        render={() => {
          if (!isLoggin) return <NotLoggin />;
          return (
            <CreateArticlePage
              token={token}
              createNewArticle={createNewArticle}
              isLoggin={user.isLoggin}
              updateArticle={updateArticle}
            />
          );
        }}
      />
    </main>
  );
};

const mapsStateToProps = (state) => {
  return {
    articles: state.articles,
    loading: state.articles.isFetching,
    user: state.user,
    token: state.user.token,
    isLoggin: state.user.isLoggin,
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
