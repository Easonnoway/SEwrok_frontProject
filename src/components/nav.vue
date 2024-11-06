<template>
  <div class="nav">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router="true"
        >
          <el-menu-item index="1" route="home">
            <i class="el-icon-location"></i>
            <span>主页</span>
          </el-menu-item>
          <el-menu-item index="2" route="ticket">
            <i class="el-icon-menu"></i>
            <span slot="title">购票</span>
          </el-menu-item>
          <el-menu-item index="3" route="order">
            <i class="el-icon-document"></i>
            <span slot="title">订单查询</span>
          </el-menu-item>
          <el-menu-item index="4" route="user">
            <i class="el-icon-setting"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
   
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  background-color: #fff;
  height: 100%;
  width: 100%;
}
.tac{
  width: 0;

}
</style>
