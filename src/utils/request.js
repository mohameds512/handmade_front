import { getToken, isLogged, removeToken, deleteToken, removeAuth, setLogged, notHasPermissions } from '../utils/auth';
import router from '../router/index';
import store from '@/store/index';
import Swal from 'sweetalert2'

const axios = require('axios');
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 150000000, // Request timeout
});

// Request intercepter
service.interceptors.request.use(
    config => {
        const token = isLogged();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + getToken();
            config.headers['Content-Type'] = 'application/json';
            config.headers['Accept'] = 'application/json';
        }
        return config;
    },
    error => {
        // Do something with request error
        let message = error.message;
        if (error.response.data && error.response.data.errors) {
            message = error.response.data.errors;
        } else if (error.response.data && error.response.data.error) {
            message = error.response.data.error;
        }
        if (error.response.status !== 401 && error.response.status !== 404) {}
        Promise.reject(error);
    }
);

// response pre-processing
service.interceptors.response.use(
    response => {
        // if (response.headers.authorization) {
        //   setLogged(response.headers.authorization);
        //   response.data.token = response.headers.authorization;
        // }
        // console.log(process.env.VUE_APP_BASE_URL);
 
        return response.data;
    },
    error => {
        if (!error.response) {
            router.push({ name: 'misc-error-connections' });
        }
        let message = error.message;
        if (error.response.data && error.response.data.errors) {
            message = error.response.data.errors;
        } else if (error.response.data && error.response.data.error) {
            message = error.response.data.error;
        }
        if (error.response.status !== 401 && ((error.response.status !== 404 && message) || (error.response.status !== 404 && message.name))) {
            // if (message.name) {
            //     console.log(message)
            // } else {
            //
            // }
            let text = '';
        }
        if ((error.response.status === 404 && !message) || (error.response.status === 404 && !message.name)) {
            router.push({ name: 'error-404' });
        }
        if (error.response.status === 401) {
            if (isLogged()) {
                router.push({ name: 'misc-not-authorized' });
            } else {
                router.push({ name: 'auth-login' });
            }
        }
        return Promise.reject(error);
    }
);

export default service;
