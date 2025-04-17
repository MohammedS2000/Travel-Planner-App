import { View, Text, Image, TouchableOpacity, ImageBackground} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

export default function Login() {

  const myRouter = useRouter();
  return (
			<View className="flex-1">
				<ImageBackground
					source={require("./../assets/images/vecteezy_shadow-of-an-airplane-glides-over-a-turquoise-beach_54233989.jpeg")}
					resizeMode="cover"
					className="flex-1 items-center justify-center"
				>
					<View className="p-[25] flex-1 justify-between ">
						<Text className="text-5xl mb-3 text-center  font-bold text-white">
							Trip
							<Text className='text-primary-200'>
								Tailor
							</Text>
						</Text>
						<Text className="text-5xl font-bold text-white ">
							The best app for travel planning
						</Text>
						<View>
							<TouchableOpacity
								onPress={() => myRouter.push("auth/Sign-in")}
								className="flex items-center justify-center "
							>
								<Text className="bg-white rounded-full text-lg font-bold text-primary-200 text-center w-full py-3">
									Login
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => myRouter.push("auth/Sign-up")}
								className="flex items-center justify-center mt-3"
							>
								<Text className="bg-primary-200 rounded-full text-lg font-bold text-white text-center w-full py-3">
									Sign Up
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ImageBackground>
			</View>
		);
		
}