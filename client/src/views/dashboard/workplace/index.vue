<template>
  <div class="container">
    <!-- 统计卡片 -->
    <a-row :gutter="16" class="row-stats">
      <a-col :span="6">
        <a-card class="overview-card">
          <statistic-card
            :loading="loading"
            title="宿舍楼总数"
            :value="statistics.buildingCount"
            :icon="IconStorage"
          />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card class="overview-card">
          <statistic-card
            :loading="loading"
            title="宿舍总数"
            :value="statistics.dormCount"
            :icon="IconHome"
          />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card class="overview-card">
          <statistic-card
            :loading="loading"
            title="入住学生数"
            :value="statistics.studentCount"
            :icon="IconUser"
          />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card class="overview-card">
          <statistic-card
            :loading="loading"
            title="待处理维修"
            :value="statistics.pendingRepairCount"
            :icon="IconTool"
          />
        </a-card>
      </a-col>
    </a-row>

    <!-- 图表区域 -->
    <a-row :gutter="16" class="row-content">
      <a-col :span="16" class="left-content">
        <occupancy-trend class="chart-item" />
        <repair-orders class="chart-item" />
      </a-col>
      <a-col :span="8" class="right-content">
        <usage-guide class="chart-item" />
        <quick-operation class="chart-item" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IconStorage, IconHome, IconUser, IconTool } from '@arco-design/web-vue/es/icon';
import StatisticCard from './components/statistic-card.vue';
import OccupancyTrend from './components/occupancy-trend.vue';
import RepairOrders from './components/repair-orders.vue';
import UsageGuide from './components/usage-guide.vue';
import QuickOperation from './components/quick-operation.vue';
import { useRequest } from 'vue-hooks-plus';
import { queryOverviewData } from '@/api/dashboard';
import { DashboardOverview } from '@/types/api'

const statistics = ref<DashboardOverview>({
  buildingCount: 0,
  dormCount: 0,
  studentCount: 0,
  pendingRepairCount: 0,
});

const { loading } = useRequest(queryOverviewData, {
  onSuccess(res) {
    if (res.code === 200) {
      statistics.value = res.data;
    }
  }
});
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  gap: 16px;

  .row-stats {
    flex-shrink: 0;
  }

  .row-content {
    flex: 1;
    min-height: 0; // 重要：防止内容溢出

    .left-content, .right-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 16px;
    }

    .chart-item {
      flex: 1;
      
      :deep(.arco-card) {
        height: 100%;
      }

      &:first-child {
        flex: 3; // 第一个图表占据更多空间
      }

      &:last-child {
        flex: 2; // 第二个图表占据较少空间
      }
    }
  }

  .overview-card {
    height: 100%;
  }
}
</style>