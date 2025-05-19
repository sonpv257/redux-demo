import { HistoryItem } from "@/types/history.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: [] as HistoryItem[],
  reducers: {
    addHistory: (state, action: PayloadAction<string>) => {
      state.push({ timestamp: Date.now(), action: action.payload });
    },
  },
});

export const historyActions = { ...historySlice.actions };
export default historySlice.reducer;
