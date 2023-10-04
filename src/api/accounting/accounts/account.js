import Resource from "@/api/resource";
import request from "@/utils/request";

class Account extends Resource {
  constructor() {
    super("Acc");
  }

  getTree() {
    return request({
      url: `/accounts/tree`,
      method: "post",
    });
  }
}

export { Account as default };
