// address模块
import axios from "@/utils/request.js"
// 通过顾客id查找地址
export function findByCustomerId(params) {
    return axios.get('/address/findByCustomerId', { params });
}
// api文件个数对应后台接口的模块个数
// 仓库文件个数对应前端模块个数