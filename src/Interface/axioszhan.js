import axios from './axiosinit'
// 产线信息
export const getLineInfo = (lineId, lineName) => {
  return axios({
    url: 'getLineInfo',
    method: 'get',
    params: { lineId, lineName }
  })
}
export const addLineInfo = (data) => {
  return axios({
    url: 'addLineInfo',
    method: 'post',
    data: data
  })
}
export const deleteLineInfo = (data) => {
  return axios({
    url: `deleteLineInfo?lineIds=${data}`,
    method: 'get'
  })
}
export const upLineInfo = (data) => {
  return axios({
    url: 'upLineInfo',
    method: 'post',
    data: data
  })
}
// 设置节拍时间
export const setMeterTime = (lineIds, meterTime) => {
  return axios({
    url: `setMeterTime?lineIds=${lineIds}&meterTime=${meterTime}`,
    method: 'get'
  })
}
// 设置延时时间
export const setDelayTime = (lineIds, delayTime) => {
  return axios({
    url: `setDelayTime?lineIds=${lineIds}&delayTime=${delayTime}`,
    method: 'get'
  })
}
// 站点信息
export const getSiteInfo = (lineId, lineName, siteId, siteName) => {
  return axios({
    url: 'getSiteInfo',
    method: 'get',
    params: { lineId, lineName, siteId, siteName }
  })
}
export const addSiteInfo = (data) => {
  return axios({
    url: 'addSiteInfo',
    method: 'post',
    data: data
  })
}
export const deleteSiteInfo = (data) => {
  return axios({
    url: `deleteSiteInfo?siteIds=${data}`,
    method: 'get'
  })
}
export const updateSiteInfo = (data) => {
  return axios({
    url: 'updateSiteInfo',
    method: 'post',
    data: data
  })
}
export const setNotify = (siteIds, notify) => {
  return axios({
    url: `setNotify?siteIds=${siteIds}&notify=${notify}`,
    method: 'get'
  })
}
