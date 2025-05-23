import {
	View,
	Text,
	Image,
	ActivityIndicator,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import moment from "moment";
import HotelsInfo from "@/components/tripDetails/HotelsInfo";
import FlightInfo from "@/components/tripDetails/FlightInfo";
import PlannedTrip from "@/components/tripDetails/PlannedTrip";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

export default function UserTripDetails() {
	const navigation = useNavigation();
	const { trip } = useLocalSearchParams();
	const myRouter = useRouter();
	const [formDataText, setFormDataText] = useState("");
	const [tripDetails, setTripDetails] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const formatData = async () => {
		setIsLoading(true);
		const details = await JSON.parse(tripDetails.tripData);
		setIsLoading(false);
		setFormDataText(details);
	};

	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTransparent: true,
			headerTitle: "",
			headerTintColor: "white",
		});
		setTripDetails(JSON.parse(trip));
	}, []);

	useEffect(() => {
		formatData();
	}, [tripDetails, trip]);

	const handleDelete = async () => {
		await deleteDoc(doc(db, "UserTrips", tripDetails?.docId));
		myRouter.replace("/(tabs)/myTrip");
	};
	return (
		<View className="flex-1 h-full bg-white">
			{isLoading ? (
				<ActivityIndicator className="justify-center items-center" size={"large"} color={"#3D8A7D"} />
			) : (
				<ScrollView>
					<Image
						className="w-full h-[330]"
						resizeMode="cover"
						source={{
							uri:
								"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
								formDataText?.locationInfo?.photoRef +
								"&key=" +
								process.env.EXPO_PUBLIC_PLACE_API_KEY,
						}}
					/>
					<View className="h-full p-4 bg-white rounded-t-3xl mt-[-50]">
						<View className="flex-row justify-between items-center">
							<View>
								<Text className="font-semibold text-3xl">
									{tripDetails?.tripPlan?.tripDetails?.location}
								</Text>
								<View className="flex flex-row">
									<Text className="text-gray-500 mr-2">
										{moment(
											tripDetails?.tripPlan?.tripDetails?.startDate,
										).format("DD MMM YYYY")}
									</Text>
									<Text className="text-gray-500">
										{moment(tripDetails?.tripPlan?.tripDetails?.endDate).format(
											"DD MMM YYYY",
										)}
									</Text>
								</View>
								<Text className="text-gray-500">
									{formDataText?.travelers?.title}
								</Text>
							</View>
							<TouchableOpacity onPress={handleDelete}>
								<Text className="bg-red-500 text-white p-3 rounded-2xl mt-3 text-center font-bold text-sm">
									Delete Trip
								</Text>
							</TouchableOpacity>
						</View>

						<FlightInfo flightDetails={tripDetails?.tripPlan?.flights} />
						<HotelsInfo hotelList={tripDetails?.tripPlan?.hotels} />
						<PlannedTrip dailyActivity={tripDetails?.tripPlan?.itinerary} />
					</View>
				</ScrollView>
			)}
		</View>
	);
}
