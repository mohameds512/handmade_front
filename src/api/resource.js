import request from '@/utils/request'

/**
 * Simple RESTful resource class
 */
class Resource {
    constructor(uri) {
        this.uri = uri
    }

    list(query) {
        return request({
            url: `admin/listUsers`,
            method: 'post',
            data: query,
        })
    }

    listRoles(query) {
        return request({
            url: `admin/listRoles`,
            method: 'post',
            data: query,
        })
    }

    get(payload, params = {}) {
        if (typeof payload === 'object') {
            return request({
                url: `admin/users/${payload.id}`,
                method: 'post',
            })
        }
        return request({
            url: `admin/users/${payload}`,
            method: 'post',
            params,
        })
    }

    
    getRoles(payload, params = {}) {
        
        if (typeof payload === 'object') {
            return request({
                url: `admin/role/${payload.id}`,
                method: 'put',
            })
        }
        return request({
            url: `admin/role/${payload}`,
            method: 'put',
            params,
        })
    }

    put(id, query) {
        if(id == null){

            return request({
                url: `admin/addRole`,
                method: 'put',
                data: query,
            })
        }else{  
            return request({
                url: `admin/addRole/${id}`,
                method: 'put',
                data: query,
            })
        }
        
    }

    remove(id) {
        return request({
            url: `/admin/deleteRole/${id}`,
            method: 'delete',
        })
    }

    restore(id) {
        return request({
            url: `/${this.uri}/restore/${id}`,
            method: 'post',
        })
    }
}

export {Resource as default}
