<template>
  <div>
    <div class="wrapper_Login">
      <div class="content">
        <div class="login_mote">
          <div class="mote_cont">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <ul class="uls">
                <div>
                  <li class="lin1">
                    <span class="fwb">用户登录</span>
                  </li>
                  <li class="lin3">
                    <el-form-item prop="phone">
                      <el-input
                        class="inpt"
                        v-model="ruleForm.phone"
                        maxlength="11"
                        placeholder="请输入手机号"
                        onkeyup="value=value.replace(/[^\d.]/g,'')"
                      ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input
                        class="inpt"
                        style="margin-top: 24px;"
                        placeholder="请输入登录密码"
                        v-model="ruleForm.password"
                        show-password
                      ></el-input>
                    </el-form-item>
                  </li>
                </div>

                <li class="lin4">
                  <el-form-item
                    prop="checked"
                    align="left"
                    class="regsiterCheckbox clearfix"
                  >
                    <div class="fl">
                      <span>还没有账号？</span>
                      <span
                        class="spn_five"
                        @click="$router.push({ name: 'regsiter' })"
                        >免费创建账户</span
                      >
                    </div>
                    <el-button
                      class="forget fr"
                      type="text"
                      size="small"
                      @click="$router.push({ name: 'ResetPass' })"
                      >忘记密码？</el-button
                    >
                  </el-form-item>
                </li>
                <li class="lin5">
                  <el-button
                    :loading="loading"
                    class="btn_login"
                    @click="checkYQ"
                    >登 录</el-button
                  >
                </li>
                <li class="lin6"></li>
                <li></li>
              </ul>
            </el-form>
          </div>
        </div>
      </div>
    </div>

    <!-- 邀请码弹框 -->
    <el-dialog
      title="邀请码"
      :visible.sync="dialogVisibleYQ"
      width="400px"
      top="40vh"
      :close-on-click-modal="false"
      class="dialogVisibleYQ"
    >
      <el-input
        type="text"
        maxlength="6"
        v-model="ruleForm.inviteCode"
        placeholder="请输入6位邀请码"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleYQ = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="isYQ"
          >确 认</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { login, checkYQ, isYQ } from '@/api/login';
import cookie from '@/utils/cookie';
import platform from '@/utils/platform';

