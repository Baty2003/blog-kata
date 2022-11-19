import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import { Footer } from '../Footer';
import { Header } from '../Header';
import { Main } from '../Main';
import './App.scss';
import ErrorBoundaries from '../ErrorBoundaries/ErrorBoundaries';
import { setImgLoginUser, setLoginUser } from '../../redux/actions';
import { getCurrentUserByToken } from '../../blogApi';
import { getCookie } from '../../helpFunctions';

const App = ({ setLoginUser }) => {
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
        <Main />
        <Footer className="container" />
      </ErrorBoundaries>
    </Router>
  );
};

const mapsStateToDispatch = (dispatch) => {
  return {
    setLoginUser: (email, token, username) => {
      dispatch(setLoginUser(email, token, username));
      dispatch(setImgLoginUser(username));
    },
  };
};

export default connect(null, mapsStateToDispatch)(App);
