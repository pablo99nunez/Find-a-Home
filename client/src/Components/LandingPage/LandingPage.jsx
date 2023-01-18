import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

const LandingPage = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Button
                title="Find a Home"
                onPress={() => navigation.navigate('Welcome')}
                style={styles.boton}
            />
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
    boton: {
        backgroundColor: '#FFC733'
    }
})
export default LandingPage;