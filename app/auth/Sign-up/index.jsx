import {
	View,
	Text,
	Image,
	TouchableOpacity,
	TextInput,
	ToastAndroid,
	ActivityIndicator,
	Platform,
	ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth, db } from "./../../../config/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { CreateTripContext } from "@/context/CreateTripContext";


export default function SignUp() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [rePassword, setRePassword] = useState();
	const [fullName, setFullName] = useState();
	const [userLocation, setUserLocation] = useState();

	const [isLoading, setIsLoading] = useState(false);
	const { setTripData } = useContext(CreateTripContext);
	const myRouter = useRouter();

	const navigate = useNavigation();

	useEffect(() => {
		navigate.setOptions({
			headerShown: false,
		});
	}, []);

	const OnCreateAccount = async () => {
		if (!email || !password || !rePassword || !fullName || !userLocation) {
			ToastAndroid.show("Please enter all details", ToastAndroid.TOP);
		} else if (rePassword !== password) {
			ToastAndroid.show(
				"make sure the password and the confirmd password are the same",
				ToastAndroid.LONG,
			);
		} else {
			setIsLoading(true);
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const user = userCredential.user;

			await setDoc(doc(db, "users", user.uid), {
				fullName: fullName,
				email: email,
				emailLowerCase: email.toLowerCase(),
				userLocation: userLocation.userLocation.name,
			});
			setIsLoading(false);
			myRouter.replace("/myTrip");
		}
	};

	return (
		<View
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="flex-1"
		>
			<ScrollView className="flex-1 bg-white relative">
				<Image
					className="w-full h-[200px]"
					source={require("../../../assets/images/vecteezy_shadow-of-an-airplane-glides-over-a-turquoise-beach_54233997.jpeg")}
				/>
				<TouchableOpacity className="absolute" onPress={() => myRouter.back()}>
					<Ionicons name="arrow-back-circle-sharp" size={40} color="#3D8A7D" />
				</TouchableOpacity>
				<View className="rounded-t-[40px] mt-[-40] bg-white p-[25] h-full flex-1 justify-between ">
					<View className="mt-6">
						<Text className="text-center  text-primary-300 text-4xl">
							Register
						</Text>
						<Text className="text-center mb-9 text-gray-400">
							Create your new account
						</Text>
						<TextInput
							placeholder=" Full Name"
							className="placeholder:text-primary-200 mb-4 bg-primary-0 rounded-md  "
							onChangeText={(value) => setFullName(value)}
						/>
						<TextInput
							placeholder=" Email"
							className="placeholder:text-primary-200 mb-4 bg-primary-0 rounded-md"
							onChangeText={(value) => setEmail(value)}
						/>

						<View className="mb-3">
							<GooglePlacesAutocomplete
								placeholder="Enter Location"
								fetchDetails={true}
								disableScroll={true}
								textInputProps={{ placeholderTextColor: "#4FB3A9" }}
								onFail={(error) => console.log(error)}
								onPress={(data, details = null) => {
									setTripData({
										userLocation: {
											name: data.description,
										},
									});
									setUserLocation({
										userLocation: {
											name: data.description,
										},
									});
								}}
								styles={{
									textInput: {
										color: "#3D8A7D",
										backgroundColor: "#d7f7f0",
									},
								}}
								query={{
									key: "AIzaSyCPtTP_qtHtiEE6rST9J3mPOe7m_2WO-ps",
									language: "en",
								}}
							/>
						</View>
						<TextInput
							secureTextEntry={true}
							placeholder=" Password"
							className="placeholder:text-primary-200 mb-4 bg-primary-0 rounded-md"
							onChangeText={(value) => setPassword(value)}
						/>
						<TextInput
							secureTextEntry={true}
							placeholder=" Confirm Password"
							className="placeholder:text-primary-200 mb-2 bg-primary-0 rounded-md"
							onChangeText={(value) => setRePassword(value)}
						/>
						<Text className="text-center text-gray-400 text-sm">
							By signing up you agree to our{" "}
							<Text className="text-primary-300">
								Terms of use and privacy policy
							</Text>
						</Text>
					</View>
					<TouchableOpacity
						onPress={OnCreateAccount}
						className="flex-1 items-center justify-end"
					>
						{isLoading ? (
							<View className="bg-primary-300 rounded-full text-lg font-bold text-white text-center w-full py-3">
								<ActivityIndicator size="small" color="white" />
							</View>
						) : (
							<Text className="bg-primary-300 rounded-full text-lg font-bold text-white text-center w-full py-3">
								Sign Up
							</Text>
						)}
					</TouchableOpacity>
					<Text className="text-gray-400 text-center mt-2">
						Already have an account?{" "}
						<Text
							onPress={() => myRouter.push("auth/Sign-in")}
							className="text-primary-300"
						>
							Login
						</Text>
					</Text>
				</View>
			</ScrollView>
		</View>
	);
}
