import api from "../../services/api";
import type { User } from "../auth/types";

export interface StaffResponse {
   success: boolean;
   staff: User[];
   staffCount?: number;
}

export interface StaffMemberResponse {
   success: boolean;
   staff: User;
}

export interface MessageResponse {
   success: boolean;
   message: string;
}


export const staffApi = {
   getStaff: async (): Promise<StaffResponse> => {
      const { data } = await api.get<StaffResponse>("/staff");
      return data;
   },
   createStaff: async (staffData: Partial<User>): Promise<User> => {
      const { data } = await api.post<StaffMemberResponse>("/staff", staffData);
      return data;
   },
};