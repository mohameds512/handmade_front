import request from '@/utils/request';

export function getLookups(query) {
  return request({
    url: '/lookups/get',
    method: 'post',
    data: query,
  });
}
