import {
	View,
	Text,
	Image,
	TouchableOpacity,
	TextInput,
	ToastAndroid,
	ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth, db } from "./../../../config/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [rePassword, setRePassword] = useState();
	const [fullName, setFullName] = useState();
    const [loading, setLoading] = useState(false);
	

	
	const myRouter = useRouter();

	const navigate = useNavigation();

  

	useEffect(() => {
		navigate.setOptions({
			headerShown: false,
		});		
	}, [])

	const OnCreateAccount = async () => {
		if (!email || !password || !rePassword || !fullName) {
			ToastAndroid.show("Please enter all details", ToastAndroid.TOP);
		} else if (rePassword !== password) {
			ToastAndroid.show(
				"make sure the password and the confirmd password are the same",
				ToastAndroid.LONG,
			);
		} else {
			setLoading(true)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                fullName: fullName,
                email: email,
				emailLowerCase: email.toLowerCase(),
            });
            console.log("Full name stored in Firestore");
            setLoading(false);
            myRouter.replace("/myTrip");
		}
	};

	return (
		<View className="flex-1 bg-white">
			<Image
				className="w-full h-[200px] relative"
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
						placeholder="Full Name"
						className="placeholder:text-primary-200 mb-4 bg-primary-0 rounded-xl focus:border border-primary-300"
						onChangeText={(value) => setFullName(value)}
					/>
					<TextInput
						placeholder="Email"
						className="placeholder:text-primary-200 mb-4 bg-primary-0 rounded-xl focus:border border-primary-300"
						onChangeText={(value) => setEmail(value)}
					/>
					<TextInput
						secureTextEntry={true}
						placeholder="Password"
						className="placeholder:text-primary-200 mb-4 bg-primary-0 rounded-xl focus:border border-primary-300"
						onChangeText={(value) => setPassword(value)}
					/>
					<TextInput
						secureTextEntry={true}
						placeholder="Confirm Password"
						className="placeholder:text-primary-200 mb-2 bg-primary-0 rounded-xl focus:border border-primary-300"
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
					{loading ? (
						<View>
							<ActivityIndicator size="small" />
						</View>
					) : (
						<Text className="bg-primary-300 rounded-full text-lg font-bold text-white text-center w-full py-3">
							Sign Up
						</Text>
					)}
				</TouchableOpacity>
				<Text className="text-gray-400 text-center mt-2">
					Already have an account?
					<Text
						onPress={() => myRouter.push("auth/Sign-in")}
						className="text-primary-300"
					>
						Login
					</Text>
				</Text>
			</View>
		</View>
	);
}
