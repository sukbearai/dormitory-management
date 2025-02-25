import { query } from '~~/utils/db';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  // api 白名单
  const publicPaths = ['/api/user/login', '/api/user/register'];
  if (!publicPaths.some(path => event.path.includes(path)) && event.method !== 'OPTIONS') {
    // 从请求头获取 token
    const authorization = getHeader(event, 'Authorization');
    
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        message: 'No token provided'
      });
    }

    try {
      // 验证 token
      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'dormitory-management') as { user_id: number };
      
      // 将解析出的用户ID存入上下文
      event.context.userId = decoded.user_id;

      // 查询用户角色
      const result = await query('SELECT role FROM Users WHERE user_id = ?', [decoded.user_id]);
      const user = Array.isArray(result) ? result[0] : null;

      if (!user) {
        throw createError({
          statusCode: 404,
          message: 'User not found'
        });
      }

      event.context.user = user;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw createError({
          statusCode: 401,
          message: 'Invalid token'
        });
      }
      throw createError({
        statusCode: 500,
        message: '数据库操作失败',
        cause: error
      });
    }
  }
});