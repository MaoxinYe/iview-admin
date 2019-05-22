import axios from '@/libs/api.request'
import myrequest from '@/libs/myrequest'
import service from '@/libs/request'
export const getTableData = () => {
  return myrequest.request({
    url: '/api/file/',
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
