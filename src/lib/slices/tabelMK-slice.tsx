import { StateCreator } from "zustand";
import axios from "axios";
import { nextAPIUrl } from "@/constant/env";

export interface MK {
  rows: {
    ID_MK: string;
    NAME_MK: string;
    SKS: number;
  }[];
}

export interface MKState {
  mk: MK;
  getMK: () => Promise<void>;
  postMK: (id: string, mataKuliah: string) => Promise<void>;
  updateMK: (id: string, mataKuliah: string, slug: string) => Promise<void>;
  errorMessage: string;
  errorMessagePost: string;
}

export const mkSlice: StateCreator<MKState> = (set, get) => ({
  mk: { rows: [] },
  singleMK: { rows: [] },
  getMK: async () => {
    try {
      const res = await axios.get(`${nextAPIUrl}/matakuliah`);
      set({ mk: res.data });
    } catch (error: any) {
      set({ errorMessage: error.message });
    }
  },
  postMK: async (id: string, mataKuliah: string) => {
    try {
      await axios.post(
        `${nextAPIUrl}/matakuliah`,
        { id, mataKuliah },
        { withCredentials: true }
      );
    } catch (err: any) {
      set({ errorMessagePost: err.message });
    }
  },
  updateMK: async (id: string, mataKuliah: string, slug: string) => {
    try {
      await axios.put(`${nextAPIUrl}/matakuliah/${slug}`, {
        id,
        mataKuliah,
        slug,
      });
    } catch (err) {
      console.log(err);
    }
  },
  errorMessage: "",
  errorMessagePost: "",
});
