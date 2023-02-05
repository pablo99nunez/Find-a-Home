import React from "react";
import { View, Text, Dimensions, Image, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { DonateButton } from "../Buttons/Buttons";
import { amountDonate } from "../../Redux/Actions";

const {width, height} = Dimensions.get("screen")

const Prices = ({navigation}) => {

    const dispatch = useDispatch()

    const donate = (amount) => {
        dispatch(amountDonate(amount))
    }

    return (
        <View className="flex flex-col justify-center items-center bg-[#AB4E68]">
            <Image
                style={{
                    height: height * 0.15,
                    width: width * 0.6,
                    resizeMode: 'contain'
                }}
                className="mt-[15%] mb-[3%]"
                source={require("../../images/FindAHome.png")}
            />
            <Text className="text-center text-3xl mb-[5%] text-[#ffc733]" style={{ fontFamily: "Roboto_300Light" }}>Ayudanos para seguir ayudando</Text>
            <ScrollView className="w-[100%]">
            <DonateButton onPress={()=>{ donate(100); navigation.navigate('MercadoPago')}} text={"Donar $100 ARS"} />
            <DonateButton onPress={()=>{ donate(200); navigation.navigate('MercadoPago')}} text={"Donar $200 ARS"}/>
            <DonateButton onPress={()=>{ donate(500); navigation.navigate('MercadoPago')}} text={"Donar $500 ARS"}/>
            <DonateButton onPress={()=>{ donate(1000); navigation.navigate('MercadoPago')}} text={"Donar $1000 ARS"}/>
            <DonateButton onPress={()=>{ donate(2000); navigation.navigate('MercadoPago')}} text={"Donar $2000 ARS"}/>
            <DonateButton onPress={()=>{ donate(5000); navigation.navigate('MercadoPago')}} text={"Donar $5000 ARS"}/>
            <DonateButton onPress={()=>{ donate(10000); navigation.navigate('MercadoPago')}} text={"Donar $10000 ARS"}/>
            </ScrollView>
        </View>
    )
}

export default Prices