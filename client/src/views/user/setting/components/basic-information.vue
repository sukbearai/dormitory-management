<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 8 }"
    :wrapper-col-props="{ span: 16 }"
  >
    <a-form-item
      field="username"
      label="用户名"
      :rules="[{ required: true, message: '请输入用户名' }]"
    >
      <a-input
        v-model="formData.username"
        placeholder="请输入用户名"
        disabled
      />
    </a-form-item>
    <a-form-item
      field="real_name"
      label="真实姓名"
      :rules="[{ required: true, message: '请输入真实姓名' }]"
    >
      <a-input
        v-model="formData.real_name"
        placeholder="请输入真实姓名"
      />
    </a-form-item>
    <a-form-item
      field="contact"
      label="联系方式"
      :rules="[
        { required: true, message: '请输入联系方式' },
        { length: 11, message: '联系方式必须为11位' }
      ]"
    >
      <a-input
        v-model="formData.contact"
        placeholder="请输入联系方式"
      />
    </a-form-item>
    <a-form-item
      field="role"
      label="角色"
    >
      <a-input
        v-model="formData.role"
        placeholder="用户角色"
        disabled
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button :disabled="loading" type="primary" @click="validate">保存</a-button>
        <a-button type="secondary" @click="reset">重置</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { useUserStore } from '@/store';
  import { useRequest } from 'vue-hooks-plus'
  import { saveUserInfo } from '@/api/user-center'
  import { Message } from '@arco-design/web-vue';

  interface UserInfoModel {
    username: string;
    real_name: string;
    contact: string;
    role: 'admin' | 'student' | 'maintenance' | 'dorm_staff' | '';
  }

  const userStore = useUserStore();

  const { run: saveInfoApi, loading } = useRequest(saveUserInfo, {
    manual: true,
    onSuccess: (res: any) => {
        if(res.code === 200) {
          Message.success('保存成功');
          userStore.setInfo({
            name: formData.value.real_name,
            contact: formData.value.contact
          });
      }
    }
  })

  const formRef = ref<FormInstance>();
  const formData = ref<UserInfoModel>({
    username: userStore.username || '',
    real_name: userStore.name || '',
    contact: userStore.contact || '',
    role: userStore.role as any || 'student',
  });

  const validate = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      // do some thing
      saveInfoApi({
        real_name: formData.value.real_name,
        contact: formData.value.contact
      })
    }
  };
  const reset = async () => {
    await formRef.value?.resetFields();
  };
</script>

<style scoped lang="less">
  .form {
    width: 540px;
    margin: 0 auto;
  }
</style>