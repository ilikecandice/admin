<template>
  <div>
    <el-dialog
      title="详情"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :before-close="modalClose"
    >
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleEvent">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from "@/util/mUtils";
import users from "@/api/users";

export default {
  name: "UsersEdit",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    itemDetail: Object
  },
  data() {
    return {
      opts: [
        { id: 0, name: "普通用户" },
        {
          id: 1,
          name: "管理员"
        }
      ],
      title: "",
      userType: 0
    };
  },

  methods: {
    modalClose() {
      this.$emit("update:visible", false); // 直接修改父组件的属性
      if (this.isEdit) {
        this.$emit("updateList");
      }
    },

    cancleEvent() {
      this.$emit("update:visible", false);
      if (this.isEdit) {
        this.$emit("updateList");
      }
    }
  },
  mounted() {
    this.form = this.itemDetail;
  },
  created() {}
};
</script>
<style>
</style>
