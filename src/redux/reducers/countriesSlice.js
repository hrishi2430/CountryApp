import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  countries: [],
  loading: false,
  error: null,
  sortBy: null,
};

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data;
  }
);

export const normalizeCountryData = (countries) => {
  const countryMap = {};
  countries.forEach(country => {
    countryMap[country.cca3] = country;
  });
  return countryMap;
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    sortCountriesBy: (state, action) => {
      const { criterion, order } = action.payload;
      state.sortBy = { criterion, order };
    
      // Convert the state.countries map to an array, sort it, then convert it back to a map
      const sortedCountries = Object.entries(state.countries)
        .sort(([keyA, countryA], [keyB, countryB]) => {
          if (criterion === 'population') {
            return order === 'ascending' ? countryA.population - countryB.population : countryB.population - countryA.population;
          } else if (criterion === 'name') {
            return order === 'ascending'
              ? countryA.name.common.localeCompare(countryB.name.common)
              : countryB.name.common.localeCompare(countryA.name.common);
          }
          return 0;
        })
        .reduce((acc, [key, country]) => {
          acc[key] = country;
          return acc;
        }, {});
    
      state.countries = sortedCountries;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = normalizeCountryData(action.payload);
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { sortCountriesBy } = countriesSlice.actions;

export default countriesSlice.reducer;
