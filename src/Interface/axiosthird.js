import axios from './axiosinit'
// 三楼部件
export const addPartArgs3 = (data) => {
  return axios({
    url: 'addPartArgs3',
    method: 'post',
    data
  })
}
export const updatePartArgs3 = (data) => {
  return axios({
    url: 'updatePartArgs3',
    method: 'post',
    data
  })
}
export const getPartArgs3 = (partType, partCode, partModel) => {
  return axios({
    url: 'getPartArgs3',
    method: 'get',
    params: { partType, partCode, partModel }
  })
}
export const deletePartArgs3 = (ids) => {
  return axios({
    url: `deletePartArgs3?ids=${ids}`
  })
}
// 生产详情
export const getOrderInfoDetailRecord3 = (orderNo, customer, dlqSN, startTime, endTime) => {
  return axios({
    url: 'getOrderInfoDetail_Record3',
    method: 'get',
    params: { orderNo, customer, dlqSN, startTime, endTime }
  })
}
export const getOrderInfoDetail3 = (orderNo) => {
  return axios({
    url: 'getOrderInfoDetail3',
    method: 'get',
    params: { orderNo }
  })
}
export const deleteOrderInfoDetail3 = (ids) => {
  return axios({
    url: `deleteOrderInfoDetail3?ids=${ids}`
  })
}
