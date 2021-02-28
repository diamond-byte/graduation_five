// 导入api内的方法或者axios
import { findAll, findOrderById } from '@/api/order.js'
// 配置Vuex结构
export default {
    namespaced: true,
    state: {
        totalData: {},
        // 订单基本信息
        OrderItemData: [],
    },
    getters: {
        total: state => state.totalData.total,
        orderData: state => state.totalData.list
    },
    mutations: {
        changeTotalData(state, data) {
            state.totalData = data;
        },
        changeOrderItemData(state, payload) {
            state.OrderItemData = payload;
        },
    },
    actions: {
        // 通过订单id查找订单基本信息
        async findOrderById({ commit }, payload) {
            let res = await findOrderById(payload)
            commit("changeOrderItemData", res.data);
        },
        findAll({ commit }, payload) {
            findAll(payload).then(res => {
                commit('changeTotalData', res.data)
            })
        }
    }
}