// 多抽出一个层让首页所以的请求都从这个层调用
import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}