import axios from 'axios'
import {BASE_URL_SERVER} from '../constants/api'

export const configureApi = () => {
    const instance = axios.create({
        baseURL: BASE_URL_SERVER + '/api',
    })

    instance.interceptors.request.use(
        config => {

            return config
        },
        error => {
            return Promise.reject(error)
        },
    )

    instance.interceptors.response.use(
        response => {
            return response
        },
        error => {

            return Promise.reject(error)
        },
    )

    return instance
}