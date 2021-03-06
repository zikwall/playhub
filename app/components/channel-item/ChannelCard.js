import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeValidator } from '../../utils';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { human } from 'react-native-typography';

const ChannelCard = ({ name, id, image, onSelectHandle }) => {
    const theme = useSelector(state => getAppTheme(state));
    const ifImage = SafeValidator.isTrustImage(image) ? { uri: image } : theme.channelPlaceholder;

    return (
        <View style={[styles.itemContainer, { borderColor: theme.primaryColor }]}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                onSelectHandle(id);
            }} >
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Image
                        style={{
                            flex: 1,
                            resizeMode: 'contain',
                            width: "55%",
                            flexDirection: 'column',
                        }}
                        source={ ifImage }
                    />
                </View>
                <Text style={ [human.footnote, styles.itemName, { color: theme.primaryColor, paddingBottom: 5 }] }>{ name }</Text>
                <Text style={ [human.caption2, styles.itemCode, { color: theme.primaryColor }] }>{ id }</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChannelCard;

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
        borderColor: '#000',
        borderWidth: 1,
    },
    itemName: {
        //fontSize: 16,
        color: '#000',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        //fontSize: 12,
        color: '#000',
    },
});
