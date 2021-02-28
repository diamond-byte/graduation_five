<template>
  <div>
    <el-button type="text" @click="toBack">返回</el-button>
    <br />
    {{ "订单编号: " + OrderItemData.id }}<br /><br />
    {{ "订单时间: " + OrderItemData.orderTime }}<br /><br />
    {{ "订单状态: " + OrderItemData.status }}<br /><br />
    {{ "员工编号" }}<br /><br />
    {{ "顾客: " + OrderItemData.customer.username }}<br /><br />
    {{ "顾客手机号: " + OrderItemData.customer.telephone }}<br /><br />
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("order", ["OrderItemData"]),
  },
  methods: {
    ...mapActions("order", ["findOrderById"]),
    toBack() {
      this.$router.go(-1);
    },
  },
  created() {
    // this.findProductItemById({ id: this.$route.params.id });
    this.findOrderById({ id: this.$route.params.id });
  },
  mounted() {},
};
</script>