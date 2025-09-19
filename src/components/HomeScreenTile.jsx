import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

const HomeScreenTile = ({ item }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        item.link && router.push(`${item.link}`);
      }}
      className=" flex-1 aspect-square rounded-xl overflow-hidden"
    >
      <LinearGradient
        colors={["#1C1C1E", "#212124"]}
        start={[0, 0]}
        end={[1, 0]}
        style={{ flex: 1 }}
      >
        <View className="flex-1 p-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-white font-bold text-center">
              {item.title}
            </Text>
            <MaterialIcons name="navigate-next" size={24} color={"#EB7363"} />
          </View>
          <View className="flex-1 items-center justify-center">
            {item.icon}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default HomeScreenTile;
