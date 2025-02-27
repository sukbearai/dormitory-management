import type { ApiResponse } from '~~/types/api';
import type { UserPasswordResult } from '~~/types/database';
import bcrypt from 'bcrypt';
import { query } from '~~/utils/db';

interface UpdatePasswordBody {
  oldPassword: string;
  newPassword: string;
}

export default defineEventHandler(async (event): Promise<ApiResponse> => {
  try {
    const userId = event.context.userId;
    const body = await readBody<UpdatePasswordBody>(event);
    const { oldPassword, newPassword } = body;

    if (!userId) {
      return {
        code: 401,
        message: '未授权'
      };
    }

    if (!oldPassword || !newPassword) {
      return {
        code: 400,
        message: '原密码和新密码不能为空'
      };
    }

    // 查询用户当前密码
    const users = await query<UserPasswordResult[]>(
      'SELECT password FROM Users WHERE user_id = ?',
      [userId]
    );

    if (!Array.isArray(users) || users.length === 0) {
      return {
        code: 404,
        message: '用户不存在'
      };
    }

    const user = users[0];

    // 验证原密码
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return {
        code: 400,
        message: '原密码错误'
      };
    }

    // 加密新密码
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 更新密码
    await query(
      'UPDATE Users SET password = ? WHERE user_id = ?',
      [hashedPassword, userId]
    );

    return {
      code: 200,
      message: '密码修改成功'
    };

  } catch (error) {
    console.error('修改密码失败:', error);
    return {
      code: 500,
      message: '服务器错误'
    };
  }
});