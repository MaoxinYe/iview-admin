import axios from '@/libs/api.request'
import myrequest from '@/libs/myrequest'
import service from '@/libs/request'

export const getMethodData = () => {
  return myrequest.request({
    url: '/api/job/configs',
    method: 'get'
  })
}

export const getTableData = () => {
  return myrequest.request({
    url: '/api/file/',
    method: 'get'
  })
}

export const downloadFileById = (file_url) => {
  const data={file_url}
  console.log(data)
  console.log('上面答应下data')
  return myrequest.request({
    url: '/api/file/download',
    method: 'post',
    data:data
  })
}

export const getTaskFileList = (file_url) => {
  const data={file_url}
  return myrequest.request({
    url: '/api/file/url_status',
    method: 'post',
    data:data
  })
}

export const getTaskDataByID = (id) => {
  return myrequest.request({
    url: '/api/job/status',
    method: 'get',
    params:{
      job_id:id
    }
  })
}

export const getJobData = () => {
  return myrequest.request({
    url: '/api/job/',
    method: 'get'
  })
}

export const deleteFile = (id) => {
  console.log('进入deleteFile'+id)
  return myrequest.request({
    url: '/api/file/delete',
    params: {
      file_id: id
    },
    method: 'get'
  })
}

export const downloadFile = (id) => {
  console.log('进入downloadFile'+id)
  return myrequest.request({
    url: '/api/file/download',
    params: {
      file_id: id
    },
    method: 'get'
  })
}

export function  getFileData(){
  console.log('99999999')
  return service({
    url: '/api/file/',
    method: 'get',
    params: ''
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return myrequest.request({
    url: '/api/file/upload',
    method: 'post',
    data: formData
  })
}

export const fileProcess = formData => {
  return myrequest.request({
    url: '/api/job/create',
    method: 'post',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}
