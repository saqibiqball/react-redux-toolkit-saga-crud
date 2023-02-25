import axios from "axios";
const url = "http://localhost:3004/users";
export const fetchUsers = () => axios.get(url);
export const fetchUser = (id) => axios.get(`${url}/${id}`);
export const addUser = (user) => axios.post(url, user);
export const deleteUser = (id) => axios.delete(`${url}/${id}`);
export const editUser = (id, user) => axios.put(`${url}/${id}`, user);
