import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid } from "react-native";
import React, { useState } from 'react'
import { router, useNavigation, useRouter } from 'expo-router'
import { useEffect } from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import {auth} from "../../../config/FirebaseConfig"
import {signInWithEmailAndPassword} from "firebase/auth"

export default function SignIn() {

	const [email, setEmail] = useState();
	const [password, setPassword] = useState()

	const myRouter = useRouter();

    const navigate = useNavigation();


    useEffect(() => {  
    navigate.setOptions({
        headerShown:false
    })
    }, [])

	const onSignIn = () => {
		if (!email || !password) {
			ToastAndroid.show("Enter all details",ToastAndroid.LONG)
			return;
		}
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				router.replace('/myTrip')
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				if (errorCode === "auth/invalid-credential") {
					ToastAndroid.show("Invalid credntials", ToastAndroid.BOTTOM);
				}
				else if (errorCode === "auth/invalid-email") {
					ToastAndroid.show("Invalid Email", ToastAndroid.BOTTOM);
				}
			});
	};
    

  return (
			<View className="flex-1 bg-white">
				<Image
					className="w-full h-[350px] relative"
					source={require("../../../assets/images/vecteezy_shadow-of-an-airplane-glides-over-a-turquoise-beach_54233997.jpeg")}
				/>
				<TouchableOpacity className="absolute" onPress={() => myRouter.back()}>
					<Ionicons name="arrow-back-circle-sharp" size={40} color="#3D8A7D" />
				</TouchableOpacity>

				<View className="rounded-t-[40px] mt-[-40] bg-white p-[25] h-full flex-1 justify-between ">
					<View className="mt-6">
						<Text className="text-center  text-primary-300 text-4xl">
							Welcome back
						</Text>
						<Text className="text-center mb-9 text-gray-400">
							Login to your account
						</Text>
						<TextInput
							onChangeText={(value) => setEmail(value)}
							placeholder="Email"
							className="placeholder:text-primary-200 mb-4 bg-primary-0 rounded-xl focus:border border-primary-300"
						/>

						<TextInput
							onChangeText={(value) => setPassword(value)}
							secureTextEntry={true}
							placeholder="Password"
							className="placeholder:text-primary-200 mb-2 bg-primary-0 rounded-xl focus:border border-primary-300"
						/>
						<Text className="text-right text-primary-300 text-sm">
							Forgot password?
						</Text>
					</View>
					<TouchableOpacity
						onPress={onSignIn}
						className="flex-1 items-center justify-end"
					>
						<Text className="bg-primary-300 rounded-full text-lg font-bold text-white text-center w-full py-3">
							Login
						</Text>
					</TouchableOpacity>
					<Text className="text-gray-400 text-center mt-2">
						Dont have an account?
						<Text
							onPress={() => myRouter.push("auth/Sign-up")}
							className="text-primary-300"
						>
							Sign up
						</Text>
					</Text>
				</View>
			</View>
		);
}