import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import CalendarPicker from "react-native-calendar-picker";
import { CreateTripContext } from '@/context/CreateTripContext';

export default function SelectDate() {
    const myRouter = useRouter()
    const navigation = useNavigation()
    const [selectedStartDate, setSelectedStartDate] = useState(null);
	const [selectedEndDate, setSelectedEndDate] = useState(null);
    const { tripData, setTripData } = useContext(CreateTripContext);

    useEffect(() => {
            navigation.setOptions({
                headerShown: true,
                headerTransparent: true,
                headerTitle: "",
            });
        }, []);
        useEffect(() => {
                setTripData({ ...tripData, startDate:selectedStartDate, endDate:selectedEndDate });
            }, [selectedEndDate]);

    const onDateChange = (date, type) => {
					if (type === "END_DATE") {
            		setSelectedEndDate(date);
									} else {
										setSelectedStartDate(date);
										setSelectedEndDate(null);
									}
								};
                                

  return (
			<View className="flex-1 p-[25] pt-[55] bg-white h-full">
				<View>
					<Text className="text-4xl font-semibold">Select Date</Text>
					<Text className="mt-3 text-xl text-gray-500 font-semibold">
						Choose the date for your trip
					</Text>
				</View>
				<View className="mt-[25]">
					<CalendarPicker
						onDateChange={onDateChange}
						allowRangeSelection={true}
						minDate={new Date()}
						selectedDayColor="#3D8A7D"
						selectedDayTextColor="#FFFFFF"
					/>
				</View>
                {selectedEndDate!==null? (<TouchableOpacity
                                        onPress={() => myRouter.push("/creat-trip/SelectBudget")}
                                        className="flex items-center justify-center mt-[40]"
                                    >
                                        <Text className="bg-primary-300 rounded-full text-lg font-bold text-white text-center w-full py-3">
                                            Next
                                        </Text>
                                    </TouchableOpacity>):("")}
			</View>
		);
}