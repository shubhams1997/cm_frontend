const { API } = require('../../backend');

// create Finance---------------------------------------------------------
export const createFinance = (userId, token, finance) => {
	return fetch(`${API}/finance/create/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(finance)
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

// get all Finances
export const getAllFinance = (token, seriesId) => {
	return fetch(`${API}/finances/${seriesId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// get a single Finance statement

export const getFinance = (token, financeId) => {
	return fetch(`${API}/finance/${financeId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// Finance Entries---------------------------------------------------------
// get Entries
export const getEntries = (token, financeId) => {
	return fetch(`${API}/financeEntries/${financeId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// create Entry
export const createEntry = (userId, token, entry) => {
	return fetch(`${API}/financeEntry/create/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(entry)
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

// Series ---------------------------------------------------------
// create series
export const createSeries = (userId, token, series) => {
	return fetch(`${API}/series/create/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ name: series })
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

// get all series
export const getSeries = (token) => {
	return fetch(`${API}/series`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

export const updateSeries = (token, seriesId, userId, seriesName) => {
	return fetch(`${API}/series/${seriesId}/${userId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ name: seriesName })
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};
