<template>
  <div>
    <el-table :data="user.tickets" height="80vh" border style="width: 100%">
      <el-table-column prop="id" label="列车号" width="180"> </el-table-column>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="startTime" label="出发时间" width="180">
      </el-table-column>
      <el-table-column prop="endTime" label="到达时间" width="180">
      </el-table-column>
      <el-table-column prop="starting" label="出发地" width="180">
      </el-table-column>
      <el-table-column prop="destination" label="目的地" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="deleteticket(scope.$index, scope.row)"
            >退票</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import service from '../utils/request';
export default {
  data() {
    return {
      user: this.$store.state.user,
    };
  },
  methods:{
    deleteticket(index){
      console.log(index);
      console.log(this.user.userId)
      //返回该车票信息index给后端，后端删除该信息后返回车票信息渲染前端页面
      service.post("/api/deticket",{
        userId : this.user.userId,
        index : index,
      })
      .then((res)=>{
        console.log(res.data)
        this.$store.dispatch("updateuser",res.data)
        this.user = this.$store.state.user
        this.$message.success("删除订单成功")
      })
      .patch(error=>{
        this.$message.error("删除订单失败")
      })
    }
  }
};
</script>

<style>
.ticketContent {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>