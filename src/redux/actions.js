import { getProfileByUsernameRequest } from '../blogApi';

import {
  SET_ARTICLES,
  SET_CURRENT_ACTICLE_PAGE,
  SET_CURRENT_PAGE,
  SET_LOGIN_USER,
  SET_IS_FETCHING,
  SET_IMG_LOGIN_USER,
  LOGOUT_USER,
} from './actionsNames';

export const setArticles = (articlesItems, articlesCount) => {
  return { type: SET_ARTICLES, articlesItems, articlesCount };
};

export const setCurrentPage = (currentPage) => {
  return { type: SET_CURRENT_PAGE, currentPage };
};

export const setCurrentArticle = (currentArticle) => {
  return { type: SET_CURRENT_ACTICLE_PAGE, currentArticle };
};

export const setIsFetching = (isFetching) => {
  return { type: SET_IS_FETCHING, isFetching };
};

export const setLoginUser = (email, token, username) => {
  return { type: SET_LOGIN_USER, email, token, username, isLoggin: true };
};

export const logoutUser = () => {
  return { type: LOGOUT_USER };
};

export const setImgLoginUser = (username) => async (dispatch) => {
  dispatch(setIsFetching(false));
  let errorFlag = false;
  const response = await getProfileByUsernameRequest(username).catch(() => {
    errorFlag = true;
    dispatch(setIsFetching(false));
  });
  if (errorFlag) dispatch({ type: SET_IMG_LOGIN_USER, img: null });
  dispatch({ type: SET_IMG_LOGIN_USER, img: response.profile.image });
  dispatch(setIsFetching(false));
};

export const getArticles = (offset) => (dispatch) => {
  dispatch(setIsFetching(true));
  return fetch(`https://blog.kata.academy/api/articles?offset=${offset}`)
    .then((response) => response.json())
    .then((data) => {
      dispatch(setArticles(data.articles, data.articlesCount));
      dispatch(setIsFetching(false));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setIsFetching(false));
    });
};

export const getArticle = (slug) => (dispatch) => {
  dispatch(setIsFetching(true));
  return fetch(`https://blog.kata.academy/api/articles/${slug}`)
    .then((response) => response.json())
    .then((data) => {
      dispatch(setCurrentArticle(data.article));
      dispatch(setIsFetching(false));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setIsFetching(false));
    });
};
