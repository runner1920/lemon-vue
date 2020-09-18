<template>
  <div class="wrapper">
    <div class="Row">
      <p class="RowTitle">
        <span class="active">重置登录密码</span>
      </p>
      <s-trps class="strps" :list="lists" :index="active"></s-trps>
      <div class="reg_content">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          :key="active"
          v-if="active == 0"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="手机号" prop="phone">
            <el-input
              class="inpt"
              v-model.number="ruleForm.phone"
              maxlength="11"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="captcha"
            style="position:relative;"
            class="captcha clearfix"
            v-if="/^1[0-9]\d{9}$/.test(ruleForm.phone)"
          >
            <el-input
              placeholder="请输入图片验证码"
              type="text"
              maxlength="4"
              class="captchaInput fl inpt"
              v-model="ruleForm.captcha"
              size="medium"
            ></el-input>
            <el-button
              class="captchaImg fr"
              type="text"
              size="small"
              @click="
                src =
                  $store.state.api +
                  '/captcha.jpg?mobile=' +
                  ruleForm.phone +
                  '&s=' +
                  Math.random()
              "
            >
              <img
                style="display:block;width:98px;height:38px;"
                :src="src"
                alt
              />
            </el-button>
          </el-form-item>
          <el-form-item label="验证码" prop="validation">
            <el-input
              class="inpt por"
              v-model="ruleForm.validation"
              maxlength="6"
              placeholder="请输入短信验证码"
            ></el-input>
            <el-button
              :disabled="
                btnDisabled || !ruleForm.isPhone || ruleForm.captcha.length < 4
              "
              type="text"
              class="InterNumBtn"
              @click="getAuthCode"
              >{{ text }}</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">下一步</el-button>
            <el-button @click="$router.push({ name: 'login' })">取消</el-button>
          </el-form-item>
        </el-form>
        <el-form
          :model="ruleForm_two"
          status-icon
          :rules="rules_two"
          :key="active"
          v-if="active == 1"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="新密码" prop="pass">
            <el-input
              class="inpt"
              type="password"
              v-model="ruleForm_two.pass"
              autocomplete="off"
              placeholder="请输入6-16位包含数字、大小写字母的组合"
            ></el-input>
          </el-form-item>
          <el-form-item label="再次输入" prop="checkPass">
            <el-input
              class="inpt"
              type="password"
              v-model="ruleForm_two.checkPass"
              autocomplete="off"
              placeholder="请确认登录密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dosubmitForm()">确 认</el-button>
            <el-button @click="$router.push({ name: 'login' })">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Strps from '@common/Strps.vue';
import {
  checkPassWord,
  resetPassWord,
  getAuthCode,
  getAuthTwo
} from '@/api/login';

