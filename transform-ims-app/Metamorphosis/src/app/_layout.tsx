import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
        <Text style={styles.brandTitle}>Metamorphosis</Text>
        <Text style={styles.brandSubtitle}>SALON & SPA</Text>
        <ActivityIndicator size="large" color="#3498db" style={styles.spinner} />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
      <Tabs
        tabBarPosition="top"
        screenOptions={{
          headerStyle: { backgroundColor: '#2c3e50' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: '#2c3e50' },
          tabBarActiveTintColor: '#3498db',
          tabBarInactiveTintColor: '#bdc3c7',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            headerTitle: 'TRANSFORM-IMS',
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: 'About Us',
            headerTitle: 'About Us',
          }}
        />
        <Tabs.Screen
          name="contact"
          options={{
            title: 'Contact',
            headerTitle: 'Contact Us',
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            headerTitle: 'Explore',
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  brandSubtitle: {
    fontSize: 14,
    color: '#3498db',
    letterSpacing: 3,
    marginTop: 4,
    fontWeight: '600',
    textAlign: 'center',
  },
  spinner: {
    marginTop: 30,
  },
});