import {
	View,
	Text,
	Image,
	TouchableOpacity,
	TextInput,
	ToastAndroid,
	ActivityIndicator,
	ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth } from "../../../config/FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

export default function PasswordReset() {
	const [email, setEmail] = useState();

	const myRouter = useRouter();

	const navigate = useNavigation();

	useEffect(() => {
		navigate.setOptions({
			headerShown: false,
		});
	}, []);

	const onForgotPassword = () => {
		if (!email) {
			ToastAndroid.show("Enter your email", ToastAndroid.LONG);

			return;
		}

		sendPasswordResetEmail(auth, email, null)
			.then(() => {
				alert("reset email sent to " + email);
			})
			.catch(function (e) {
				console.log(e);
			});
	};

	return (
		<ScrollView className="flex-1 bg-white">
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
						Reset your password
					</Text>
					<Text className="text-center mb-9 text-gray-400">
						Enter your email to get the reset mail
					</Text>
					<TextInput
						onChangeText={(value) => setEmail(value)}
						placeholder="Email"
						className="placeholder:text-primary-200 mb-4 bg-primary-0 rounded-xl focus:border border-primary-300"
					/>
				</View>
				<TouchableOpacity
					onPress={onForgotPassword}
					className="flex-1 items-center justify-end"
				>
					<Text className="bg-primary-300 rounded-full text-lg font-bold text-white text-center w-full py-3">
						Send Reset Email
					</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}
