import Resource from '../../api/resource';
import request from '../../utils/request';

class Dashboard extends Resource {
  constructor() {
    super('dashboard');
  }

  counts(){
    return request({
      url: '/dashboard/counts',
      method: 'post'
    });
  }

  faculty(){
    return request({
      url: '/dashboard/faculty',
      method: 'post'
    });
  }

  // Activities(){
  //   return request({
  //     url: '/dashboard/activities',
  //     method: 'post'
  //   });
  // }


  paymentPerMonth(){
    return request({
      url: '/dashboard/payment',
      method: 'post'
    });
  }
  
  
  projectDetails(id,payload){
    return request({
      url: `/dashboard/${id}`,
      method: 'post',
      data: payload
    });
  }
  

/**
 * con
 */
 
}

export { Dashboard as default };
