import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, Image, SafeAreaView, FlatList, Linking, Alert } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useSelector } from 'react-redux';
import CustomText from '../components/CustomText';
import HeadingWithSubheading from '../components/HeadingWithSubheading';
import MapIcon from '../../assets/SVG_JSX/MapIcon';
import AddToFavorite from '../../assets/SVG_JSX/AddToFavorite';
import CustomButton from '../components/CustomButton';

const CountryDetailScreen = ({ navigation, route }) => {
  const { country } = route.params ?? {};
  const { countries } = useSelector((state) => state.countries);


  React.useEffect(() => {
    navigation.setOptions({ title: country?.name?.common });
  }, [navigation, country?.name?.common]);

  const getBorderCountryNames = (borders, countryMap) => {
    if (!borders || !countryMap) return [];
    return borders?.map(code => countryMap[code]?.name?.common || code);
  };

  const borderCountryNames = useMemo(() => {
    return getBorderCountryNames(country?.borders, countries);
  }, [country?.borders, countries]);

  const currency = useMemo(() => {
    let currencyKey = country?.currencies && Object.keys(country?.currencies)?.[0];
    const symbol = currencyKey && country?.currencies?.[currencyKey]?.[0]?.symbol;
    return `${currencyKey}${symbol ? `, ${symbol}` : ''}`;
  }, [country?.currencies]);

  const countryDetails = useMemo(() => {
    return [
      { id: 0, heading: 'Capital', subHeading: country?.capital?.[0] || 'N/A' },
      { id: 1, heading: 'Currency', subHeading: currency },
      { id: 2, heading: 'Language/s', subHeading: country?.languages ? Object.values(country.languages).join(', ') : 'N/A' },
      { id: 3, heading: 'Area', subHeading: country?.area || 'N/A' },
      { id: 4, heading: 'Population', subHeading: country?.population},
      { id: 5, heading: 'Timezone', subHeading: country?.timezones ? country.timezones.join(', ') : 'N/A' },
      { id: 6, heading: 'Continent', subHeading: country?.region || 'N/A' },
      { id: 7, heading: 'Shared Borders with', subHeading: borderCountryNames.join(', ') || 'None' }
    ];
  }, [country, currency, borderCountryNames]);

  const renderContent = useCallback(({ item }) => (
    <HeadingWithSubheading {...item} />
  ), [])
  const openMap = useCallback(() => {
    Linking.openURL(country?.maps?.['googleMaps']).catch(err => console.error('An error occurred', err));
  }, [country.maps]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        style={styles.container}
        data={countryDetails}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator
        renderItem={renderContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <CustomText type={'title'} style={styles.setMargin}>{'Flag of ' + country.name.common}</CustomText>
            <SharedElement id={`item.${country.cca3}.flag`}>
              <View style={styles.shadow}>
                <Image source={{ uri: country.flags.png }} style={styles.flag} />
              </View>
            </SharedElement>
          </View>
        }
      />
      <View style={styles.buttonContainer}>
        <CustomButton buttonStyle={styles.setPadding} buttonContent={<MapIcon />} onPress={openMap} />
        <CustomButton buttonStyle={styles.setPadding} buttonContent={<AddToFavorite />} onPress={() => Alert.alert('Add to favorite', 'Coming soon!!')} />
      </View>
    </SafeAreaView >
  );
};

CountryDetailScreen.sharedElements = (route, otherRoute, showing) => {
  const { country } = route.params;
  return [{ id: `item.${country.cca3}.flag` }];
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  header: { paddingVertical: 10 },
  setPadding: { padding: 2 },
  buttonContainer: { position: 'absolute', bottom: 40, right: 20, gap: 5 },
  setMargin: { marginVertical: 8 },
});

export default CountryDetailScreen;
