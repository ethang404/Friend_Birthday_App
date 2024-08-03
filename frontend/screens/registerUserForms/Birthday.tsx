import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { updateBirthday } from "../../slices/RegisterUserSlice";
import { RootState } from "../../Store";

const BirthdayForm = ({ navigation }: { navigation: any }) => {
	const dispatch = useDispatch();
	const birthday = useSelector((state: RootState) => state.RegUser.birthday);
	const [dateEntry, setdateEntry] = useState(new Date());

	const [showDatePicker, setShowDatePicker] = useState(false);

	const handleNext = () => {
		// Handle registration logic here
		//Navigate next
		navigation.navigate("Age");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Birthday:</Text>
			<TextInput
				style={styles.input}
				value={birthday}
				onFocus={() => setShowDatePicker(true)}
				placeholder="Select Birthday"
			/>
			{showDatePicker && (
				<DateTimePicker
					value={dateEntry}
					mode="date"
					display="default"
					onChange={(event, date) => {
						setShowDatePicker(false);
						if (date) {
							const newDate = date.toISOString().split("T")[0];
							dispatch(updateBirthday(newDate));
						}
					}}
				/>
			)}
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

export default BirthdayForm;
