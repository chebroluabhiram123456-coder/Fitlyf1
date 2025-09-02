import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';

const STORAGE_KEY = 'weightLogs';

export default function WeightTracker() {
  const [weightLogs, setWeightLogs] = useState([]);
  const [newWeight, setNewWeight] = useState('');
  const [newDate, setNewDate] = useState('');

  useEffect(() => {
    // Load weight logs from storage
    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      if (data) setWeightLogs(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    // Save to storage whenever weightLogs changes
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(weightLogs));
  }, [weightLogs]);

  const addWeightLog = () => {
    if (newWeight && newDate) {
      setWeightLogs([{ date: newDate, weight: parseFloat(newWeight) }, ...weightLogs]);
      setNewWeight('');
      setNewDate('');
    }
  };

  // Prepare data for chart (sorted by date ascending)
  const chartData = [...weightLogs].sort((a, b) => a.date.localeCompare(b.date));
  const chartLabels = chartData.map(d => d.date.slice(5));
  const chartValues = chartData.map(d => d.weight);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Weight Tracker</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#b3b3b3"
          value={newDate}
          onChangeText={setNewDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          placeholderTextColor="#b3b3b3"
          value={newWeight}
          onChangeText={setNewWeight}
          keyboardType="decimal-pad"
        />
        <TouchableOpacity style={styles.addBtn} onPress={addWeightLog}>
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>
      </View>
      <LineChart
        data={{
          labels: chartLabels,
          datasets: [{ data: chartValues }]
        }}
        width={Dimensions.get('window').width - 32}
        height={220}
        yAxisSuffix="kg"
        yAxisInterval={0.5}
        chartConfig={{
          backgroundGradientFrom: "#ede9fe",
          backgroundGradientTo: "#f6f3f9",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(124, 58, 237, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(34, 34, 34, ${opacity})`,
          style: { borderRadius: 18 },
          propsForDots: { r: "5", strokeWidth: "2", stroke: "#7c3aed" }
        }}
        bezier
        style={{ marginVertical: 16, borderRadius: 18 }}
      />
      <FlatList
        data={weightLogs}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.logRow}>
            <Text style={styles.logDate}>{item.date}</Text>
            <Text style={styles.logWeight}>{item.weight} kg</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color:'#bbb', textAlign:'center', marginTop:40 }}>No weight logs yet</Text>}
      />
    </ScrollView>
  );
}

// ...styles unchanged (as previously provided)