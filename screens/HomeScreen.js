import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
        <Text style={styles.title}>JOURNAL APP</Text>
        <TouchableOpacity style={styles.profile}><MaterialCommunityIcons name="cat" size={24} color="black" /></TouchableOpacity>
      </View>

      <Text style={styles.welcome}>Hoşgeldin!</Text>
      <Text style={styles.date}>{today}</Text>

      <View style={styles.quoteBox}>
        <Text style={styles.quote}>{quote}</Text>
        <Text style={styles.author}>- {author}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Yaz')}>
  <Text style={styles.buttonText}>Yazmaya Başla</Text>
</TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Geçmiş')}>
  <Text style={styles.buttonText}>Geçmiş Günlükleri Görüntüle</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },

  header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center', 
  marginBottom: 20,
  marginTop: 40,
   borderRadius: 50,
  backgroundColor: '#FAF3DD',
  paddingVertical: 20,
  paddingHorizontal: 10,
  },
  title: { fontSize: 30, fontWeight: 'bold', color: '#5E6472' },

  profile: { fontSize: 20, position: 'absolute', paddingEnd:20,
  right: 0, fontSize: 24, },

  welcome: { fontSize: 24 },

  date: { fontSize: 16, color: 'gray', marginBottom: 20 },

  quoteBox: { marginVertical: 20 },

  quote: { fontStyle: 'italic', fontSize: 18 },

  author: { textAlign: 'right', marginTop: 5, fontSize: 14 },  

  button: {backgroundColor: '#87CEEB', 
  borderRadius: 50,
  paddingVertical: 12,
  paddingHorizontal: 24,
  marginVertical: 10, 
  alignItems: 'center',
  width: '80%',
  alignSelf: 'center',},

  buttonText: {
  color: '#d81159',
  fontSize: 16,
  fontWeight: 'bold',
},
});