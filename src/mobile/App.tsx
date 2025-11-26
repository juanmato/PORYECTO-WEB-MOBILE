// IMPORTANT: Must be imported first to polyfill crypto for uuid
import 'react-native-get-random-values';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { AppNavigator } from './navigation/AppNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AuthProvider>
        <DataProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </DataProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
