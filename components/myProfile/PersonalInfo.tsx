import { View, Text } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";


export default function PersonalInfo({ userInfo }) {
	return (
		<View className="flex-1 mb-3">
			<View>
				<Text className="text-white font-semibold">Personal Info</Text>
			</View>
			<View className="flex-row p-4 mt-2 mb-1 justify-between items-center rounded-t-lg bg-white">
				<View className="flex-row items-center justify-between">
					<FontAwesome name="id-card-o" size={20} color="#4FB3A9" />
					<Text className="ml-2 text-gray-500">Name</Text>
				</View>
				<Text className="text-primary-200 text-sm">{userInfo?.fullName}</Text>
			</View>
			<View className="flex-row p-4 mb-1 justify-between items-center bg-white">
				<View className="flex-row items-center justify-between">
					<FontAwesome name="envelope-o" size={20} color="#4FB3A9" />
					<Text className="ml-2 text-gray-500">Email</Text>
				</View>
				<Text className="text-primary-200 text-sm">{userInfo?.email}</Text>
			</View>
			<View className="flex-row p-4 mb-1 justify-between items-center rounded-b-lg bg-white">
				<View className="flex-row items-center justify-between">
					<Ionicons name="location-outline" size={20} color="#4FB3A9" />
					<Text className="ml-2 text-gray-500">Location</Text>
				</View>
				<Text className="text-primary-200 text-sm">
					{userInfo?.userLocation}
				</Text>
			</View>
		</View>
	);
}
