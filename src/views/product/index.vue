<template>
  <div>
    <div class="options">
      <el-button size="mini" type="primary" @click="toAdd">添加</el-button>
      <el-input
        size="mini"
        v-model="queryParams.name"
        placeholder="请输入产品名称"
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
        :data="productData"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          align="center"
          type="index"
          :index="indexMethod"
          label="编号"
          width="100"
        >
        </el-table-column>

        <!-- <el-table-column prop="id" label="编号" width="180"> </el-table-column> -->
        <el-table-column
          align="center"
          prop="name"
          label="产品名称"
          width="180"
        >
        </el-table-column>
        <el-table-column align="center" prop="price" label="价格" width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="description"
          label="产品描述"
        ></el-table-column>
        <el-table-column prop="categoryId" label="所属产品" width="180">
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <!-- 插槽作用于域 -->
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
    <el-dialog :title="title" @close="dialogClose" :visible.sync="visible">
      <el-form :rules="rules" ref="ruleForm" :model="form">
        <el-form-item
          label="产品名称"
          prop="name"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="所属栏目"
          prop="categoryId"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.categoryId" placeholder="请选择所属栏目">
            <el-option
              v-for="item in categoryIds"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="产品介绍"
          prop="description"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            v-model="form.description"
            :label-width="formLabelWidth"
          ></el-input>
        </el-form-item>
        <div>
          <el-button type="primary" size="mini"
            >点击上传<i class="el-icon-upload el-icon--right"></i></el-button
          ><br />
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入vuex或者axios
import { mapActions, mapGetters } from "vuex";
import { findAll2, deleteById, batchDelete } from "@/api/product.js";
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
      title: "新增产品信息",
      formLabelWidth: "120px",
      form: {},
      categoryIds: [],
      rules: {
        name: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        categoryId: [
          { required: true, message: "请选择所属栏目", trigger: "blur" },
        ],
        description: [{ message: "请输入产品介绍", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters("product", ["total", "productData"]),
  },
  methods: {
    ...mapActions("product", ["findAll", "saveOrUpdate"]),
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
    // dialog 关闭的回调
    dialogClose() {
      // 重置表单
      this.$refs["ruleform"].resetFields();
      // this.visible = false;
    },
    toAdd() {
      this.form = {};
      this.title = "新增产品信息";
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
            console.log("=====");
            this.visible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toSearch() {
      this.queryParams.page = 1;
      this.findAll(this.queryParams);
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
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    toEdit(row) {
      // console.log(row);
      this.form = { ...row };
      this.title = "修改订单信息";
      this.visible = true;
    },
    toDetail(row) {
      console.log(row);
      // /productDetails/productDetails
      this.$router.push(`/productDetail/${row.id}/index`);
    },
    // 每页条数变化的事件处理函数
    handleSizeChange(val) {
      // 改数据模型中的pageSize，设置page为1，发起请求
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      this.findAll(this.queryParams);
    },
    // 当页码发生变化的事件处理程序
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 修改数据模型中数据并发起请求
      this.queryParams.page = val;
      this.findAll(this.queryParams);
    },
    handleSelectionChange(val) {
      // this.multipleSelection = val;
      this.ids = val.map((item) => item.id);
      // 控制按钮禁用
      if (this.ids.length > 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    toSearch() {
      this.queryParams.page = 1;
      this.findAll(this.queryParams);
    },
  },
  created() {
    this.findAll(this.queryParams);
    findAll2().then((res) => {
      this.categoryIds = Array.from(
        new Set(res.data.map((item) => item.categoryId))
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