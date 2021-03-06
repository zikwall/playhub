import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingLeft: 15,
        flexDirection: 'row'
        //alignItems: 'center',
        //borderBottomColor: '#f0f1f4',
        //borderBottomWidth: 1
    },
    avatarWrapper: {
        //marginVertical: 20,
        //marginBottom: 10,
        justifyContent: 'center',
        //alignItems: 'center'
    },
    displayNameWapper: {
        // flex: 1,
        //paddingHorizontal: 30,
        alignItems: 'center',
        //justifyContent: 'center',
        marginBottom: 15,
    },
    displayName: {
        //textAlign: 'center',
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold'
    },
    username: {
        fontSize: 18
    },
    bold: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default styles
