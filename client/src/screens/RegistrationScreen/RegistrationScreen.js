import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import axios from 'axios';
import { BASE_URL_IP } from "@env"
//firebase linea 1
import firebase from '../../firebase/config'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RegistrationScreen({ navigation }) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }
    //firebase linea 2 (todo el bloque {... })
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, user => {
        // Check for user status


    });
    //firebase 3
    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        createUserWithEmailAndPassword(auth, email, password).then((resp) => {

            if (resp.user) {
                resp.user.getIdToken().then(async (tkn) => {
                    await AsyncStorage.setItem('authorization', "Bearer "+ tkn);
                    createUserInDb(fullName, email, password);
                    console.log({authorization: "Bearer "+ tkn})
                    navigation.navigate('Home')
                })
            }else{
                alert('Hubo un error al registrarse, no se obtubo el token en linea 37 de RegistrationScreen.js!')
            }


        }).catch((err) => {
            console.log(err.message);
        })

        //CREAMOS EL USUARIO EN LA BASE DE DATOS
        const createUserInDb = async (fullName, email, password) => {
            const profilePic = "https://i.pravatar.cc/150?u=thefakeuser.jpg"
            const phone = "01155555555"
            const data = { firstName: fullName, lastName: fullName, profilePic, email: email, phone };
            console.log("DATA FOR DB CREATION:", data)
            const response = await axios.post(`${BASE_URL_IP}user`, data, {
                headers: {
                    "Content-Type": "application/json",
                    // 'Authorization': `Bearer ${token}`
                }
            }).then(response => console.log('usuario nuevo creado en la mongodb'))
                .catch(error => console.error('Error:', error));
        }

        /* firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Home', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
        }); */
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
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
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
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}