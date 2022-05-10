import axios from "axios";

export const axios_ = axios.create({
    baseURL: 'https://rauebookstore.azurewebsites.net:8080',
    headers: {
        get: {'Content-Type': 'application/json'},
        post: {'Content-Type': 'application/json'}
    },
    withCredentials: true
});