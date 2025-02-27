import type { ApiResponse, RepairOrderStat } from '~~/types/api';
import type { RepairStatusCount } from '~~/types/database';
import { query } from '~~/utils/db';

export default defineEventHandler(async (): Promise<ApiResponse<RepairOrderStat[]>> => {
  try {
    // 按状态统计维修工单
    const result = await query<RepairStatusCount[]>(`
      SELECT 
        status,
        COUNT(*) as count
      FROM Repairs
      GROUP BY status
    `, []);

    // 转换为前端需要的格式
    const statusMap = {
      pending: '待处理',
      in_progress: '处理中',
      completed: '已完成'
    };

    const data = (result).map(item => ({
      name: statusMap[item.status],
      value: item.count
    }));

    return {
      code: 200,
      message: '获取维修工单统计成功',
      data
    };
  } catch (error) {
    console.error('获取维修工单统计失败:', error);
    return {
      code: 500,
      message: '服务器错误'
    };
  }
});