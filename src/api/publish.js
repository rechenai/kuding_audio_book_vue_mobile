import axios from 'axios'

// 传入参数指定需要获取的数据列表长度{pageSize：10}
export function getPublish (args) {
  const url = '/api/getPublish'

  const data = Object.assign({}, {
    page: 1,
    pageSize: 28,
    tagId: 3,
    sortField: 0,
    bookStatus: 0
  }, args)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
