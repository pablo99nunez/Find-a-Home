import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView, Button } from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Welcome = ({ navigation }) => {
    const [viewActive, setViewActive ] = useState(0);

    const onchange = nativeEvent => {
        if(nativeEvent){
            const slide = Math.floor(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if(slide != viewActive){
                setViewActive(slide)
            }
        }
    }
    return(
        <View>
            <ScrollView 
                onScroll={({nativeEvent}) => onchange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
            >
                <View style={styles.slide1}>
                    <Text style={styles.text}>Somos una</Text>
                    <Text style={styles.text}>organización sin</Text>
                    <Text style={styles.text}>fines de lucro que</Text>
                    <Text style={styles.text}>busca ayudar a las</Text>
                    <Text style={styles.text}>mascotas a</Text>
                    <Text style={styles.text}>encontrar un hogar.</Text>
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.text}>Podrás adoptar a tu</Text>
                    <Text style={styles.text}>mascota soñada o</Text>
                    <Text style={styles.text}>encontrarle un</Text>
                    <Text style={styles.text}>mejor hogar a un</Text>
                    <Text style={styles.text}>gatito rescatado.</Text>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>No discriminamos</Text>
                    <Text style={styles.text}>por raza y</Text>
                    <Text style={styles.text}>priorizamos a los</Text>
                    <Text style={styles.text}>que más tiempo</Text>
                    <Text style={styles.text}>lleven sin un hogar.</Text>
                </View>
                <View style={styles.slide4}>
                    <Text>Aca va la etiqueta de login</Text>
                    <Button 
                        title="Entrar como invitado"
                        onPress={() => navigation.navigate('Home')} />
                </View>
            </ScrollView>
            <View style={styles.wrapDot}>
                <Text style={viewActive === 0 ? styles.dotActive : styles.dot}>●</Text>
                <Text style={viewActive === 1 ? styles.dotActive : styles.dot}>●</Text>
                <Text style={viewActive === 2 ? styles.dotActive : styles.dot}>●</Text>
                <Text style={viewActive === 3 ? styles.dotActive : styles.dot}>●</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    slide1: {
        width: WIDTH,
        height: HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3A302E',
    },
    slide2: {
        width: WIDTH,
        height: HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#AB4E68'
    },
    slide3: {
        width: WIDTH,
        height: HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFC733',
    },
    slide4: {
        width: WIDTH,
        height: HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        color: '#FFFFFF',
        fontSize: 30,
    },
    wrapDot: {
      position: "absolute",
      bottom: 0,
      flexDirection: "row",
      alignSelf: "center",
    },
    dotActive:{
        margin: 10,
        color: '#AB4E68',
        fontSize: 40,
    },
    dot: {
        margin: 10,
        color: '#ACACAC',
        fontSize: 40,
    },
})

export default Welcome;