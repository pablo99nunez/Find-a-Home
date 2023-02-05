import React from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { DonateButton } from "../Buttons/Buttons";
import { amountDonate } from "../../Redux/Actions";

const Prices = ({navigation}) => {

    const dispatch = useDispatch()

    const donate = (amount) => {
        dispatch(amountDonate(amount))
    }

    return (
        <View>
            <Text>Donate 100 pe cabron</Text>
            <DonateButton onPress={()=>{ donate(100); navigation.navigate('MercadoPago')}} />
            <Text>Donate 200 pe cabron</Text>
            <DonateButton onPress={()=>{ donate(200); navigation.navigate('MercadoPago')}}/>
            <Text>Donate 500 pe cabron</Text>
            <DonateButton onPress={()=>{ donate(500); navigation.navigate('MercadoPago')}}/>
            <Text>Donate 1000 pe cabron</Text>
            <DonateButton onPress={()=>{ donate(1000); navigation.navigate('MercadoPago')}}/>
            <Text>Donate 2000 pe cabron</Text>
            <DonateButton onPress={()=>{ donate(2000); navigation.navigate('MercadoPago')}}/>
            <Text>Donate 5000 pe cabron</Text>
            <DonateButton onPress={()=>{ donate(5000); navigation.navigate('MercadoPago')}}/>
            <Text>Donate 10000 pe cabron</Text>
            <DonateButton onPress={()=>{ donate(10000); navigation.navigate('MercadoPago')}}/>
        </View>
    )
}

export default Prices