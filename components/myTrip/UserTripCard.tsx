import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment';
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from 'expo-router';

export default function UserTripCard({trip}) {
    const myRouter = useRouter()

	const formatData=(data)=>{
		return JSON.parse(data);
	}
  return (
			<View className="flex-1 mt-4 flex-row items-center">
				<Image
					className="w-[100] h-[100] rounded-2xl mr-2"
					resizeMode="cover"
					source={{
						uri:
							"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
							formatData(trip.tripData).locationInfo?.photoRef +
							"&key=AIzaSyCPtTP_qtHtiEE6rST9J3mPOe7m_2WO-ps",
					}}
				/>
				<View className="flex-1 flex-row items-center justify-between">
					<View className="">
						<Text className="text-xl font-semibold mb-2">
							{trip?.tripPlan?.tripDetails?.location}
						</Text>
						<Text className="text-gray-500 mb-1">
							{moment(trip?.tripPlan?.tripDetails?.startDate).format(
								"DD MMM YYYY",
							)}
						</Text>
						<View className="flex flex-row">
							<Text className="text-gray-500 mr-1">
								{formatData(trip.tripData).travelers.title}
							</Text>
							<Text>{formatData(trip.tripData).travelers.icon}</Text>
						</View>
					</View>
					<View>
						<TouchableOpacity
							onPress={() =>
								myRouter.push({
									pathname: "/trip-details",
									params: { trip: JSON.stringify(trip) },
								})
							}
						>
							<AntDesign name="right" size={16} color="gray" />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
}