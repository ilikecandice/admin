<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-row>
          <el-col>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{name}}卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "dashboard",
  data() {
    return {};
  },
  computed: {
    ...mapState(["name"]),
    role() {
      return this.name === "admin" ? "超级管理员" : "普通用户";
    }
  },
  methods: {},
  mounted() {},
  created() {}
};
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #999;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>