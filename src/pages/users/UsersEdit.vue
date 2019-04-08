<template>
  <div>
    <el-dialog
      :title="isEdit?'编辑':'新增'"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :before-close="modalClose"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        status-icon
        :hide-required-asterisk="false"
      >
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="loginName">
          <el-input v-model="form.loginName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="loginPassword">
          <el-input v-model="form.loginPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" :label-width="formLabelWidth" prop="userType">
          <el-select v-model="form.userType" placeholder="用户类型" @change="selectUserType">
            <el-option v-for="item in opts" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleEvent">取 消</el-button>
        <el-button type="primary" @click="confirmEvent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from "@/util/mUtils";
import users from "@/api/users";
const defaultForm = {
  userId: "",
  loginName: "",
  loginPassword: null,
  salt: null,
  orgId: null,
  userName: "",
  realName: "",
  sex: null,
  age: null,
  picImg: null,
  status: null,
  email: null,
  telephone: null,
  lastLoginTime: null,
  lastLoginIp: null,
  userType: null,
  createTime: null,
  createBy: null,
  updateTime: null,
  updateBy: null,
  deleted: null,
  updateVersion: null,
  clientId: null
};
export default {
  name: "UsersEdit",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isEdit: {
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
      userType: 0,
      form: Object.assign({}, defaultForm),
      formLabelWidth: "120px",
      rules: {
        loginName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        loginPassword: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        userType: [
          { required: true, message: "请选择用户类型", trigger: "change" }
        ]
      }
    };
  },
  watch: {
    userType(val) {},
    form(val) {}
  },

  computed: {},
  methods: {
    submitForm(formName) {
      let that = this;
      let method = "POST";
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            method = "PUT";
          }
          users.saveOrUpdateUser(this.form, method).then(res => {
            if (res.success && res.code == 200) {
              this.$message({
                message: "保存成功",
                type: "success",
                duration: 1000
              });
              that.$emit("update:visible", false);
              that.$emit("updateList");
            } else {
              this.$message({
                message: "保存失败," + res.msg,
                type: "error"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    modalClose() {
      this.$emit("update:visible", false); // 直接修改父组件的属性
      if (this.isEdit) {
        this.$emit("updateList");
      }
    },
    selectUserType(val) {
      //this.userType = val;
      console.log(val);
    },
    cancleEvent() {
      this.$emit("update:visible", false);
      if (this.isEdit) {
        this.$emit("updateList");
      }
    },
    confirmEvent() {
      this.submitForm("ruleForm");
    }
  },
  mounted() {
    if (this.isEdit) {
      this.form = this.itemDetail;
    } else {
      this.form = Object.assign({}, defaultForm);
    }
  },
  created() {}
};
</script>
<style>
</style>
