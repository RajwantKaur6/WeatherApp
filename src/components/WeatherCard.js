import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Constants } from '../values/constants';
import { colors } from '../values/colors';

const WeatherCard = props => {

    const { temp, min, max, city, country, weather, icon } = props;

    return (
        <LinearGradient
            colors={[colors.shadePrimary, colors.shadeAccent]}
            style={styles.card}
        >
            <View style={styles.leftSection}>
                <Text style={styles.temp}>{temp}°</Text>
                <Text style={styles.range}>H:{max}°  L:{min}°</Text>
                <Text style={styles.location}>{city}, {country}</Text>
            </View>

            <View style={styles.rightSection}>
                <Image
                    source={{ uri: Constants.ImageUrl + icon + '@2x.png' }}
                    style={styles.weatherIcon}
                />
                <Text style={styles.weatherText}>{weather}</Text>
            </View>
        </LinearGradient>
    );
};

export default WeatherCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 4,
        ...(Platform.OS === 'android' ? {
            padding: 20,
            margin: 16,
        } : {
            paddingHorizontal: 20,
            paddingVertical: 10,
            margin: 12,
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            minHeight: '25%',
            width: '100%',
            alignSelf: 'center',
        }),
    },
    leftSection: {
        flex: 1,
    },
    temp: {
        fontSize: 40,
        color: colors.white,
        fontWeight: 'bold',
    },
    range: {
        color: colors.accentText,
        fontSize: 14,
        marginTop: 4,
    },
    location: {
        color: colors.white,
        fontSize: 16,
        marginTop: 8,
    },
    rightSection: {
        ...Platform.OS === 'ios' && {
            flex: 1,
        },
        alignItems: 'center',
    },
    weatherIcon: {
        width: 60,
        height: 60,
        marginBottom: 8,
    },
    weatherText: {
        color: colors.white,
        fontSize: 14,
    },
});