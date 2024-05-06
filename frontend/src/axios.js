import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your backend base URL
  withCredentials: true, // Send cookies with requests
});

export default instance;
