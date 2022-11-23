import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

export function login(email, password) {
    return axios.post('/customuser/login/', { email, password })
}

export function register(email, password, username) {
    return axios.post('/customuser/register/', { email, password, username })
}

export function new_access(refresh_token) {
    return axios.post('/api/token/refresh/', { refresh: refresh_token })
}

export function tasklist() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`
    return axios.get('/task/',)
}

export function updatetask(detail) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`
    return axios.patch('/task/', { detail })
}

export function createtask(detail) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`
    return axios.post('/task/', { detail })
}

export function deletetask(task_id) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`
    return axios.post('/task/delete/', { task_id })
}
