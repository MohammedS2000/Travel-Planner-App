import { View, Text , Image, ScrollView} from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { CreateTripContext } from '@/context/CreateTripContext';


export default function SearchPlace() {
  const navigation = useNavigation()

  const myRouter = useRouter()

  const {tripData, setTripData} = useContext(CreateTripContext)

  useEffect(() => {
			navigation.setOptions({
				headerShown: true,
				headerTransparent: true,
				headerTitle: "Search",
			});
		}, []);
  
  return (
			<View className="flex-1 bg-white">
				<View className="p-[25] pt-[55]">
					<GooglePlacesAutocomplete
						placeholder="Search for Place"
						fetchDetails={true}
						onFail={(error) => console.log(error)}
						onPress={(data, details = null) => {
							setTripData({
								...tripData,
								locationInfo: {
									name: data.description,
									coordinantes: details?.geometry.location,
									photoRef: details?.photos[0]?.photo_reference,
									url: details?.url,
								},
							});

							myRouter.push("/creat-trip/SelectTraveler");
						}}
						styles={{
							textInputContainer: {
								borderWidth: 2,
								borderRadius: 7,
								borderColor: "#3D8A7D",
								height: 48,
							},
							textInput: {
								color: "#3D8A7D",
								backgroundColor: "#d7f7f0",
							},
							listView: {
								position: "absolute",
								top: 50,
								zIndex: 30,
								backgroundColor: "#fff",
								borderRadius: 8,
								elevation: 5,
								shadowColor: "#000",
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.25,
								shadowRadius: 3.84,
							},
						}}
						query={{
							key: "AIzaSyCPtTP_qtHtiEE6rST9J3mPOe7m_2WO-ps",
							language: "en",
						}}
					/>
				</View>

				<ScrollView scrollEnabled={false} className="flex-1 px-4 mt-[200]">
					<View className='items-center justify-center'>
						<Text className="text-3xl font-semibold text-center">
							Choose Your Destination
						</Text>
						<Text className="text-gray-500 mt-1 text-center">
							Where do you want to go for your next trip? you can choose any
							destination you want
						</Text>
						<Image
							className="w-48 h-48 mt-2"
							source={require("./../../assets/images/location-pin.png")}
						/>
					</View>
				</ScrollView>
			</View>
		);
}