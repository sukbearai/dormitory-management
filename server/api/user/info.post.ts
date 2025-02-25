import { query } from '~~/utils/db';

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.userId;

    if (!userId) {
      return {
        code: 401,
        message: '未授权'
      };
    }

    // 查询用户基本信息
    const users = await query(
      `SELECT 
        user_id,
        username,
        role,
        real_name,
        contact
      FROM Users 
      WHERE user_id = ?`,
      [userId]
    );

    if (!Array.isArray(users) || users.length === 0) {
      return {
        code: 404,
        message: '用户不存在'
      };
    }

    const user: any = users[0];

    // 如果是学生，额外查询宿舍信息
    let dormInfo = null;
    if (user.role === 'student') {
      const dorms = await query(
        `SELECT d.dorm_number, d.building
        FROM Student_Dorm sd
        JOIN Dorms d ON sd.dorm_id = d.dorm_id
        WHERE sd.student_id = ?`,
        [userId]
      );
      if (Array.isArray(dorms) && dorms.length > 0) {
        dormInfo = dorms[0];
      }
    }

    return {
      code: 200,
      message: '获取用户信息成功',
      data: {
        userId: user.user_id,
        username: user.username,
        role: user.role,
        name: user.real_name || '',
        contact: user.contact || '',
        dorm: dormInfo ? {
          dormNumber: dormInfo.dorm_number,
          building: dormInfo.building
        } : null
      }
    };
  } catch (error) {
    console.error('获取用户信息失败:', error);
    return {
      code: 500,
      message: '服务器错误'
    };
  }
});