import axios from 'axios';

const API = axios.create({
    baseURL: "https://zm2.itwp.ru:8081",
    headers: {
        'Authorization': localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : null,
    }
});

export const server = axios.create({
    baseURL: "https://zm2.itwp.ru:8081",
})

export default API

