import axios from 'axios'

// 传入参数指定需要获取的数据列表长度{pageSize：10}
export function getDetialInfo (args) {
  const url = '/api/getDetialInfo'

  const data = Object.assign({}, {
  }, args)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getDetialList (args) {
  const url = '/api/getDetialList'

  const data = Object.assign({}, {
  }, args)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
