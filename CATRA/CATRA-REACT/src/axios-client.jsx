import axios from "axios";
import { access_token_key } from "./auth-utils";

const axiosClient = axios.create({
    baseURL: `http://127.0.0.1:8000/api`,
    headers: {
        Accept: "application/json",
    },
    method: "no-cors",
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(access_token_key);

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        } else {
            console.log(
                "no se proporcionó token para " +
                    config.url +
                    ", método " +
                    config.method,
            );
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axiosClient;
