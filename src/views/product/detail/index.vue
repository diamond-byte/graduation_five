<template>
  <div>
    <el-button type="text" @click="toBack">返回</el-button>

    <br />
    {{ "产品名称：" + productItemData.name }} <br /><br />
    {{ "产品价格：" + productItemData.price }}<br /><br />
    {{ "产品描述：" + productItemData.description }}<br /><br />
    {{ "产品主图：" }}<br /><br />
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("product", ["productItemData"]),
  },
  methods: {
    ...mapActions("product", ["findProductItemById"]),
    toBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.findProductItemById({ id: this.$route.params.id });
  },
  mounted() {},
};
</script>