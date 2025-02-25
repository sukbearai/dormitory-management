export type RoleType = 'admin' | 'student' | 'maintenance' | 'dorm_staff' ;
export interface UserState {
  userId?: number;
  username?: string;
  name?: string;
  role: string;
  concat?: string;
  dorm: {
    dormNumber: string;
    building: string;
  } | null;
  avatar?: string;
  email?: string;
  introduction?: string;
  registrationDate?: string;
}