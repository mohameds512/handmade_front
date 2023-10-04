import Resource from "@/api/resource";
import request from "@/utils/request";

class Revenue extends Resource {
    constructor() {
        super('revenues');
    }
}

export {Revenue as default};
