import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { CreateTripContext } from '@/context/CreateTripContext';
import { SelectBudgetList } from "./../../constant/Options";
import OptionList from '@/components/createTrip/OptionList';

export default function SelectBudget() {

const { tripData, setTripData } = useContext(CreateTripContext);
  const navigation = useNavigation();
  const myRouter = useRouter();
  const [selectBudget, setSelectBudget] = useState(null);


  useEffect(() => {
              navigation.setOptions({
                  headerShown: true,
                  headerTransparent: true,
                  headerTitle: "",
              });
          }, []);
  
  useEffect(() => {
      setTripData({ ...tripData, budget: selectBudget });
    }, [selectBudget]);

  return (
    <View className="h-full flex-1 p-[25] pt-[60] bg-white">
          <View>
            <Text className="text-4xl font-semibold">Budget</Text>
            <View className="mt-5">
              <Text className="text-xl text-gray-500 font-semibold">
                Choose your budget:
              </Text>
              <FlatList
                className="mt-4"
                data={SelectBudgetList}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    className="my-3"
                    onPress={() => setSelectBudget(item)}
                  >
                    <OptionList option={item} selectedOption={selectBudget}/>
                  </TouchableOpacity>
                )}
              />
            </View>
            {selectBudget !== null ? (
              <TouchableOpacity
                onPress={() => myRouter.push("/creat-trip/TripSummary")}
                className="flex items-center justify-center mt-[40]"
              >
                <Text className="bg-primary-300 rounded-full text-lg font-bold text-white text-center w-full py-3">
                  Next
                </Text>
              </TouchableOpacity>
            ) : (
              ""
            )}
          </View>
        </View>
  )
}