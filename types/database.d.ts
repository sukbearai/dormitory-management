import type { RowDataPacket } from 'mysql2'

export interface BaseRow extends RowDataPacket {
  created_at?: Date
  updated_at?: Date
}

interface CountResult extends RowDataPacket {
  count: number;
}

interface OccupancyRecord extends RowDataPacket {
  month: string;
  count: number;
}

interface RepairStatusCount extends RowDataPacket {
  status: 'pending' | 'in_progress' | 'completed';
  count: number;
}

interface UserIdResult extends RowDataPacket {
  user_id: number;
}

interface UserPasswordResult extends RowDataPacket {
  password: string;
}

export interface UserRow extends BaseRow {
  user_id: number
  username: string
  password: string
  role: 'admin' | 'student' | 'maintenance' | 'dorm_staff'
  real_name: string | null
  contact: string | null
}

export interface BuildingRow extends BaseRow {
  build_id: number
  building_name: string
  staff_id: number | null
}

export interface DormRow extends BaseRow {
  dorm_id: number
  dorm_number: string
  capacity: number
  build_id: number | null
}

export interface RepairRow extends BaseRow {
  repair_id: number
  student_id: number | null
  dorm_id: number | null
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  maintenance_id: number | null
}

export interface StudentDormRow extends BaseRow {
  id: number
  student_id: number
  dorm_id: number
}

export interface DormInspectionRow extends BaseRow {
  inspection_id: number
  dorm_id: number
  staff_id: number
  inspection_time: Date
  result: string
  remarks: string | null
}

export interface LateReturnRow extends BaseRow {
  late_id: number
  student_id: number
  dorm_id: number
  return_time: Date
  reason: string | null
}

export interface UserLoginResult extends RowDataPacket {
  user_id: number;
  username: string;
  password: string;
  role: UserRow['role'];
  real_name: string | null;
}

export interface DormInfoResult extends RowDataPacket {
  dorm_number: string;
  building: string;
}