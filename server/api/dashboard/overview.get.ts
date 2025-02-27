import type { ApiResponse, DashboardOverview } from '~~/types/api';
import type { CountResult } from '~~/types/database';
import { query } from '~~/utils/db';

export default defineEventHandler(async (): Promise<ApiResponse<DashboardOverview>> => {
  try {
    // 获取宿舍楼总数
    const [buildingCount] = await query<CountResult[]>(
      'SELECT COUNT(*) as count FROM Buildings',[]
    );


    // 获取宿舍总数
    const [dormCount] = await query<CountResult[]>(
      'SELECT COUNT(*) as count FROM Dorms',[]
    );

    // 获取入住学生数
    const [studentCount] = await query<CountResult[]>(
      'SELECT COUNT(DISTINCT student_id) as count FROM Student_Dorm',[]
    );

    // 获取待处理维修数
    const [pendingRepairCount] = await query<CountResult[]>(
      "SELECT COUNT(*) as count FROM Repairs WHERE status = 'pending'",[]
    );

    return {
      code: 200,
      message: '获取概览数据成功',
      data: {
        buildingCount: buildingCount.count || 0,
        dormCount: dormCount.count || 0,
        studentCount: studentCount.count || 0,
        pendingRepairCount: pendingRepairCount.count || 0
      }
    };

  } catch (error) {
    console.error('获取概览数据失败:', error);
    return {
      code: 500,
      message: '服务器错误'
    };
  }
});