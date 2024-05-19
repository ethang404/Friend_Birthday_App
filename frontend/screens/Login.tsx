import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function Login() {
	async function handleClick() {
		try {
			let response = await fetch("http://10.0.2.2:8000/test", {
				//http://localhost:8000/test
				//Setting Method
				method: "GET",
			});
			let data = await response.json();
			console.log(data);
		} catch (error) {
			console.log("Something went wrong");
		}
	}

	async function handleClick2() {
		try {
			let response = await fetch("192.168.1.207:8000/test"); //192.168.1.207
			let data = await response.json();
			console.log(data);
		} catch (error) {
			console.log("fail?");
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Login Page</Text>
			<TextInput style={styles.input} placeholder="Username" />
			<TextInput style={styles.input} placeholder="Password" secureTextEntry />
			<Button title="testing" onPress={handleClick}></Button>
			<Button title="testing2" onPress={handleClick2}></Button>
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
