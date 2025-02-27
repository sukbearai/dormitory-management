import type { ApiResponse, MenuItem } from '~~/types/api'
import type { UserRow } from '~~/types/database'

export default defineEventHandler(async (event): Promise<ApiResponse<MenuItem[]>> => {
  const role = event.context.user?.role as UserRow['role']

  if (!role) {
    return {
      code: 401,
      message: '未授权访问'
    }
  }

  const baseMenus: MenuItem[] = [
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        locale: '仪表盘',
        requiresAuth: true,
        icon: 'icon-dashboard',
        order: 1,
      },
      children: [
        {
          path: '/dashboard/workplace',
          name: 'Workplace',
          meta: {
            locale: '工作台',
            requiresAuth: true,
          },
        },
      ],
    },
  ]


  // 根据角色返回不同的菜单
  const roleMenus: Record<UserRow['role'], MenuItem[]> = {
    admin: [
      {
        path: '/user',
        name: 'user',
        meta: {
          locale: '用户管理',
          icon: 'icon-user',
          requiresAuth: true,
          order: 2,
          roles: ['admin'],
        },
        children: [
          {
            path: '/user/info',
            name: 'Info',
            meta: {
              locale: '用户信息',
              requiresAuth: true,
              roles: ['admin'],
            },
          },
        ],
      },
    ],
    student: [
      {
        path: '/dorm',
        name: 'dorm',
        meta: {
          locale: '宿舍管理',
          icon: 'icon-home',
          requiresAuth: true,
          order: 2,
          roles: ['student'],
        },
        children: [
          {
            path: '/dorm/info',
            name: 'DormInfo',
            meta: {
              locale: '宿舍信息',
              requiresAuth: true,
              roles: ['student'],
            },
          },
        ],
      },
    ],
    dorm_staff: [
      {
        path: '/inspection',
        name: 'inspection',
        meta: {
          locale: '宿舍检查',
          icon: 'icon-check',
          requiresAuth: true,
          order: 2,
          roles: ['dorm_staff'],
        },
      },
    ],
    maintenance: [
      {
        path: '/repair',
        name: 'repair',
        meta: {
          locale: '维修管理',
          icon: 'icon-tool',
          requiresAuth: true,
          order: 2,
          roles: ['maintenance'],
        },
      },
    ],
  }

  const response: ApiResponse<MenuItem[]> = {
    code: 200,
    message: '获取菜单成功',
    data: [...baseMenus, ...(roleMenus[role] || [])]
  }

  return response
})