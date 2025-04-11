import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/appNavigator';
import { ThemeProvider } from './src/ThemeContext'; 

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
