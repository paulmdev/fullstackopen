import axios from "axios";

const baseUrl = 'http://localhost:3002';

const getAll = () => axios.get(`${baseUrl}/persons`).then(response => response.data);

const createContact = (contact) => axios.post(`${baseUrl}/persons`, contact);

const getOne = (id) => axios.get(`${baseUrl}/persons/${id}`).then(response => response.data);

const changeOne = (id, contact) => axios.put(`${baseUrl}/persons/${id}`, contact);

export default {
    getAll,
    createContact,
    getOne,
    changeOne
}
