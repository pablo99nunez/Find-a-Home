import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LandingButton } from '../Buttons/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/authentication';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../../Redux/Actions';


const LandingPage = ({ navigation }) => {

    const [logeado, setLogeado] = useState('');
    const dispatch = useDispatch()

    onAuthStateChanged(auth, (user) => {
        if (user) {
          user.getIdToken().then(async (tkn) => {
            await AsyncStorage.setItem(
              "authorization",
              "Bearer " + auth.currentUser.stsTokenManager.accessToken
            );
            dispatch(setIsLoggedIn(true));
            console.log("authorization", "Bearer " + tkn);
          });
        } else {
          AsyncStorage.clear();
          dispatch(setIsLoggedIn(false));
        }
      });

    useFocusEffect(
        React.useCallback(() => {
            async function evitaReturnDelUseEffect() {
                const tokenLocalStorage = await AsyncStorage.getItem('authorization')
                if (tokenLocalStorage)
                setLogeado(tokenLocalStorage)
                else
                setLogeado(false)
            }
            evitaReturnDelUseEffect() //porq saltaba un warning, pedia autonvocarla adentro
          
        }, [])
      );

    return (
        <View style={styles.container}>
            {logeado ?
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