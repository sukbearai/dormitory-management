export default defineEventHandler(async (event) => {
    const role = event.context.user?.role;
  
    // 基础菜单
    const baseMenus = [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          locale: 'menu.dashboard',
          requiresAuth: true,
          icon: 'icon-dashboard',
          order: 1,
        },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            meta: {
              locale: 'menu.dashboard.workplace',
              requiresAuth: true,
            },
          },
        ],
      },
    ];
  
    // 根据角色返回不同的菜单
    const roleMenus = {
      admin: [
        {
          path: '/user',
          name: 'user',
          meta: {
            locale: 'menu.user',
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
                locale: 'menu.user.info',
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
            locale: 'menu.dorm',
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
                locale: 'menu.dorm.info',
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
            locale: 'menu.inspection',
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
            locale: 'menu.repair',
            icon: 'icon-tool',
            requiresAuth: true,
            order: 2,
            roles: ['maintenance'],
          },
        },
      ],
    };
  
    return {
      code: 200,
      message: '获取菜单成功',
      data: [...baseMenus, ...(roleMenus[role as keyof typeof roleMenus] || [])],
    };
  });