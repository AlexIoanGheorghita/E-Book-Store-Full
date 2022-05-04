import axios from "axios";

export const axios_ = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        get: {'Content-Type': 'application/json'},
        post: {'Content-Type': 'application/json'}
    },
    withCredentials: true
});