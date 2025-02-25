import { query } from '~~/utils/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * 用户登录处理程序
 * @route POST /api/login
 * @param {Object} event - H3 事件对象
 * @param {Object} event.body - 请求体
 * @param {string} event.body.username - 用户名
 * @param {string} event.body.password - 密码
 * @returns {Promise<Object>} 返回登录结果
 * 
 * @example
 * // 请求体示例
 * {
 *   "username": "student1",
 *   "password": "123456"
 * }
 * 
 * // 成功响应示例
 * {
 *   "code": 200,
 *   "message": "登录成功",
 *   "data": {
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *     "user": {
 *       "user_id": 1,
 *       "username": "student1",
 *       "role": "student",
 *       "real_name": "张三"
 *     }
 *   }
 * }
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, password } = body;

    // 参数验证
    if (!username || !password) {
      return {
        code: 400,
        message: '用户名和密码不能为空'
      };
    }

    // 查询用户
    const users = await query(
      'SELECT user_id, username, password, role, real_name FROM Users WHERE username = ?',
      [username]
    );

    if (!Array.isArray(users) || users.length === 0) {
      return {
        code: 400,
        message: '用户名或密码错误'
      };
    }

    const user: any = users[0];

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return {
        code: 400,
        message: '用户名或密码错误'
      };
    }

    // 生成 JWT token
    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        role: user.role
      },
      'dormitory-management',
      { expiresIn: '24h' }
    );

    return {
      code: 200,
      message: '登录成功',
      data: {
        token,
        user: {
          user_id: user.user_id,
          username: user.username,
          role: user.role,
          real_name: user.real_name
        }
      }
    };
  } catch (error) {
    console.error('登录失败:', error);
    return {
      code: 500,
      message: '服务器错误'
    };
  }
});