import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const workoutExercises = [
  { name: 'Barbell Incline Bench Press', image: require('./assets/incline-bench.jpg') },
  { name: 'Barbell Push Press', image: require('./assets/push-press.jpg') },
  { name: 'Cable Pushdowns', image: require('./assets/pushdowns.jpg') },
  { name: 'Machine Triceps Dips', image: require('./assets/triceps-dips.jpg') },
];

export default function WorkoutDashboard({ navigation }) {
  return (
    <LinearGradient colors={['#7c3aed', '#b45309']} style={styles.gradient}>
      <View style={styles.header}>
        <Text style={styles.time}>9:15</Text>
        <View style={styles.headerIcons}>
          <MaterialCommunityIcons name="snapchat" size={20} color="white" />
          <MaterialCommunityIcons name="snapchat" size={20} color="white" />
          <MaterialCommunityIcons name="snapchat" size={20} color="white" />
          <Text style={styles.dot}>•</Text>
        </View>
        <View style={styles.streak}>
          <MaterialCommunityIcons name="fire" size={20} color="white" />
          <Text style={styles.streakText}>9</Text>
        </View>
      </View>
      <View style={styles.weekDays}>
        {['Su', 'Mo', 'Tu', 'We', 'Th'].map((day, i) => (
          <View key={day} style={[styles.dayItem, i === 1 && styles.dayActive]}>
            <Text style={[styles.dayText, i === 1 && styles.dayTextActive]}>{day} {10 + i}</Text>
            {i === 1 && <MaterialCommunityIcons name="dumbbell" size={16} color="white" />}
          </View>
        ))}
        <TouchableOpacity style={styles.moreBtn} onPress={() => navigation.navigate('WeeklyPlan')}>
          <Feather name="calendar" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.greeting}>Get ready, AB</Text>
      <Text style={styles.subtitle}>Let's smash today's workout!</Text>
      <TouchableOpacity style={styles.workoutCard} onPress={() => navigation.navigate('WorkoutDetails')}>
        <View style={styles.badgeRow}>
          <View style={styles.badgeSpecial}><Text style={styles.badgeText}>Special for AB</Text></View>
          <View style={styles.badgeGym}><Text style={styles.badgeTextGray}>Gym</Text></View>
        </View>
        <Text style={styles.workoutTime}>60 min</Text>
        <Text style={styles.workoutMuscles}>Chest, Shoulders, Core</Text>
        <View style={styles.exerciseImages}>
          {workoutExercises.map((ex, idx) => (
            <Image key={idx} source={ex.image} style={styles.exerciseImage} />
          ))}
          <TouchableOpacity style={styles.arrowBtn}>
            <Feather name="arrow-right" size={28} color="#6d28d9" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.customCard} onPress={() => navigation.navigate('CustomWorkout')}>
        <MaterialCommunityIcons name="tune-vertical" size={28} color="#6b7280" />
        <Text style={styles.customText}>Custom Workout</Text>
        <Feather name="chevron-right" size={24} color="#6b7280" />
      </TouchableOpacity>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialCommunityIcons name="dumbbell" size={22} color="#6b7280" />
          <Text style={styles.navTextActive}>Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="bar-chart-2" size={22} color="#000" />
          <Text style={styles.navText}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="arrow-up-bold" size={22} color="#6b7280" />
          <Text style={styles.navText}>Coach</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, paddingHorizontal: 20 },
  time: { color: '#fff', fontSize: 19, fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  dot: { color: '#fff', marginLeft: 5, fontSize: 16 },
  streak: { backgroundColor: '#0003', flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 5, paddingHorizontal: 10 },
  streakText: { color: '#fff', marginLeft: 4, fontWeight: 'bold' },
  weekDays: { flexDirection: 'row', alignItems: 'center', marginTop: 22, paddingHorizontal: 20 },
  dayItem: { paddingVertical: 5, paddingHorizontal: 10, borderRadius: 18 },
  dayActive: { backgroundColor: '#fff3', },
  dayText: { color: '#e5e7eb', fontWeight: 'bold', fontSize: 16 },
  dayTextActive: { color: '#fff' },
  moreBtn: { marginLeft: 15, backgroundColor: '#fff2', padding: 6, borderRadius: 16 },
  greeting: { fontSize: 30, fontWeight: 'bold', color: '#fff', marginTop: 28, marginLeft: 20 },
  subtitle: { fontSize: 18, color: '#e5e7eb', marginLeft: 20, marginTop: 8, marginBottom: 16 },
  workoutCard: {
    backgroundColor: '#fff2',
    borderRadius: 28,
    marginHorizontal: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10,
  },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  badgeSpecial: { backgroundColor: '#7c3aed', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  badgeGym: { backgroundColor: '#fff3', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  badgeText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  badgeTextGray: { color: '#d1d5db', fontWeight: 'bold', fontSize: 14 },
  workoutTime: { fontSize: 32, color: '#fff', fontWeight: 'bold', marginTop: 4 },
  workoutMuscles: { fontSize: 18, color: '#d1d5db', marginBottom: 10 },
  exerciseImages: { flexDirection: 'row', alignItems: 'center' },
  exerciseImage: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#fff', marginRight: 6 },
  arrowBtn: { backgroundColor: '#fff', borderRadius: 14, padding: 8, marginLeft: 10 },
  customCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff2', borderRadius: 18, marginHorizontal: 16, padding: 16, marginBottom: 16,
  },
  customText: { color: '#fff', fontSize: 18, fontWeight: 'bold', flex: 1 },
  navBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    backgroundColor: '#fff', height: 70, borderTopLeftRadius: 20, borderTopRightRadius: 20,
    shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 14,
  },
  navItem: { alignItems: 'center', flex: 1, paddingTop: 8 },
  navText: { color: '#6b7280', fontSize: 15, marginTop: 3 },
  navItemActive: { alignItems: 'center', flex: 1, paddingTop: 8 },
  navTextActive: { color: '#000', fontWeight: 'bold', fontSize: 15, marginTop: 3 },
});
