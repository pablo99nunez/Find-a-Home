import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LandingButton } from '../Buttons/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const LandingPage = ({ navigation }) => {
    const [user, setUser] = useState({})
    const [authorizedUser, setAuthorizedUser] = useState('');

    //carga datos del local StorAsh
    //useEffect(() => {
       
    //}, [])

    useFocusEffect(
        React.useCallback(() => {
            async function evitaReturnDelUseEffect() {
                const tokenLocalStorage = await AsyncStorage.getItem('@accessToken')
                if (tokenLocalStorage)
                    setAuthorizedUser(tokenLocalStorage)
                else
                    setAuthorizedUser(false)
    
                const userData = await AsyncStorage.getItem('user')
                if (userData)
                    setUser(userData)
                else
                    setUser(false)
            }
            evitaReturnDelUseEffect() //porq saltaba un warning, pedia autonvocarla adentro
          
        }, [])
      );

    return (
        <View style={styles.container}>
            {user ?
                <LandingButton onPress={() => navigation.navigate('Home')} />
                :
                <LandingButton onPress={() => navigation.navigate('Welcome')} />
            }
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