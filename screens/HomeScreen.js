import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function HomeScreen() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const navigation = useNavigation();

  // Motivasyon sözü al
  useEffect(() => {
  fetch('https://zenquotes.io/api/random')
    .then((res) => res.json())
    .then((data) => {
      setQuote(data[0].q);
      setAuthor(data[0].a);
    })
    .catch((err) => {
      setQuote('Söz alınamadı.');
      setAuthor('');
      console.error(err);
    });
}, []);


  // Tarihi hazırla
  const today = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Journal App</Text>
        <Text style={styles.profile}>👤</Text>
      </View>

      <Text style={styles.welcome}>Hoşgeldin!</Text>
      <Text style={styles.date}>{today}</Text>

      <View style={styles.quoteBox}>
        <Text style={styles.quote}>{quote}</Text>
        <Text style={styles.author}>- {author}</Text>
      </View>

      <Button
        title="Yazmaya Başla"
        onPress={() => navigation.navigate('Yaz')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 40,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  profile: { fontSize: 20 },
  welcome: { fontSize: 24 },
  date: { fontSize: 16, color: 'gray', marginBottom: 20 },
  quoteBox: { marginVertical: 20 },
  quote: { fontStyle: 'italic', fontSize: 18 },
  author: { textAlign: 'right', marginTop: 5, fontSize: 14 },
});