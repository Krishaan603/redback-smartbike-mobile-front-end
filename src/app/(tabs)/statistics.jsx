import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#121212',
  backgroundGradientTo: '#1a1a1a',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForBackgroundLines: {
    strokeDasharray: '',
    stroke: 'rgba(255,255,255,0.1)',
  },
};

// 👉 Replace this with the EXACT values from your uploaded workout summary
const mockData = [
  { day: 'Mon', minutes: 22 },
  { day: 'Tue', minutes: 48 },
  { day: 'Wed', minutes: 26 },
  { day: 'Thu', minutes: 55 },
  { day: 'Fri', minutes: 99 },
  { day: 'Sat', minutes: 35 },
  { day: 'Sun', minutes: 20 },
];

// Workout summary stats (still static for distance, calories, HR)
const workoutSummary = {
  totalDistance: '92.4 km',
  calories: 3250,
  avgHeartRate: '148 bpm',
};

export default function RedbackWeeklySummary() {
  const [loading, setLoading] = useState(true);
  const [rideData, setRideData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setRideData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const totalMinutes = rideData.reduce((sum, d) => sum + d.minutes, 0);
  const activeDays = rideData.filter(d => d.minutes > 0).length;

  // Convert minutes → hours + minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTotalTime = `${hours}h ${minutes}m`;

  const chartData = {
    labels: rideData.map(d => d.day),
    datasets: [
      {
        data: rideData.map(d => d.minutes),
      },
    ],
  };

  const customYLabels = ['0.00', '24.75', '49.50', '74.25', '99.00'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📊 Weekly Ride Statistics</Text>
        <Text style={styles.subtitle}>
          Consistency builds strength—track your weekly wins!
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#ff4500" style={{ marginTop: 40 }} />
        ) : (
          <>
            <BarChart
              data={chartData}
              width={screenWidth - 30}
              height={260}
              chartConfig={chartConfig}
              style={styles.chart}
              fromZero
              showValuesOnTopOfBars
              withInnerLines
              withHorizontalLabels
              segments={4} // 4 intervals -> 5 labels
              formatYLabel={(val) => {
                const index = Math.round((val / 99) * 4); // map to 0-4
                return customYLabels[index] || '';
              }}
            />

            <View style={styles.stats}>
  <Text style={styles.statText}>
    🕒 Total Minutes: <Text style={styles.statHighlight}>{totalMinutes} min</Text>
  </Text>
  <Text style={styles.statText}>
    📅 Active Days: <Text style={styles.statHighlight}>{activeDays} days</Text>
  </Text>
</View>


            <View style={styles.motivationBox}>
              <Text style={styles.motivation}>
                {activeDays >= 5
                  ? "🔥 Pedal power at max! Your streak is unstoppable!"
                  : "💪 Keep pushing to hit your weekly targets!"}
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: StatusBar.currentHeight || 20,
  },
  container: {
    paddingHorizontal: 15,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff4500',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 20,
  },
  chart: {
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#ff4500',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginVertical: 8,
  },
  stats: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 14,
  },
  statText: {
    color: '#ddd',
    fontSize: 16,
    marginBottom: 8,
  },
  statHighlight: {
    color: '#ff7f50',
    fontWeight: '700',
  },
  motivationBox: {
    marginTop: 30,
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 14,
    width: '100%',
  },
  motivation: {
    color: '#ff6347',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});




