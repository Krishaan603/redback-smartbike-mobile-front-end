import { View } from "react-native";
import React, { useState } from "react";
// import { BarChart, yAxisSides } from "react-native-gifted-charts";
import { LineChart } from "react-native-chart-kit";

const LastWeekActivity = () => {
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);

  const handleLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    setChartWidth(width);
    setChartHeight(height);
  };

  const chartConfig = {
    backgroundColor: "#EB7363",
    color: (opacity = 1) => `gray`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: true,
  };

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 20],
        color: (opacity = 1) => `#EB7363`,
      },
    ],
  };

  return (
    <View onLayout={handleLayout} className={` overflow-hidden`}>
      <LineChart
        bezier
        withShadow
        withDots={false}
        fromZero
        data={data}
        width={chartWidth}
        height={200}
        chartConfig={chartConfig}
        withHorizontalLabels
        flatColor={true}
        withCustomBarColorFromData
        withInnerLines
        style={{
          borderRadius: 16,
          padding: 0,
          marginVertical: 10,
          marginHorizontal: 0,
        }}
      />
    </View>
  );
};

export default LastWeekActivity;
