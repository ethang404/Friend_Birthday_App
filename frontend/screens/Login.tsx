import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";

export default function Login({ navigation }: { navigation: any }) {
	const [userName, setUsername] = useState("");
	const [password, setPassword] = useState("");

	async function save(key: string, value: string) {
		await SecureStore.setItemAsync(key, value);
	}

	async function handleClick() {
		console.log("Username is: ", userName);
		console.log("Password is: ", password);
		try {
			let response = await fetch("http://10.0.2.2:8000/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userName, password }),
			});
			if (response.ok) {
				let data = await response.json();
				console.log(data);
				if (data.accessToken) await save("accessToken", data.accessToken);
				if (data.refreshToken) await save("refreshToken", data.refreshToken);

				let accessToken = await SecureStore.getItemAsync("accessToken");
				console.log("AccessToken:", accessToken);
				//navigate to home:
				navigation.navigate("Home");
			}
		} catch (error) {
			console.log(error);
			console.log("Something went wrong");
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Login Page</Text>
			<TextInput
				style={styles.input}
				placeholder="Username"
				onChangeText={(newText) => setUsername(newText)}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				secureTextEntry
				onChangeText={(newText) => setPassword(newText)}
			/>
			<Button title="Login" onPress={handleClick}></Button>
			<Button
				title="Navigate to Register"
				onPress={() => navigation.navigate("RegisterInfo")}
			></Button>
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
