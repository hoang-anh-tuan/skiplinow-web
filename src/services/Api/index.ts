import apisauce, { ApiResponse } from 'apisauce'

export const isDev = process.env.NODE_ENV === 'development'

export const baseURL = isDev
  ? 'http://localhost:5000'
  : 'https://api.code4change.dev'

export const defaultApiSauceConfig = (headers?: any) => {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    },
    timeout: 10000
  }
}

const createServiceApi = () => {
  const api = apisauce.create({
    ...defaultApiSauceConfig(),
    baseURL: baseURL
  })

  const requestLogin = async (phoneNumber: string) =>
    api.post('/user', { phoneNumber })

  const verifyAccessCode = async (phoneNumber: string, accessCode: string) =>
    api.post('/user/verify', { phoneNumber, accessCode })

  const searchGithubUsers = async (filter?: any) =>
    api.get('/searchGithubUsers', filter)

  const likeGithubUser = async (payload: {
    phoneNumber: string
    githubUserId: number
  }) => api.post('/likeGithubUser', payload)

  const getProfile = async (phoneNumber: string) =>
    api.get('/getUserProfile/' + phoneNumber)

  return {
    api,
    requestLogin,
    verifyAccessCode,
    searchGithubUsers,
    likeGithubUser,
    getProfile
  }
}

export const ServiceApi = createServiceApi()

export const setApiAuthorization = (token: string) => {
  ServiceApi.api.setHeaders({
    authorization: 'Bearer ' + token
  })
}

export const removeToken = () => {
  ServiceApi.api.deleteHeader('authorization')
}
export const isSuccess = <T = any>(res: ApiResponse<T> & any) => {
  return res.ok && (res.status === 200 || res.status === 204)
}
