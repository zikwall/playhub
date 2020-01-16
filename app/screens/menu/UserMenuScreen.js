import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import { MenuItemLine, Heading, CellView, CellViewSwitch } from '../../components';
import Icon from "react-native-vector-icons/Feather";

const UserMenuScreen = ({ navigation }) => {
    const onMenuPress = (to) => {
        if (to) {
            navigation.navigate(to);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <CellView
                    leftContent={
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <Icon name={'sun'} size={25} />
                            <Text style={{ marginLeft: 25 }} numberOfLines={1} ellipsizeMode="tail">
                                Dark Theme
                            </Text>
                        </View>
                    }
                    rightContent={
                        <CellViewSwitch disabled value={false} />
                    }
                    rightStyle={{ flexDirection: 'column', justifyContent: 'center' }}
                    cellStyles={{
                        height: 60,
                        paddingHorizontal: 10,
                        paddingTop: 7,
                        paddingBottom: 7,
                        paddingLeft: 19,
                    }}
                />
                <Heading icon={'server'} iconColor={'#000'} text={'The main'} color={'#000'} />
                <MenuItemLine onPress={onMenuPress} to={''} icon={'bell'} name={'Notifications'} />
                <MenuItemLine onPress={onMenuPress} to={''} icon={'user-check'} name={'Account'} />
                <MenuItemLine onPress={onMenuPress} to={''} icon={'lock'} name={'Security'} />
                <MenuItemLine onPress={onMenuPress} to={''} icon={'eye'} name={'Privacy settings'} />
                <Heading icon={'database'} iconColor={'#000'} text={'Content'} color={'#000'} />
                <MenuItemLine onPress={onMenuPress} to={''} icon={'film'} name={'Your Videos'} />
                <MenuItemLine onPress={onMenuPress} to={'UserStatisticScreen'} icon={'bar-chart-2'} name={'Your Analytics'} />
                <Heading icon={'terminal'} iconColor={'#000'} text={'Developer Block'} color={'#000'} />
                <MenuItemLine onPress={onMenuPress} to={''} icon={'video'} name={'Debug Video'} />
                <MenuItemLine onPress={onMenuPress} to={''} icon={'edit-3'} name={'Write to developer'} />
                <MenuItemLine onPress={onMenuPress} to={''} icon={'heart'} iconColor={'#DC143C'} name={'Andrey, do you want a PlayHub team?'} />
            </ScrollView>
        </View>
    )
};

export default UserMenuScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});
