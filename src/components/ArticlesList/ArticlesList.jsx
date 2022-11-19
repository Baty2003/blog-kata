import React from 'react';

import { ArticleCard } from '../ArticleCard';

import articlesListStyle from './ArticlesList.module.scss';

const ArticlesList = ({ items, loading }) => {
  if (loading) {
    return <h1>Грузим данные</h1>;
  }

  return (
    <div className={articlesListStyle['list']}>
      {items.map((article) => {
        return <ArticleCard key={article.slug} articleObj={article} />;
      })}
    </div>
  );
};
export default ArticlesList;
