<template>
  <div class="wrapper">
    <div class="Row">
      <p class="RowTitle">
        <span class="active">注册</span>
      </p>
      <div class="reg_content">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="手机号" prop="phone">
            <el-input
              class="inpt"
              v-model="ruleForm.phone"
              maxlength="11"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="captcha"
            style="position: relative;"
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
                style="display: block; width: 98px; height: 38px;"
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
              class="InterNumBtn"
              @click="getAuthCode"
              >{{ text }}</el-button
            >
          </el-form-item>
          <el-form-item label="登录密码" prop="pass">
            <el-input
              class="inpt"
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
              placeholder="请输入6-16位包含数字、大小写字母的组合"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              class="inpt"
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
              placeholder="请再次输入登录密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="邀请码" prop="InviteCode">
            <el-input
              class="inpt"
              v-model.number="ruleForm.InviteCode"
              maxlength="6"
              placeholder="请输入6位邀请码 (必填)"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <p style="color: #999; margin-bottom: 10px;">
              <el-checkbox v-model="checked">
                <span style="color: #999;">我已阅读并同意</span>
              </el-checkbox>
              <a
                style="color: #333333;"
                href="https://www.fichange.com/platform/pdf/注册服务协议.pdf"
                target="_blank"
                >《注册服务协议》</a
              >
            </p>
            <el-button
              type="primary"
              @click="submitForm()"
              style="width: 400px;"
              >立即注册</el-button
            >
          </el-form-item>
          <h6
            style="
              margin-top: 24px;
              color: #000;
              font-weight: 400;
              margin-left: 100px;
            "
          >
            <span style="font-size: 14px;">已有账号？</span>
            <span class="reg_spnTwo" @click="$router.push({ name: 'login' })"
              >立即登录</span
            >
          </h6>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { register, getAuthCode, getAuthTwo } from '@/api/login';
import cookie from '@/utils/cookie';
import platform from '@/utils/platform';

export default {
  data() {
    return {
      checked: false,
      ruleForm: {
        phone: '',
        captcha: '',
        validation: '',
        pass: '',
        checkPass: '',
        InviteCode: '',
        isPhone: false,
      },
      src: '',
      text: '发送验证码',
      btnDisabled: false,
      rules: {
        phone: [{ validator: this.phone, trigger: 'blur' }],
        captcha: [
          { required: true, message: '图片验证码不能为空', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入4位图片验证码', trigger: 'blur' },
        ],
        validation: [{ validator: this.checkInterNum, trigger: 'blur' }],
        pass: [{ validator: this.passwords, trigger: 'blur' }],
        checkPass: [{ validator: this.validatePass2, trigger: 'blur' }],
        InviteCode: [{ validator: this.checkInviteCode, trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm() {
      // 先清空数据
      cookie.del('phones');
      this.$store.commit('signOut');
      const obj = {};
      const userOperationInfo = platform.$getInfo();
      obj.mobileNo = this.ruleForm.phone; // 手机号
      obj.msgCode = this.ruleForm.validation; // 短信验证码
      obj.password = this.ruleForm.pass; // 密码
      obj.extensionCode = this.ruleForm.InviteCode; // 邀请码
      const [bRowserVersion, osInfo] = userOperationInfo;
      obj.browserVersion = bRowserVersion;
      obj.osInfo = osInfo;
      if (!this.ruleForm.phone) {
        this.$msg.error('手机号不能为空！');
        return;
      }
      if (!/^1[0-9]\d{9}$/.test(this.ruleForm.phone)) {
        this.$msg.error('请输入正确的手机号！');
        return;
      }
      if (!this.checked) {
        this.$msg.error('请先同意协议');
        return;
      }
      if (this.ruleForm.pass === this.ruleForm.checkPass) {
        // 请求
        console.log('参数', obj);
        register(obj)
          .then((data) => {
            if (data.code === '000000') {
              this.$msg.success('注册成功');
              this.$router.push({
                name: 'login',
                query: {
                  phone: this.ruleForm.phone,
                },
              });
            } else {
              this.$msg.error(data.desc);
            }
          })
          .catch(() => {
            this.$msg.error('请求失败');
          });
      } else {
        this.$msg.error('输入密码不一致');
      }
    },
    // 存储数据
    // setData(data) {
    //   localStorage.setItem('promotion_isLogin', true);
    //   localStorage.setItem('promotion_userInfo', JSON.stringify(data.data));
    //   localStorage.setItem('promotion_hasTxPsw', `${data.data.hasTxPsw}`);
    //   localStorage.setItem('promotion_hasLoginPsw', `${data.data.hasLoginPsw}`);
    //   localStorage.setItem('promotion_extensionCode', data.data.extensionCode);
    //   this.$store.commit('extensionCode', data.data.extensionCode);
    //   this.$store.commit('login', true);
    //   this.$store.commit('hasTxPsw', data.data.hasTxPsw);
    //   this.$store.commit('hasLoginPsw', data.data.hasLoginPsw);
    //   this.$store.commit('userInfo', data.data);
    //   this.$router.push({ name: 'index' });
    // },
    validatePass2(rule, value, callback) {
      if (value === '') {
        return callback(new Error('请再次输入密码'));
      }
      if (value !== this.ruleForm.pass) {
        return callback(new Error('两次输入密码不一致!'));
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
    checkInviteCode(rule, value, callback) {
      if (!value) {
        return callback(new Error('邀请码不能为空'));
      }
      return callback();
    },
    passwords(rule, value, callback) {
      const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{6,16}$/;
      if (!value) {
        return callback(new Error('密码不能为空'));
      }
      if (!reg.test(value)) {
        return callback(new Error('密码必须包含大小写字母和数字'));
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
            this.getAuthTwo(objs);
          } else {
            this.$msg.error(data.desc);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$msg.error('请求失败');
        });
    },
    getAuthTwo(objs) {
      getAuthTwo(objs)
        .then((datas) => {
          // let datas = this.$secret.DecryptDe(res.datas);
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
    },
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
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.Row {
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
    .captchaInput {
      width: 300px;
    }
    .captchaImg {
      position: absolute;
      right: 15px;
      top: -9px;
    }
    .InterNumBtn {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #3771d7 !important;
      border: none;
      border-left: 1px solid #ebeef5;
      border-radius: 0;
    }
    .el-button.InterNumBtn.el-button--text.is-disabled {
      opacity: 0.3;
    }
    .InterNumBtn:hover,
    .InterNumBtn:active {
      color: #3771d7;
    }
  }
}
</style>
