import React from 'react';
import ReactMarkdown from 'react-markdown';

import { ArticleCard } from '../ArticleCard';

import articlePageStyle from './ArticlePage.module.scss';
const ArticlePage = ({ item, loading, author, deleteArticle }) => {
  const countItem = Object.keys(item).length;
  if (loading) return <h1>Грузим данные</h1>;
  console.log(item);

  return (
    <div className={articlePageStyle['container']}>
      {countItem && (
        <ArticleCard
          articleObj={item}
          articlePage
          deleteArticle={deleteArticle}
          withButton={item.author.username === author && true}
        />
      )}
      <div className={articlePageStyle['markdown']}>
        <ReactMarkdown>{item.body}</ReactMarkdown>
      </div>
    </div>
  );
};
export default ArticlePage;
