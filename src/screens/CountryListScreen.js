import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Modalize } from 'react-native-modalize';
import { SharedElement } from 'react-navigation-shared-element';
import SearchInput from '../components/SearchInput';
import { fetchCountries, sortCountriesBy } from '../redux/reducers/countriesSlice';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import ErrorView from '../components/ErrorView';

const CountryListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { countries, loading, error } = useSelector((state) => state.countries);
  const [search, setSearch] = useState('');

  const modalizeRef = useRef(null);
  const sortingOptions = ["Name Ascending", "Name Descending", "Population Ascending", "Population Descending"];

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) =>
      country?.name?.common?.toLowerCase()?.includes?.(search?.toLowerCase())
    );
  }, [countries, search]);

  const handleSortChange = useCallback((sortOption) => {
    if (sortOption) {
      const [criterion, order] = sortOption.toLowerCase().split(' ');
      dispatch(sortCountriesBy({ criterion, order }));
    }
  }, [dispatch]);

  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('CountryDetail', { country: item })}
      >
        <SharedElement id={`item.${item.cca3}.flag`}>
          <View style={styles.shadow}>
            {item.flags && item.flags.png && (
              <Image source={{ uri: item.flags.png }} style={styles.flag} />
            )}
          </View>
        </SharedElement>
        <View style={styles.info}>
          <CustomText type={'title'}>{item.name.common}</CustomText>
          <CustomText type={'subTitle'} style={{ marginVertical: 4 }}>Capital: {item.capital}</CustomText>
          <CustomText type={'subTitle'}>Population: {item.population}</CustomText>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const onSortOptionPress = (item) => {
    handleSortChange(item);
    modalizeRef?.current?.close?.();
  };

  const renderContent = ({ item }) => (
    <CustomButton type='transparentButton' buttonStyle={styles.bottomSheetOption} buttonContent={item} textType='defaultText' onPress={() => onSortOptionPress(item)} />
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Image style={styles.globeStyle} source={require('../../assets/images/globe.gif')} />
      </View>
    );
  }
  if (error) {
    return <ErrorView errorMessage={error} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredCountries}
        keyExtractor={(item) => item.cca3}
        stickyHeaderIndices={[0]}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.headerComponentStyle}>
            <SearchInput
              value={search}
              style={{ flex: 0.95 }}
              onChangeText={setSearch}
              placeholder="Search for a country..."
            />
            <CustomButton buttonContent="Sort by" onPress={() => modalizeRef.current.open()} />
          </View>
        }
      />
      <Modalize
        flatListProps={{
          data: sortingOptions,
          style: styles.bottomSheet,
          keyExtractor: (item, index) => `${item} ${index}`,
          renderItem: renderContent,
          ListHeaderComponent: <Text style={styles.bottomSheetTitle}>Sort by</Text>,
          ListHeaderComponentStyle: styles.headerStyle,
        }}
        ref={modalizeRef}
        snapPoint={250}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFF'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.25,
    borderBottomColor: '#ccc',
  },
  flag: {
    width: 60,
    height: 50,
    borderRadius: 6,
    resizeMode:'stretch',
    overflow: 'hidden',
  },
  shadow: {
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: 'white',
    padding: 20,
    height: 250,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  headerStyle: {
    borderBottomWidth: 0.25,
    borderBottomColor: '#ccc',
  },
  bottomSheetOption: {
    paddingVertical: 10,
    paddingHorizontal: 0
  },
  globeStyle: { borderRadius: 6, height: 160, width: 200 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerComponentStyle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});

export default CountryListScreen;
