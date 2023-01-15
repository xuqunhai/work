import request from '@/utils/request'
export const getUsers = () =>
  request({
    url: '/api/user',
    method: 'get'
  })
