import { query } from '~~/utils/db';
import bcrypt from 'bcrypt';

/**
 * 用户注册处理程序
 * @route POST /api/register
 * @param {Object} event - H3 事件对象
 * @param {Object} event.body - 请求体
 * @param {string} event.body.username - 用户名
 * @param {string} event.body.password - 密码
 * @param {('admin'|'student'|'maintenance'|'dorm_staff')} [event.body.role='student'] - 用户角色
 * @param {string} [event.body.real_name=''] - 真实姓名
 * @param {string} [event.body.contact=''] - 联系方式
 * @returns {Promise<Object>} 返回注册结果
 * @throws {Object} 当注册失败时抛出错误对象
 * 
 * @example
 * // 请求体示例
 * {
 *   "username": "student1",
 *   "password": "123456",
 *   "role": "student",
 *   "real_name": "张三",
 *   "contact": "13800138000"
 * }
 * 
 * // 成功响应示例
 * {
 *   "code": 200,
 *   "message": "注册成功",
 *   "data": {
 *     "user_id": 1,
 *     "username": "student1",
 *     "role": "student"
 *   }
 * }
 * 
 * // 错误响应示例
 * {
 *   "code": 400,
 *   "message": "用户名已存在"
 * }
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, password, role, real_name, contact } = body;

    if(role === 'admin') {
      return {
        code: 400,
        message: '不能注册管理员'
      };
    }

    // 参数验证
    if (!username || !password) {
      return {
        code: 400,
        message: '用户名和密码不能为空'
      };
    }

    // 检查用户名是否已存在
    const existingUser = await query(
      'SELECT username FROM Users WHERE username = ?',
      [username]
    );

    if (Array.isArray(existingUser) && existingUser.length > 0) {
      return {
        code: 400,
        message: '用户名已存在'
      };
    }

    // 密码加密
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 插入新用户
    const result = await query(
      'INSERT INTO Users (username, password, role, real_name, contact) VALUES (?, ?, ?, ?, ?)',
      [username, hashedPassword, role || 'student', real_name || '', contact || '']
    );

    return {
      code: 200,
      message: '注册成功',
      data: {
        user_id: (result as any)?.insertId, 
        username,
        role: role || 'student'
      }
    };
  } catch (error) {
    console.error('注册失败:', error);
    return {
      code: 500,
      message: '服务器错误'
    };
  }
});