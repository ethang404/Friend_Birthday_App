//This will be where we have our dashboard
//Here it will show:
//a calander of birthdays
//A list of friends

//For handling tokens properly with persisted login:
//1) Make verifyToken.ts to call backend and whatnot for tokens
//2) Put use Effect(on render) w/ async storage for tokens in each component and act accordingly

//3) ? Later maybe use middlewear to centralize it?
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import useVerifyToken from "./VerifyToken";

export default function Home({ navigation }: { navigation: any }) {
	useVerifyToken();

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Home Page. Should only be here if user is valid</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	heading: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	input: {
		width: "100%",
		height: 40,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 10,
	},
});
