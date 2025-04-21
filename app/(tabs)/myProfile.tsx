import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth, db } from "@/config/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import LoginOut from "@/components/myProfile/LoginOut";
import { useRouter } from "expo-router";
import PersonalInfo from "@/components/myProfile/PersonalInfo";

export default function MyProfile() {
	const myRouter = useRouter()
	const user = auth.currentUser;
	const [isLoading, setIsLoading] = useState(false);
	const [userInfo, setUserInfo] = useState();

	useEffect(() => {
		user&&GetUserInfo()
	  }, [user])
	  
	  
	
	  const GetUserInfo = async () =>{
		setIsLoading(true)
		const q = query(collection(db, "users"),where("emailLowerCase","==",user?.email));
		const querySnapshot = await getDocs(q);
	
		querySnapshot.forEach((doc) => { 
		setUserInfo(doc.data())
		});
		setIsLoading(false)		
	  }

	return (
		<ScrollView className="flex-1 bg-primary-300 h-full p-[25] pt-[75]">
			<View className=" items-center justify-center mb-5">
				{isLoading ? (
					<ActivityIndicator />
				) : (
					<View className="items-center justify-center mb-5">
						<Ionicons name="person-circle" size={100} color="white" />
						<Text className="text-white font-semibold text-2xl mb-2 ">
							{userInfo?.fullName}
						</Text>
					</View>
				)}
			</View>
			<View>
				<PersonalInfo userInfo={userInfo}/>
				<LoginOut/>
			</View>
		</ScrollView>
	);
}
