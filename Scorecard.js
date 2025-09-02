import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const weeklyData = [
  { week: 'Aug 25 - Aug 31', workouts: 5, minutes: 280, completed: 5 },
  { week: 'Aug 18 - Aug 24', workouts: 4, minutes: 220, completed: 3 },
  { week: 'Aug 11 - Aug 17', workouts: 3, minutes: 180, completed: 3 },
];

const monthlyData = [
  { month: 'August', workouts: 18, minutes: 1200, completed: 16 },
  { month: 'July', workouts: 15, minutes: 1000, completed: 13 },
];

export default function Scorecard() {
  // Prepare bar chart data for weeks
  const weekLabels = weeklyData.map(w => w.week.split('-')[1].trim());
  const weekComplete = weeklyData.map(w => w.completed);
  const weekMinutes = weeklyData.map(w => w.minutes);

  // Prepare bar chart data for months
  const monthLabels = monthlyData.map(m => m.month);
  const monthComplete = monthlyData.map(m => m.completed);
  const monthMinutes = monthlyData.map(m => m.minutes);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Weekly Scorecard</Text>
      <BarChart
        data={{
          labels: weekLabels,
          datasets: [
            { data: weekComplete, color: () => '#7c3aed', label: 'Completed' },
            { data: weekMinutes, color: () => '#f59e42', label: 'Minutes' }
          ]
        }}
        width={Dimensions.get('window').width - 32}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: "#ede9fe",
          backgroundGradientTo: "#f6f3f9",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(124, 58, 237, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(34, 34, 34, ${opacity})`,
          barPercentage: 0.5,
        }}
        style={{ marginVertical: 16, borderRadius: 18 }}
        fromZero
        showBarTops
      />

      {weeklyData.map((w, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.period}>{w.week}</Text>
          <View style={styles.row}>
            <Text style={styles.stat}>Workouts: <Text style={styles.bold}>{w.workouts}</Text></Text>
            <Text style={styles.stat}>Completed: <Text style={styles.bold}>{w.completed}</Text></Text>
            <Text style={styles.stat}>Minutes: <Text style={styles.bold}>{w.minutes}</Text></Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progress, {width: `${(w.completed/w.workouts)*100}%`}]} />
          </View>
          <Text style={styles.percent}>{Math.round((w.completed/w.workouts)*100)}% Completion</Text>
        </View>
      ))}

      <Text style={styles.title}>Monthly Scorecard</Text>
      <BarChart
        data={{
          labels: monthLabels,
          datasets: [
            { data: monthComplete, color: () => '#7c3aed', label: 'Completed' },
            { data: monthMinutes, color: () => '#f59e42', label: 'Minutes' }
          ]
        }}
        width={Dimensions.get('window').width - 32}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: "#ede9fe",
          backgroundGradientTo: "#f6f3f9",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(124, 58, 237, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(34, 34, 34, ${opacity})`,
          barPercentage: 0.5,
        }}
        style={{ marginVertical: 16, borderRadius: 18 }}
        fromZero
        showBarTops
      />
      {monthlyData.map((m, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.period}>{m.month}</Text>
          <View style={styles.row}>
            <Text style={styles.stat}>Workouts: <Text style={styles.bold}>{m.workouts}</Text></Text>
            <Text style={styles.stat}>Completed: <Text style={styles.bold}>{m.completed}</Text></Text>
            <Text style={styles.stat}>Minutes: <Text style={styles.bold}>{m.minutes}</Text></Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progress, {width: `${(m.completed/m.workouts)*100}%`}]} />
          </View>
          <Text style={styles.percent}>{Math.round((m.completed/m.workouts)*100)}% Completion</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f3f9', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#7c3aed', marginVertical: 14 },
  card: { backgroundColor: '#fff', borderRadius: 18, padding: 16, marginBottom: 12, shadowColor:'#000',shadowOpacity:0.07,shadowRadius:6 },
  period: { fontSize: 18, fontWeight: 'bold', color: '#7c3aed', marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  stat: { color: '#6b7280', fontSize: 16 },
  bold: { fontWeight: 'bold', color: '#111' },
  progressBar: { height: 10, backgroundColor: '#ede9fe', borderRadius: 6, marginVertical: 6, overflow:'hidden' },
  progress: { height: '100%', backgroundColor: '#7c3aed', borderRadius: 6 },
  percent: { color: '#7c3aed', fontWeight: 'bold', fontSize: 15, alignSelf:'flex-end', marginTop:4 },
});
