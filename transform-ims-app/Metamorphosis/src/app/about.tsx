import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function About() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Enterprise Information Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Metamorphosis Salon & Spa</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>San Miguel, Nabua</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Established Since:</Text>
          <Text style={styles.value}>[Insert Year, e.g., 2021]</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Owner:</Text>
          <Text style={styles.value}>[Insert Owner Name]</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7f8c8d',
    width: 140,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
});