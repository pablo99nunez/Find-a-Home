import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

//firebase linea 1
import firebase from '../../firebase/config'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
//local storage
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    //firebase linea 2 (todo el bloque {... })
    const auth = getAuth(firebase);

    onAuthStateChanged(auth, user => {
        // Check for user status
    });
    //"stsTokenManager": {"accessToken": "..

    //firebase linea 3
    const onLoginPress = () => {
        signInWithEmailAndPassword(auth, email, password).then((resp) => {
            if (resp.user) {
                resp.user.getIdToken().then(async (tkn) => {
                    await AsyncStorage.setItem('@accessToken', tkn);
                    const datosUsuario = JSON.stringify(resp.user)
                    await AsyncStorage.setItem('user', datosUsuario);
                })
            }
            navigation.navigate('Home', resp.user)
        }).catch((err) => {
            console.log(err.message);
        })
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}