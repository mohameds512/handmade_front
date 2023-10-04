import Resource from "@/api/resource";
import request from "@/utils/request";

class Action extends Resource {
    constructor() {
        super('actions');
    }
}

export {Action as default};
