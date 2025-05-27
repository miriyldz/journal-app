import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function WriteScreen() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSave = async () => {
    if (!title.trim() || !text.trim()) {
      Alert.alert('Uyarı', 'Lütfen başlık ve içerik gir.');
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      title,
      text,
      date: new Date().toISOString(),
    };

    try {
      const existing = await AsyncStorage.getItem('journals');
      const journals = existing ? JSON.parse(existing) : [];
      journals.push(newEntry);
      await AsyncStorage.setItem('journals', JSON.stringify(journals));
      setTitle('');
      setText('');
      Alert.alert('Başarılı', 'Günlük kaydedildi!');
    } catch (error) {
      Alert.alert('Hata', 'Günlük kaydedilemedi.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="BAŞLIK"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Bugün neler oldu?"
        multiline
        numberOfLines={10}
        value={text}
        onChangeText={setText}
      />
      <Button title="Kaydet" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  titleInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 5,
    marginTop: 20,
  },
  textInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 200,
    textAlignVertical: 'top',
    marginBottom: 20,
    padding: 10,
  },
});
