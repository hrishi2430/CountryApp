import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import CustomText from '../components/CustomText';


const CountryDetailScreen = ({ route }) => {
  const { country } = route.params;

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>{country.name.common}</CustomText>
      {country.flags && (
        <Image source={{ uri: country.flags.png }} style={styles.flag} />
      )}
      <CustomText>Population: {country.population}</CustomText>
      <CustomText>Region: {country.region}</CustomText>
      <CustomText>Capital: {country.capital}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flag: {
    width: 100,
    height: 60,
    marginBottom: 10,
  },
});

export default CountryDetailScreen;
