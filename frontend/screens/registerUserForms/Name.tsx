import React from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateFirstName, updateLastName } from "../../slices/RegisterUserSlice";
import { RootState } from "../../Store";

const NameForm = ({ navigation }: { navigation: any }) => {
	const dispatch = useDispatch();
	const firstName = useSelector((state: RootState) => state.RegUser.firstName);
	const lastName = useSelector((state: RootState) => state.RegUser.lastName);

	const handleNext = () => {
		// Handle registration logic here
		//Navigate next
		navigation.navigate("Birthday");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>First Name:</Text>
			<TextInput
				style={styles.input}
				value={firstName}
				onChangeText={(value) => dispatch(updateFirstName(value))}
				placeholder="Enter First Name"
			/>
			<Text style={styles.label}>Last Name:</Text>
			<TextInput
				style={styles.input}
				value={lastName}
				onChangeText={(value) => dispatch(updateLastName(value))}
				placeholder="Enter Last Name"
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

export default NameForm;
