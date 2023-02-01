import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { ButtonYellow } from '../../Buttons/Buttons';
import { StyleSheet } from 'react-native';



export default function RegistrationScreen({ navigation }) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('@gmail.com')
    const [password, setPassword] = useState('123456')

    const user = { firstName, lastName, email, password }

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}
            className='flex w-[100%] bg-[#3A302E] items-center'>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="always"
                className='w-[90%]'
            >
                <Image
                    style={styles.logo}
                    source={require('../../../images/FindAHome.png')}
                />
                <TextInput
                    className='h-11 w-[100%] bg-white rounded-md my-3 pl-3'
                    placeholder='Nombre'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFirstName(text)}
                    value={firstName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    className='h-11 w-[100%] bg-white rounded-md my-3 pl-3'
                    placeholder='Apellido'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    className='h-11 w-[100%] bg-white rounded-md my-3 pl-3'
                    placeholder='Email'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    className='h-11 w-[100%] bg-white rounded-md my-3 pl-3'
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password: 123456'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {/* <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        createAccountWithEmailAndPassword(email, password, fullName)
                        .then(ignore => {
                            navigation.navigate('RegisterFirstSteps')
                        })
                        .catch(error=>{
                            if(error.message === 'Firebase: Error (auth/email-already-in-use).')
                            alert('El email ingresado ya está en uso!')
                            else alert(error.message)
                        })
                    }}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity> */}
                <View className='my-3'>
                    <ButtonYellow onPress={() => navigation.navigate('RegisterFirstSteps', user)} text={'Continuar'} />
                </View>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}




StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        flex: 1,
        height: 140,
        width: 155,
        alignSelf: "center",
        padding: 50,
        margin: 30
    }
})