<template>
  <div>
    <div class="options">
      <el-button size="mini" type="primary" @click="toAdd">添加</el-button>
      <el-input
        size="mini"
        v-model="queryParams.name"
        placeholder="请输入栏目名称"
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
      <el-table
        border
        height="calc(100vh - 150px)"
        size="mini"
        :data="categoryData"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="55">
        </el-table-column>
        <!-- <el-table-column prop="id" label="编号" width="180"> </el-table-column> -->
        <el-table-column
          align="center"
          type="index"
          :index="indexMethod"
          width="100"
          label="编号"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="栏目名称"
          width="180"
        >
        </el-table-column>
        <el-table-column align="center" prop="num" label="序号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="parentId"
          label="父栏目"
          width="180"
        >
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
      <!-- 模态框 -->
      <el-dialog :title="title" @close="dialogClose" :visible.sync="visible">
        <el-form :rules="rules" ref="ruleForm" :model="form">
          <el-form-item
            label="栏目名称"
            prop="name"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="序号" prop="num" :label-width="formLabelWidth">
            <el-input v-model="form.num" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="所属栏目"
            prop="parentId"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model.number="form.parentId"
              placeholder="请选择所属栏目"
            >
              <el-option
                v-for="item in categoryIds"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="toSave">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { findAll2, deleteById, batchDelete } from "@/api/category.js";
export default {
  data() {
    return {
      isDisabled: true,
      // 获取数据的参数
      queryParams: {
        page: 1,
        pageSize: 10,
        status: "",
      },
      ids: [],
      visible: false,
      title: "新增栏目信息",
      formLabelWidth: "120px",
      form: {},
      categoryIds: [],
      rules: {
        name: [{ required: true, message: "请输入栏目名称", trigger: "blur" }],
        num: [{ required: true, message: "请输入序号", trigger: "blur" }],
        parentId: [
          { type: "number", message: "请选择所属栏目", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters("category", ["total", "categoryData"]),
  },
  methods: {
    ...mapActions("category", ["findAll", "saveOrUpdate"]),
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
    toSearch() {
      this.queryParams.page = 1;
      this.findAll(this.queryParams);
    },
    toAdd() {
      this.form = {};
      this.title = "新增栏目信息";
      this.visible = true;
    },
    toDelete(row) {
      // console.log(row);
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
    dialogClose() {
      // 重置表单
      this.$refs["ruleForm"].resetFields();
    },
    toSave() {
      console.log(this.$refs["ruleForm"]);
      // 校验数据，数据校验通过之后，再保存
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.saveOrUpdate({
            form: this.form,
            queryParams: this.queryParams,
          }).then(() => {
            console.log("=====");
            this.visible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toEdit(row) {
      // console.log(row);
      this.form = { ...row };
      this.title = "修改栏目信息";
      this.visible = true;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      this.findAll(this.queryParams);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.queryParams.page = val;
      this.findAll(this.queryParams);
    },
    indexMethod(index) {
      let { page, pageSize } = this.queryParams;
      return (page - 1) * pageSize + index + 1;
    },
    handleSelectionChange(val) {
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
    findAll2().then((res) => {
      this.categoryIds = Array.from(
        new Set(res.data.map((item) => item.parentId))
      );
    });
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