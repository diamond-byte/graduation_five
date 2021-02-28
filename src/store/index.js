import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
// 导入customer
import customer from './modules/customer'
// 导入 productManager
import product from './modules/product'
// 导入 category
import category from './modules/category'
// 导入 order
import order from './modules/order'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    // customer模块
    customer,
    // productManager模块
    product,
    category,
    order,

  },
  getters
})

export default store
