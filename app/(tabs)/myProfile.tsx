import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { auth, db } from "@/config/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import LoginOut from "@/components/myProfile/LoginOut";

export default function MyProfile() {
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
	  // doc.data() is never undefined for query doc snapshots
		console.log(doc.id, " => ", doc.data());
		setUserInfo(doc.data())
		});
		setIsLoading(false)
		console.log(userInfo);
		
	  }

	return (
		<View className="flex-1 bg-primary-300 h-full p-[25] pt-[75]">
			<View className=" items-center justify-center mb-5">
				{isLoading ? (
					<ActivityIndicator />
				) : (
					<View className="items-center justify-center mb-5">
						<Ionicons name="person-circle" size={100} color="white" />
						<Text className="text-white font-semibold text-2xl mb-2 ">
							{userInfo?.fullName}
						</Text>
						<Text className="text-white font-semibold text-sm">
							{user.email}
						</Text>
					</View>
				)}
			</View>
			<View className="bg-white rounded-2xl p-[25]">
				<TouchableOpacity>
					<View className="border-b p-2 flex-row justify-between items-center border-gray-300 mb-5">
						<Text className="text-lg text-primary-300 font-semibold">
							Profile
						</Text>
						<AntDesign name="right" size={18} color="#d1d5db" />
					</View>
				</TouchableOpacity>
				<LoginOut/>
			</View>
		</View>
	);
}
