//UserName and Password

// RegisterInfoForm.tsx
import React from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateUserName, updatePassword } from "../../slices/RegisterUserSlice";
import { RootState } from "../../Store";

const RegisterInfoForm = ({ navigation }: { navigation: any }) => {
	const dispatch = useDispatch();
	const userName = useSelector((state: RootState) => state.RegUser.userName);
	const password = useSelector((state: RootState) => state.RegUser.password);

	const handleNext = () => {
		// Handle registration logic here
		//Navigate next
		navigation.navigate("Name");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>User Name:</Text>
			<TextInput
				style={styles.input}
				value={userName}
				onChangeText={(value) => dispatch(updateUserName(value))}
				placeholder="Enter User Name"
			/>
			<Text style={styles.label}>Password:</Text>
			<TextInput
				style={styles.input}
				value={password}
				onChangeText={(value) => dispatch(updatePassword(value))}
				placeholder="Enter Password"
				secureTextEntry
			/>
			<Button title="Next" onPress={handleNext} />
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

export default RegisterInfoForm;
