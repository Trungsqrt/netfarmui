import axios from 'axios';

const API_URL = 'https://6351413b3e9fa1244e59b320.mockapi.io';
// const API_URL = 'https://localhost:44303/api';

const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-type': 'application/json',
    },
});

export default axiosClient;
