import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const workoutExercises = [
  {
    name: 'Barbell Incline Bench Press',
    sets: 3,
    reps: 10,
    weight: 45,
    image: require('./assets/incline-bench.jpg'),
    muscles: require('./assets/chest-shoulders-core.png'),
  },
  {
    name: 'Barbell Push Press',
    sets: 3,
    reps: 10,
    weight: 30,
    image: require('./assets/push-press.jpg'),
    muscles: require('./assets/shoulders.png'),
  },
  {
    name: 'Cable Pushdowns',
    sets: 3,
    reps: 10,
    weight: 25,
    image: require('./assets/pushdowns.jpg'),
    muscles: require('./assets/triceps.png'),
  },
  {
    name: 'Machine Triceps Dips',
    sets: 3,
    reps: 10,
    weight: 27.5,
    image: require('./assets/triceps-dips.jpg'),
    muscles: require('./assets/triceps.png'),
  },
];

const WorkoutDetails = () => (
  <LinearGradient colors={['#7c3aed', '#b45309']} style={styles.gradient}>
    <View style={styles.header}>
      <Text style={styles.time}>9:15</Text>
      <View style={styles.headerIcons}>
        <MaterialCommunityIcons name="snapchat" size={20} color="white" />
        <MaterialCommunityIcons name="snapchat" size={20} color="white" />
        <MaterialCommunityIcons name="snapchat" size={20} color="white" />
        <Text style={styles.dot}>•</Text>
      </View>
      <View style={styles.headerActions}>
        <Feather name="bookmark" size={24} color="#fff" style={{marginRight:12}} />
        <Feather name="x" size={28} color="#fff" />
      </View>
    </View>
    <Text style={styles.workoutTime}>60 min</Text>
    <View style={styles.detailCard}>
      <View style={styles.exercisesHeader}>
        <Text style={styles.exercisesTitle}>6 Exercises</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addText}>Add</Text>
          <Feather name="plus" size={20} color="#2563eb" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{maxHeight: 400}}>
        {workoutExercises.map((ex, idx) => (
          <View style={styles.exerciseItem} key={idx}>
            <Image source={ex.image} style={styles.exerciseImage} />
            <View style={{flex:1, marginLeft:12}}>
              <Text style={styles.exerciseName}>{ex.name}</Text>
              <Text style={styles.exerciseMeta}>{`${ex.sets} sets x ${ex.reps} reps x ${ex.weight} kg`}</Text>
            </View>
            <Image source={ex.muscles} style={styles.muscleImg} />
            <Feather name="repeat" size={22} color="#6b7280" style={{marginLeft:8}} />
            <Feather name="menu" size={22} color="#6b7280" style={{marginLeft:8}} />
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.startBtn}>
        <Text style={styles.startBtnText}>Start Workout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.adaptBtn}>
        <Text style={styles.adaptBtnText}>Adapt Workout</Text>
      </TouchableOpacity>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, paddingHorizontal: 20 },
  time: { color: '#fff', fontSize: 19, fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dot: { color: '#fff', marginLeft: 5, fontSize: 16 },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  workoutTime: { fontSize: 28, color: '#fff', fontWeight: 'bold', marginTop: 28, marginLeft: 20 },
  detailCard: {
    backgroundColor: '#fff', borderTopLeftRadius: 36, borderTopRightRadius: 36, padding: 24, flex: 1, marginTop: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10,
  },
  exercisesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  exercisesTitle: { fontSize: 22, fontWeight: 'bold' },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  addText: { color: '#2563eb', fontWeight: 'bold', fontSize: 16 },
  exerciseItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 10, marginBottom: 2,
    borderBottomWidth: 1, borderBottomColor: '#f3f4f6',
  },
  exerciseImage: { width: 54, height: 54, borderRadius: 14, backgroundColor: '#fff' },
  exerciseName: { fontSize: 17, fontWeight: 'bold', color: '#1f2937' },
  exerciseMeta: { color: '#6b7280', fontSize: 15 },
  muscleImg: { width: 36, height: 36, borderRadius: 10, marginLeft: 11 },
  startBtn: {
    backgroundColor: '#000', borderRadius: 20, paddingVertical: 18, alignItems: 'center', marginTop: 20, marginBottom: 10,
  },
  startBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  adaptBtn: {
    backgroundColor: '#f3f4f6', borderRadius: 20, paddingVertical: 18, alignItems: 'center', marginBottom: 10,
  },
  adaptBtnText: { color: '#1f2937', fontWeight: 'bold', fontSize: 20 },
});

export default WorkoutDetails;
