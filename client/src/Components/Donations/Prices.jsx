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
        <View className="bg-[#ffffff] flex flex-col justify-center items-center" style={{height: height}}>
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
            <Image
                style={{
                    height: height * 0.08,
                    width: width * 0.4,
                    resizeMode: 'contain'
                }}
                source={require("../../images/MP.png")}
            />
            <Text className="text-center text-xm mb-[5%] mx-[5%] text-[#009ee3]" style={{ fontFamily: "Roboto_300Light" }}>Podes donar desde mercado pago ingresando el monto deseado</Text>
            <View className="flex flex-row items-center">
                <TextInput
                    className='h-14 w-3/4 bg-[#ffffff] rounded-xl px-3 font-light'
                    placeholder="Monto a donar:"
                    placeholderTextColor="#bfd4e8"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    value={monto}
                    maxLength={6}
                    style={{
                        borderWidth: 2,
                        borderColor: '#009ee3',
                    }}
                    onBlur={() => { }}
                    onChangeText={(text) => { handleChange(text) }}
                />
                <Text className="text-center text-2xl ml-[1%]" style={{ fontFamily: "Roboto_300Light" }}>$ARS</Text>
                {/*   <Tou className='h-5 mt-1'>
                    <Text className='text-[#ed3232]'>{error.name}</Text>
                </View> */}
            </View>    
            <ScrollView className="w-3/4 m-[5%]">
                <DonateButton onPress={() => { donate(monto); navigation.navigate('MercadoPago', monto) }} text={`Donar`} />
            </ScrollView>
        </View>
    )
}

export default Prices