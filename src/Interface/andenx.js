import axios from './axiosinit.js'
// 报警参数
export const getAlarmArgs = (alarmName) => {
  return axios({
    url: 'getAlarmArgs',
    method: 'get',
    params: { alarmName }
  })
}
export const addAlarmArgs = (data) => {
  return axios({
    url: 'addAlarmArgs',
    method: 'post',
    data
  })
}
export const upAlarmArgs = (data) => {
  return axios({
    url: 'upAlarmArgs',
    method: 'post',
    data
  })
}
export const deleteAlarmArgs = (data) => {
  return axios({
    url: `deleteAlarmArgs?alarmNames=${data}`,
    method: 'get'
  })
}
// 二级报警
export const getAlarmContent = (alarmName) => {
  return axios({
    url: 'getAlarmContent',
    method: 'get',
    params: { alarmName }
  })
}
export const addAlarmContent = (data) => {
  return axios({
    url: 'addAlarmContent',
    method: 'post',
    data
  })
}
export const deleteAlarmContent = (data) => {
  return axios({
    url: `deleteAlarmContent?alarmNames=${data.alarmNames}&alarmContents=${data.alarmContents}`,
    method: 'get'
  })
}
// 当前报警
export const getAlarmInfo = (siteId) => {
  return axios({
    url: 'getAlarmInfo',
    method: 'get',
    params: { siteId }
  })
}
export const deleteAlarmInfo = (ids) => {
  return axios({
    url: `deleteAlarmInfo?ids=${ids}`,
    method: 'get'
  })
}
// 历史报警
export const getAlarmInfohis = (siteId, startTime, endTime) => {
  return axios({
    url: 'getAlarmInfo_his',
    method: 'get',
    params: { siteId, startTime, endTime }
  })
}
export const deleteAlarmInfohis = (data) => {
  return axios({
    url: `deleteAlarmInfo_his?ids=${data}`,
    method: 'get'
  })
}
// 采集点报警参数
export const addAlarmArgsCollectionArgs = (data) => {
  return axios({
    url: 'addAlarmArgsCollectionArgs',
    method: 'post',
    data
  })
}
export const updateAlarmArgsCollectionArgs = (data) => {
  return axios({
    url: 'updateAlarmArgsCollectionArgs',
    method: 'post',
    data
  })
}
export const getAlarmArgsCollectionArgs = (lineId) => {
  return axios({
    url: 'getAlarmArgsCollectionArgs',
    method: 'get',
    params: { lineId }
  })
}
export const deleteAlarmArgsCollectionArgs = (data) => {
  return axios({
    url: `deleteAlarmArgsCollectionArgs?ids=${data}`,
    method: 'get'
  })
}
