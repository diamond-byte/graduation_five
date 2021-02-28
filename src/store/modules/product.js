// 导入api内的方法或者axios
import { findAll, saveOrUpdate, findProductItemById } from '@/api/product.js'
import { Notification } from 'element-ui'
// 配置vuex结构
export default {
    /**
     * vuex中的store分成模块来管理，需要在index.js中
     * 引入每一个Vuex模块进行配置，为了解决不同模块命名
     * 冲突的问题，将不同模块的namespaced全部开启之后，
     * 在不同的页面中再使用getters，actions，mutations
     * ,state的时候，需要根据不同的模块名获取
     */
    namespaced: true,
    state: {
        // 获取顾客信息的时候后台总数据
        totalData: {},
        productItemData: [],
    },
    getters: {
        // 对数据进行拆分然后返回
        // 总条数
        total: state => state.totalData.total,
        // 每页的顾客信息
        productData: state => state.totalData.list,
    },
    mutations: {
        changeTotalData(state, data) {
            state.totalData = data;
        },
        changeProductData(state, payload) {
            state.productItemData = payload;
        }

    },
    actions: {
        // 通过产品id查找产品基本信息
        async findProductItemById({ commit }, payload) {
            let res = await findProductItemById(payload);
            commit('changeProductData', res.data);
        },
        findAll({ commit }, payload) {
            findAll(payload).then(res => {
                commit('changeTotalData', res.data)
            })
        },
        // async findAll({ commit }, payload) {
        //     let res = await findAll(payload);
        //     commit('changeTotalData', res.data)
        // },
        // 新增或修改顾客信息
        async saveOrUpdate({ dispatch }, payload) {
            let res = await saveOrUpdate(payload.form);
            if (res.status === 200) {
                Notification({
                    type: 'success',
                    title: '成功',
                    message: '保存成功'
                })
                // 找数据 找当前页数据
                dispatch('findAll', payload.queryParams);
                // 将来调用saveOrUpdate参数是{form:{},queryParams:queryParams}          
            } else {
                Notification({
                    type: 'error',
                    title: '失败',
                    message: '保存失败'
                })
            }
        }
    }


}
