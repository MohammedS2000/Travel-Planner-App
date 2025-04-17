import { View, Text, Image } from "react-native";
import React from "react";
import PlannedTripCard from "./PlannedTripCard";

export default function PlannedTrip({ dailyActivity }) {
	return (
		<View className="mt-4 p-4 rounded-2xl border-primary-300 border">
			<Text className="font-semibold text-xl">🏙️ Daily Activites</Text>

			{Object.entries(dailyActivity || {}).sort().map(([day, activities]) => (
				<View key={day} className="mb-4">
					<Text className="font-semibold text-lg mb-2">
						{day?.charAt(0).toUpperCase() + day.slice(1)}
					</Text>
					{activities?.plan?.map((place, index) => (
						<View key={place.placeName}>
							<PlannedTripCard place={place} />
						</View>
					))}
				</View>
			))}
		</View>
	);
}
