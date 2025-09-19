import React from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import CustomSafeArea from "@/components/CustomSafeArea";

const workout = () => {
  return (
    <CustomSafeArea bgColour="black">
      <Text className="text-4xl text-white font-bold p-4">Workout Session</Text>
      <View className="h-52 p-4">
        <WebView
          source={{ uri: "https://www.youtube.com/embed/L_xrDAtykMI" }} // full body HIIT video
          className="flex-1"
          allowsFullscreenVideo
        />
      </View>
      <View className="p-4 gap-2">
        <Text className="text-white text-lg font-semibold">Speed: 22 km/h</Text>
        <Text className="text-white text-lg font-semibold">RPM: 90</Text>
        <Text className="text-white text-lg font-semibold">
          Distance: 4.3 km
        </Text>
        <Text className="text-white text-lg font-semibold">Incline: 5%</Text>
        <Text className="text-white text-lg font-semibold">
          Heart Rate: 132 bpm
        </Text>
        <Text className="text-white text-lg font-semibold">
          Temperature: 26 °C
        </Text>
      </View>
    </CustomSafeArea>
  );
};

export default workout;
