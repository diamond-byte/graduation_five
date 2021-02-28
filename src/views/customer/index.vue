<template>
  <div>
    <div class="options">
      <el-button size="mini" type="primary" @click="toAdd">添加</el-button>
      <el-input
        size="mini"
        v-model="queryParams.status"
        placeholder="请输入状态"
      ></el-input>
      <el-button size="mini" type="primary" @click="toSearch">查询</el-button>
      <el-button
        size="mini"
        type="danger"
        @click="toBatchDelete"
        :disabled="isDisabled"
        >批量删除</el-button
      >
    </div>
    <!-- 表格 -->
    <div>
      <!-- table.style.height='calc' -->
      <el-table
        border
        height="calc(100vh - 150px)"
        size="mini"
        :data="customerData"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column prop="id" label="编号" width="180"> </el-table-column> -->
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          align="center"
          type="index"
          :index="indexMethod"
          label="编号"
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="realname"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column align="center" prop="telephone" label="手机号">
        </el-table-column>
        <el-table-column align="center" prop="status" label="状态" width="180">
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <!-- 插槽作用域 scope  -->
          <template slot-scope="scope">
            <el-button @click="toDelete(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button @click="toEdit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
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
    <el-dialog
      @close="dialogClose"
      @open="dialogClose"
      :title="title"
      :visible.sync="visible"
    >
      <el-form :rules="rules" ref="ruleForm" :model="form">
        <el-form-item
          label="用户名"
          prop="username"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          prop="realname"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.realname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="telephone"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.password"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="禁用" value="禁用"></el-option>
            <el-option label="启用" value="启用"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入vuex或者axios
import { mapActions, mapGetters } from "vuex";
// 导入api
import { deleteById, batchDelete } from "@/api/customer.js";
export default {
  data() {
    return {
      // 控制按钮的禁用
      isDisabled: true,
      // 获取数据的参数
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
      // 表单验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        realname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        telephone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
    };
  },
  computed: {
    ...mapGetters("customer", ["total", "customerData"]),
  },
  methods: {
    ...mapActions("customer", ["findAll", "saveOrUpdate"]),
    indexMethod(index) {
      let { page, pageSize } = this.queryParams;
      return (page - 1) * pageSize + index + 1;
    },
    // 批量删除
    toBatchDelete() { 
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发请求删除
          batchDelete({ ids: this.ids.join() })
            .then((res) => {
              if (res.status === 200) {
                // 提示删除成功，并且刷新数据
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success",
                });
                // 处理方法比较粗暴
                // this.queryParams.page = 1;
                this.findAll(this.queryParams);
              } else {
                this.$notify({
                  title: "失败",
                  message: "删除失败",
                  type: "error",
                });
              }
            })
            .catch((err) => {
              this.$notify({
                title: "失败",
                message: "删除失败",
                type: "error",
              });
            });
          // this.$message({
          //   type: "success",
          //   message: "删除成功!",
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //dialog 关闭的回调
    dialogClose() {
      // 重置表单
      this.$refs["ruleForm"].resetFields();
    },
    toAdd() {
      this.form = {};
      this.title = "新增顾客信息";
      this.visible = true;
    },
    toSave() {
      // 校验数据，数据校验通过之后，再保存

      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.saveOrUpdate({
            form: this.form,
            queryParams: this.queryParams,
          }).then(() => {
            this.visible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toDelete(row) {
      // console.log(row.id);
      // 询问用户是否进行删除操作
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发请求删除
          deleteById({ id: row.id })
            .then((res) => {
              if (res.status === 200) {
                // 提示删除成功，并且刷新数据
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success",
                });
                // 处理方法比较粗暴
                // this.queryParams.page = 1;
                this.findAll(this.queryParams);
              } else {
                this.$notify({
                  title: "失败",
                  message: "删除失败",
                  type: "error",
                });
              }
            })
            .catch((err) => {
              this.$notify({
                title: "失败",
                message: "删除失败",
                type: "error",
              });
            });
          // this.$message({
          //   type: "success",
          //   message: "删除成功!",
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑
    toEdit(row) {
      console.log(row);
      this.form = { ...row };
      this.title = "修改顾客信息";
      this.visible = true;
    },
    // 跳转到详情
    toDetail(row) {
      // 路由跳转 由路由器跳转
      // /customerDetail/:id/index
      this.$router.push(`/customerDetail/${row.id}/index`);
    },
    // 查询按钮
    toSearch() {
      this.queryParams.page = 1;
      this.findAll(this.queryParams);
    },
    // 每页条数变化的事件处理函数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // 改数据模型中的pageSize，设置page为1，发起请求
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      // 发起请求
      this.findAll(this.queryParams);
    },
    // 当页码发生变化的事件处理程序
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 修改数据模型中数据并发起请求
      this.queryParams.page = val;
      this.findAll(this.queryParams);
    },
    // 表格多选变化的事件处理程序
    handleSelectionChange(val) {
      // val是一个数组，内部是选中的对象
      this.ids = val.map((item) => item.id);
      // 控制按钮禁用
      if (this.ids.length > 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
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
  & > * {
    float: left;
    margin-right: 10px;
  }
  & > div {
    width: 200px;
  }
}
</style>