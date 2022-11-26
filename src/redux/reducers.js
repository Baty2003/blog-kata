/* eslint-disable indent */
import {
  SET_ARTICLES,
  SET_CURRENT_ACTICLE_PAGE,
  SET_CURRENT_PAGE,
  SET_LOGIN_USER,
  SET_IS_FETCHING,
  SET_IMG_LOGIN_USER,
  LOGOUT_USER,
} from './actionsNames';

const initialStateArticles = {
  articlesItems: [],
  articlesCount: 0,
  currentPage: 1,
  currentArticle: {},
  isFetching: false,
};
export const reducerArticles = (state = initialStateArticles, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      return { ...state, articlesItems: action.articlesItems, articlesCount: action.articlesCount };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_CURRENT_ACTICLE_PAGE:
      return { ...state, currentArticle: action.currentArticle };
    case SET_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    default:
      return state;
  }
};

const initialStateUser = {
  username: null,
  token: null,
  email: null,
  img: null,
  isLoggin: false,
};

export const reducerUser = (state = initialStateUser, action) => {
  switch (action.type) {
    case SET_LOGIN_USER:
      return {
        ...state,
        username: action.username,
        token: action.token,
        email: action.email,
        isLoggin: action.isLoggin,
      };
    case SET_IMG_LOGIN_USER:
      return {
        ...state,
        img: action.img,
      };
    case LOGOUT_USER:
      return initialStateUser;
    default:
      return state;
  }
};
