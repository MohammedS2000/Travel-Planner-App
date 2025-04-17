import { View, Text } from "react-native";
import React from "react";

export default function OptionList({ option, selectedOption }) {
	return (
		<View>
			{selectedOption?.id === option?.id ? (
				<View
					className="p-[25] flex-1 flex-row bg-primary-300  border-2 border-primary-400 rounded-3xl items-center justify-between"
					style={{
						elevation: 4,
						shadowColor: "#000",
						shadowRadius: 4.5,
						shadowOpacity: 2,
					}}
				>
					<View>
						<Text className="text-xl text-white font-semibold ">
							{option.title}
						</Text>
						<Text className="text-gray-200 text-center">{option.desc}</Text>
					</View>
					<View>
						<Text className="text-4xl">{option.icon}</Text>
					</View>
				</View>
			) : (
				<View className="p-[25] flex-1 flex-row bg-gray-200 rounded-3xl items-center justify-between">
					<View>
						<Text className="text-xl font-semibold ">{option.title}</Text>
						<Text className="text-gray-500 text-center">{option.desc}</Text>
					</View>
					<View>
						<Text className="text-4xl">{option.icon}</Text>
					</View>
				</View>
			)}
		</View>
	);
}
