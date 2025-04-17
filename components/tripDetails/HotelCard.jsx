import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { GetPhotoRef } from "@/services/GooglePlaceAPI";

export default function HotelCard({ item }) {
	const [photoRef, setPhotoRef] = useState();

	useEffect(() => {
		getGooglePhotoRef();
	}, []);
	const getGooglePhotoRef = async () => {
		const result = await GetPhotoRef(item?.hotelName);
		setPhotoRef(result?.results?.[0]?.photos?.[0]?.photo_reference);
	};

	return (
		<View className="mt-3 bg-white p-3 w-[200] rounded-2xl mr-2">
			<Image
				style={{
					width: 180,
					height: 120,
				}}
				className="rounded-2xl"
				source={{
					uri:
						"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
						photoRef +
						"&key=AIzaSyCPtTP_qtHtiEE6rST9J3mPOe7m_2WO-ps",
				}}
			/>
			<Text className="my-3 font-semibold text-lg">{item?.hotelName}</Text>
			<View className="flex-row items-center justify-between">
				<Text className="font-semibold textgray500">
					💵 {item?.pricePerNight}/night
				</Text>
				<Text className="font-semibold">⭐ {item?.rating}</Text>
			</View>
		</View>
	);
}
