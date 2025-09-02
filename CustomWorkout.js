import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const muscleOptions = [
  'Chest', 'Shoulders', 'Core', 'Back', 'Biceps', 'Triceps', 'Legs', 'Glutes'
];

export default function CustomWorkout() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.cancelled) setImage(result.uri);
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Videos });
    if (!result.cancelled) setVideo(result.uri);
  };

  const toggleMuscle = (muscle) => {
    setSelectedMuscles(selectedMuscles.includes(muscle)
      ? selectedMuscles.filter(m => m !== muscle)
      : [...selectedMuscles, muscle]);
  };

  const handleSave = () => {
    // Save to your backend or local storage
    alert('Workout saved:\n' + JSON.stringify({
      name, description, muscles: selectedMuscles, image, video
    }, null, 2));
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f3f4f6' }} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>Create Custom Workout</Text>
      <TextInput
        style={styles.input}
        placeholder="Workout Name"
        placeholderTextColor="#a3a3a3"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, { height: 70 }]}
        placeholder="Description"
        placeholderTextColor="#a3a3a3"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Text style={styles.label}>Target Muscles:</Text>
      <View style={styles.muscleWrap}>
        {muscleOptions.map(muscle => (
          <TouchableOpacity
            key={muscle}
            style={[
              styles.muscleBtn,
              selectedMuscles.includes(muscle) && styles.muscleBtnSelected
            ]}
            onPress={() => toggleMuscle(muscle)}
          >
            <Text style={[
              styles.muscleText,
              selectedMuscles.includes(muscle) && styles.muscleTextSelected
            ]}>{muscle}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.attachRow}>
        <TouchableOpacity style={styles.attachBtn} onPress={pickImage}>
          <Feather name="image" size={24} color="#7c3aed" />
          <Text style={styles.attachText}>Attach Image</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.previewImg} />}
      </View>
      <View style={styles.attachRow}>
        <TouchableOpacity style={styles.attachBtn} onPress={pickVideo}>
          <Feather name="video" size={24} color="#7c3aed" />
          <Text style={styles.attachText}>Attach Video</Text>
        </TouchableOpacity>
        {video && <Text style={styles.videoText}>Video selected</Text>}
      </View>
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Feather name="save" size={24} color="#fff" />
        <Text style={styles.saveText}>Save Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: 'bold', color: '#7c3aed', marginBottom: 18, alignSelf: 'center' },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 12, fontSize: 16, marginBottom: 12, color: '#000' },
  label: { fontWeight: 'bold', fontSize: 16, color: '#7c3aed', marginBottom: 8 },
  muscleWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  muscleBtn: { borderWidth: 1, borderColor: '#7c3aed', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 12, marginBottom: 6 },
  muscleBtnSelected: { backgroundColor: '#7c3aed' },
  muscleText: { color: '#7c3aed', fontWeight: 'bold' },
  muscleTextSelected: { color: '#fff' },
  attachRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  attachBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#ede9fe', borderRadius: 10, padding: 8 },
  attachText: { color: '#7c3aed', fontWeight: 'bold', fontSize: 16 },
  previewImg: { width: 80, height: 80, borderRadius: 8, marginLeft: 12 },
  videoText: { marginLeft: 12, color: '#7c3aed', fontWeight: 'bold' },
  saveBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#7c3aed', borderRadius: 16, padding: 14, marginTop: 18, justifyContent: 'center' },
  saveText: { color: '#fff', fontWeight: 'bold', fontSize: 18, marginLeft: 8 },
});
