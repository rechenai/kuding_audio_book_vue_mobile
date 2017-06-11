import axios from 'axios'

export function getRecommendIndex () {
  const url = '/api/getRecommendIndex'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
