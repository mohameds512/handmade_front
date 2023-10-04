import Resource from "@/api/resource";
import request from "@/utils/request";

class Warehouse extends Resource {
    constructor() {
        super('warehouses');
    }
}

export {Warehouse as default};
