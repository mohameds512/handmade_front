import Resource from "@/api/resource";
import request from "@/utils/request";

class Client extends Resource {
    constructor() {
        super('clients');
    } 
}

export {Client as default};
