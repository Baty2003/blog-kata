import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Footer } from '../Footer';
import { Header } from '../Header';
import { ArticlesList } from '../ArticlesList';
import { SignInPage } from '../SignInPage';
import './App.scss';
import ArticlePageGetDataAndRender from '../ArticlePageGetDataAndRender/ArticlePageGetDataAndRender';
import ErrorBoundaries from '../ErrorBoundaries/ErrorBoundaries';
import { logoutUser, setImgLoginUser, setLoginUser } from '../../redux/actions';
import { SignUpPage } from '../SignUpPage';
import { getCurrentUserByToken } from '../../blogApi';
import { getCookie } from '../../helpFunctions';
import EditProfilePage from '../EditProfilePage/EditProfilePage';
import { CreateArticlePage } from '../CreateArticlePage';

const App = ({ articles, loading, setLoginUser, user, logoutUserHeader, token }) => {
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
        <Header user={user} logout={logoutUserHeader} />
        <section className="container">
          <Route
            exact
            path={['/', '/articles']}
            render={() => <ArticlesList items={articles.articlesItems} loading={loading} />}
          />
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
              return (
                <CreateArticlePage
                  slug={match.params.id}
                  token={token}
                  edit
                  inititalArticle={articles.currentArticle}
                />
              );
            }}
          />
          <Route path="/sign-in" render={() => <SignInPage loginUser={setLoginUser} />} />
          <Route path="/sign-up" render={() => <SignUpPage loginUser={setLoginUser} />} />
          <Route
            path="/profile"
            render={() => <EditProfilePage loginUser={setLoginUser} token={token} user={user} />}
          />
          <Route path="/new-article" render={() => <CreateArticlePage token={token} />} />
        </section>
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
