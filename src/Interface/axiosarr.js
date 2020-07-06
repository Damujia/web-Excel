import axios from './axiosinit'
// 登录
export const login = (workerNo, psw) => {
  return axios({
    url: 'login',
    params: { workerNo, psw }
  })
}
// 激活码
export const activation = (data) => {
  return axios({
    url: `activation?activation=${data}`,
    method: 'get'
  })
}
// 用户信息
export const getPersonBaseInfo = (workerNo, workerName) => {
  return axios({
    url: 'getPersonBaseInfo',
    method: 'get',
    params: { workerNo, workerName }
  })
}
export const addPersonBaseInfo = (data) => {
  return axios({
    url: 'addPersonBaseInfo',
    method: 'post',
    data
  })
}
export const updatePersonBaseInfo = (data) => {
  return axios({
    url: 'addPersonBaseInfo',
    method: 'post',
    data
  })
}
export const deletePersonBaseInfo = (data) => {
  return axios({
    url: `deletePersonBaseInfo?workerNos=${data}`,
    method: 'get'
  })
}
// 部门信息
export const getDepartmentInfo = (departmentId) => {
  return axios({
    url: 'getDepartmentInfo',
    method: 'get',
    params: { departmentId }
  })
}
export const addDepartmentInfo = (data) => {
  return axios({
    url: 'addDepartmentInfo',
    method: 'post',
    data
  })
}
export const updateDepartmentInfo = (data) => {
  return axios({
    url: 'addDepartmentInfo',
    method: 'post',
    data
  })
}
export const deleteDepartmentInfo = (data) => {
  return axios({
    url: `deleteDepartmentInfo?departmentIds=${data}`,
    method: 'get'
  })
}
// 登录权限
export const getUsersInfo = (workerNo) => {
  return axios({
    url: 'getUsersInfo',
    method: 'get',
    params: { workerNo }
  })
}
export const addUsersInfo = (data) => {
  return axios({
    url: `addUsersInfo?workerNo=${data.workerNo}&classTypes=${data.classTypes}&createPerson=${data.createPerson}`,
    method: 'get'
  })
}
export const deleteUsersInfo = (workerNos, classTypes) => {
  return axios({
    url: `deleteUsersInfo?workerNos=${workerNos}&classTypes=${classTypes}`,
    method: 'get'
  })
}
