import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (!name || !email || !message) {
      Alert.alert('Validation Error', 'Please complete all fields before sending.');
      return;
    }

    Alert.alert('Message Sent!', 'Thank you for reaching out to NextGenTech Team.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact NextGenTech Team</Text>
          <Text style={styles.subtitle}>
            Send an inquiry or system feedback regarding TRANSFORM-IMS.
          </Text>

          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Full Name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="your.email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.inputLabel}>Message</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write your inquiry or feedback here..."
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f9' },
  content: { padding: 16 },
  card: { backgroundColor: '#ffffff', padding: 16, borderRadius: 8, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50', marginBottom: 6 },
  subtitle: { fontSize: 13, color: '#7f8c8d', marginBottom: 16 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: '#2c3e50', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#cccccc', borderRadius: 6, padding: 10, marginBottom: 12, fontSize: 14 },
  textArea: { height: 100 },
  button: { backgroundColor: '#2c3e50', padding: 12, borderRadius: 6, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
});