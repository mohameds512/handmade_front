import request from '../../utils/request';

export function login(data) {
    return request({
        url: 'admin/login',
        method: 'post',
        data: data,
    });
}


export function logout(data) {
    return request({
        url: '/users/logout',
        method: 'post',
        data: data,
    });
}


export function Register(data) {
    return request({
        url: '/register',
        method: 'post',
        data:data
    })
}
