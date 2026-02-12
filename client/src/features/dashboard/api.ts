import api from "../../services/api";

export interface SalesReportResponse {
   success: boolean;
   data: [_id: string, total: number];
}

export const dashboardApi = {
   getSalesReport: async (timeInterval: 'yearly' | 'monthly'): Promise<SalesReportResponse> => {
      const { data } = await api.get<SalesReportResponse>(`/reports/sales?timeInterval=${timeInterval}`);
      return data;
   },
};
