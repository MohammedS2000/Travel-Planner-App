import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import UserTripCard from "./UserTripCard";
import { useRouter } from "expo-router";

export default function UserTripList({ userTrips }) {
	const LatestTrip = JSON.parse(userTrips[0].tripData);
	const myRouter = useRouter();

	return (
		<View className="flex-1">
			<View className="mt-4">
				<Image
					className="w-full h-[200] rounded-2xl"
					resizeMode="cover"
					source={{
						uri:
							"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
							LatestTrip?.locationInfo?.photoRef +
							"&key=AIzaSyCPtTP_qtHtiEE6rST9J3mPOe7m_2WO-ps",
					}}
				/>
			</View>
			<View className="mt-2">
				<Text className="text-2xl font-semibold">
					{userTrips[0]?.tripPlan?.tripDetails?.location}
				</Text>
				<View className="flex flex-row justify-between mt-1">
					<Text className="text-gray-500">
						{moment(userTrips[0]?.tripPlan?.tripDetails?.startDate).format(
							"DD MMM YYYY",
						)}
					</Text>
					<View className="flex flex-row">
						<Text className="text-gray-500 mr-1">
							{LatestTrip?.travelers.title}
						</Text>
						<Text>{LatestTrip?.travelers.icon}</Text>
					</View>
				</View>
				<TouchableOpacity
					onPress={() =>
						myRouter.push({
							pathname: "/trip-details",
							params: { trip: JSON.stringify(userTrips[0]) },
						})
					}
				>
					<Text className="bg-primary-300 rounded-2xl text-lg font-bold mt-2 text-white text-center p-3">
						More Details
					</Text>
				</TouchableOpacity>
			</View>
			{userTrips.slice(1).map((trip, index) => (
				<UserTripCard key={index + 1} trip={trip} />
			))}
			<View>
				<Text className="mt-[25]"> </Text>
			</View>
		</View>
	);
}
