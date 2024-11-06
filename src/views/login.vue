<template>
  <div class="contentBody">
    <div class="content">
      <h1>火车票务系统登录</h1>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        style="padding-right: 60px"
      >
        <el-form-item label="账户名" prop="account">
          <el-input v-model.number="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <h1 style="
    position: fixed;
    bottom: 0;
    left: 0;
    ">电子科技大学软件工程大作业 小组成员：张梓延 陈文琦 李思辰 吴福兴</h1>
  </div>
</template>
  
<script>
import service from "../utils/request";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        account: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        account: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          service
            .post("/api/login", {
                username: this.ruleForm.account,
                password: this.ruleForm.pass,
            })
            .then((res) => {
              //需要一个res.data返回我的登录正确的信息，还需要一个res.userdata信息返回我user的相关信息
              console.log("success");
              console.log(this.ruleForm.account,this.ruleForm.pass)
              if (res.data.resultmes == "success") {
                this.$message.success("登录成功");
                this.$store.dispatch("updateuser",res.data.user);
                console.log(this.$store.state.user)
                this.$router.push("/home");
              } else {
                this.$message.error("用户不存在或密码错误");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};

</script>

<style scoped>
.contentBody {
  background-image: url("../assets/img/login_bg.jpg");
  background-size: 100% 80vh;
  width: 100%;
  display: flex;
  margin-top: 0;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.content {
  box-sizing: border-box;
  background-color: #e5ecf6;
  width: 30%;
  align-content: center;
  border-radius: 5%;
  border-width: 1px;
}
</style>