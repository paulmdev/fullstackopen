import axios from "axios";

const baseUrl = "http://localhost:3002/persons";

/**
 * Gets an array of contacts from the server.
 * @returns {Promise<{id: number; name: string; number: string}[]>}
 */
const getAll = () => axios.get(baseUrl).then((response) => response.data);

/**
 * Adds a new contact to the database.
 * @param contact {{name: string; number: string}}
 * @returns {Promise<{id: number; name: string; number: number}>}
 */
const createContact = (contact) =>
  axios.post(baseUrl, contact).then((response) => response.data);

/**
 * Gets the contact that the given id belongs.
 * @param id {number}
 * @returns {Promise<{id: number; name: string; number: string}>}
 */
const getOne = (id) =>
  axios.get(`${baseUrl}/${id}`).then((response) => response.data);

/**
 * Changes the data of a contact whose id matches the given id.
 * @param id {number}
 * @param contact {{id?: number; name: string; number: string}}
 * @returns {Promise<{id: number; name: string; number: string}>}
 */
const changeOne = (id, contact) =>
  axios.put(`${baseUrl}/${id}`, contact).then((response) => response.data);

/**
 * Deletes a contact whose id matches the given id.
 * @param id {number}
 * @returns {Promise<void>}
 */
const deleteOne = (id) => axios.delete(`${baseUrl}/${id}`);

export default {
  getAll,
  createContact,
  getOne,
  changeOne,
  deleteOne,
};
