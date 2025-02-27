<template>
    <div class="statistic-card">
      <a-spin :loading="loading">
        <div class="content">
          <div class="left">
            <div class="title">{{ title }}</div>
            <div class="value">{{ value }}</div>
          </div>
          <div class="right">
            <component :is="icon" :style="{ fontSize: '32px', color: '#165DFF' }" />
          </div>
        </div>
      </a-spin>
    </div>
  </template>
  
  <script lang="ts" setup>
  defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    icon: {
      type: Object,
      required: true,
    },
  });
  </script>
  
  <style scoped lang="less">
  .statistic-card {
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
  
      .left {
        .title {
          font-size: 14px;
          color: rgb(var(--gray-6));
          margin-bottom: 8px;
        }
  
        .value {
          font-size: 24px;
          font-weight: bold;
          color: rgb(var(--gray-10));
        }
      }
  
      .right {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: rgb(var(--primary-1));
        margin-left: 5px;
      }
    }
  }
  </style>