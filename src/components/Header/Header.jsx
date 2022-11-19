import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteCookie } from '../../helpFunctions';
import { logoutUser } from '../../redux/actions';
import { LinkStyle } from '../LinkStyle';
import { ProfileInCard } from '../ProfileInCard';

import headerStyle from './Header.module.scss';

const Header = ({ user, logout }) => {
  const { isLoggin } = user;

  const logoutPrompt = () => {
    if (confirm('Вы точно хотите выйти?')) {
      logout();
      deleteCookie('token');
    }
  };

  return (
    <header className={headerStyle['header']}>
      <nav className={headerStyle['nav']}>
        <Link className={headerStyle['name-blog']} to="/">
          RealWorld Blog
        </Link>
        <div className={headerStyle['flex']}>
          {!isLoggin && (
            <>
              <LinkStyle text={'Sign In'} href="/sign-in" />
              <LinkStyle text={'Sign Up'} href="/sign-up" primary />
            </>
          )}
          {isLoggin && (
            <>
              <LinkStyle
                text="Create article"
                className={headerStyle['create-article-button']}
                href="/new-article"
                primary
              />
              <Link to="/profile" className={headerStyle['link-profile']}>
                <ProfileInCard notDate img={user.img} username={user.username} />
              </Link>
              <LinkStyle
                text="log out"
                className={headerStyle['logout-button']}
                href="/"
                primary
                onClick={logoutPrompt}
              />
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

const mapsStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapsStateToDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logoutUser()),
  };
};

export default connect(mapsStateToProps, mapsStateToDispatch)(Header);
