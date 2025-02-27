<template>
    <a-spin :loading="loading">
      <a-card
        class="general-card"
        :title="'维修工单分类统计'"
      >
        <Chart height="300px" :option="chartOption" />
      </a-card>
    </a-spin>
  </template>
  
  <script lang="ts" setup>
  import useChartOption from '@/hooks/chart-option';

  import { queryRepairOrdersData } from '@/api/dashboard';
  import { useRequest } from 'vue-hooks-plus';
  
  
  const { chartOption } = useChartOption((isDark) => {
    return {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center'
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true,
              formatter: '{b}: {c} ({d}%)'
            }
          },
          data: [
            { value: 35, name: '水电维修' },
            { value: 25, name: '家具维修' },
            { value: 20, name: '门窗维修' },
            { value: 15, name: '空调维修' },
            { value: 5, name: '其他' }
          ]
        }
      ]
    };
  });

  const { loading } = useRequest(queryRepairOrdersData)
  </script>