import type { UserRow } from "./database"

interface UserInfo {
    userId: number
    username: string
    role: UserRow['role']
    name: string
    contact: string
    dorm: {
      dormNumber: string
      building: string
    } | null
  }

interface MenuItem {
    path: string
    name: string
    meta: {
      locale: string
      requiresAuth: boolean
      icon?: string
      order?: number
      roles?: UserRow['role'][]
    }
    children?: MenuItem[]
  }

  interface LoginResponse {
    token: string
    user: {
      user_id: number
      username: string
      role: UserRow['role']
      real_name: string | null
    }
  }

  interface RegisterResponse {
    user_id: number
    username: string
    role: UserRow['role']
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
  
  export interface RepairOrderStat {
    name: string;
    value: number;
  }
  
  interface ApiResponse<T = unknown> {
    code: number
    message: string
    data?: T
  }