import { request } from './request'
export function getHome() {
    return request({
        url: '/homeimg'
    })
}
export function getHomeGoods(type,pageNum,pageSize){
    return request({
        url:`/home/data/${type}/${pageNum}/${pageSize}`
    })
}
