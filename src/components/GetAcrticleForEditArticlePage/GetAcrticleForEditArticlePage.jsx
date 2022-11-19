import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { getArticle } from '../../redux/actions';
import { CreateArticlePage } from '../CreateArticlePage';
import { updateArticle, updateProfileUser } from '../../blogApi';
import { NotLoggin } from '../NotLoggin';

const GetAcrticleForEditArticlePage = ({ slug, article, loading, token, getArticleOnSlug, isLoggin, username }) => {
  useEffect(() => {
    getArticleOnSlug(slug);
  }, []);

  const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;
  if (loading) return <Spin indicator={antIcon} style={{ display: 'flex', justifyContent: 'center' }} />;
  if (!isLoggin || username !== article?.author?.username) return <NotLoggin />;
  return (
    <CreateArticlePage
      inititalArticle={article}
      token={token}
      updateArticle={updateArticle}
      updateProfileUser={updateProfileUser}
      edit
    />
  );
};

const mapsStateToProps = (state) => {
  return {
    article: state.articles.currentArticle,
    loading: state.articles.isFetching,
    username: state.user.username,
    token: state.user.token,
    isLoggin: state.user.isLoggin,
  };
};
const mapsStateToDispatch = (dispatch) => {
  return {
    getArticleOnSlug: (slug) => dispatch(getArticle(slug)),
  };
};

export default connect(mapsStateToProps, mapsStateToDispatch)(GetAcrticleForEditArticlePage);
