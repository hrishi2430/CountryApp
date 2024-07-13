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

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    sortCountriesBy: (state, action) => {
      const { criterion, order } = action.payload;
      state.sortBy = { criterion, order };
      state.countries.sort((a, b) => {
        if (criterion === 'population') {
          return order === 'ascending' ? a.population - b.population : b.population - a.population;
        } else if (criterion === 'name') {
          return order === 'ascending'
            ? a.name.common.localeCompare(b.name.common)
            : b.name.common.localeCompare(a.name.common);
        }
        return 0;
      });
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
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { sortCountriesBy } = countriesSlice.actions;

export default countriesSlice.reducer;
