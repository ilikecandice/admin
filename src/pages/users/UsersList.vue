<template>
  <div>
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="query.userName" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="query.userType" placeholder="用户类型">
          <el-option label="普通用户" value="0"></el-option>
          <el-option label="管理员" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleClickAdd()" icon="el-icon-plus">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
      </el-form-item>
    </el-form>
    <div class="table-list">
      <el-table
        ref="multipleTable"
        :data="userList"
        tooltip-effect="dark"
        style="width: 100%"
        :border="true"
        :stripe="true"
        :show-header="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="loginName" align="center" label="用户名" width="120"></el-table-column>
        <el-table-column
          prop="userType"
          align="center"
          :formatter="formatUserType"
          label="用户类型"
          width="120"
        ></el-table-column>
        <el-table-column prop="telephone" align="center" label="联系电话" width="120"></el-table-column>
        <el-table-column prop="createTime" :formatter="formatDate" align="center" label="创建时间"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              class="el-icon-view"
              title="查看"
              @click="handleClickView(scope.row)"
              type="text"
              size="small"
            ></el-button>
            <el-button
              @click="handleClickEdit(scope.row)"
              class="el-icon-edit"
              title="编辑"
              type="text"
              size="small"
            ></el-button>
            <el-button
              @click="handleClickDel(scope.row)"
              class="el-icon-delete"
              title="删除"
              type="text"
              size="small"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <users-edit
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      @updateList="getUsers"
      :itemDetail="itemDetail"
      :isEdit.sync="isEdit"
    ></users-edit>
    <users-detail
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      @updateList="getUsers"
      :itemDetail="itemDetail"
      :isEdit.sync="isEdit"
    ></users-detail>
  </div>
</template>

<script>
import users from "@/api/users";
import { parseTime } from "@/util/mUtils";
import UsersEdit from "./UsersEdit";
import bus from "./bus.js";
export default {
  data() {
    return {
      query: {
        userName: "",
        userType: ""
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      query: {},
      userList: [],
      multipleSelection: [],
      dialogFormVisible: false,
      itemDetail: {},
      itemDetailBake: {},
      isEdit: false
    };
  },
  components: {
    UsersEdit
  },

  methods: {
    getUsers() {
      let current = this.currentPage;
      let size = this.pageSize;
      let query = this.query;
      users.getUsers(current, size, query).then(res => {
        if (res.success) {
          this.userList = res.data.records;
          this.currentPage = res.data.current;
          this.total = res.data.total;
        }
      });
    },
    formatUserType(row, column) {
      var data = row[column.property];
      return data == 1 ? "管理员" : data == 0 ? "普通用户" : "普通用户";
    },
    formatDate(row, column) {
      var data = row[column.property];
      if (!data) return "";
      else return parseTime(data);
    },

    onSubmit() {
      this.getUsers();
    },
    handleClickAdd() {
      this.isEdit = false;
      this.dialogFormVisible = true;
    },
    handleClickView(row) {},
    handleClickEdit(row) {
      this.itemDetail = row;
      console.log(row);
      this.isEdit = true;
      this.dialogFormVisible = true;
    },

    handleClickDel(row) {
      console.log(row);
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUsers();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUsers();
    }
  },
  watch: {
    userList(val) {}
  },
  created() {
    this.$nextTick(() => {
      this.getUsers();
    });
  }
};
</script>
<style>
.pagination {
  margin: 10px 0;
}
</style>
