const { API } = require("../../backend");

export const getAllUsers = (userId, token) => {
  return fetch(`${API}/users/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateUser = (userId, updateUserId, user, token) => {
  return fetch(`${API}/user/${userId}/${updateUserId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: user.json(),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// CATEGORY CALLS
// create category
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: category }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const createBrand = (userId, token, brand) => {
  return fetch(`${API}/brand/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: brand }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getCategories = (token) => {
  return fetch(`${API}/categories`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
export const getBrands = (token) => {
  return fetch(`${API}/brands`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