export default {
  components: {
    's-trps': Strps
  },
  data() {
    return {
      ruleForm: {
        phone: '',
        captcha: '',
        validation: '',
        isPhone: false
      },
      ruleForm_two: {
        pass: '',
        checkPass: ''
      },
      lists: ['验证账户', '重置密码', '设置完成'],
      sendAuthCode: true /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */,
      auth_time: 0 /* 倒计时 计数器 */,
      active: 0,
      rules_two: {
        pass: [{ validator: this.passwords, trigger: 'blur' }],
        checkPass: [{ validator: this.validatePass2, trigger: 'blur' }]
      },
      src: '',
      text: '发送验证码',
      btnDisabled: false,
      rules: {
        phone: [{ validator: this.phone, trigger: 'blur' }],
        captcha: [
          { required: true, message: '图片验证码不能为空', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入4位图片验证码', trigger: 'blur' }
        ],
        validation: [{ validator: this.checkInterNum, trigger: 'blur' }]
      }
    };
  },
  methods: {
    submitForm() {
      const obj = {};
      obj.mobile = this.ruleForm.phone;
      obj.msgCode = this.ruleForm.validation;
      checkPassWord(obj)
        .then((data) => {
          if (data.code === '000000') {
            this.st = 2;
            this.$msg.success('校验成功');
            this.active = 1;
          } else {
            this.$msg.error(data.desc);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$msg.error('请求失败');
        });
    },
    dosubmitForm() {
      if (this.ruleForm_two.pass === this.ruleForm_two.checkPass) {
        const obj = {};
        obj.mobile = this.ruleForm.phone;
        obj.newPassword = this.ruleForm_two.pass;
        obj.verifyPassword = this.ruleForm_two.checkPass;
        resetPassWord(obj)
          .then((data) => {
            // let data = this.$secret.DecryptDe(res.data)
            if (data.code === '000000') {
              // console.log(data)
              this.$msg.success('重置成功');
              this.active = 2;
              this.$router.push({ name: 'login' });
            } else {
              this.$msg.error(data.desc);
            }
          })
          .catch((err) => {
            console.log(err);
            this.$msg.error('请求失败');
          });
      } else {
        this.$msg.error('两次密码不一致');
      }
    },
    validatePass2(rule, value, callback) {
      console.log(rule, value);
      if (value === '') {
        return callback(new Error('请再次输入密码'));
      }
      if (value !== this.ruleForm_two.pass) {
        return callback(new Error('两次输入密码不一致!'));
      }
      return callback();
    },
    phone(rule, value, callback) {
      const reg = /^1[0-9]\d{9}$/;
      if (!value) {
        return callback(new Error('手机号不能为空'));
      }
      if (!reg.test(value)) {
        return callback(new Error('请输入正确的手机号'));
      }
      return callback();
    },
    checkInterNum(rule, value, callback) {
      const reg = /^[0-9]*[1-9][0-9]*$/;
      if (!value) {
        return callback(new Error('验证码不能为空'));
      }
      if (!reg.test(value)) {
        return callback(new Error('请填写6位数字'));
      }
      if (value.length > 6) {
        return callback(new Error('最多填写6位数字'));
      }
      return callback();
    },
    passwords(rule, value, callback) {
      console.log(rule, value);
      const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{6,16}$/;
      if (!value) {
        return callback(new Error('密码不能为空'));
      }
      if (!reg.test(value)) {
        return callback(new Error('密码必须包含大小写字母和数字'));
      }
      return callback();
    },
    getAuthCode() {
      const obj = {};
      obj.mobile = this.ruleForm.phone;
      obj.imageCode = this.ruleForm.captcha;
      console.log(obj);
      getAuthCode(obj)
        .then((data) => {
          console.log(data);
          if (data.code === '000000') {
            if (data.data.hascheckPass === 2) {
              this.$msg.error('图片验证码错误');
              return;
            }
            const objs = {};
            objs.mobile = this.ruleForm.phone;
            objs.type = 1;
            getAuthTwo(objs)
              .then((datas) => {
                if (datas.code === '000000') {
                  this.$msg.success('发送成功');
                  let TIME_COUNT = 60;
                  this.btnDisabled = true;
                  this.text = `${TIME_COUNT}秒后重新发送`;
                  const that = this;
                  const sendTimer = setInterval(() => {
                    TIME_COUNT--;
                    that.text = `${TIME_COUNT}秒后重新发送`;
                    if (TIME_COUNT <= 0) {
                      that.btnDisabled = false;
                      clearInterval(sendTimer);
                      that.text = '获取验证码';
                    }
                  }, 1000);
                } else {
                  this.$msg.error(datas.desc);
                }
              })
              .catch((err) => {
                console.log(err);
                this.$msg.error('请求失败');
              });
          } else {
            this.$msg.error(data.desc);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$msg.error('请求失败');
        });
    }
  },
  watch: {
    'ruleForm.phone': {
      handler(val) {
        if (/^1\d{10}$/.test(val)) {
          this.ruleForm.isPhone = true;
          this.src = `${
            this.$store.state.api
          }/captcha.jpg?mobile=${val}&s=${Math.random()}`;
        }
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.Row {
  height: 100%;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(213, 215, 226, 1);
  margin-top: 16px;
  .reg_header {
    height: 56px;
    border-bottom: 1px solid #eef1f7;
    font-size: $fz16;
    .reg_spn {
      display: block;
      width: 96px;
      height: 56px;
      line-height: 56px;
      margin-left: 31px;
      border-bottom: 1px solid #000a35;
      text-align: center;
    }
  }
  .reg_content {
    padding: 64px 342px;
    .inpt {
      width: 400px;
    }
    .reg_spnTwo {
      font-size: 14px;
      color: #3771d7;
      @include cursor;
    }
    .auth_text {
      padding: 10px 25px;
      line-height: 40px;
      position: absolute;
      right: 0;
      bottom: -10px;
      color: #3771d7;
    }
  }
  .captchaInput {
    width: 300px;
  }
  .captchaImg {
    position: absolute;
    right: 12px;
    top: -9px;
  }
  .InterNumBtn {
    position: absolute;
    right: 41px;
    top: 50%;
    transform: translateY(-50%);
    color: #3771d7 !important;
  }
  .el-button.InterNumBtn.el-button--text.is-disabled {
    opacity: 1;
    padding-right: 1px;
  }
  .InterNumBtn:hover,
  .InterNumBtn:active {
    color: #3771d7;
  }
}
</style>
