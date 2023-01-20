import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LandingButton } from '../Buttons/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LandingPage = ({ navigation }) => {
    const [user, setUser] = useState({})
    const [authorizedUser, setAuthorizedUser] = useState('');

    //carga datos del local StorAsh
    useEffect(() => {
        async function evitaReturnDelUseEffect() {
            const tokenLocalStorage = await AsyncStorage.getItem('@accessToken')
            if (tokenLocalStorage)
                setAuthorizedUser(tokenLocalStorage)
            else
                setAuthorizedUser('')

            const userData = await AsyncStorage.getItem('user')
            if (userData)
                setUser(userData)
            else
                setUser({})
        }
        evitaReturnDelUseEffect() //porq saltaba un warning, pedia autonvocarla adentro
    }, [])

    return (
        <View style={styles.container}>
            {!Object.keys(user).length ?
                <LandingButton onPress={() => navigation.navigate('Welcome')} />
                :
                <LandingButton onPress={() => navigation.navigate('Home')} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3A302E',
    },
})
export default LandingPage;