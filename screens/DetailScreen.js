import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function DetailScreen({ route }) {
  const { journal } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{journal.title}</Text>
      <Text style={styles.date}>
        {new Date(journal.date).toLocaleDateString('tr-TR')}
      </Text>
      <Text style={styles.content}>{journal.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  date: { fontSize: 14, color: 'gray', marginBottom: 20 },
  content: { fontSize: 16 },
});
