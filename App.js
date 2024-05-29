import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

const countries = [
  { name: 'Albania', latitude: 41.1533, longitude: 20.1683 },
  { name: 'Bosnia and Herzegovina', latitude: 43.9159, longitude: 17.6791 },
  { name: 'Bulgaria', latitude: 42.7339, longitude: 25.4858 },
  { name: 'Croatia', latitude: 45.1, longitude: 15.2 },
  { name: 'Greece', latitude: 39.0742, longitude: 21.8243 },
  { name: 'Kosovo', latitude: 42.6026, longitude: 20.9030 },
  { name: 'Montenegro', latitude: 42.7087, longitude: 19.3744 },
  { name: 'Moldova', latitude: 47.4116, longitude: 28.3699 },
  { name: 'North Macedonia', latitude: 41.6086, longitude: 21.7453 },
  { name: 'Romania', latitude: 45.9432, longitude: 24.9668 },
  { name: 'Serbia', latitude: 44.0165, longitude: 21.0059 },
  { name: 'Slovenia', latitude: 46.1512, longitude: 14.9955 },
  { name: 'Turkey', latitude: 38.9637, longitude: 35.2433 },
];

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const showLocation = (country) => {
    setSelectedLocation({
      latitude: country.latitude,
      longitude: country.longitude,
      name: country.name,
    });
    Alert.alert(`${country.name}`, `Latitude: ${country.latitude}, Longitude: ${country.longitude}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Balkan Express</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {countries.map((country, index) => (
          <TouchableOpacity key={index} style={styles.item} onPress={() => showLocation(country)}>
            <Text style={styles.itemText}>{country.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedLocation && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>Selected Location:</Text>
          <Text style={styles.locationText}>{selectedLocation.name}</Text>
          <Text style={styles.locationText}>Latitude: {selectedLocation.latitude}</Text>
          <Text style={styles.locationText}>Longitude: {selectedLocation.longitude}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    color: '#fff',
  },
  locationContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  locationText: {
    fontSize: 18,
    marginTop: 8,
  },
});