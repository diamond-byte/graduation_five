<template>
  <div>
    <!-- {{ orderData }} -->
    <el-table
      border
      height="calc(100vh - 350px)"
      size="mini"
      :data="orderData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        align="center"
        prop="id"
        label="订单编号"
        width="180"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="orderTime"
        label="下单时间"
        width="180"
      >
      </el-table-column>
      <el-table-column align="center" prop="total" label="总价">
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态" width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="customerId"
        label="顾客ID"
        width="180"
      >
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="150">
        <!-- 插槽作用域 scope  -->
        <template slot-scope="scope">
          <el-button @click="toDeltail(scope.row)" type="text" size="small"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  computed: {
    ...mapState("customer", ["orderData"]),
  },
  methods: {
    ...mapActions("customer", ["findByOrderId"]),
  },
  created() {
    // console.log(this.$route.params.id);
    this.findByOrderId({ customerId: this.id });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>