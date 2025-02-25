import axios from 'axios';

export interface MyProjectRecord {
  id: number;
  name: string;
  description: string;
  peopleNumber: number;
  contributors: {
    name: string;
    email: string;
    avatar: string;
  }[];
}

export interface UserInfo {
  real_name: string;
  contact: string;
}

interface UserPwd {
  oldPassword: string;
  newPassword: string;
}

export function queryMyProjectList() {
  return axios.post('/api/user/my-project/list');
}

export interface MyTeamRecord {
  id: number;
  avatar: string;
  name: string;
  peopleNumber: number;
}
export function queryMyTeamList() {
  return axios.post('/api/user/my-team/list');
}

export interface LatestActivity {
  id: number;
  title: string;
  description: string;
  avatar: string;
}
export function queryLatestActivity() {
  return axios.post<LatestActivity[]>('/api/user/latest-activity');
}

export function saveUserInfo(data: UserInfo) {
  return axios.post('/api/user/save-info', data);
}

export function updateUserPwd(data: UserPwd) {
  return axios.post('/api/user/update-pwd', data);
}

export interface BasicInfoModel {
  email: string;
  nickname: string;
  countryRegion: string;
  area: string;
  address: string;
  profile: string;
}

export interface EnterpriseCertificationModel {
  accountType: number;
  status: number;
  time: string;
  legalPerson: string;
  certificateType: string;
  authenticationNumber: string;
  enterpriseName: string;
  enterpriseCertificateType: string;
  organizationCode: string;
}

export type CertificationRecord = Array<{
  certificationType: number;
  certificationContent: string;
  status: number;
  time: string;
}>;

export interface UnitCertification {
  enterpriseInfo: EnterpriseCertificationModel;
  record: CertificationRecord;
}

export function queryCertification() {
  return axios.post<UnitCertification>('/api/user/certification');
}

export function userUploadApi(
  data: FormData,
  config: {
    controller: AbortController;
    onUploadProgress?: (progressEvent: any) => void;
  }
) {
  // const controller = new AbortController();
  return axios.post('/api/user/upload', data, config);
}
