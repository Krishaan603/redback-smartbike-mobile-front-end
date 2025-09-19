import { View, Text, Platform } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import CustomSafeArea from "@/components/CustomSafeArea";
import React from "react";

const scheduledWorkout = [
  {
    type: "",
    date: "",
  },
];

const workoutSchedule = () => {
  const headerHeight = useHeaderHeight();
  return (
    <CustomSafeArea>
      <Text className="text-xl text-center font-bold">
        Your Scheduled Workouts
      </Text>
    </CustomSafeArea>
  );
};

export default workoutSchedule;
