import type { DashboardOverview, OccupancyTrend } from '@/types/api';
import type { HttpResponse} from '@/utils/request';
import { request } from '@/utils/request';

export function queryOverviewData() {
  return request<HttpResponse<DashboardOverview>>('/api/dashboard/overview', {
    method: 'GET'
  });
}

export function queryOccupancyTrendData() {
  return request<HttpResponse<OccupancyTrend>>('/api/dashboard/occupancy-trend', {
    method: 'GET'
  });
}

export function queryRepairOrdersData() {
  return request<HttpResponse<DashboardOverview>>('/api/dashboard/repair-orders', {
    method: 'GET'
  });
}