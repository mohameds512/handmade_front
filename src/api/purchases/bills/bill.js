import Resource from "@/api/resource";
import request from "@/utils/request";

class Bill extends Resource {
    constructor() {
        super('bills');
    }
    createBill() {
        return request({
            url: `bills/create`,
            method: 'get',
        })
    }
    getVendor(payload) {
        return request({
            url: `bills/search-vendor`,
            method: 'post',
            data:payload,
        })
    }
    getProducts(payload) {
        return request({
            url: `bills/search-item`,
            method: 'post',
            data: payload,
        })
    }
    saveBill(payload) {
        return request({
            url: `/bills/store`,
            method: 'put',
            data: payload,
        })
    }
}

export {Bill as default};
