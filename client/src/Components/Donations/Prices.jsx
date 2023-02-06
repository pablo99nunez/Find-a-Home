import React, { useState } from "react";
import { View, Text, Dimensions, Image, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { DonateButton } from "../Buttons/Buttons";
import { amountDonate } from "../../Redux/Actions";
import { TextInput } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen")

const Prices = ({ navigation }) => {

    const [monto, setMonto] = useState(50);
    const dispatch = useDispatch()

    const donate = (amount) => {
        dispatch(amountDonate(amount))
    }
    //valor = $50
    const handleChange = (valor) => {
        setMonto(valor)
    };

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
            <View className="bg-[#4FC3F7] w-3/4 self-center rounded-2xl py-6 mb-2.5 shadow-md flex flex-row justify-center items-center">
                <TextInput
                    className='h-11 w-3/4 bg-[#417171] rounded-md px-3 font-light'
                    placeholder="Monto a donar:"
                    placeholderTextColor="#fcfcfc"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    value={monto}
                    maxLength={15}
                    onBlur={() => { }}
                    onChangeText={(text) => { handleChange(text) }}
                />
                {/*   <Tou className='h-5 mt-1'>
                    <Text className='text-[#ed3232]'>{error.name}</Text>
                </View> */}
            </View>
            <ScrollView className="w-[100%]">
                <DonateButton onPress={() => { donate(monto); navigation.navigate('MercadoPago') }} text={`Donar $${monto} ARS`} />
                <DonateButton onPress={() => { donate(100); navigation.navigate('MercadoPago') }} text={"Donar $100 ARS"} />
                <DonateButton onPress={() => { donate(200); navigation.navigate('MercadoPago') }} text={"Donar $200 ARS"} />
                <DonateButton onPress={() => { donate(500); navigation.navigate('MercadoPago') }} text={"Donar $500 ARS"} />
                <DonateButton onPress={() => { donate(1000); navigation.navigate('MercadoPago') }} text={"Donar $1000 ARS"} />
                <DonateButton onPress={() => { donate(2000); navigation.navigate('MercadoPago') }} text={"Donar $2000 ARS"} />
                <DonateButton onPress={() => { donate(5000); navigation.navigate('MercadoPago') }} text={"Donar $5000 ARS"} />
                <DonateButton onPress={() => { donate(10000); navigation.navigate('MercadoPago') }} text={"Donar $10000 ARS"} />
            </ScrollView>
        </View>
    )
}

export default Prices