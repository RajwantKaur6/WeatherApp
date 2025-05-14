import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors } from '../values/colors';

const SearchBar = props => {
    const { query, setQuery } = props;

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search City..."
                placeholderTextColor={colors.white}
                value={query}
                onChangeText={setQuery}
            />
        </View>
    );
}

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        flex: 0.9,
    },
    searchBar: {
        height: 40,
        color: colors.white,
        borderColor: colors.borderColor,
        borderWidth: 1,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
});
