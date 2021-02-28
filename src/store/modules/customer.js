// 导入api内的方法或者axios
import { findAll, saveOrUpdate, findCustomerById } from '@/api/customer.js'
import { findByCustomerId as findAddressByCId } from "@/api/address.js"
import { findByOrderId } from "@/api/order.js"
import { Notification } from 'element-ui';
// 配置Vuex结构
export default {
  // vuex中的store分成模块来管理 需要在index.js中
  // 引入每一个Vuex模块进行配置 为了解决不同模块命名
  // 冲突的问题  将不同模块的namespaced 全部开启 之后
  //  在不同的页面中再使用getters，actions，mutations
  //  ，state的时候 需要根据不同的模块名来获取
  namespaced: true,
  state: {
    // 获取顾客信息的时候后台总数据
    totalData: {},
    // 顾客地址信息
    addressData: [],
    // 顾客订单信息
    orderData: [],
    // 顾客基本信息
    CustomerIdData: [],

  },
  getters: {
    // 对数据进行拆分然后返回
    // 总条数
    total: state => state.totalData.total,
    // 每页的顾客信息
    customerData: state => state.totalData.list
  },
  mutations: {

    changeTotalData(state, data) {
      state.totalData = data;
    },
    changeAddressData(state, data) {
      state.addressData = data;
    },
    changeOrderData(state, payload) {
      state.orderData = payload;
    },
    changeCustomerData(state, payload) {
      state.CustomerIdData = payload;
    }
  },
  actions: {
    // 通过顾客id查找顾客基本信息
    async findCustomerById({ commit }, payload) {
      let res = await findCustomerById(payload);
      commit("changeCustomerData", res.data);
    },
    // 通过顾客id找订单信息
    async findByOrderId({ commit }, payload) {
      let res = await findByOrderId(payload);
      commit("changeOrderData", res.data);
    },
    // 通过顾客id找地址
    async findAddressByCId({ commit }, payload) {
      let res = await findAddressByCId(payload);
      // 保存数据到仓库
      commit('changeAddressData', res.data);
    },
    /**
     * 查找顾客信息
     */

    findAll({ commit }, payload) {

      findAll(payload).then(res => {
        // 数据处理 payload.page payload.pageSize,res.data.total
        let max = Math.ceil(res.data.total / payload.pageSize)
        // 如果页码超了范围处理一下
        if (payload.page > max) {
          payload.page = max;
          findAll(payload).then(res => {
            commit('changeTotalData', res.data)
          })
        }
        else {
          commit('changeTotalData', res.data)
        }


      })
    },
    /**
     * 新增或修改顾客信息
     */
    async saveOrUpdate({ dispatch }, payload) {
      // 接收数据 发请求 请求成功提示用户保存成功 ，
      // 处理page，分发findAll动作
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
    },
  }
}