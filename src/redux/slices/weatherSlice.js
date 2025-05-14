import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { WEATHER_API_KEY } from '@env';

const BASE_URL = 'https://api.openweathermap.org/';

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (city) => {
        const response = await axios.get(
            BASE_URL + `/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
        );
        return response.data;
    }
);

export const searchCity = createAsyncThunk(
    'weather/searchCity',
    async (query) => {
        const response = await axios.get(
            BASE_URL + `/geo/1.0/direct?q=${query}&limit=5&appid=${WEATHER_API_KEY}`
        );
        return response.data;
    }
);


const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        data: null,
        status: 'idle',
        error: null,
        searchResults: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchCity.fulfilled, (state, action) => {
                state.searchResults = action.payload;
            })
            .addCase(fetchWeather.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default weatherSlice.reducer;
