// 在api中需要处理网络请求，我们就需要导入axios
// @ 以根目录的方式定义相对路径，相当于src/
import axios from '@/utils/request.js'
/**
 * 查找所有产品管理信息
 * 
 */
export function findAll(params) {
    // let obj = { ...params };
    // obj.page--;
    let obj = Object.assign({}, params);
    obj.page--;
    // let obj = { ...params };
    // obj.page--;
    for (let key in obj) {
        if (obj[key] === 0) {
            continue;
        }
        if (!obj[key]) {
            delete obj[key]
        }
    }
    return axios.post('/product/query', obj);
}
// 列出产品父id
export function findAll2() {
    return axios.get('/product/findAll');
}
// 通过id删除顾客
export function deleteById(params) {
    return axios.get('/product/deleteById', { params });
}
// 更新数据
export function saveOrUpdate(params) {
    return axios.post('/product/saveOrUpdate', params);
}
// 通过产品id查找产品基本信息
export function findProductItemById(params) {
    return axios.get('/product/findById', { params });
}
// 批量删除产品信息
export function batchDelete(params) {
    return axios.post('/product/batchDelete', params);
}