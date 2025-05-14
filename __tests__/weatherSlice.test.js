import reducer, { fetchWeather, searchCity } from '../src/redux/slices/weatherSlice';

describe('weatherSlice reducer', () => {
    const initialState = {
        data: null,
        status: 'idle',
        error: null,
        searchResults: [],
    };

    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle fetchWeather.pending', () => {
        const action = { type: fetchWeather.pending.type };
        const state = reducer(initialState, action);
        expect(state.status).toBe('loading');
    });

    it('should handle fetchWeather.fulfilled', () => {
        const mockData = { name: 'Delhi', main: { temp: 30 }, sys: { country: 'IN' } };
        const action = { type: fetchWeather.fulfilled.type, payload: mockData };
        const state = reducer(initialState, action);
        expect(state.status).toBe('succeeded');
        expect(state.data).toEqual(mockData);
    });

    it('should handle fetchWeather.rejected', () => {
        const action = { type: fetchWeather.rejected.type, error: { message: 'Error fetching' } };
        const state = reducer(initialState, action);
        expect(state.status).toBe('failed');
        expect(state.error).toBe('Error fetching');
    });

    it('should handle searchCity.fulfilled', () => {
        const mockResults = [{ name: 'London', country: 'GB' }];
        const action = { type: searchCity.fulfilled.type, payload: mockResults };
        const state = reducer(initialState, action);
        expect(state.searchResults).toEqual(mockResults);
    });
});
