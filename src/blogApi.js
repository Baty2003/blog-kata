export const loginUserRequest = async (email, password) => {
  console.log(email + '|||' + password);

  const body = {
    user: {
      email: email,
      password: password,
    },
  };
  const response = await fetch('https://blog.kata.academy/api/users/login', {
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
  const response = await fetch('https://blog.kata.academy/api/users', {
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
  const response = await fetch(`https://blog.kata.academy/api/profiles/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) return response.json();
  else return Promise.reject(response);
};

export const getCurrentUserByToken = async (token) => {
  const response = await fetch('https://blog.kata.academy/api/user', {
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
  console.log(token);

  const body = {
    user: {
      username: username,
      email: email,
    },
  };
  if (urlAvatar) body.user['image'] = urlAvatar;
  if (urlAvatar) body.user['password'] = password;
  console.log(body);

  const response = await fetch('https://blog.kata.academy/api/user', {
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
  const response = await fetch('https://blog.kata.academy/api/articles', {
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
  const body = {
    article: {
      title: title,
      description: description,
      body: bodyArticles,
    },
  };
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
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
  await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
};
