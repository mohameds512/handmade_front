// import Resource from '../../../api/resource';
// import request from '../../../utils/request';

import Resource from "../resource";
import request from "../../utils/request";
class ECB extends Resource {
  constructor() {
    super('ecb');
  }

  edit_project(id,payload) {
    if(id == null){
    return request({
        url: `/save`,
      method: "post",
      data: payload
    });}
else
{

    return request({
        url: `/save/${id}`,
      method: "post",
      data: payload
    });
}
  }


  save_contractor(id,payload) {
    if(id == null){
    return request({
        url: `/save/contractor`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `/save/contractor/${id}`,
      method: "put",
      data: payload
    });
}
  }


  
  save_contract(id,payload) {
    if(id == null){
    return request({
        url: `/save/contract`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `/save/contract/${id}`,
      method: "put",
      data: payload
    });
}
  }


  save_raw_material(id,payload) {
    if(id == null){
    return request({
        url: `/save/material_data`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `/save/material_data/${id}`,
      method: "put",
      data: payload
    });
}
  }


  save_equipment(id,payload) {
    if(id == null){
    return request({
        url: `/save/equipment`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `/save/equipment/${id}`,
      method: "put",
      data: payload
    });
}
  }

  save_activity(id,payload) {
    if(id == null){
    return request({
        url: `/save/activity`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `/save/activity/${id}`,
      method: "put",
      data: payload
    });
}
  }


  save_division(id,payload) {
    if(id == null){
    return request({
        url: `projects/save/division`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `projects/save/division/${id}`,
      method: "put",
      data: payload
    });
}
  }


 


  save_work_statement(id,payload) {
    if(id == null){
    return request({
        url: `save/work_statement`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `save/work_statement/${id}`,
      method: "put",
      data: payload
    });
}
  }






  save_consultant(id,payload) {
    if(id == null){
    return request({
        url: `/save/consultant`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `/save/consultant/${id}`,
      method: "put",
      data: payload
    });
}

  }

  save_specialization(id,payload) {
    if(id == null){
    return request({
        url: `/save/specialization`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `/save/specialization/${id}`,
      method: "put",
      data: payload
    });
}


  }

  save_man_power_category(id,payload) {
    if(id == null){
    return request({
        url: `/save/save_man_power_category`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `/save/save_man_power_category/${id}`,
      method: "put",
      data: payload
    });
}


  }


  save_man_power(id,payload) {
    if(id == null){
    return request({
        url: `save/man_power`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `save/man_power/${id}`,
      method: "put",
      data: payload
    });
}


  }

  
  save_work_progress(id,payload) {
    if(id == null){
    return request({
        url: `/save/work_progress`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `/save/work_progress/${id}`,
      method: "put",
      data: payload
    });
}


  }


  save_earned_value(id,payload) {
    if(id == null){
    return request({
        url: `/save/earned_value`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `/save/earned_value/${id}`,
      method: "put",
      data: payload
    });
}


  }



  save_check_request(id,payload) {
    if(id == null){
    return request({
        url: `/save/check_request`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `/save/check_request/${id}`,
      method: "put",
      data: payload
    });
}


  }




  save_operational_graphics(id,payload) {
    if(id == null){
    return request({
        url: `/save/operational_graphics`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `/save/operational_graphics/${id}`,
      method: "put",
      data: payload
    });
}


  }

  save_equipment_productivity(id,payload) {
    if(id == null){
    return request({
        url: `/save/equipment_productivity`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `/save/equipment_productivity/${id}`,
      method: "put",
      data: payload
    });
}


  }



  save_exports(id,payload) {
    if(id == null){
    return request({
        url: `/save/exports`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `/save/exports/${id}`,
      method: "put",
      data: payload
    });
}


  }


  save_problems(id,payload) {
    if(id == null){
    return request({
        url: `/save/problems`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `/save/problems/${id}`,
      method: "put",
      data: payload
    });
}

  }


  save_cash_flow(id,payload) {
    if(id == null){
    return request({
        url: `/save/cash_flow`,
      method: "put",
      data: payload
    });}
else
{

    return request({
      url: `/save/cash_flow/${id}`,
      method: "put",
      data: payload
    });
}
  }

viewImg(id,payload) {

  return request({
      url: `/dashboard/gallery/${id}`,
    method: "post",
    data: payload
   
  });
}










  save_project_image(id,payload) {
    if(id == null){
    return request({
        url: `/store/img`,
      method: "post",
      data: payload,
      headers: { 'Content-Type': 'multipart/form-data' },
    });}
else
{

    return request({
      url: `/store/img/${id}`,
      method: "post",
      data: payload
    });
}
  }
  list(id) {
    if (id == null){
    return request({
    
      url: `/getProjects`,
      method: "post",

    })}
    else {
      return request
      ({
    
        url: `/getProjects/${id}`,
        method: "post",
  
      })
    
  }}
  listcontractors(id) {
    if (id == null){

      return request({
        url: `/getContractors`,
        method: "post",
      });
    }

    else
    {
      
      return request({
        url: `/getContractors/${id}`,
        method: "post",
      });
    }
 
  }
//   edit_project(payload) {
//     return request({
//       url: `/save/3`,
//       method: "post",
//       data: payload
//     });
//   }
}

export { ECB as default };
