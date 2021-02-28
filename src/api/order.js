// 在api中 需要处理网络请求 我们就需要导入axios
// @以根目录的方式定义相对路径，相当于/src
import axios from "@/utils/request.js"
export function findAll(params) {

    let obj = Object.assign({}, params);
    obj.page--;
    for (let key in obj) {
        if (obj[key] === 0) {
            continue;
        }
        if (!obj[key]) {
            delete obj[key]
        }
    }



    return axios.post('/order/queryPage', obj);
}
export function findByOrderId(params) {
    return axios.get('/order/query', { params });
}
// 通过订单id查找订单基本信息
export function findOrderById(params) {
    return axios.get('/order/findById', { params });
}