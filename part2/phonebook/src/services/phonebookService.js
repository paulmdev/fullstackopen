import axios from "axios";

const baseUrl = "http://localhost:3002/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const createContact = (contact) =>
  axios.post(baseUrl, contact).then((response) => response.data);

const getOne = (id) =>
  axios.get(`${baseUrl}/${id}`).then((response) => response.data);

const changeOne = (id, contact) => axios.put(`${baseUrl}/${id}`, contact);

const deleteOne = (id) => axios.delete(`${baseUrl}/${id}`);

export default {
  getAll,
  createContact,
  getOne,
  changeOne,
  deleteOne,
};
