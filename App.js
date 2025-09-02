import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WorkoutDashboard from './WorkoutDashboard';
import WorkoutDetails from './WorkoutDetails';
import WeeklyPlan from './WeeklyPlan';
import CustomWorkout from './CustomWorkout';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WorkoutDashboard" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WorkoutDashboard" component={WorkoutDashboard} />
        <Stack.Screen name="WorkoutDetails" component={WorkoutDetails} />
        <Stack.Screen name="WeeklyPlan" component={WeeklyPlan} />
        <Stack.Screen name="CustomWorkout" component={CustomWorkout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
