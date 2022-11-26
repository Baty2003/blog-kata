import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { onlyRequired } from '../../utils/validateRules';
import 'antd/dist/antd.css';
import { getArticle } from '../../redux/actions';
import { Loader } from '../Loader';

import createArticlePageStyle from './CreateArticlePage.module.scss';

const CreateArticlePage = ({ slug, token, history, edit, createNewArticle, updateArticle }) => {
  const [errors, setErrors] = useState(false);
  const [arrIdsForTagsFields, setArrTagsElem] = useState([]);
  const [lastIdTagField, setLastIdTagField] = useState(0);
  const currentArticle = useSelector((state) => state.articles.currentArticle);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const form = useRef();

  useEffect(() => {
    if (!edit) return;
    dispatch(getArticle(slug)), [slug];
  }, [slug]);

  useEffect(() => {
    if (!currentArticle?.author || !form.current) return;
    if (edit) {
      form.current.setFieldsValue({
        title: currentArticle?.title,
        description: currentArticle?.description,
        text: currentArticle?.body,
      });
    } else {
      form.current.setFieldsValue({
        title: null,
        description: null,
        text: null,
      });
    }
  }, [currentArticle]);

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
    updateArticle(title, description, text, currentArticle.slug)
      .then(() => {
        history.push(`/article/${currentArticle?.slug}`);
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
  if (currentArticle?.author === undefined) return <Loader />;
  if (currentArticle?.author?.username !== username && edit) return <h1>Вы не автор этой статьи</h1>;
  return (
    <Form
      name="login"
      onFinish={edit ? editAcrticle : createAcrticle}
      className={createArticlePageStyle['form']}
      ref={form}
      initialValues={{
        title: currentArticle?.title,
        description: currentArticle?.description,
        text: currentArticle?.body,
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
