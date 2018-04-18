import axios from 'axios'
// import jsonp from 'jsonp'

export async function getBasicInfo(cityName) {
  const url = `https://api.lbinin.com/calculate?city=${cityName}`
  const baseUrl = `https://api.lbinin.com/calculate/base/${cityName}` // 获取基数上下限
  return Promise.all([axios.get(url), axios.get(baseUrl)]).then(data => {
    if (data[0].data.code === 0 && data[1].data.code === 0) {
      // 整合上下限
      const dataInfo = data[0]
      const baseInfo = data[1]
      dataInfo.data.data['3j'] = baseInfo.data.data['3j']
      dataInfo.data.data['gjj'] = baseInfo.data.data['gjj']

      return dataInfo.data
    } else {
      return data[0].data.code === -1 ? data[0].data : data[1].data
    }
  })
}

export function getCalculateResult(params) {
  const url = 'https://api.lbinin.com/calculate'
  const baseUrl = `https://api.lbinin.com/calculate/base/${params.city}` // 获取基数上下限
  return Promise.all([
    axios.get(url, {
      params: params
    }),
    axios.get(baseUrl)
  ]).then(data => {
    if (data[0].data.code === 0 && data[1].data.code === 0) {
      // 整合上下限
      const dataInfo = data[0]
      const baseInfo = data[1]
      dataInfo.data.data['3j'] = baseInfo.data.data['3j']
      dataInfo.data.data['gjj'] = baseInfo.data.data['gjj']

      return dataInfo.data
    } else {
      return data[0].data.code === -1 ? data[0].data : data[1].data
    }
  })
}
