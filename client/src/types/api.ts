export interface LoginResponse {
    token: string;
    user: {
      user_id: number;
      username: string;
      role: string;
      real_name: string;
    };
  }
  
  export interface RegisterResponse {
    user_id: number;
    username: string;
    role: string;
  }
  
  export interface UserInfo {
    userId: number;
    username: string;
    role: string;
    name: string;
    contact: string;
    dorm: {
      dormNumber: string;
      building: string;
    } | null;
  }
  
  export interface MenuItem {
    path: string;
    name: string;
    meta: {
      locale: string;
      requiresAuth: boolean;
      icon?: string;
      order?: number;
      roles?: string[];
    };
    children?: MenuItem[];
  }
  
  export interface DashboardOverview {
    buildingCount: number;
    dormCount: number;
    studentCount: number;
    pendingRepairCount: number;
  }

  export interface OccupancyTrend {
    months: string[];
    counts: number[];
  }