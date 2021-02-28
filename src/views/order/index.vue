<template>
  <div>
    <!-- 表格 -->
    <div class="tables">
      <el-table
        border
        size="mini"
        :data="orderData"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column align="center" prop="id" label="订单编号" width="180">
        </el-table-column>
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
          label="顾客id"
          width="180"
        >
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <!-- 插槽作用域 scope  -->
          <template slot-scope="scope">
            <el-button @click="toDetail(scope.row)" type="text" size="small"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryParams.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryParams.pageSize"
        layout="total,sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.realname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="form.password"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="禁用" value="禁用"></el-option>
            <el-option label="启用" value="启用"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
        status: "",
      },
      // 批量删除的id数组
      ids: [],
      // 模态框的显示与隐藏
      visible: false,
      // 模态框的标题
      title: "新增顾客信息",
      formLabelWidth: "120px",
      // 表单数据对象
      form: {},
    };
  },
  computed: {
    ...mapGetters("order", ["total", "orderData"]),
  },
  methods: {
    ...mapActions("order", ["findAll"]),
    toDetail(row) {
      this.$router.push(`/orderDetail/${row.id}/index`);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      // 发起请求
      this.findAll(this.queryParams);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.queryParams.page = val;
      this.findAll(this.queryParams);
    },
    handleSelectionChange(val) {
      this.ids = val.map((item) => item.id);
    },
  },
  created() {
    this.findAll(this.queryParams);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.options {
  overflow: hidden;
  & > * {
    float: left;
    margin-right: 10px;
  }
  & > div {
    width: 200px;
  }
}
.tables {
  margin: 10px 0;
}
</style>