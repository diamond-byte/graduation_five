<template>
  <div>
    <el-carousel height="200px" direction="vertical" :autoplay="true">
      <el-carousel-item :key="item">
        <img
          width="1222px"
          height="200px"
          src="../../images/meileme.png"
          alt=""
        />
      </el-carousel-item>
      <el-carousel-item :key="item">
        <img
          width="1222px"
          height="200px"
          src="../../images/meileme1.png"
          alt=""
        />
      </el-carousel-item>
      <el-carousel-item :key="item">
        <img
          width="1222px"
          height="200px"
          src="../../images/meileme2.png"
          alt=""
        />
      </el-carousel-item>
    </el-carousel>
    <br />
    <br />
    <h1>花花食界，一订到位</h1>
  </div>
</template>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
h1 {
  font-size: 30px;
  text-align: center;
}
</style>