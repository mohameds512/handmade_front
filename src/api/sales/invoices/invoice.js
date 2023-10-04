import Resource from "@/api/resource";
import request from "@/utils/request";

class Invoice extends Resource {
    constructor() {
        super('invoices');
    }
}

export {Invoice as default};
