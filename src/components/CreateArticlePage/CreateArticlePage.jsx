import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { onlyRequired } from '../../validateRules';

import 'antd/dist/antd.css';

import createArticlePageStyle from './CreateArticlePage.module.scss';

const CreateArticlePage = ({ token, history, edit, inititalArticle, createNewArticle, updateArticle }) => {
  const [errors, setErrors] = useState(false);
  const [arrIdsForTagsFields, setArrTagsElem] = useState([]);
  const [lastIdTagField, setLastIdTagField] = useState(0);

  const convertTagsFieldinArray = (tagsObject) => {
    let array = [];
    if (!tagsObject) return array;
    for (const key in tagsObject) {
      if (tagsObject[key]) {
        array.push(tagsObject[key]);
      }
    }
    return array;
  };

  const createAcrticle = ({ title, description, text, tags = undefined }) => {
    createNewArticle(title, description, text, convertTagsFieldinArray(tags), token)
      .then(({ article }) => {
        history.push(`/article/${article.slug}`);
      })
      .catch(({ errors }) => {
        setErrors(errors);
      });
  };

  const editAcrticle = ({ title, description, text }) => {
    updateArticle(title, description, text, token, inititalArticle.slug)
      .then(() => {
        history.push(`/article/${inititalArticle?.slug}`);
      })
      .catch(({ errors }) => {
        setErrors(errors);
      });
  };

  const addNewTag = () => {
    setArrTagsElem((array) => [...array, lastIdTagField]);
    setLastIdTagField((state) => state + 1);
  };

  const deleteTagById = (idDelete) => {
    let newArray = arrIdsForTagsFields.filter((id) => id !== idDelete);
    setArrTagsElem(newArray);
  };

  return (
    <Form
      name="login"
      onFinish={edit ? editAcrticle : createAcrticle}
      className={createArticlePageStyle['form']}
      initialValues={{
        title: inititalArticle?.title,
        description: inititalArticle?.description,
        text: inititalArticle?.body,
      }}
    >
      <h2 className={createArticlePageStyle['title']}>{edit ? 'Edit article' : 'Create new article'}</h2>
      <Form.Item
        label="title"
        name="title"
        rules={onlyRequired}
        className={createArticlePageStyle['label']}
        labelAlign="left"
      >
        <Input placeholder="title" className={errors['username'] && 'ant-input-status-error'} />
      </Form.Item>
      <Form.Item
        label="Short description"
        name="description"
        rules={onlyRequired}
        className={createArticlePageStyle['label']}
        labelAlign="left"
      >
        <Input placeholder="description" className={errors['username'] && 'ant-input-status-error'} />
      </Form.Item>

      <Form.Item
        label="text"
        name="text"
        rules={onlyRequired}
        className={createArticlePageStyle['label']}
        labelAlign="left"
      >
        <TextArea
          placeholder="Text"
          className={`${errors['username'] ? 'ant-input-status-error' : ''}${createArticlePageStyle['text-area']}`}
        />
      </Form.Item>
      {!edit &&
        (arrIdsForTagsFields.length ? (
          arrIdsForTagsFields.map((id, index) => {
            return (
              <div className={createArticlePageStyle['tag']} key={id}>
                <Form.Item
                  name={['tags', `tag${id}`]}
                  className={`${createArticlePageStyle['label']} ${createArticlePageStyle['label-no-margin']}`}
                  labelAlign="left"
                  label={index === 0 && 'Tags'}
                >
                  <Input
                    placeholder="description"
                    className={errors['username'] && 'ant-input-status-error'}
                    value="LOXI"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  size="large"
                  className={createArticlePageStyle['button-tag']}
                  ghost
                  danger
                  onClick={() => deleteTagById(id)}
                  value={id}
                >
                  Delete
                </Button>
                {arrIdsForTagsFields.length - 1 === index && (
                  <Button
                    type="primary"
                    size="large"
                    className={createArticlePageStyle['button-tag']}
                    onClick={addNewTag}
                    ghost
                  >
                    Add tag
                  </Button>
                )}
              </div>
            );
          })
        ) : (
          <Button
            type="primary"
            size="large"
            className={`${createArticlePageStyle['button-tag']} ${createArticlePageStyle['button-tag--no-margin']}`}
            onClick={addNewTag}
            ghost
          >
            Add tag
          </Button>
        ))}

      <Form.Item className={createArticlePageStyle['label']}>
        <Button type="primary" size="large" htmlType="submit" className={createArticlePageStyle['button-submit']}>
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

CreateArticlePage.defaultProps = {
  token: '',
  inititalArticle: {
    title: null,
    description: null,
    body: null,
  },
  history: {},
  edit: false,
  createNewArticle: () => Promise.reject(),
  updateArticle: () => Promise.reject(),
};
CreateArticlePage.propTypes = {
  token: PropTypes.string,
  inititalArticle: PropTypes.object,
  history: PropTypes.object,
  edit: PropTypes.bool,
  createNewArticle: PropTypes.func,
  updateArticle: PropTypes.func,
};
export default withRouter(CreateArticlePage);
