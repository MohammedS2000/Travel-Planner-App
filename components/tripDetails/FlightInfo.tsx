import { View, Text, TouchableOpacity } from "react-native";
import React, {} from "react";
import { Link } from "expo-router";

export default function FlightInfo({ flightDetails }) {
   
    
	return (
		<View className="border border-primary-300 mt-4 p-4 rounded-2xl">
			<View>
				<View className="flex-row items-center justify-between">
					<Text className="text-xl font-semibold mb-1">✈️ Flight</Text>
					<TouchableOpacity>
						{flightDetails?.arrival?.bookingUrl ? (
							<Link
								className="bg-primary-300 rounded-2xl text-lg font-bold  text-white text-center p-3"
								href={flightDetails.arrival.bookingUrl}
							>
								Book Here
							</Link>
						) : (
							null
						)}
					</TouchableOpacity>
				</View>
				<Text className="font-semibold mb-1">
					Airline: {flightDetails?.arrival?.airline}
				</Text>
				<Text className="font-semibold mb-1">
					Price:{" "}
					{flightDetails?.arrival?.estimatedPrice +
						flightDetails?.departure?.estimatedPrice}{" "}
					(approx.)
				</Text>
				<Text className="text-sm text-gray-500">
					The prices include arrival & departure tickets
				</Text>
			</View>
		</View>
	);
}
