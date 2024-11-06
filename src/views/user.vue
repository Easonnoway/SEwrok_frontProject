<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
    "
  >
    <div class="User_content">
      <el-form>
        <el-form-item label="用户名">
          <el-input
            v-model="user.username"
            :placeholder="user.usermame"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="changeUsername()">修改用户名</el-button>
        <h1 style="margin-bottom: 0">乘客身份证绑定</h1>
        <el-form>
          <el-form-item label="真实姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="form.idNum"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="onSubmit()">提交乘客信息</el-button>
      </el-form>
      <h1>已绑定注册乘客</h1>
      <template>
        <el-table
          :data="user.relatedUsers"
          height="200"
          border
          style="width: 100%"
        >
          <el-table-column prop="name" label="姓名" width="280">
          </el-table-column>
          <el-table-column prop="idNum" label="身份证号" width="280">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>
    </div>
  </div>
</template>

<script>
import service from '../utils/request';
export default {
  data() {
    return {
      user: this.$store.state.user,
      form: {
        name: "",
        idNum: "",
      },
    };
  },
  methods: {
    changeUsername(){
      service.post("/api/usernamechange",{
        userId : this.user.userId,
        username:this.user.username
      })
      .then((res)=>{
        this.$store.dispatch("updateuser",res.data)
        this.$message.success("用户名更改成功")
      })
      .catch(error=>{
        this.$message.error("用户名更改失败")
      })
        //向后端发送更改用户名的请求，后端拿到数据更改后重新返回渲染    
    },
    onSubmit(){
        console.log(this.form)
        service.post("/api/addpassenger",{
          userId:this.user.userId,
          name:this.form.name,
          idNum:this.form.idNum
        })
        .then((res)=>{
          this.$store.dispatch("updateuser",res.data)
          this.user = this.$store.state.user
          this.$message.success("乘车人添加成功");
        }).catch(error=>{
          this.$message.error("提交失败");
        })
        //将form对象以json上传到后端，再返回form表单数据渲染页面
    },
    handleDelete(index, row) {
        console.log(index, row);//index得到行数，row得到一个整行数据的对象
        console.log(row.name)//lsc
        service.post("/api/depassenger",{
          userId : this.user.userId,
          index : index
        })
        .then((res)=>{
          this.$store.dispatch("updateuser",res.data);
          this.user = this.$store.state.user
          this.$message.success("删除乘客成功");
        })
        .catch(error=>{
          this.$message.error("删除乘客失败")
        })
        //将index传到后端，后端删除后返回前端，前端重新渲染
    }
  },
};
</script>

<style>
.User_content {
  width: 50%;
  margin-top: 8vh;
}
</style>