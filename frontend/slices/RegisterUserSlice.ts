import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegUserState {
	userName: string;
	firstName: string;
	lastName: string;
	birthday: string;
	age: number | null;
	password: string;
} //Make birthday a string here?

const initialState: RegUserState = {
	userName: "",
	firstName: "",
	lastName: "",
	birthday: "",
	age: null,
	password: "",
};

const RegUserSlice = createSlice({
	name: "RegUser",
	initialState,
	reducers: {
		updateUserName: (state, action: PayloadAction<string>) => {
			state.userName = action.payload;
		},
		updateFirstName: (state, action: PayloadAction<string>) => {
			state.firstName = action.payload;
		},
		updateLastName: (state, action: PayloadAction<string>) => {
			state.lastName = action.payload;
		},
		updateBirthday: (state, action: PayloadAction<string>) => {
			state.birthday = action.payload;
		},
		updateAge: (state, action: PayloadAction<number | null>) => {
			state.age = action.payload;
		},
		updatePassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
		},
		resetForm: () => initialState,
	},
});

export const {
	updateUserName,
	updateFirstName,
	updateLastName,
	updateBirthday,
	updateAge,
	updatePassword,
	resetForm,
} = RegUserSlice.actions;

export default RegUserSlice.reducer;
