import type { ApiResponse } from "~~/types/api"

export default defineEventHandler(async (event): Promise<ApiResponse> => {
  try {
    const userId = event.context.userId

    if (!userId) {
      return {
        code: 401,
        message: '未授权'
      }
    }

    // 由于使用的是 JWT，服务端不需要额外的登出处理
    // 客户端会清除本地存储的 token
    return {
      code: 200,
      message: '退出成功'
    }

  } catch (error) {
    console.error('退出失败:', error)
    return {
      code: 500,
      message: '服务器错误'
    }
  }
})