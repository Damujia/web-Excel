import axios from './axiosinit'
// 生产信息
export const getCurrentOrderInfo = (lineId) => {
  return axios({
    url: 'getCurrentOrderInfo',
    method: 'get',
    params: { lineId }
  })
}
export const getERPOrderDetail = (orderNo, startDate, endDate) => {
  return axios({
    url: 'getERPOrderDetail',
    method: 'get',
    params: { orderNo, startDate, endDate }
  })
}
export const setCurrentOrderInfo = (orderNo, lineIds) => {
  return axios({
    url: `setCurrentOrderInfo?orderNo=${orderNo}&lineIds=${lineIds}`,
    method: 'get'
  })
}
export const deleteCurrentOrderInfo = (lineIds) => {
  return axios({
    url: `deleteCurrentOrderInfo?lineIds=${lineIds}`,
    method: 'get'
  })
}
// 不良参数
export const addBadArgs = (lineIds, badName) => {
  return axios({
    url: `addBadArgs?lineIds=${lineIds}&badName=${badName}`,
    method: 'get'
  })
}
export const getBadArgs = (lineId) => {
  return axios({
    url: 'getBadArgs',
    method: 'get',
    params: { lineId }
  })
}
export const updateBadArgs = (data) => {
  return axios({
    url: 'updateBadArgs',
    method: 'post',
    data
  })
}
export const deleteBadArgs = (data) => {
  return axios({
    url: `deleteBadArgs?ids=${data}`,
    method: 'get'
  })
}
// 生产进度
export const getCurrentProcess = (orderNo, startDate, endDate) => {
  return axios({
    url: 'getCurrentProcess',
    method: 'get',
    params: { orderNo, startDate, endDate }
  })
}
// 不良记录
export const getOrderBadDetail = (orderNo, lineId, badName, startTime, endTime) => {
  return axios({
    url: 'getOrderBadDetail',
    method: 'get',
    params: { orderNo, lineId, badName, startTime, endTime }
  })
}
export const upOrderBadDetail = (data) => {
  return axios({
    url: 'upOrderBadDetail',
    method: 'post',
    data
  })
}
export const deleteOrderBadDetail = (data) => {
  return axios({
    url: `deleteOrderBadDetail?ids=${data}`,
    method: 'get'
  })
}
// 生产详情
export const getOrderInfoTimePeriod = (lineId, orderNo, startDate, endTDate) => {
  return axios({
    url: 'getOrderInfoTimePeriod',
    method: 'get',
    params: { lineId, orderNo, startDate, endTDate }
  })
}
export const setOrderInfoTimePeriod = (data) => {
  return axios({
    url: 'setOrderInfoTimePeriod',
    method: 'post',
    data
  })
}
export const deleteOrderInfoTimePeriod = (ids, type) => {
  return axios({
    url: `deleteOrderInfoTimePeriod?ids=${ids}&types=${type}`,
    method: 'get'
  })
}
// 班次信息
export const addShiftInfo = (data) => {
  return axios({
    url: 'addShiftInfo',
    method: 'post',
    data
  })
}
export const updateShiftInfo = (data) => {
  return axios({
    url: 'updateShiftInfo',
    method: 'post',
    data
  })
}
export const getShiftInfo = (shiftName) => {
  return axios({
    url: 'getShiftInfo',
    method: 'get',
    params: { shiftName }
  })
}
export const deleteShiftInfo = (data) => {
  return axios({
    url: `deleteShiftInfo?ids=${data}`,
    method: 'get'
  })
}
