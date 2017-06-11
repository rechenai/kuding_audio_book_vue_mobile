import axios from 'axios'

export function getComment (args) {
  const url = '/api/getComment'

  const data = Object.assign({}, {
  }, args)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
