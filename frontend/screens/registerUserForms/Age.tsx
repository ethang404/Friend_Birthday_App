// AgeForm.tsx
import React from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateAge } from "../../slices/RegisterUserSlice";
import { RootState } from "../../Store";

import * as SecureStore from "expo-secure-store";

const AgeForm = ({ navigation }: { navigation: any }) => {
	const dispatch = useDispatch();
	const age = useSelector((state: RootState) => state.RegUser.age);
	const birthday = useSelector((state: RootState) => state.RegUser.birthday);
	const firstName = useSelector((state: RootState) => state.RegUser.firstName);
	const lastName = useSelector((state: RootState) => state.RegUser.lastName);
	const password = useSelector((state: RootState) => state.RegUser.password);
	const userName = useSelector((state: RootState) => state.RegUser.userName);
	//Do this for the other elements too

	async function save(key: string, value: string) {
		await SecureStore.setItemAsync(key, value);
	}

	async function handleNext() {
		//do fetch request and send data from redux to backend for adding user
		//will return accessToken, place in storage and navigate to homepage
		console.log("Is this running?");
		//pull data from store to send in body
		/*const newUserData = {
			age: age,
			birthday: useSelector((state: RootState) => state.RegUser.birthday),
			firstName: useSelector((state: RootState) => state.RegUser.firstName),
			lastName: useSelector((state: RootState) => state.RegUser.lastName),
			userName: useSelector((state: RootState) => state.RegUser.userName),
			password: useSelector((state: RootState) => state.RegUser.password),
		};*/

		const newUserData = {
			age,
			birthday,
			firstName,
			lastName,
			userName,
			password,
		};

		console.log("user data: ", newUserData.age);
		console.log("-----");
		console.log(age);
		console.log(firstName);
		console.log(userName);
		console.log(lastName);
		console.log("-------");
		console.log(newUserData);

		try {
			let response = await fetch("http://10.0.2.2:8000/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newUserData),
			});
			let data = await response.json();
			console.log(data);
			if (data.accessToken) await save("accessToken", data.accessToken);
			if (data.refreshToken) await save("refreshToken", data.refreshToken);
		} catch (error) {
			console.log("Something went wrong");
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Age:</Text>
			<TextInput
				style={styles.input}
				value={age?.toString() || ""}
				onChangeText={(value) => dispatch(updateAge(Number(value)))}
				placeholder="Enter Age"
				keyboardType="numeric"
			/>
			<Button title="Register" onPress={handleNext} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
	label: {
		fontSize: 16,
		marginBottom: 8,
	},
	input: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		marginBottom: 16,
		paddingLeft: 8,
	},
});

export default AgeForm;
