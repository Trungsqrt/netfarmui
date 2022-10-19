import axios from "axios";
import { API_URL } from "./apis";

const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json",
    },
});

export default axiosClient;
