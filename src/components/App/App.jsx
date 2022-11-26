import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { setImgLoginUser, setLoginUser, logoutUser } from '../../redux/actions';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { ArticlePageGetDataAndRender } from '../../common/ArticlePageGetDataAndRender';
import './App.scss';
import {
  getCurrentUserByToken,
  createNewArticle,
  loginUserRequest,
  registerUserRequest,
  updateArticle,
  updateProfileUser,
} from '../../blogApi';
import { ErrorBoundaries } from '../../common/ErrorBoundaries';
import { AxiosInterceptor } from '../../common/CheckAuth/CheckAuth';
import { getCookie } from '../../utils/helpFunctions';
import { ArticlesList } from '../ArticlesList';
import { CreateArticlePage } from '../CreateArticlePage';
import EditProfilePage from '../EditProfilePage/EditProfilePage';
import { GetArticlesForComponent } from '../../common/GetArticlesForComponent';
import { SignInPage } from '../SignInPage';
import { SignUpPage } from '../SignUpPage';
import { Loader } from '../Loader';
import { NotLoggin } from '../NotLoggin';

const App = ({ setLoginUser, token, user, isLoggin, loading }) => {
  useEffect(() => {
    if (getCookie('token')) {
      getCurrentUserByToken(getCookie('token'))
        .then(({ user: { email, token, username } }) => {
          setLoginUser(email, token, username);
        })
        .catch(() => {
          return;
        });
    }
  }, []);

  return (
    <Router>
      <ErrorBoundaries>
        <Header />
        <main className="container">
          <Route exact path={['/', '/articles']} render={() => <GetArticlesForComponent Component={ArticlesList} />} />
          <Route
            exact
            path="/article/:slug"
            render={({ match }) => <ArticlePageGetDataAndRender slug={match.params.slug} />}
          />
          <Route
            path="/article/:slug/edit"
            render={({ match }) => (
              <AxiosInterceptor>
                <CreateArticlePage
                  slug={match.params.slug}
                  updateArticle={(title, description, text, slug) =>
                    updateArticle(title, description, text, token, slug)
                  }
                  edit
                />
              </AxiosInterceptor>
            )}
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
              if (loading) return <Loader />;
              return (
                <AxiosInterceptor>
                  <EditProfilePage
                    loginUser={setLoginUser}
                    updateProfileUser={updateProfileUser}
                    token={token}
                    user={user}
                  />
                </AxiosInterceptor>
              );
            }}
          />
          <Route
            path="/new-article"
            render={() => (
              <AxiosInterceptor>
                <CreateArticlePage token={token} createNewArticle={createNewArticle} isLoggin={user.isLoggin} />
              </AxiosInterceptor>
            )}
          />
        </main>
        <Footer className="container" />
      </ErrorBoundaries>
    </Router>
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

export default connect(mapsStateToProps, mapsStateToDispatch)(App);
