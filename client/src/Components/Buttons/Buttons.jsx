import React from "react";
import { TouchableOpacity, StyleSheet, Image, Dimensions} from "react-native";

const { width, height } = Dimensions.get('screen');

export const LandingButton = (props) => {
    const { onPress } = props;

    return (
        <TouchableOpacity style={styles.landing} onPress={onPress} >
            <Image 
                style={styles.image}
                source={require('../../images/ButtonLanding.png')}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    landing: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 400,
        height: 400,
        resizeMode: 'contain'
    }
})