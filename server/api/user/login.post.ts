import type { ApiResponse, LoginResponse } from '~~/types/api'
import type { UserRow } from '~~/types/database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { queryOne } from '~~/utils/db'

interface LoginBody {
  username: string;
  password: string;
}

export default defineEventHandler(async (event): Promise<ApiResponse<LoginResponse>> => {
  try {
    const body = await readBody<LoginBody>(event)
    const { username, password } = body

    if (!username || !password) {
      return {
        code: 400,
        message: '用户名和密码不能为空'
      }
    }

    const user = await queryOne<UserRow>(
      'SELECT user_id, username, password, role, real_name FROM Users WHERE username = ?',
      [username]
    )

    if (!user) {
      return {
        code: 400,
        message: '用户名或密码错误'
      }
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return {
        code: 400,
        message: '用户名或密码错误'
      }
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        role: user.role
      },
      'dormitory-management',
      { expiresIn: '24h' }
    )

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
    }
  } catch (error) {
    console.error('登录失败:', error)
    return {
      code: 500,
      message: '服务器错误'
    }
  }
})