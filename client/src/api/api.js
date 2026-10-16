import axios from 'axios';

// API 서버에 기본 URL 지정
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})

export default api;