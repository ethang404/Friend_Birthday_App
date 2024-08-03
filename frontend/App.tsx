import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "react-redux";
//Redux store import
import { store } from "./Store";

//Screen imports here
import Login from "./screens/Login";
import Home from "./screens/Home";
//Will likely do several different screens for user Reg and adding friend

//User Reg imports
import Age from "./screens/registerUserForms/Age";
import Birthday from "./screens/registerUserForms/Birthday";
import Name from "./screens/registerUserForms/Name";
import RegisterInfo from "./screens/registerUserForms/RegisterInfo";

const Stack = createNativeStackNavigator();
export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Login">
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Home" component={Home} />

					<Stack.Screen name="Age" component={Age} />
					<Stack.Screen name="Birthday" component={Birthday} />
					<Stack.Screen name="Name" component={Name} />
					<Stack.Screen name="RegisterInfo" component={RegisterInfo} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}

//Should I use redux for registration state management?

//Store is global data
//Slices make up different states in my store
//Actions tell redux what to do to our state(increment or decrement for example)
//Reducers actually apply the action based on the type
