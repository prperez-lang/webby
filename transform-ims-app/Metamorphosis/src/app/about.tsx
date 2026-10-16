import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';

export default function AboutScreen() {
  const teamMembers = [
    '1. Jasper Peñaflor',
    '2. Aleja Nicole Tañag',
    '3. Sweetjane Talagtag',
    '4. Princess Rose Perez',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Project Overview</Text>
          <Text style={styles.label}>
            Project Title: <Text style={styles.value}>TRANSFORM-IMS</Text>
          </Text>
          <Text style={styles.label}>
            Target Enterprise: <Text style={styles.value}>Metamorphosis Salon & Spa</Text>
          </Text>
          <Text style={styles.label}>
            Location: <Text style={styles.value}>San Miguel, Nabua</Text>
          </Text>
          <Text style={styles.label}>
            Course: <Text style={styles.value}>Information Management 1 (CCIT-105)</Text>
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>NextGenTech Research Team</Text>
          {teamMembers.map((member, index) => (
            <View key={index} style={styles.memberRow}>
              <Text style={styles.memberText}>{member}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f9' },
  content: { padding: 16 },
  card: { backgroundColor: '#ffffff', padding: 16, borderRadius: 8, marginBottom: 16, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#f4f6f9', paddingBottom: 6 },
  label: { fontSize: 14, color: '#7f8c8d', marginBottom: 8 },
  value: { fontWeight: 'bold', color: '#2c3e50' },
  memberRow: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eeeeee' },
  memberText: { fontSize: 15, fontWeight: '600', color: '#2c3e50' },
});