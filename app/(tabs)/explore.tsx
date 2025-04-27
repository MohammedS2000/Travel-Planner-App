import { View, Text } from "react-native";
import React from "react";
import MapView from "react-native-maps";

export default function Explore() {
return (
	<View style={{
    flex:1,
  }}>
		<MapView style={{
      width:"100%", 
      height:"100%"
    }} />
	</View>
);
}


