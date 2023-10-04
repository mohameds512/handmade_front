import Resource from "@/api/resource";
import request from "@/utils/request";

class Product extends Resource {
    constructor() {
        super('products');
    }

    getCategories() { 
        return request({
            url: `/admin/category/get_categories`,
            method: 'post',
        })
    }
    
    getProducts() { 
        return request({
            url: `/admin/item/admin_get_items`,
            method: 'post',
        })
    }
    getArchivedProducts() { 
        return request({
            url: `/admin/item/admin_get_archived_items`,
            method: 'post',
        })
    }

    getOrderedItems() { 
        return request({
            url: `/admin/order/adminOrderedItems`,
            method: 'post',
        })
    }

    addProduct(id,payload) {
        if (id) {
            return request({
                url: `/admin/item/storeItem/${id}`,
                method: 'post',
                data: payload,
            })
        }else{
            return request({
                url: `/admin/item/storeItem`,
                method: 'post',
                data: payload,
            })
        }
        
    }
    deleteProduct(id,payload) {
        return request({
            url: `/admin/item/deleteItem/${id}`,
            method: 'post',
            data: payload,
        })
        
    }
    restoreProduct(id,payload) {
        return request({
            url: `/admin/item/restoreItem/${id}`,
            method: 'post',
            data: payload,
        })
        
    }
    approveOrderedItems(payload) {
        return request({
            url: `/admin/order/approve`,
            method: 'post',
            data: payload,
        })
        
    }
}

export {Product as default};
