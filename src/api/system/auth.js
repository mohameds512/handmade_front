import request from '../../utils/request';

export function login(data) {
    return request({
        url: 'admin/login',
        method: 'post',
        data: data,
    });
}


export function logout(token) {
    return request({
        url: '/users/logout',
        method: 'post',
    });
}


export function Register(data) {
    return request({
        url: '/register',
        method: 'post',
        data:data
    })
}
