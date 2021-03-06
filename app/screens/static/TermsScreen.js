import React from 'react';
import { View, Text } from 'react-native';
import { iOSUIKit } from "react-native-typography";

import viewStyles from './styles';
import WebView from 'react-native-webview';

const TermsScreen = () => {
    return (
        <View style={viewStyles.screenContainer}>
            <View style={viewStyles.header}>
                <View>
                    <Text style={viewStyles.date}>ИНФОРМАЦИЯ</Text>
                    <Text style={iOSUIKit.largeTitleEmphasized}>Условия использования</Text>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <WebView source={{ uri: 'http://tv.zikwall.ru/vktv/static/terms' }} />
            </View>
        </View>
    );
};

export default TermsScreen;

