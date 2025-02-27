<template>
    <a-card
      class="general-card"
      title="快捷操作"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{ padding: '24px 20px 0 20px' }"
    >
      <a-row :gutter="8">
        <a-col v-for="link in links" :key="link.text" :span="8" class="wrapper">
          <div class="icon-wrapper">
            <component :is="link.icon" />
          </div>
          <div class="text">{{ link.text }}</div>
        </a-col>
      </a-row>
    </a-card>
  </template>
  
  <script lang="ts" setup>
  import { 
    IconUserAdd, 
    IconEdit, 
    IconTool,
    IconSwap,
    IconCalendar,
    IconExport
  } from '@arco-design/web-vue/es/icon';
  
  const links = [
    { text: '学生入住', icon: IconUserAdd },
    { text: '信息登记', icon: IconEdit },
    { text: '报修登记', icon: IconTool },
    { text: '调宿申请', icon: IconSwap },
    { text: '假期管理', icon: IconCalendar },
    { text: '退宿办理', icon: IconExport },
  ];
  </script>
  
  <style scoped lang="less">
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0;
    cursor: pointer;
  
    &:hover {
      background-color: var(--color-fill-2);
      border-radius: 4px;
    }
  
    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      margin-bottom: 4px;
      font-size: 20px;
      border-radius: 50%;
      background-color: var(--color-fill-2);
      color: rgb(var(--primary-6));
    }
  
    .text {
      color: var(--color-text-2);
      font-size: 14px;
      line-height: 22px;
    }
  }
  
  .general-card {
    :deep(.arco-card-body) {
      padding-bottom: 24px;
    }
  }
  </style>