import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const STORAGE_KEY = 'weeklyPlan';

const initialPlan = {
  Sun: [],
  Mon: [{ name: 'Chest & Triceps', duration: 60, checked: false }],
  Tue: [{ name: 'Back & Biceps', duration: 45, checked: false }],
  Wed: [],
  Thu: [{ name: 'Legs', duration: 50, checked: false }],
  Fri: [],
  Sat: [],
};

export default function WeeklyPlan() {
  const [weeklyPlan, setWeeklyPlan] = useState(initialPlan);
  const [editDay, setEditDay] = useState(null);
  const [newWorkout, setNewWorkout] = useState('');
  const [newDuration, setNewDuration] = useState('');

  useEffect(() => {
    // Load data from storage
    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      if (data) setWeeklyPlan(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    // Save to storage whenever weeklyPlan changes
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(weeklyPlan));
  }, [weeklyPlan]);

  const handleAddWorkout = (day) => {
    if (newWorkout && newDuration) {
      setWeeklyPlan({
        ...weeklyPlan,
        [day]: [
          ...weeklyPlan[day],
          { name: newWorkout, duration: parseInt(newDuration), checked: false }
        ],
      });
      setNewWorkout('');
      setNewDuration('');
      setEditDay(null);
    }
  };

  const handleRemoveWorkout = (day, idx) => {
    setWeeklyPlan({
      ...weeklyPlan,
      [day]: weeklyPlan[day].filter((_, i) => i !== idx),
    });
  };

  const handleToggleCheck = (day, idx) => {
    setWeeklyPlan({
      ...weeklyPlan,
      [day]: weeklyPlan[day].map((w, i) =>
        i === idx ? { ...w, checked: !w.checked } : w
      ),
    });
  };

  // Calculate weekly stats
  const totalWorkouts = Object.values(weeklyPlan).reduce((sum, arr) => sum + arr.length, 0);
  const totalMinutes = Object.values(weeklyPlan).flat().reduce((sum, w) => sum + (w.duration || 0), 0);
  const completedWorkouts = Object.values(weeklyPlan).flat().filter(w => w.checked).length;

  return (
    <LinearGradient colors={['#7c3aed', '#b45309']} style={{ flex: 1 }}>
      <Text style={styles.title}>Weekly Plan</Text>
      <View style={styles.summaryCard}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{totalWorkouts}</Text>
          <Text style={styles.statLabel}>Workouts</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{completedWorkouts}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{totalMinutes}</Text>
          <Text style={styles.statLabel}>Mins</Text>
        </View>
      </View>
      <FlatList
        data={Object.keys(weeklyPlan)}
        keyExtractor={(d) => d}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item: day }) => (
          <View style={styles.dayCard}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <Text style={styles.dayTitle}>{day}</Text>
              <Text style={styles.dayCount}>{weeklyPlan[day].length > 0 ? `${weeklyPlan[day].length} planned` : ''}</Text>
            </View>
            {weeklyPlan[day].length === 0 && <Text style={styles.noWorkout}>No workout planned</Text>}
            {weeklyPlan[day].map((w, idx) => (
              <View key={idx} style={styles.workoutRow}>
                <TouchableOpacity
                  style={[styles.checkbox, w.checked && styles.checkedBox]}
                  onPress={() => handleToggleCheck(day, idx)}
                >
                  {w.checked && <Feather name="check" size={16} color="#fff" />}
                </TouchableOpacity>
                <Text style={[styles.workoutText, w.checked && styles.workoutTextChecked]}>
                  {w.name} <Text style={styles.durationText}>({w.duration} min)</Text>
                </Text>
                <TouchableOpacity onPress={() => handleRemoveWorkout(day, idx)} style={styles.removeBtn}>
                  <Feather name="trash-2" size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))}
            {editDay === day ? (
              <View style={styles.editRow}>
                <TextInput
                  placeholder="Workout name"
                  style={styles.input}
                  value={newWorkout}
                  onChangeText={setNewWorkout}
                  placeholderTextColor="#a3a3a3"
                />
                <TextInput
                  placeholder="Duration"
                  style={styles.input}
                  value={newDuration}
                  keyboardType="numeric"
                  onChangeText={setNewDuration}
                  placeholderTextColor="#a3a3a3"
                />
                <TouchableOpacity style={styles.saveBtn} onPress={() => handleAddWorkout(day)}>
                  <Feather name="save" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditDay(null)}>
                  <Feather name="x" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.addBtn} onPress={() => setEditDay(day)}>
                <Feather name="plus-circle" size={20} color="#7c3aed" />
                <Text style={styles.addText}>Add workout</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </LinearGradient>
  );
}

// ...styles unchanged (as previously provided)
