import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { NativeBaseProvider, Actionsheet, useDisclose } from 'native-base';

const countries = [
  { name: 'Albania', latitude: 41.1533, longitude: 20.1683, link: 'https://www.tripadvisor.com/Attractions-g294445-Activities-Albania.html', image: require('./assets/Albania.png'), color: '#808000' },
  { name: 'Bosnia & Herz.', latitude: 43.9159, longitude: 17.6791, link: 'https://www.tripadvisor.com/Attractions-g294449-Activities-Bosnia_and_Herzegovina.html', image: require('./assets/BosniaAndHerzegovina.png'), color: '#C70039' },
  { name: 'Bulgaria', latitude: 42.7339, longitude: 25.4858, link: 'https://www.tripadvisor.com/Attractions-g294451-Activities-Bulgaria.html', image: require('./assets/Bulgaria.png'), color: '#900C3F' },
  { name: 'Croatia', latitude: 45.1, longitude: 15.2, link: 'https://www.tripadvisor.com/Attractions-g294453-Activities-Croatia.html', image: require('./assets/Croatia.png'), color: '#581845' },
  { name: 'Greece', latitude: 39.0742, longitude: 21.8243, link: 'https://www.tripadvisor.com/Attractions-g189398-Activities-Greece.html', image: require('./assets/Greece.png'), color: '#1ABC9C' },
  { name: 'Kosovo', latitude: 42.6026, longitude: 20.9030, link: 'https://www.tripadvisor.com/Attractions-g304082-Activities-Kosovo.html', image: require('./assets/Kosovo.png'), color: '#2ECC71' },
  { name: 'Montenegro', latitude: 42.7087, longitude: 19.3744, link: 'https://www.tripadvisor.com/Attractions-g635648-Activities-Montenegro.html', image: require('./assets/Montenegro.png'), color: '#3498DB' },
  { name: 'Moldova', latitude: 47.4116, longitude: 28.3699, link: 'https://www.tripadvisor.com/Attractions-g294455-Activities-Moldova.html', image: require('./assets/Moldova.png'), color: '#9B59B6' },
  { name: 'N. Macedonia', latitude: 41.6086, longitude: 21.7453, link: 'https://www.tripadvisor.com/Attractions-g295109-Activities-Republic_of_North_Macedonia.html', image: require('./assets/NorthMacedonia.png'), color: '#34495E' },
  { name: 'Romania', latitude: 45.9432, longitude: 24.9668, link: 'https://www.tripadvisor.com/Attractions-g294457-Activities-Romania.html', image: require('./assets/Romania.png'), color: '#16A085' },
  { name: 'Serbia', latitude: 44.0165, longitude: 21.0059, link: 'https://www.tripadvisor.com/Attractions-g294471-Activities-Serbia.html', image: require('./assets/Serbia.png'), color: '#27AE60' },
  { name: 'Slovenia', latitude: 46.1512, longitude: 14.9955, link: 'https://www.tripadvisor.com/Attractions-g274862-Activities-Slovenia.html', image: require('./assets/Slovenia.png'), color: '#2980B9' },
  { name: 'Turkey', latitude: 38.9637, longitude: 35.2433, link: 'https://www.tripadvisor.com/Attractions-g293969-Activities-Turkiye.html', image: require('./assets/Turkey.png'), color: '#8E44AD' },
];

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [selectedCountry, setSelectedCountry] = useState(null);

  const scaleValues = useRef(countries.map(() => new Animated.Value(1))).current;

  const showOptions = (country) => {
    setSelectedCountry(country);
    onOpen();
  };

  const showLocation = () => {
    setSelectedLocation({
      latitude: selectedCountry.latitude,
      longitude: selectedCountry.longitude,
      name: selectedCountry.name,
    });
    onClose();
  };

  const openLink = (url) => {
    Linking.openURL(url);
    onClose();
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Balkan Express</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent} horizontal>
          {countries.map((country, index) => {
            const scaleValue = scaleValues[index];

            const handlePressIn = () => {
              Animated.spring(scaleValue, {
                toValue: 0.95,
                useNativeDriver: true,
              }).start();
            };

            const handlePressOut = () => {
              Animated.spring(scaleValue, {
                toValue: 1,
                useNativeDriver: true,
              }).start();
            };

            return (
              <TouchableWithoutFeedback
                key={index}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={() => showOptions(country)}
              >
                <Animated.View style={[styles.item, { backgroundColor: country.color, transform: [{ scale: scaleValue }] }]}>
                  <Image source={country.image} style={styles.itemImage} />
                  <Text style={styles.itemText}>{country.name}</Text>
                </Animated.View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
        {selectedLocation && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
              latitudeDelta: 5,
              longitudeDelta: 5,
            }}
            region={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
              latitudeDelta: 5,
              longitudeDelta: 5,
            }}
          >
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
              title={selectedLocation.name}
            />
          </MapView>
        )}
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Actionsheet.Item onPress={showLocation}>View on Map</Actionsheet.Item>
            <Actionsheet.Item onPress={() => openLink(selectedCountry.link)}>Things to Do (TripAdvisor)</Actionsheet.Item>
            <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 4,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 50,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingTop: 24,
    flexDirection: 'row',
  },
  item: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    alignItems: 'center',
    width: 120,
  },
  itemImage: {
    width: 100,
    height: 60,
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: 300,
    marginTop: 24,
  },
});
