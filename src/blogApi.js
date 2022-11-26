const baseUrl = 'https://blog.kata.academy/api';

export const loginUserRequest = async (email, password) => {
  const body = {
    user: {
      email: email,
      password: password,
    },
  };
  const response = await fetch(`${baseUrl}/users/login`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
};

export const registerUserRequest = async (username, email, password) => {
  const body = {
    user: {
      username: username,
      email: email,
      password: password,
    },
  };
  const response = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
};

export const getProfileByUsernameRequest = async (username) => {
  const response = await fetch(`${baseUrl}/profiles/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) return response.json();
  else return Promise.reject(response);
};

export const getCurrentUserByToken = async (token) => {
  const response = await fetch(`${baseUrl}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  if (response.ok) return response.json();
  else return Promise.reject(response);
};

export const updateProfileUser = async (email, password, username, urlAvatar, token) => {
  const body = {
    user: {
      username: username,
      email: email,
    },
  };
  if (urlAvatar) body.user['image'] = urlAvatar;
  if (urlAvatar) body.user['password'] = password;
  const response = await fetch(`${baseUrl}/user`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
};

export const createNewArticle = async (title, description, bodyArticles, tagList, token) => {
  const body = {
    article: {
      title: title,
      description: description,
      body: bodyArticles,
      tagList: tagList,
    },
  };
  const response = await fetch(`${baseUrl}/articles`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
};

export const updateArticle = async (title, description, bodyArticles, token, slug) => {
  console.log(token);

  const body = {
    article: {
      title: title,
      description: description,
      body: bodyArticles,
    },
  };
  const response = await fetch(`${baseUrl}/articles/${slug}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
};

export const deleteArticleBySlug = async (slug, token) => {
  await fetch(`${baseUrl}/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
};

export const changeFavoriteBySlug = async (slug, token, status) => {
  const response = await fetch(`${baseUrl}/articles/${slug}/favorite`, {
    method: status ? 'POST' : 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  const data = await response.json();
  if (response.ok) return data;
  else return Promise.reject(data);
};
