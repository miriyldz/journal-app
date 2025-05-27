import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,} from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  export default function HistoryScreen() {
  const [journals, setJournals] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadData = async () => {
      const data = await AsyncStorage.getItem('journals');
      if (data) setJournals(JSON.parse(data));
    };
    const unsubscribe = navigation.addListener('focus', loadData); // her girişte yenile
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detay', { journal: item })}
      style={styles.item}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>
        {new Date(item.date).toLocaleDateString('tr-TR')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
            Günlük Geçmişi
        </Text>
      <FlatList
        data={journals.reverse()} // son girilen en üstte
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Henüz günlük yok.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20,marginTop: 40 },
  item: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 8,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  date: { fontSize: 14, color: 'gray' },
});