export default {
  data() {
    return {
      promoCodeType: '', // 是否有邀请码
      dialogVisibleYQ: false, // 邀请码弹框
      cookie,
      platform,
      loading: false,
      ruleForm: {
        phone: '',
        password: '',
        captcha: '',
        validation: '',
        inviteCode: '', // 邀请码
      },
      isShow: true, // 登录方式的切换
      src: '',
      text: '发送验证码',
      btnDisabled: false,
      formShare: false,
      rules: {
        phone: [{ validator: this.phone, trigger: 'blur' }],
        password: [{ validator: this.passwords, trigger: 'blur' }],
      },
    };
  },
  created() {
    // if (cookie.get('phones')) {
    //   this.ruleForm.phone = cookie.get('phones');
    //   this.ruleForm.checked = true;
    // }
    this.ruleForm.phone = this.$route.query.phone
      ? this.$route.query.phone
      : this.ruleForm.phone;
  },
  methods: {
    // 邀请码是否正确
    isYQ() {
      const obj = {
        extensionCode: this.ruleForm.inviteCode,
      };
      isYQ(obj)
        .then((data) => {
          if (data.code === '000000') {
            if (data.data.state === 0) {
              this.$msg.error('该邀请码未开通');
            } else {
              this.dialogVisibleYQ = false;
              this.Submite();
            }
          } else {
            this.$msg.error(data.desc);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$msg.error('请求失败');
        });
    },
    // 是否输入邀请码登陆
    checkYQ() {
      this.loading = true;
      const obj = {
        mobileNo: this.ruleForm.phone,
      };
      this.$refs.ruleForm.validate((res) => {
        if (res) {
          checkYQ(obj)
            .then((data) => {
              if (data.code === '000000') {
                this.promoCodeType = data.data.promoCodeType;
                // 如果需要邀请码则去输入
                if (data.data.promoCodeType === 1) {
                  this.dialogVisibleYQ = true;
                } else {
                  this.Submite();
                }
                this.loading = false;
              } else {
                this.loading = false;
                this.$msg.error(data.desc);
              }
            })
            .catch(() => {
              this.loading = false;
              this.$msg.error('请求失败');
            });
        } else {
          this.loading = false;
          setTimeout(() => {
            const innerTexts = document.getElementsByClassName(
              'el-form-item__error'
            )[0].innerText;
            this.$msg.error(innerTexts);
          }, 0);
        }
      });
    },
    // 登陆
    Submite() {
      this.loading = true;
      // 先清空缓存
      cookie.del('phones');
      this.$store.commit('signOut');
      // 请求
      const userOperationInfo = platform.$getInfo();
      const obj = {};
      const [osInfo, browserVersion] = userOperationInfo;
      obj.osInfo = osInfo;
      obj.browserVersion = browserVersion;
      if (this.isShow) {
        obj.falg = 1;
      } else {
        obj.falg = 2;
      }
      obj.passWord = this.ruleForm.password;
      obj.msgCode = this.ruleForm.validation;
      obj.mobileNo = this.ruleForm.phone;
      obj.promoCode = this.ruleForm.inviteCode;
      obj.promoCodeType = this.promoCodeType;
      login(obj)
        .then((data) => {
          if (data.code === '000000') {
            // if (this.ruleForm.checked) {
            //   cookie.set('phones', this.ruleForm.phone, 7);
            // } else {
            //   cookie.del('phones');
            // }
            this.$msg.success('登录成功');
            this.setData(data);

            this.$router.push({ name: 'index' });
          } else {
            this.loading = false;
            this.$msg.error(data.desc);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$msg.error('请求失败');
        });
    },
    // 存储数据
    setData(data) {
      localStorage.setItem('rongyitie_isLogin', true);
      localStorage.setItem(
        'rongyitie_conpanyInfo',
        JSON.stringify(data.data.sdAgentCompany ? data.data.sdAgentCompany : {})
      );
      localStorage.setItem(
        'rongyitie_baseInfo',
        JSON.stringify(data.data.webMemberBaseInfoVO)
      );
      localStorage.setItem('rongyitie_token', data.data.token);
      localStorage.setItem('isSuper', data.data.hasSuperManager);
      localStorage.setItem('isEnt', data.data.comapnyIsComplete === 1);
      localStorage.setItem('hasOpenAccount', data.data.hasOpenAccount === 1);
      this.$store.commit('login', true);
      this.$store.commit('isSuper', data.data.hasSuperManager);
      this.$store.commit('isEnt', data.data.comapnyIsComplete === 1); // 1是有企业，2是没有企业
      this.$store.commit('hasOpenAccount', data.data.hasOpenAccount === 1); // 1注册过企业，2是没有注册
      this.$store.commit(
        'conpanyInfo',
        data.data.sdAgentCompany ? data.data.sdAgentCompany : {}
      );
      this.$store.commit('baseInfo', data.data.webMemberBaseInfoVO);
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
    // 手机号
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
  },
};
</script>

<style lang="scss" scoped>
.dialogVisibleYQ {
  &::v-deep .el-dialog__headerbtn {
    display: none;
  }
  &::v-deep .el-dialog__footer {
    margin-top: 30px;
  }
}
.el-form-item {
  margin: 0;
}
.top {
  @include wh(100%, 20px);
  background: rgba(242, 242, 242, 1);
  line-height: 20px;
  font-size: $fz12;
  color: #666666;
  .top_nen {
    width: 1100px;
    margin: 0 auto;
    .spn3 {
      margin-left: 24px;
    }
  }
}
.content {
  width: 100%;
  height: calc(100vh - 66px);
  @include buncc('~@img/login_bg.jpeg');
  background-size: 100% 100%;
  .login_mote {
    @include wh(400px, auto);
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    .mote_top {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      margin-bottom: 40px;
      img {
        height: 40px;
      }
    }
    .mote_cont {
      width: 100%;
      // height: calc(402px - 80px);
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      .uls {
        padding: 24px 32px;
        .lin1 {
          display: flex;
          justify-content: space-between;
          .spn_one {
            font-size: $fz16;
            color: #333333;
          }
          .spn_two {
            font-size: $fz14;
            color: #3771d7;
            @include cursor;
          }
        }
        .lin2 {
          margin-top: 8px;
          .spn_stree {
            font-size: $fz14;
            color: #999999;
          }
        }
        .lin3 {
          margin-top: 24px;
          position: relative;
          .inpt {
            background: rgba(255, 255, 255, 1);
            border-radius: 4px;
          }
          .auth_text {
            padding: 10px 20px;
            line-height: 40px;
            position: absolute;
            right: 0;
            bottom: -10px;
            color: #3771d7;
          }
        }
        .lin4 {
          margin-top: 24px;
          display: flex;
          justify-content: space-between;
          .spn_four {
            color: #666666;
            @include cursor;
          }
          .spn_five {
            @include cursor;
            color: #3771d7;
          }
        }
        .lin5 {
          margin-top: 16px;
          .btn_login {
            width: 100%;
            height: 40px;
            background: #3771d7;
            border-radius: 4px;
            font-size: 14px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }
  .captchaInput {
    width: 235px;
  }
  .captchaImg {
    position: absolute;
    right: 0px;
    top: 15px;
  }
  .InterNumBtn {
    position: absolute;
    right: 5px;
    top: 69%;
    transform: translateY(-50%);
    color: #3771d7 !important;
  }
  .el-button.InterNumBtn.el-button--text.is-disabled {
    opacity: 0.3;
  }
  .InterNumBtn:hover,
  .InterNumBtn:active {
    color: #3771d7;
  }
  .forget {
    font-size: 14px !important;
    color: #999999 !important;
    margin-left: 96px;
  }
}
</style>
