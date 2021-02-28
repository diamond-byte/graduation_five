// 在api中 需要处理网络请求 我们就需要导入axios 
// @ 以根目录的方式定义相对路径 相当于src/
import axios from '@/utils/request.js'
/**
 * 查找所有的顾客信息
 * @param Object params (形参名字)
 * @returns Promise对象
 */
export function findAll(params) {
    let obj = Object.assign({}, params);
    obj.page--;
    // 删除属性值为空的数据
    // 遍历对象 for-in
    // Object.keys() 遍历数组
    // Object.values()
    // Object.entries()
    for (let key in obj) {
        if (obj[key] === 0) {
            continue;
        }
        if (!obj[key]) {
            delete obj[key]
        }
    }
    return axios.post('/customer/query', obj);
}
export function saveOrUpdate(params) {
    return axios.post('/customer/saveOrUpdate', params);
}
// 通过id删除顾客
export function deleteById(params) {
    return axios.get('/customer/deleteById', { params });
}
// 批量删除顾客
export function batchDelete(params) {
    return axios.post('/customer/batchDelete', params);
}
// 通过顾客id查找顾客基本信息
export function findCustomerById(params) {
    return axios.get('/customer/findCustomerById', { params });
}