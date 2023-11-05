import { create } from "zustand";
import { UserState, userSlice } from "./slices/user-slices";
import { MKState, mkSlice } from "./slices/tabelMK-slice";
import { SingleMKState, singleMKSlice } from "./slices/MKById.-slices";
import { TableAuditState, tableAuditSlice } from "./slices/audit-slices";

type storeState = UserState & MKState & SingleMKState & TableAuditState;

export const useAppStore = create<storeState>()((...a) => ({
  ...userSlice(...a),
  ...mkSlice(...a),
  ...singleMKSlice(...a),
  ...tableAuditSlice(...a),
}));
