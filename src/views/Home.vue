<template>
  <div class="hello">
    <el-avatar icon="el-icon-user-solid"></el-avatar>
    <h1 style="line;">{{ username }} 欢迎登录</h1>
    <template>
      <el-carousel :interval="4000" type="card" height="400px" style="margin-top: 10vh;">
        <el-carousel-item>
          <h1>电子科技大学</h1>
        </el-carousel-item>
        <el-carousel-item>
          <h1>软件工程大作业</h1>
        </el-carousel-item>
        <el-carousel-item>
          <h1>火车票务系统</h1>
        </el-carousel-item>
      </el-carousel>
    </template>
  </div>
</template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$store.state.user.username,
    };
  },
};
</script>

<style>
.el-carousel__item h1 {
  font-size: 30px;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>