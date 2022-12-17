import request from '@/render/service/axios'
import type { UserType } from './types'
export const loginApi = (data: Partial<UserType>): Promise<IResponse<UserType>> => {
    return request.post({ url: '/auth/manage/login/pwd', data })
}

// export const loginOutApi = (): Promise<IResponse> => {
//     return request.get({ url: '/user/loginOut' })
// }
//
// export const getUserListApi = ({ params }: AxiosConfig) => {
//     return request.get<{
//         total: number
//         list: UserType[]
//     }>({ url: '/user/list', params })
// }
