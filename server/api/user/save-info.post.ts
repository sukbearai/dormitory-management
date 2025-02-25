import { query } from '~~/utils/db';

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.userId;
    const body = await readBody(event);

    if (!userId) {
      return {
        code: 401,
        message: '未授权'
      };
    }

    const { real_name, contact } = body;

    // 验证用户是否存在
    const users = await query(
      'SELECT user_id FROM Users WHERE user_id = ?',
      [userId]
    );

    if (!Array.isArray(users) || users.length === 0) {
      return {
        code: 404,
        message: '用户不存在'
      };
    }

    // 更新用户信息
    await query(
      `UPDATE Users 
       SET real_name = ?, contact = ?
       WHERE user_id = ?`,
      [real_name, contact, userId]
    );

    return {
      code: 200,
      message: '更新用户信息成功'
    };

  } catch (error) {
    console.error('更新用户信息失败:', error);
    return {
      code: 500,
      message: '服务器错误'
    };
  }
});