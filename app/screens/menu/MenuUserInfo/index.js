import PropTypes from 'prop-types';
import React from 'react';
import {View, Text} from 'react-native';
import Button from '../../../components/button';
import {Avatar} from '../../../components/avatar';
import SearchField from '../SearchField';
import Icon from 'react-native-vector-icons/Feather';
import s from './styles';

const MenuUserInfo = ({ username, displayName, avatarUrlMedium, onSearchPress, onSettingsPress }) => {
    return (
        <View style={[s.container, { backgroundColor: 'white', borderBottomColor: 'red' }]}>
            <View style={s.topContainer}>
                <Avatar src={avatarUrlMedium} />

                <View style={s.info}>
                    <Text style={[s.displayName, { color: '#000' }]}>{displayName}</Text>
                    <Text style={[s.username, { color: '#000' }]}>@{username}</Text>
                </View>

                <Button
                    onPress={onSettingsPress}
                    background="SelectableBackgroundBorderless"
                    style={s.buttonStyle}>
                    <Icon name="settings" size={30} color="#000" />
                </Button>
            </View>

            <SearchField onPress={() => onSearchPress()} />
        </View>
    );
};

MenuUserInfo.defaultProps = {
    onSearchPress: () => {},
    onSettingsPress: () => {}
};

MenuUserInfo.propTypes = {
    username: PropTypes.string,
    displayName: PropTypes.string,
    onSearchPress: PropTypes.func,
    onSettingsPress: PropTypes.func
};

export default MenuUserInfo;