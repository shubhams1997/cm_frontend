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
