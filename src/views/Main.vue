<template>
  <el-container>
    <el-aside>
      <Navigation></Navigation>
    </el-aside>
    <el-container>
      <el-header> 
        <h1 class="text-align: center;" color="#409EFF">火车票务系统</h1>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Navigation from "../components/nav.vue";
export default {
  created() {
    if (this.$route.path !== "/loign" && this.$route.path !== "/home") {
      this.$router.push("/login");
    }
  },
  data() {
    return {};
  },
  components: {
    Navigation,
  },
};
</script>

<style>
.el-aside {
  position: fixed;
  width: 10%;
  height: 100%;
  margin-left: 0;
  
}
.el-header{
  z-index: 2;
  position: fixed;
  width: 100%;
  height: 10%;
  top: 0;
  background-color: #b2caee
}
.el-main {
  z-index: 1;
  position: absolute;
  width: 90%;
  min-height: 90vh;
  margin-left: 10%;
  background-color: #dadde3;
}
</style>