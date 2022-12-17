const config: {
  base_url: {
    dev: string
    pro: string
  }
  result_code: number | string
  default_headers: AxiosHeaders;
  request_timeout: number
} = {
  /**
   * api请求基础路径
   */
  base_url: {
    // 开发环境接口前缀
    dev: '/api',

    // 打包生产环境接口前缀
    pro: 'https://sports.api.zxdev.top/api',
  },

  /**
   * 接口成功返回状态码
   */
  result_code: '0000',

  /**
   * 接口请求超时时间
   */
  request_timeout: 60000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  default_headers: 'application/json'
}

export { config }
