import request from '@/utils/request'

/**
 * Simple RESTful resource class
 */
class Resources {
    constructor(uri) {
        this.uri = uri
    }

    index(query) {
        return request({
            url: `/${this.uri}`,
            method: 'get',
            data: query,
        })
    }

    list(query) {
        return request({
            url: `/${this.uri}/list`,
            method: 'post',
            data: query,
        })
    }

    create(query) {
        return request({
            url: `/${this.uri}/create`,
            method: 'get',
            data: query,
        })
    }
    store(query) {
        return request({
            url: `/${this.uri}`,
            method: 'post',
            data: query,
        })
    }

    show(payload, params = {}) {
        if (typeof payload === 'object') {
            return request({
                url: `/${this.uri}/${payload.id}/${payload.type}`,
                method: 'get',
            })
        }
        return request({
            url: `/${this.uri}/${payload}`,
            method: 'get',
            params,
        })
    }

    update(id, query) {
        return request({
            url: `/${this.uri}/${id}/edit }`,
            method: 'get',
            data: query,
        })
    }

    put(id, query) {
        return request({
            url: `/${this.uri}${id ? `/${id}` : ''}`,
            method: 'put',
            data: query,
        })
    }

    remove(id) {
        return request({
            url: `/${this.uri}/${id}`,
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

export {Resources as default}
