import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from 'expo-router';

export default function StartNewTripCard() {

    const myRouter = useRouter();
  return (
			<View className='flex-1 items-center p-5 mt-[50]'>
				<Ionicons name="location-sharp" size={35} color="black" />
				<Text className='text-xl font-semibold mt-5 text-center'>No planned trip at the moment</Text>
				<Text className='text-gray-500 mt-5 text-center'>Looks like it the time to start planning for a new travel experinece!</Text>
                <TouchableOpacity onPress={() => myRouter.push('/creat-trip/SearchPlace')}>
					<Text className="bg-primary-300 rounded-full text-lg font-bold mt-5 text-white text-center p-3">
						Start new trip
					</Text>
				</TouchableOpacity>
			</View>
		);
}