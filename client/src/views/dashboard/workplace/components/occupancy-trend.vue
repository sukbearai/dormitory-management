<template>
    <a-spin :loading="loading">
      <a-card
        class="general-card"
        :title="'宿舍入住率趋势'"
        :header-style="{ paddingBottom: '0' }"
      >
        <Chart height="400px" :option="chartOption" />
      </a-card>
    </a-spin>
  </template>
  
  <script lang="ts" setup>
  import useChartOption from '@/hooks/chart-option';
  import { queryOccupancyTrendData } from '@/api/dashboard';
  import { useRequest } from 'vue-hooks-plus';
  
  const { chartOption } = useChartOption((isDark) => {
    return {
      grid: {
        left: '3%',
        right: '4%',
        top: '20px',
        bottom: '30px',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月'],
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        axisLabel: {
          formatter: '{value}%'
        }
      },
      series: [
        {
          name: '入住率',
          type: 'line',
          smooth: true,
          data: [85, 87, 90, 93, 92, 95],
          areaStyle: {
            opacity: 0.2
          },
          itemStyle: {
            color: '#165DFF'
          }
        }
      ],
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c}%'
      }
    };
  });

  const { loading} = useRequest(queryOccupancyTrendData, {
    onSuccess: (res) => {}
  })
  </script>