// 在api中 需要处理网络请求 ，我们就需要导入axios
// @以根目录的方式定义相对路径 相当于src/
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
    return axios.post('/category/query', obj);
}
// 列出产品栏目id
export function findAll2() {
    return axios.get('/category/findAll');
}
// 通过id删除顾客
export function deleteById(params) {
    return axios.get('/category/deleteById', { params });
}
// 更新数据
export function saveOrUpdate(params) {
    return axios.post('/category/saveOrUpdate', params);
}
// 批量删除产品信息
export function batchDelete(params) {
    return axios.post('/category/batchDelete', params);
}