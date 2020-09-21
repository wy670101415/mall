import axios from 'axios'
export function request(config) {
    const instance = axios.create({
        baseURL: 'http://192.168.0.107:3020',
        timeout: 5000
    })

    //请求拦截
    instance.interceptors.request.use(config => {
            return config
        }, err => {

        })
        //响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })
    return instance(config)
}