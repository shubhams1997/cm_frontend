// CATEGORY CALLS

import { API } from "../../backend";

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

// delete category
export const deleteCategory = (userId, categoryId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// create brand
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

// delete brand
export const deleteBrand = (userId, brandId, token) => {
  return fetch(`${API}/brand/${brandId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// get all categories
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

// get all Brand
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

// Product helper functions ----------------------------------------------------
// create product
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// get all products
export const getAllProducts = (token, limit, page) => {
  return fetch(`${API}/products?limit=${limit}&page=${page}`, {
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

// get a product
export const getProduct = (productId, token) => {
  return fetch(`${API}/product/${productId}`, {
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

// update product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// Complaints helper functions ----------------------------------------------------
// create complaint
export const createComplaint = (userId, token, complaint) => {
  return fetch(`${API}/complaint/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(complaint),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// get all complaints
export const getAllComplaints = (token, limit, page) => {
  return fetch(`${API}/complaints?limit=${limit}&page=${page}`, {
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

// get a complaint
export const getComplaint = (complaintId, token) => {
  return fetch(`${API}/complaint/${complaintId}`, {
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

// update product
export const updateComplaint = (complaintId, userId, token, complaint) => {
  return fetch(`${API}/complaint/${complaintId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(complaint),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
