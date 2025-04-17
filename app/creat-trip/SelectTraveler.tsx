import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SelectTravelerList } from "./../../constant/Options";
import OptionList from "./../../components/createTrip/OptionList";
import { CreateTripContext } from "@/context/CreateTripContext";

export default function SelectTraveler() {
	const { tripData, setTripData } = useContext(CreateTripContext);
	const navigation = useNavigation();
	const myRouter = useRouter();
	const [selectTraveler, setSelectTraveler] = useState(null);

	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTransparent: true,
			headerTitle: "",
		});
	}, []);

	useEffect(() => {
		setTripData({ ...tripData, travelers: selectTraveler });
	}, [selectTraveler]);

	return (
		<View className="h-full flex-1 p-[25] pt-[55] bg-white">
			<View>
				<Text className="text-4xl font-semibold">Who's Traveling</Text>
				<View className="mt-5">
					<Text className="text-xl text-gray-500 font-semibold">
						Choose your travelers:
					</Text>
					<FlatList
						className="mt-4"
						data={SelectTravelerList}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								className="my-3"
								onPress={() => setSelectTraveler(item)}
							>
								<OptionList option={item} selectedOption={selectTraveler} />
							</TouchableOpacity>
						)}
					/>
				</View>
				{selectTraveler !== null ? (
					<TouchableOpacity
						onPress={() => myRouter.push("/creat-trip/SelectDate")}
						className="flex items-center justify-center mt-[40]"
					>
						<Text className="bg-primary-300 rounded-full text-lg font-bold text-white text-center w-full py-3">
							Next
						</Text>
					</TouchableOpacity>
				) : (
					""
				)}
			</View>
		</View>
	);
}
