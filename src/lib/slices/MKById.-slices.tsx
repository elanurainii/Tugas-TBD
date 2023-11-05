import { nextAPIUrl } from "@/constant/env";
import axios from "axios";
import { StateCreator } from "zustand";

export interface SingleMKType {
  rows: {
    ID_MK: string;
    NAME_MK: string;
    SKS: number;
  };
}

export interface SingleMKState {
  singleMK: SingleMKType;
  getMKByID: (slug: string) => Promise<void>;
}

export const singleMKSlice: StateCreator<SingleMKState> = (set, get) => ({
  singleMK: {
    rows: {
      ID_MK: "",
      NAME_MK: "",
      SKS: 0,
    },
  },

  getMKByID: async (slug: string) => {
    try {
      const res = await axios.get(`${nextAPIUrl}/matakuliah/${slug}`);
      set({ singleMK: res.data });
    } catch (err: any) {
      console.log(err);
    }
  },
});
