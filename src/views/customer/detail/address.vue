<template>
  <div>
    <!-- 表格 -->
    <div>
      <el-table
        border
        height="calc(100vh - 350px)"
        size="mini"
        :data="addressData"
        stripe
        style="width: 100%"
      >
        <el-table-column
          align="center"
          prop="province"
          label="省份"
          width="180"
        ></el-table-column>
        <el-table-column align="center" prop="city" label="城市" width="180">
        </el-table-column>
        <el-table-column align="center" prop="area" label="区县">
        </el-table-column>
        <el-table-column align="center" prop="address" label="街道" width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="telephone"
          label="联系电话"
          width="180"
        >
        </el-table-column>
      </el-table>
    </div>
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
    ...mapState("customer", ["addressData"]),
  },
  methods: {
    ...mapActions("customer", ["findAddressByCId"]),
  },
  created() {
    // console.log(this.$route.params.id, "---------");
    this.findAddressByCId({ id: this.$route.params.id });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>