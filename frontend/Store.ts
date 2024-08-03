import { configureStore } from "@reduxjs/toolkit";
import RegiserUserReducer from "./slices/RegisterUserSlice";
import AddFriendReducer from "./slices/AddFriendSlice";

export const store = configureStore({
	reducer: {
		RegUser: RegiserUserReducer,
		AddFriend: AddFriendReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
