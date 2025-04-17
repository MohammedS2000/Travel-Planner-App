import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { GetPhotoRef } from '@/services/GooglePlaceAPI';
import HotelCard from './HotelCard';

export default function HotelsInfo({hotelList}) {
    
  return (
			<View className="mt-4 p-4 rounded-2xl bg-primary-300">
				<Text className="font-semibold text-xl text-white">
					🏨 Hotels Recommendation
				</Text>
				<FlatList
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					data={hotelList}
					renderItem={({ item, index }) => {
						return (
							<HotelCard item={item}/>
						);
					}}
				/>
			</View>
		);
}