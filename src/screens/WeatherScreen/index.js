import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWeather, searchCity } from '../../redux/slices/weatherSlice';
import SearchBar from '../../components/SearchBar';
import styles from './styles';
import WeatherCard from '../../components/WeatherCard';
import { colors } from '../../values/colors';

const WeatherScreen = () => {

  const dispatch = useDispatch();
  const { data, status, error, searchResults } = useSelector((state) => state.weather);

  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [showWeather, setShowWeather] = useState(false);

  useEffect(() => {
    const loadLastCity = async () => {
      try {
        const storedCity = await AsyncStorage.getItem('lastCity');
        if (storedCity) {
          const city = JSON.parse(storedCity);
          setQuery(`${city.name}, ${city.country}`);
          setSelectedCity(city);
          dispatch(fetchWeather(city.name));
          setShowWeather(true);
        }
      } catch (err) {
        console.error('Failed to load last city:', err);
      }
    };

    loadLastCity();
  }, []);

  useEffect(() => {
    if (query.length > 2 && !selectedCity) {
      dispatch(searchCity(query));
    }
  }, [query]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setQuery(`${city.name}, ${city.country}`);
    setShowWeather(false);
  };

  const handleFetchWeather = async () => {
    if (selectedCity) {
      dispatch(fetchWeather(selectedCity.name));
      setShowWeather(true);

      try {
        await AsyncStorage.setItem('lastCity', JSON.stringify(selectedCity));
      } catch (err) {
        console.error('Error saving last city:', err);
      }
    }
  };

  const handleInputChange = (text) => {
    setQuery(text);
    setSelectedCity(null);
    setShowWeather(false);
  };

  if (status === 'failed') {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'City not found!'
    });
  }

  return (
    <View style={styles.container}>

      {status === 'loading' && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      )}
      <View style={styles.topContainer}>
        <SearchBar
          query={query}
          setQuery={handleInputChange}
        />

        <TouchableOpacity testID="search-button" style={styles.button} onPress={handleFetchWeather}>
          <Icon name="search" size={22} color={colors.primary} />
        </TouchableOpacity>

      </View>

      {!selectedCity && query.length > 2 && searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCitySelect(item)} style={styles.result}>
              <Text>{item.name}, {item.country}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      {showWeather && data && (
        <WeatherCard
          temp={data.main.temp}
          min={data.main.temp_min}
          max={data.main.temp_max}
          city={data.name}
          country={data.sys.country}
          weather={data.weather[0].description}
          icon={data.weather[0].icon} />

      )}

    </View>
  );
};

export default WeatherScreen;

