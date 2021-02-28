<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="/image/upload/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-card class="box-card">
      <div class="text item">
        {{ "用户名 :" + CustomerIdData.username }} <br />
        {{ "联系方式 : " + CustomerIdData.telephone }} <br />
        {{ "状态 :" + CustomerIdData.status }} <br />
        {{ "地址 :" + CustomerIdData.province + CustomerIdData.city }}<br />
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      imageUrl:
        "http://47.102.96.246:5123/image/upload_28d884f3c3cb2c0532cbfbbb0dc5b613.jpeg",
    };
  },
  computed: {
    ...mapState("customer", ["CustomerIdData"]),
  },
  methods: {
    ...mapActions("customer", ["findCustomerById"]),

    handleAvatarSuccess(res, file) {
      this.imageUrl = res.url;
      //res.url 值为这样的字符串"/image/upload_28d884f3c3cb2c0532cbfbbb0dc5b613.jpeg"，
      // 如果之后要访问该图片，使用【服务器+路径】的形式访问。例如"http://47.102.96.246:5123/image/upload_28d884f3c3cb2c0532cbfbbb0dc5b613.jpeg"
    },
  },
  created() {
    // 此处的参数名与swagger一致，否则得不到数据
    this.findCustomerById({ id: this.$route.params.id });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>
    <style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>