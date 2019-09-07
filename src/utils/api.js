import axios from 'axios'

const token = localStorage.getItem('user-token');

export default axios.create({
    baseURL: process.env.VUE_APP_API_URL + '/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    }
});
