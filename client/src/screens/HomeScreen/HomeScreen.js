import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signOut } from 'firebase/auth';
import firebase from '../../firebase/firebase-config'



export default function HomeScreen(props) {

    const auth = getAuth(firebase);

    function logoutUser() {
        signOut(auth).then(() => {
            // clear session storage
            AsyncStorage.removeItem('@accessToken', () => {
                AsyncStorage.removeItem('user', () => {
                    alert('Logged Out Successfully');

                })
            })

        }).catch((error) => {
            // An error happened.
            alert(error);
        });
    }
    const onAddButtonPress = () => {
        console.log(props);
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add new entity'
                    placeholderTextColor="#aaaaaa"
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>

                <TouchableOpacity style={styles.button} onPress={logoutUser}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}