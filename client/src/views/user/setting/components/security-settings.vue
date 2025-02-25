<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 8 }"
    :wrapper-col-props="{ span: 16 }"
  >
    <a-form-item
      field="oldPassword"
      label="原密码"
      :rules="[{ required: true, message: '请输入原密码' }]"
    >
      <a-input-password
        v-model="formData.oldPassword"
        placeholder="请输入原密码"
      />
    </a-form-item>
    <a-form-item
      field="newPassword"
      label="新密码"
      :rules="[
        { required: true, message: '请输入新密码' },
        { minLength: 6, message: '密码长度不能小于6位' }
      ]"
    >
      <a-input-password
        v-model="formData.newPassword"
        placeholder="请输入新密码"
      />
    </a-form-item>
    <a-form-item
      field="confirmPassword"
      label="确认新密码"
      :rules="[
        { required: true, message: '确认密码不能为空' },
        {
          validator: (value: string, cb:Function) => {
            if (value !== formData.newPassword) {
              cb('两次密码输入不一致');
            } else {
              cb();
            }
          }
        },
      ]"
    >
      <a-input-password
        v-model="formData.confirmPassword"
        placeholder="请确认新密码"
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="handleSubmit">保存</a-button>
        <a-button @click="reset">重置</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { Message } from '@arco-design/web-vue';
import { useRequest } from 'vue-hooks-plus';
import { updateUserPwd } from '@/api/user-center' 

interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const formRef = ref<FormInstance>();
const formData = ref<FormData>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const { run: updatePwdApi } = useRequest(updateUserPwd,
  {
    manual: true,
    onSuccess: (res: any) => {
      if (res.code === 200) {
        Message.success('密码修改成功');
        reset();
      }
    }
  }
);

const handleSubmit = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) {
    updatePwdApi({
      oldPassword: formData.value.oldPassword,
      newPassword: formData.value.newPassword
    });
  }
};

const reset = () => {
  formRef.value?.resetFields();
};
</script>

<style scoped lang="less">
.form {
  width: 540px;
  margin: 0 auto;
}
</style>