import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const useVerifyToken = () => {
	useEffect(() => {
		async function verifyToken() {
			let accessToken = await SecureStore.getItemAsync("accessToken");
			let refreshToken = await SecureStore.getItemAsync("refreshToken");
			console.log("accessToken in verify", accessToken);
			if (!accessToken || !refreshToken) {
				// Handle navigation or other logic
				console.log("Token missing");
				return;
			}

			try {
				let response = await fetch("http://10.0.2.2:8000/auth/validToken", {
					method: "GET",
					headers: { Authorization: `Bearer ${accessToken}` },
				});
				if (response.ok) {
					let data = await response.json();
					console.log(data);
					// Save tokens if needed
				} else {
					console.log("Invalid token");
				}
			} catch (error) {
				console.log("Error verifying token", error);
			}
		}

		verifyToken();
	}, []); // Run once on mount
};

export default useVerifyToken;
