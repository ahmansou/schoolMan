import { useEffect, useState } from 'react';
import axios from 'axios';

export const useData = (collection) => {
	const [docs, setDocs] = useState([]);

	useEffect(() => {
		let token = JSON.parse(localStorage.getItem('authToken'));

		if (token && collection) {
			axios.get(`http://localhost:5000/${collection}`, {
				headers: {
					'authToken': token.token.authToken,
					'userType': token.token.userType
				}
			})
			.then((res) => {
				const allDocs = res.data;
				setDocs(allDocs);
			})
			.catch((err) => {
				console.error(err.message)
				return { err };
			});
		}
	}, [collection]);

	return { docs };
}

export const useDataGetOne = (collection, id) => {
	const [docs, setDocs] = useState(undefined);

	useEffect(() => {
		let token = JSON.parse(localStorage.getItem('authToken'));

		if (token && collection) {
			axios.get(`http://localhost:5000/${collection}/${id}`, {
				headers: {
					'authToken': token.token.authToken,
					'userType': token.token.userType
				}
			})
			.then((res) => {
				const allDocs = res.data;
				setDocs(allDocs);
			})
			.catch((err) => {
				console.error(err.message)
				return err;
			});
		}
	}, [collection, id]);

	return docs;
}

export const useDataAdd = async (collection, newEl) => {
	let token = JSON.parse(localStorage.getItem('authToken'));
	if (token) {
		let res = await axios.post(`http://localhost:5000/${collection}/add`, newEl, {
			headers: {
				'authToken': token.token.authToken,
				'userType': token.token.userType
			}
		}).catch((err) => {return err})
		return res;
	}
}

export const useDataRemove = async (collection, elId) =>  {
	let token = JSON.parse(localStorage.getItem('authToken'));
	if (token) {
		let res = await axios.delete(`http://localhost:5000/${collection}/` + elId, {
			headers: {
				'authToken': token.token.authToken,
				'userType': token.token.userType
			}
		}).catch((err) => {return err});
		return res;
	}
	
}

export const GetAllData = async (col, setDocs) => {
	let token = JSON.parse(localStorage.getItem('authToken'));

	if (token && col) {
		let res = axios.get(`http://localhost:5000/${col}`, {
			headers: {
				'authToken': token.token.authToken,
				'userType': token.token.userType
			}
		})
		.then((res) => {
			const allDocs = res.data;
			setDocs(allDocs);
		})
		.catch((err) => {
			return err;
		});
		return (res);
	}
}