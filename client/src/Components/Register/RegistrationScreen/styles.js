import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
       flex: 1
    },
    logo: {
        flex: 1,
        height: 140,
        width: 155,
        alignSelf: "center",
        padding: 50,
        margin:30
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Roboto_300Light',
    },
    footerLink: {
        color: "#AB4E68",
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: 'Roboto_300Light',
    }
})