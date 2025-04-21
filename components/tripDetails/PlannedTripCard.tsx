import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { GetPhotoRef } from "@/services/GooglePlaceAPI";

export default function PlannedTripCard({ place }) {
	const [photoRef, setPhotoRef] = useState();

	useEffect(() => {
		getGooglePhotoRef();
	}, []);
	const getGooglePhotoRef = async () => {
		const result = await GetPhotoRef(place?.placeName);
		setPhotoRef(result?.results?.[0]?.photos?.[0]?.photo_reference);
	};
	return (
		<View className="bg-primary-300 p-3 rounded-2xl mb-3" key={place.placeName}>
			<Image
				className="rounded-2xl"
				style={{ width: "100%", height: 100 }}
				resizeMode="cover"
				source={{
					uri:
						"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
						photoRef +
						"&key=" +
						process.env.EXPO_PUBLIC_PLACE_API_KEY,
				}}
			/>
			<Text className="text-white font-semibold text-xl mt-2">
				{place.placeName}
			</Text>
			<Text className="text-gray-200 font-semibold text-lg mt-2">
				{place.notes}
			</Text>
			<Text className="text-gray-200 font-semibold text-lg mt-2">
				🎫 Price: {place.estimatedCost}
			</Text>
		</View>
	);
}
