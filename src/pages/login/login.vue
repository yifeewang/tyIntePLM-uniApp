<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
const app: any = getApp();
const { useInit, useTitle } = app.globalData.$hooks;
const { turnPage } = app.globalData.$tools;

function goFirstPage() {
  turnPage('demo');
}

const formData = reactive({
  account: '',
  password: '',
  lang: 1,
  argument: 0
});

const readText = reactive([
  {
    text: '',
    value: 1
  }
]);

const formRef: any = ref(null);
const curLang: any = ref('简体中文');

const range = [
  { value: 0, text: '英语' },
  { value: 1, text: '简体中文' }
];

const rules = {
  // 对account字段进行必填验证
  account: {
    // account 字段的校验规则
    rules: [
      // 校验 account 不能为空
      {
        required: true,
        errorMessage: '请填写账号'
      },
      // 对account字段进行长度验证
      {
        minLength: 3,
        maxLength: 15,
        errorMessage: '{label}长度在 {minLength} 到 {maxLength} 个字符'
      }
    ],
    validateTrigger: 'submit'
  },
  password: {
    // password 字段的校验规则
    rules: [
      // 校验 password 不能为空
      {
        required: true,
        errorMessage: '请填写密码'
      },
      {
        validateFunction(rule, value, data, callback) {
          console.log('validateFunction', value);
          if (value.length < 6) {
            callback('密码至少6位');
          }
          return true;
        }
      }
    ],
    validateTrigger: 'submit'
  }
};

onLoad(() => {
  const { pageName, pagePath, pageQuery } = useInit();
  console.log(pageName, pagePath, pageQuery, 'pageName,pagePath, pageQuery');
});

onReady(() => {
  formRef?.value?.setRules(rules);
});

const { title, changeTitle } = useTitle();

const { name, fullName, updateName } = useStore('test');

const canClick = computed(() => formData.account && formData.password);

function langChange() {
  curLang.value = range[formData.lang].text;
  console.log('langChange', curLang.value, formData);
}

function submitForm() {
  console.log('submitForm', formData, canClick.value);
  formRef.value
    .validate()
    .then(async (res) => {
      const params = {
        name: res.account,
        password: res.password
      };
      const response = await app.globalData.$Services.goLogin(params);
      console.log(111, response);
      console.log('表单数据信息：', res);
      response && goFirstPage();
    })
    .catch((err) => {
      console.log('表单错误信息：', err);
    });
}
</script>

<template>
  <view
    class="login-wraper relative overflow-hidden w-100vw h-100vh bg-['@/static/login_bg.png'] bg-no-repeat bs-[100%,878rpx]"
  >
    <view
      class="flex absolute right-15 top-54 items-center text-center lh-22 fs-15 c-[#646a73]"
    >
      <uni-icons type="contact" size="30"></uni-icons>
      <view>{{ curLang }}</view>
      <uni-icons type="bottom" size="30"></uni-icons>
    </view>
    <view class="login-language-real">
      <uni-data-select
        v-model="formData.lang"
        :localdata="range"
        :clear="false"
        @change="langChange"
      ></uni-data-select>
    </view>
    <view class="login-logo-wraper">
      <image class="login-logo" src="/static/login_logo.png" />
      <view>登录PLM</view>
    </view>
    <uni-forms ref="formRef" :model-value="formData" class="login-form-wraper">
      <uni-forms-item label="" name="account" class="login-form-item">
        <uni-easyinput
          v-model="formData.account"
          type="text"
          placeholder="账号/电话/邮箱"
        />
      </uni-forms-item>
      <uni-forms-item label="" name="password">
        <uni-easyinput
          v-model="formData.password"
          type="password"
          placeholder="请输入密码"
        ></uni-easyinput>
      </uni-forms-item>
      <button
        class="login-submit-btn"
        :class="[!!canClick ? 'active-btn' : '']"
        @click="submitForm"
      >
        登录
      </button>
      <uni-forms-item name="argument">
        <view class="login-arg">
          <uni-data-checkbox
            v-model="formData.argument"
            :localdata="readText"
          />
          <view class="login-arg-content"
            >我已阅读并同意<text>《协议条款》</text>和<text
              >《隐私政策》</text
            ></view
          >
        </view>
      </uni-forms-item>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
.login-wraper {
  //   .login-language {
  //     display: flex;
  //     position: absolute;
  //     right: 30rpx;
  //     top: 108rpx;
  //     align-items: center;
  //     line-height: 44rpx;
  //     text-align: left;
  //     font-weight: 400;
  //     font-size: 30rpx;
  //     color: #646a73;
  //   }
  .login-language-real {
    display: flex;
    position: absolute;
    right: 30rpx;
    top: 108rpx;
    z-index: 1;
    width: 240rpx;
    height: 50rpx;
    ::v-deep .uni-select {
      border: none;
    }
    ::v-deep .uni-select__input-box {
      opacity: 0;
    }
  }
  .login-logo-wraper {
    display: flex;
    flex-direction: column;
    margin: 222rpx 0 88rpx 42rpx;
    .login-logo {
      width: 120rpx;
      height: 120rpx;
      background: url('@/static/login_logo.png') no-repeat;
      background-size: 100%;
      line-height: 34rpx;
      text-align: left;
      font-weight: 500;
      font-size: 26rpx;
      color: #000;
    }
  }
  ::v-deep .uni-forms,
  .login-form-wraper {
    box-sizing: border-box;
    padding: 0 32rpx;
    width: 100%;
    .uni-forms-item {
      margin-bottom: 16px;
    }
    .login-arg {
      display: flex;
      align-items: center;
      margin-top: 20rpx;
      .uni-data-checklist {
        width: 21px;
      }
      .login-arg-content {
        flex: 16;
        line-height: 18px;
        text-align: left;
        font-weight: 400;
        font-size: 12px;
        color: #8f959e;
        letter-spacing: 0;
        text {
          line-height: 18px;
          text-align: left;
          font-weight: 500;
          font-size: 12px;
          color: #646a73;
          letter-spacing: 0;
        }
      }
    }
    .login-submit-btn {
      border-radius: 16rpx;
      width: 686rpx;
      height: 84rpx;
      background: #bbbfc4;
      font-weight: 400;
      font-size: 32rpx;
      color: #fff;
    }
    .active-btn {
      border-radius: 16rpx;
      background: #0070f1;
    }
  }
  ::v-deep .uni-easyinput__content {
    border: 2rpx solid #bbbfc4 !important;
    border-radius: 16rpx !important;
    background: #fff !important;
  }
}
</style>
@/utils/router-tool
