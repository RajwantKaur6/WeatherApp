import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import WeatherScreen from '../src/screens/WeatherScreen';

const mockStore = configureStore([thunk]);

describe('WeatherScreen', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            weather: {
                data: {
                    name: 'Delhi',
                    main: { temp: 38.5, temp_min: 30, temp_max: 40 },
                    sys: { country: 'IN' },
                    weather: [{ description: 'Sunny', icon: '01d' }],
                },
                status: 'succeeded',
                error: null,
                searchResults: [],
            },
        });
    });

    it('renders temperature when weather data is present', () => {
        const { getByText } = render(
            <Provider store={store}>
                <WeatherScreen />
            </Provider>
        );

        expect(getByText('Delhi')).toBeTruthy();
        expect(getByText(/38.5°/)).toBeTruthy();
    });

    it('fires search button press', async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <WeatherScreen />
            </Provider>
        );

        const searchButton = getByTestId('search-button');
        fireEvent.press(searchButton);

        await waitFor(() => {
            const actions = store.getActions();
            expect(actions.some(a => a.type.includes('fetchWeather'))).toBeTruthy();
        });
    });
});
