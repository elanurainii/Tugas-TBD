import { nextAPIUrl } from "@/constant/env";
import axios from "axios";
import { StateCreator } from "zustand";

export interface TableAudit {
  rows: {
    ID: number;
    ID_MK: string;
    SKS_NEw: number;
    SKS_OLD: number;
    NAME_NEW: string;
    NAME_OLD: number;
    DATE: string;
    USER: string;
  }[];
}

export interface TableAuditState {
  tableAudit: TableAudit;
  getTableAudit: () => Promise<void>;
}

export const tableAuditSlice: StateCreator<TableAuditState> = (set, get) => ({
  tableAudit: { rows: [] },
  getTableAudit: async () => {
    try {
      const res = await axios.get(`${nextAPIUrl}/logs`);
      set({ tableAudit: res.data });
    } catch (err) {
      console.log(err);
    }
  },
});
