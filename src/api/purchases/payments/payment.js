import Resource from "@/api/resource";
import request from "@/utils/request";

class Payment extends Resource {
    constructor() {
        super('payments');
    }
}

export {Payment as default};
