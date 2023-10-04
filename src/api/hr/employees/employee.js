import Resource from '../../../api/resource';
import request from '../../../utils/request';

class Employee extends Resource {
    constructor() {
        super('employees');
    }

    createEmployee() {
        return request({
            url: `/employees/create`,
            method: 'get',
        })
    }
    saveEmployee(id,payload) {
        if (id) {
            return request({
                url: `/employees/${id}`,
                method: 'put',
                data: payload,
            })
        }else{
            return request({
                url: `/employees`,
                method: 'put',
                data: payload,
            })
        }
    }

    getEmployee(id) {
        return request({
            url: `/employees/access/${id}`,
            method: 'get'
        })
    }


}

export {Employee as default};
