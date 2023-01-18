import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LandingButton } from '../Buttons/Buttons';

const LandingPage = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <LandingButton onPress={() => navigation.navigate('Welcome')}/>
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