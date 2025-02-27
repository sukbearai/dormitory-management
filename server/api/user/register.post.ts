import type { ApiResponse, RegisterResponse } from '~~/types/api'
import type { UserRow } from '~~/types/database'
import bcrypt from 'bcrypt'
import { insert, queryOne } from '~~/utils/db'

type RegisterBody = Pick<UserRow, 'username' | 'password' | 'role' | 'real_name' | 'contact'> & {
  // role?: Exclude<UserRow['role'], 'admin'> 
}

export default defineEventHandler(async (event): Promise<ApiResponse<RegisterResponse>> =>  {
  try {
    const body = await readBody<RegisterBody>(event)
    const { username, password, role, real_name, contact } = body

    if(role === 'admin') {
      return {
        code: 400,
        message: '不能注册管理员'
      }
    }

    // 参数验证
    if (!username || !password) {
      return {
        code: 400,
        message: '用户名和密码不能为空'
      }
    }

    // 检查用户名是否已存在
    const existingUser = await queryOne<UserRow>(
      'SELECT username FROM Users WHERE username = ?',
      [username]
    )

    if (existingUser) {
      return {
        code: 400,
        message: '用户名已存在'
      }
    }

    // 密码加密
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // 插入新用户
    const userId = await insert(
      'INSERT INTO Users (username, password, role, real_name, contact) VALUES (?, ?, ?, ?, ?)',
      [username, hashedPassword, role || 'student', real_name || '', contact || '']
    )

    return {
      code: 200,
      message: '注册成功',
      data: {
        user_id: userId,
        username,
        role: role || 'student'
      }
    }
  } catch (error) {
    console.error('注册失败:', error)
    return {
      code: 500,
      message: '服务器错误'
    }
  }
})