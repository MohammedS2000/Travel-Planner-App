import { View, Text, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import StartNewTripCard from '@/components/myTrip/StartNewTripCard';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '@/config/FirebaseConfig';
import UserTripList from '@/components/myTrip/UserTripList';



export default function MyTrip() {
const myRouter = useRouter();
  const [userTrips,setUserTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const user = auth.currentUser;

  
  
  useEffect(() => {
	user&&GetMyTrips()
  }, [user])
  
  

  const GetMyTrips = async () =>{
	setIsLoading(true)
	const q = query(collection(db, "UserTrips"),where("userEmail","==",user?.email));
	const querySnapshot = await getDocs(q);

	querySnapshot.forEach((doc) => {
  	console.log(doc.id, " => ", doc.data());
	setUserTrips(prev=>[...prev,doc.data()])
	});
	setIsLoading(false)
	console.log(userTrips);
	
  }
  return (
			<ScrollView className="flex-1 p-[25] pt-[35] bg-white h-full">
				<View className="flex flex-row justify-between items-center">
					<Text className="font-semibold text-4xl">My Trips</Text>
					<TouchableOpacity
						onPress={() => myRouter.push("/creat-trip/SearchPlace")}
					>
						<Ionicons name="add-circle-sharp" size={40} color="#3D8A7D" />
					</TouchableOpacity>
				</View>
				<View className="mt-5">
					{isLoading && <ActivityIndicator size={"large"} color={"#3D8A7D"} />}
				</View>

				{userTrips?.length === 0 ?
					<StartNewTripCard />
				 : 
					<UserTripList userTrips={userTrips}/>
						}
					</ScrollView>
		);
}