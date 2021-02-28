<template>
  <div>
    <el-button type="text" @click="toBack">返回</el-button>
    <el-tabs v-model="activeName">
      <!-- :lazy="true"懒加载 用到了再加载 -->
      <el-tab-pane label="基本信息" :lazy="true" name="info">
        <Info></Info>
      </el-tab-pane>
      <el-tab-pane label="订单信息" :lazy="true" name="order">
        <Order></Order>
      </el-tab-pane>
      <el-tab-pane label="服务地址" :lazy="true" name="address">
        <Address></Address>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 导入组件
import Info from "./info.vue";
import Order from "./order.vue";
import Address from "./address.vue";

export default {
  data() {
    return {
      // 激活的选项卡
      activeName: "info",
    };
  },
  components: {
    Info,
    Order,
    Address,
  },
  computed: {},
  methods: {
    toBack() {
      this.$router.go(-1);
    },
  },
  created() {
    //   获取动态路由参数
    console.log(this.$route.params.id);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>