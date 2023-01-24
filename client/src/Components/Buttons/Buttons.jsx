import React from "react";
import { TouchableOpacity, StyleSheet, Image, Dimensions, Text} from "react-native";

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

export const ButtonYellow = (props) => {
    const {onPress, text} = props
    return (
        <TouchableOpacity className='bg-[#ffc733] w-2/3 self-center rounded-2xl py-4 mb-2.5 shadow-md' style={styles.yellow} onPress={onPress} >
            <Text style={styles.text}>{text}</Text>
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
    },
    yellow: {
        // backgroundColor: '#FFC733',
        // width: '60%',
        // alignSelf: 'center',
        // paddingVertical: 10,
        // borderRadius: 10,
        // marginBottom: 10,
    },
    text:{
        textAlign: 'center',
        fontSize: 25
    }
})