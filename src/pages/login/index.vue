<script lang="ts" setup>
import { computed, getCurrentInstance, reactive, ref } from 'vue';
const { proxy } = getCurrentInstance() as any;
const app: any = getApp();
const { useInit, useTitle } = app.globalData.$hooks;
const { turnPage } = app.globalData.$tools;
const { pageTitle, changeTitle } = useTitle();

function goFirstPage() {
    turnPage('demo');
}

const formData = reactive({
    account: '',
    password: '',
    lang: 'zh-Hans',
    argument: 0
});

const readText = reactive([
    {
        text: '',
        value: 1
    }
]);

const formRef: any = ref(null);
const curLang: any = ref('');

const range: any = ref([]);

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
    initRange();
});

onReady(() => {
    formRef?.value?.setRules(rules);
});

const { name, fullName, updateName } = useStore('test');

const canClick = computed(() => formData.account && formData.password);

function initRange() {
    console.log(9, proxy.$t('login.langEn'))
    range.value = [
        { value: 'en', text: proxy.$t('login.langEn') },
        { value: 'zh-Hans', text: proxy.$t('login.langZh') }
    ];
    curLang.value = (
        range.value.find((i) => i.value === uni.getStorageSync('lang')) || {}
    ).text;
}

function langChange(lang) {
    proxy.$i18n.locale = formData.lang;
    uni.setStorageSync('lang', lang);
    curLang.value = (range.value.find((i) => i.value === lang) || {}).text;
    changeTitle(proxy.$t('login.title'));
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
    class="login-wraper relative overflow-hidden w-100vw h-100vh bg-url-['login_bg.png'] bg-s-[100%,878rpx]"
  >
    <view
      class="flex absolute right-15 top-54 items-center text-center lh-22 fs-15 c-[#646a73]"
    >
      <uni-icons type="contact" size="30"></uni-icons>
      <view>{{ curLang }}</view>
      <uni-icons type="bottom" size="30"></uni-icons>
    </view>
    <view
      class="login-language-real flex absolute right-15 top-54 z-1 w-120 h-25"
    >
      <uni-data-select
        v-model="formData.lang"
        :localdata="range"
        :clear="false"
        @change="langChange"
      ></uni-data-select>
    </view>
    <view class="flex flex-col mt-111 mb-44rpx ml-21">
      <image
        class="w-60 h-60 bg-url-['login_logo.png'] bg-s-[100%] lh-17 text-left fw-500 fs-13 c-[#000]"
        src="/static/login_logo.png"
      />
      <view>{{ $t('login.logoTitle') }}</view>
    </view>
    <uni-forms ref="formRef" :model-value="formData" class="login-form-wraper">
      <uni-forms-item label="" name="account" class="mb-8">
        <uni-easyinput
          v-model="formData.account"
          type="text"
          :placeholder="$t('login.accountPlaceHolder')"
        />
      </uni-forms-item>
      <uni-forms-item label="" name="password">
        <uni-easyinput
          v-model="formData.password"
          type="password"
          :placeholder="$t('login.passwordPlaceholder')"
        ></uni-easyinput>
      </uni-forms-item>
      <button
        type="primary"
        :disabled="!canClick"
        class="w-343 h-42 b-rd-8 fw-400 fs-16 c-[#fff]"
        @click="submitForm"
      >
        {{ $t('login.loginBtn') }}
      </button>
      <uni-forms-item name="argument">
        <view class="flex items-center mt-10">
          <uni-data-checkbox
            v-model="formData.argument"
            :localdata="readText"
          />
          <view class="flex-16 lh-12 text-left fw-400 fs-12 c-[#8f959e]">
            {{ $t('login.agreementText') }}
            <text class="lh-9 text-left fw-500 fs-12 c-[#646a73]"
              >《{{ $t('login.agreementTerms') }}》</text
            >
            {{ $t('login.and') }}
            <text class="lh-9 text-left fw-500 fs-12 c-[#646a73]"
              >《{{ $t('login.privacyPolicy') }}》</text
            >
          </view>
        </view>
      </uni-forms-item>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
.login-wraper {
    .login-language-real {
        ::v-deep .uni-select {
            border: none;
        }
        ::v-deep .uni-select__input-box {
            opacity: 0;
        }
    }
    ::v-deep .uni-forms {
        box-sizing: border-box;
        padding: 0 32rpx;
        width: 100%;
        .uni-data-checklist {
            width: 21px;
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
