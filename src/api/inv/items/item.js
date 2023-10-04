import Resource from "@/api/resource";
import request from "@/utils/request";

class Item extends Resource {
    constructor() {
        super('items');
    }
}

export {Item as default};
