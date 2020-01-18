import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const PlayHubRecommendedScreen = () => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <View style={[styles.container, { backgroundColor: theme.primaryBackgroundColor }]}>
            <View style={{ alignItems: 'center' }}>
                <Image style={{ resizeMode: 'contain', height: 250, width: 250 }} source={ theme.playHubFull }/>
            </View>

            <Text style={{ textAlign:"center", color:"#000" }}>Coming Soon...</Text>
        </View>
    );
};

export default PlayHubRecommendedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15,
        justifyContent: "center",
    },
});
