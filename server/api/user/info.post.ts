import type { ApiResponse, UserInfo } from '~~/types/api'
import type { DormInfoResult, UserRow } from '~~/types/database'
import {  queryOne } from '~~/utils/db'

export default defineEventHandler(async (event): Promise<ApiResponse<UserInfo>> => {
  try {
    const userId = event.context.userId

    if (!userId) {
      return {
        code: 401,
        message: '未授权'
      }
    }

    // 查询用户基本信息
    const user = await queryOne<UserRow>(
      `SELECT 
        user_id,
        username,
        role,
        real_name,
        contact
      FROM Users 
      WHERE user_id = ?`,
      [userId]
    )

    if (!user) {
      return {
        code: 404,
        message: '用户不存在'
      }
    }

    // 如果是学生，额外查询宿舍信息
    let dormInfo = null
    if (user.role === 'student') {
      const dormData = await queryOne<DormInfoResult>(
        `SELECT d.dorm_number, d.build_id
        FROM Student_Dorm sd
        JOIN Dorms d ON sd.dorm_id = d.dorm_id
        WHERE sd.student_id = ?`,
        [userId]
      )
      
      if (dormData) {
        dormInfo = {
          dormNumber: dormData.dorm_number,
          building: dormData.building
        }
      }
    }

    const response: ApiResponse<UserInfo> = {
      code: 200,
      message: '获取用户信息成功',
      data: {
        userId: user.user_id,
        username: user.username,
        role: user.role,
        name: user.real_name || '',
        contact: user.contact || '',
        dorm: dormInfo
      }
    }

    return response

  } catch (error) {
    console.error('获取用户信息失败:', error)
    return {
      code: 500,
      message: '服务器错误'
    }
  }
})