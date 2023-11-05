import { StateCreator } from "zustand";
import axios from "axios";
import { nextAPIUrl } from "@/constant/env";

export interface User {
  id: string;
  username: string;
}

export interface UserState {
  users: User | null;
  loginUser: (username: string, passwor: string) => Promise<void>;
  logout: () => Promise<void>;
  errorMessage: string;
}

export const userSlice: StateCreator<UserState> = (set, get) => ({
  users: null,
  loginUser: async (username: string, password: string) => {
    try {
      set({ errorMessage: "" });
      await axios.post(`${nextAPIUrl}/user/login`, { username, password });
    } catch (err: any) {
      set({ errorMessage: err.response.data.message });
    }
  },
  logout: async () => {
    await axios.post(`${nextAPIUrl}/user/logout`);
  },
  errorMessage: "",
});
