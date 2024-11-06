<template>
  <div>
    <el-table :data="tickets" height="80vh" border style="width: 100%">
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
            type="primary"
            @click="reserve(scope.$index, scope.row)"
            >预定</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="选择乘车人" :visible.sync="dialogVisible" width="30%" :modal-append-to-body="false">
      <el-select v-model="selectedticket.passenger" placeholder="请选择">
        <el-option
          v-for="item in user.relatedUsers"
          :key="item.index"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="purchase()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import service from '../utils/request';
export default {
  data() {
    return {
      dialogVisible: false,
      selectedticket: {
        index: 0, 
        passenger:"",
      },
      tickets: [
      ],
      user: this.$store.state.user
    };
  },
  created() {
    service.get("/api/tickets")
    .then((res)=>{
      console.log(res.data)
      this.tickets = res.data;
      console.log(this.tickets)
    })
    .catch(error=>{
      this.$message.error("信息加载失败！")
      console.log(error)
    })
  },
  methods: {
    reserve(index, row) {
      this.dialogVisible = true;
      this.selectedticket.index = index;
      this.selectedticket.informatiomn = row;
    },
    purchase() {
      this.dialogVisible = false;
      console.log(this.selectedticket);
      service.post("/api/selecttickets",{
        index:this.selectedticket.index,
        userId:this.user.userId
      }
        )
      .then((res)=>{
        console.log(res.data)
        this.tickets = res.data.tickets;
        this.$store.dispatch("updateuser",res.data.user)
        this.user = this.$store.state.user
        this.$message.success("购买成功")
      })
      .catch(error=>{
        this.$message.error("购买失败！")
      })
      //将selectedtickets的值传到后端，后端拿到数据后将购买信息添加数据中，然后返回剩余的车票并重新渲染
    },
  },
};
</script>

<style>
</style>