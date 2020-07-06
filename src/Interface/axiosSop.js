import axios from './axiosinit'
export const addEsopInfo = (data) => {
  return axios({
    url: 'addEsopInfo',
    method: 'post',
    data: data
  })
}
export const getSopInfos = (proCode) => {
  return axios({
    url: 'getSopInfos',
    method: 'get',
    params: { proCode }
  })
}
export const deleteEsopInfo = (ids) => {
  return axios({
    url: `deleteEsopInfo?ids=${ids}`,
    method: 'get'
  })
}
