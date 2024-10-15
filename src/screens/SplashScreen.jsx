import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loading...</Text>
      <ActivityIndicator size="large" color="#fffff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f4f7',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000',
  },
});

export default SplashScreen;
