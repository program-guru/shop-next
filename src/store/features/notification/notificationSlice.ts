import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Notification } from "../../../types/Notification";

interface NotificationState {
  items: Notification[];
}

const initialState: NotificationState = {
  items: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      // Add new notification to the end of the list
      state.items.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      // Filter out the notification with the matching ID
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
