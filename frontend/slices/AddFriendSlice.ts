import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FriendState {
	firstName: string;
	lastName: string;
	birthday: Date | null;
	age: number | null;
	disposition: string;
}

const initialState: FriendState = {
	firstName: "",
	lastName: "",
	birthday: null,
	age: null,
	disposition: "",
};

const AddFriendSlice = createSlice({
	name: "AddFriend",
	initialState,
	reducers: {
		updateFirstName: (state, action: PayloadAction<string>) => {
			state.firstName = action.payload;
		},
		updateLastName: (state, action: PayloadAction<string>) => {
			state.lastName = action.payload;
		},
		updateBirthday: (state, action: PayloadAction<Date | null>) => {
			state.birthday = action.payload;
		},
		updateAge: (state, action: PayloadAction<number | null>) => {
			state.age = action.payload;
		},
		updateDisposition: (state, action: PayloadAction<string>) => {
			state.disposition = action.payload;
		},
		resetForm: () => initialState,
	},
});

export const {
	updateFirstName,
	updateLastName,
	updateBirthday,
	updateAge,
	updateDisposition,
	resetForm,
} = AddFriendSlice.actions;

export default AddFriendSlice.reducer;
