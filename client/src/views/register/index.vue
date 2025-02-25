<template>
    <div class="container">
      <div class="register-form">
        <div class="register-title">注册账号</div>
        <a-form
          ref="formRef"
          :model="userInfo"
          class="register-form-wrapper"
          layout="vertical"
          @submit="handleSubmit"
        >
          <!-- 用户名 -->
          <a-form-item
            field="username"
            :rules="[
              { required: true, message: '用户名不能为空' },
              { minLength: 4, message: '用户名长度不能小于4个字符' },
              { maxLength: 50, message: '用户名长度不能超过50个字符' }
            ]"
            :validate-trigger="['change', 'blur']"
            hide-label
          >
            <a-input
              v-model="userInfo.username"
              placeholder="请输入用户名(4-50个字符)"
            >
              <template #prefix>
                <icon-user />
              </template>
            </a-input>
          </a-form-item>
          <!-- 密码 -->
          <a-form-item
            field="password"
            :rules="[
              { required: true, message: '密码不能为空' },
              { minLength: 6, message: '密码长度不能小于6个字符' },
              { maxLength: 20, message: '密码长度不能超过20个字符' }
            ]"
            :validate-trigger="['change', 'blur']"
            hide-label
          >
            <a-input-password
              v-model="userInfo.password"
              placeholder="请输入密码(6-20个字符)"
            >
              <template #prefix>
                <icon-lock />
              </template>
            </a-input-password>
          </a-form-item>
          <!-- 确认密码 -->
          <a-form-item
            field="confirmPassword"
            :rules="[
              { required: true, message: '确认密码不能为空' },
              {
                validator: (value: string, cb:Function) => {
                   if(value !== userInfo.password)
                   cb('两次密码输入不一致')
                }
              },
            ]"
            :validate-trigger="['change', 'blur']"
            hide-label
          >
            <a-input-password
              v-model="userInfo.confirmPassword"
              placeholder="请确认密码"
            >
              <template #prefix>
                <icon-lock />
              </template>
            </a-input-password>
          </a-form-item>
          <!-- 真实姓名 -->
          <a-form-item
            field="real_name"
            :rules="[
              { required: true, message: '真实姓名不能为空' },
              { maxLength: 50, message: '姓名长度不能超过50个字符' }
            ]"
            hide-label
          >
            <a-input
              v-model="userInfo.real_name"
              placeholder="请输入真实姓名"
            >
              <template #prefix>
                <icon-user />
              </template>
            </a-input>
          </a-form-item>
          <!-- 联系方式 -->
          <a-form-item
            field="contact"
            :rules="[
              { required: true, message: '手机号不能为空' },
              { 
                match: /^1[3-9]\d{9}$/, 
                message: '请输入正确的手机号' 
              },
              { maxLength: 20, message: '联系方式长度不能超过20个字符' }
            ]"
            hide-label
          >
            <a-input
              v-model="userInfo.contact"
              placeholder="请输入手机号"
            >
              <template #prefix>
                <icon-phone />
              </template>
            </a-input>
          </a-form-item>
          <!-- 角色选择 -->
          <a-form-item
            field="role"
            :rules="[{ required: true, message: '请选择角色' }]"
            hide-label
          >
            <a-select
              v-model="userInfo.role"
              placeholder="请选择角色"
            >
              <a-option value="student">学生</a-option>
              <a-option value="maintenance">维修人员</a-option>
              <a-option value="dorm_staff">宿管人员</a-option>
              <a-option value="admin">管理员</a-option>
            </a-select>
          </a-form-item>
          <a-space direction="vertical" :size="16">
            <div class="register-form-error-msg">{{ errorMessage }}</div>
            <a-button type="primary" html-type="submit" long :loading="loading">
              注册
            </a-button>
            <a-button type="text" long @click="handleLogin">
              已有账号？去登录
            </a-button>
          </a-space>
        </a-form>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { register } from '@/api/user';
  import useLoading from '@/hooks/loading';
  
  const router = useRouter();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  
  const userInfo = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    real_name: '',
    contact: '',
    role: '',
  });
  
  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: any;
    values: any;
  }) => {
    if (errors) return;
    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = values;
      await register(registerData);
      Message.success('注册成功');
      router.push('/login');
    } catch (err) {
      errorMessage.value = '注册失败，请重试';
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogin = () => {
    router.push('/login');
  };
  </script>
  
  <style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: var(--color-neutral-1);
  }
  
  .register-form {
    width: 400px;
    padding: 20px;
    border-radius: 4px;
    background-color: var(--color-bg-2);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    & .register-title {
      color: var(--color-text-1);
    }
  
    &-wrapper {
      margin-top: 20px;
    }
  
    &-title {
      font-size: 28px;
      font-weight: 500;
      text-align: center;
      color: var(--color-text-1);
    }
  
    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
      text-align: center;
    }
  }
  </style>