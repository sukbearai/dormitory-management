<template>
    <a-card
      class="general-card"
      title="使用指南"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{ padding: '16px 20px' }"
    >
      <div class="guide-content">
        <div class="guide-section">
          <div class="section-title">
            <icon-user /> 学生用户
          </div>
          <div class="section-items">
            <div class="item">1. 登录系统后可查看个人宿舍信息</div>
            <div class="item">2. 在线提交维修申请和调宿申请</div>
            <div class="item">3. 查看宿舍卫生检查结果</div>
          </div>
        </div>
  
        <div class="guide-section">
          <div class="section-title">
            <icon-tool /> 维修人员
          </div>
          <div class="section-items">
            <div class="item">1. 接收并处理维修工单</div>
            <div class="item">2. 更新维修进度和完成状态</div>
          </div>
        </div>
  
        <div class="guide-section">
          <div class="section-title">
            <icon-user-group /> 宿管人员
          </div>
          <div class="section-items">
            <div class="item">1. 管理学生入住和退宿</div>
            <div class="item">2. 处理调宿申请</div>
            <div class="item">3. 记录宿舍卫生检查</div>
          </div>
        </div>
      </div>
    </a-card>
  </template>
  
  <script lang="ts" setup>
  import { IconUser, IconTool, IconUserGroup } from '@arco-design/web-vue/es/icon';
  </script>
  
  <style scoped lang="less">
  .guide-content {
    .guide-section {
      margin-bottom: 16px;
      
      &:last-child {
        margin-bottom: 0;
      }
  
      .section-title {
        display: flex;
        align-items: center;
        font-size: 15px;
        font-weight: 500;
        color: var(--color-text-1);
        margin-bottom: 8px;
  
        :deep(.arco-icon) {
          margin-right: 6px;
          font-size: 16px;
          color: rgb(var(--primary-6));
        }
      }
  
      .section-items {
        .item {
          color: var(--color-text-2);
          line-height: 1.8;
          font-size: 13px;
          padding-left: 22px;
        }
      }
    }
  }
  </style>