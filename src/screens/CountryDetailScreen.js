import React from 'react';
import { View, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import CustomText from '../components/CustomText';

const CountryDetailScreen = ({ navigation, route }) => {
  const { country } = route.params;
  
  React.useEffect(() => {
    navigation.setOptions({ title: country.name.common });
  }, [navigation, country.name.common]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <SharedElement id={`item.${country.cca3}.flag`}>
          <View style={styles.shadow}>
            <Image source={{ uri: country.flags.png }} style={styles.flag} />
          </View>
        </SharedElement>
        <View style={styles.content}>
          <CustomText type={'title'}>{country.name.common}</CustomText>
          <CustomText type={'subTitle'} style={{ marginVertical: 4 }}>Capital: {country.capital}</CustomText>
          <CustomText type={'subTitle'}>Population: {country.population}</CustomText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

CountryDetailScreen.sharedElements = (route, otherRoute, showing) => {
  const { country } = route.params;
  return [{ id: `item.${country.cca3}.flag` }];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  flag: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    resizeMode: 'stretch',
    overflow: 'hidden',
  },
  shadow: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  content: {
    padding: 20,
  },
});

export default CountryDetailScreen;
