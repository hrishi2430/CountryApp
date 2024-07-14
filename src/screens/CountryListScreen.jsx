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
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);


  const modalizeRef = useRef(null);
  const flatListRef = useRef(null);

  const sortingOptions = ["Name Ascending", "Name Descending", "Population Ascending", "Population Descending"];

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const filteredCountries = useMemo(() => {
    return Object.values(countries)?.filter?.((country) =>
      country?.name?.common?.toLowerCase()?.includes?.(search?.toLowerCase())
    );
  }, [countries, search]);

  const handleSortChange = useCallback((sortOption) => {
    if (sortOption) {
      const [criterion, order] = sortOption.toLowerCase().split(' ');
      dispatch(sortCountriesBy({ criterion, order }));
    }
  }, [dispatch]);

  const renderItem = useCallback(({ item }) => (
    <CountryListItem
      item={item}
      onPress={() => navigation.navigate('CountryDetail', { country: item })}
    />
  ), [navigation]);

  const onSortOptionPress = (item) => {
    handleSortChange(item);
    modalizeRef?.current?.close?.();
  };

  const renderContent = ({ item }) => (
    <CustomButton type='transparentButton' buttonStyle={styles.bottomSheetOption} buttonContent={item} textType='defaultText' onPress={() => onSortOptionPress(item)} />
  );
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollTopButton(offsetY > 200);
  };

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
        ref={flatListRef}
        data={filteredCountries}
        keyExtractor={(item) => item.cca3}
        stickyHeaderIndices={[0]}
        renderItem={renderItem}
        initialNumToRender={10}
        windowSize={5}
        onScroll={handleScroll}
        ListHeaderComponent={
          <View style={styles.headerComponentStyle}>
            <SearchInput
              value={search}
              style={styles.setWidth}
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
          ListHeaderComponent: <CustomText type={'boldTitle'} style={styles.bottomSheetTitle}>Sort by</CustomText>,
          ListHeaderComponentStyle: styles.headerStyle,
        }}
        ref={modalizeRef}
        snapPoint={250}
      />
      {showScrollTopButton && (
        <CustomButton buttonStyle={styles.scrollTopButton} onPress={() => flatListRef.current.scrollToOffset({ offset: 0, animated: true })} buttonContent={'Scroll to Top'} />
      )}
    </View>
  );
};

const CountryListItem = React.memo(({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
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
        <CustomText type={'subTitle'} style={styles.setMargin}>Capital: {item.capital ?? 'N/A'}</CustomText>
        <CustomText type={'subTitle'}>Population: {item.population}</CustomText>
      </View>
    </TouchableOpacity>
  );
});

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
    resizeMode: 'stretch',
    overflow: 'hidden',
  },
  shadow: {
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#000000',
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
  scrollTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3f3f3f78',
    padding: 10,
    borderRadius: 50,
  },
  scrollTopButtonText: {
    color: '#fff',
  },
  setMargin: { marginVertical: 4 },
  setWidth: { flex: 0.95 },
});

export default CountryListScreen;
