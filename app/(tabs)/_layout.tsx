import {} from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";

export default function _layout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="myTrip"
				options={{
					tabBarLabel: "My Trips",
					tabBarActiveBackgroundColor: "#84cfc2",
					tabBarActiveTintColor: "#3D8A7D",
					tabBarIcon: ({ color }) => (
						<Octicons name="location" size={28} color="#3D8A7D" />
					),
				}}
			/>
			<Tabs.Screen
				name="myProfile"
				options={{
					tabBarActiveBackgroundColor: "#84cfc2",
					tabBarActiveTintColor: "#3D8A7D",
					tabBarLabel: "Profile",
					tabBarIcon: ({ color }) => (
						<Octicons name="feed-person" size={28} color="#3D8A7D" />
					),
				}}
			/>
		</Tabs>
	);
}
