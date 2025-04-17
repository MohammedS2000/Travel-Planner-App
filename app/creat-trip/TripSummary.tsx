import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { CreateTripContext } from '@/context/CreateTripContext';
import moment from 'moment'

export default function TripSummary() {
    const navigation = useNavigation();
    const myRouter =useRouter();
    const { tripData } = useContext(CreateTripContext);

    useEffect(() => {
      navigation.setOptions({
							headerShown: true,
							headerTransparent: true,
							headerTitle: "",
						}); 
    }, [])
    
  return (
			<View className="flex-1 bg-white p-[25] pt-[55] h-full">
				<Text className="text-4xl font-semibold">Trip Summary</Text>
				<Text className="text-xl text-gray-500 font-semibold mt-3">
					Review your selection before we start generating your trip
				</Text>
				<View className="mt-5">
					<View className="flex flex-row items-center mt-5">
						<Text className="text-3xl">📍</Text>
						<View className="ml-2">
							<Text className="text-xl font-semibold text-gray-500">
								Destination
							</Text>
							<Text className="mt-1 text-xl font-semibold">
								{tripData?.locationInfo?.name}
							</Text>
						</View>
					</View>
					<View className="flex flex-row items-center mt-5">
						<Text className="text-3xl">✈️</Text>
						<View className="ml-2">
							<Text className="text-xl font-semibold text-gray-500">
								Who's Travelling
							</Text>
							<Text className="mt-1 text-xl font-semibold">
								{tripData?.travelers?.title}
							</Text>
						</View>
					</View>
					<View className="flex flex-row items-center mt-5">
						<Text className="text-3xl">🗓️</Text>
						<View className="ml-2">
							<Text className="text-xl font-semibold text-gray-500">
								Travel date
							</Text>
							<View className="flex flex-row items-center">
								<Text className="mt-1 text-xl font-semibold">
									{moment(tripData?.startDate).format("DD MMM")}
								</Text>
								<Text className="text-xl font-semibold"> - </Text>
								<Text className="mt-1 text-xl font-semibold">
									{moment(tripData?.endDate).format("DD MMM")}
								</Text>
							</View>
						</View>
					</View>
					<View className="flex flex-row items-center mt-5">
						<Text className="text-3xl">💰</Text>
						<View className="ml-2">
							<Text className="text-xl font-semibold text-gray-500">
								Budget
							</Text>
							<Text className="mt-1 text-xl font-semibold">
								{tripData?.budget?.title}
							</Text>
						</View>
					</View>
				</View>
				<TouchableOpacity
					onPress={() => myRouter.push("/creat-trip/GenerateTrip")}
					className="flex items-center justify-center mt-[40]"
				>
					<Text className="bg-primary-300 rounded-full text-lg font-bold text-white text-center w-full py-3">
						Generate Your Trip
					</Text>
				</TouchableOpacity>
			</View>
		);
}