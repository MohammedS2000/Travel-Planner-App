import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { CreateTripContext } from '@/context/CreateTripContext';
import { AiPrompt } from '@/constant/Options';
import {chatSession} from '@/config/AiModal'
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { auth , db} from '@/config/FirebaseConfig';

export default function GenerateTrip() {
	const { tripData, setTripData } = useContext(CreateTripContext);
	const [loading, setLoading] = useState(false)
	const user= auth.currentUser
	const myRouter = useRouter()

	useEffect(() => {
	 GenerateAiTrip()
	}, [])
	

	const GenerateAiTrip = async () => {

		setLoading(true)
		const FinalPrombt = AiPrompt.replace(
			"{location}",
			tripData?.locationInfo?.name,
		)
			.replace("{startDate}", tripData?.startDate)
			.replace("{endDate}", tripData?.endDate)
			.replace("{traveler}", tripData?.travelers?.title)
			.replace("{budget}", tripData?.budget?.title);

		console.log(FinalPrombt);

		const result = await chatSession.sendMessage(FinalPrombt);
		console.log(result.response.text());
		const tripResp = JSON.parse(result.response.text())

		setLoading(false)

		const docId= (Date.now()).toString();
		await setDoc(doc(db, "UserTrips", docId), {
			userEmail: user.email,
			tripPlan: tripResp,
			tripData:JSON.stringify(tripData),
			docId:docId,
		});
		

		myRouter.push("/(tabs)/myTrip");
		
	};
  return (
			<View className="flex-1 justify-center bg-white h-full">
				{loading ? (
					<View>
						<Text className="text-4xl font-semibold text-center">
							Please wait...
						</Text>
						<Text className="text-xl font-semibold text-center mt-2 text-gray-500">
							we are generating your trip
						</Text>
						<View className="mt-3">
							<ActivityIndicator size="large" color="#3D8A7D" />
						</View>
					</View>
				) : (
					""
				)}
			</View>
		);
}