import React, { useState, useEffect } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { loginWithEmailAndPassword, crearYrellenarDB, enviarReseteoPasswordPorMail } from "../../../firebase/authentication";
import { ButtonYellow } from "../../Buttons/Buttons";
import { useSelector } from "react-redux";
import { checkEmail } from "../../../Redux/Actions";


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [SeOlvido , setSeOlvido] = useState(false)
    const isLoggedIn = useSelector(store => store.isLoggedIn)

    const onFooterLinkPress = () => {
        navigation.navigate("Registration");
    };
    useEffect(() => {
        if(isLoggedIn){
        checkEmail(email).then(resp=>{
            const firstName = '', lastName = '', phone = '', profilePic = '', address= '', description= ''
            if(resp)
                navigation.navigate("Home");
            //else
            //    navigation.navigate("EditProfile",{firstName, lastName, phone, profilePic, address, description})
        })  
        }
      }, [isLoggedIn]);

    return (
        <View
            style={styles.container}
            className="flex w-[100%] bg-[#3A302E] items-center"
        >
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="always"
                className="w-[90%]"
            >
                <Image
                    style={styles.logo}
                    source={require("../../../images/FindAHome.png")}
                />
                <TextInput
                    className="h-11 w-[100%] bg-white rounded-md my-3 pl-3"
                    placeholder="Email"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    className="h-11 w-[100%] bg-white rounded-md my-3 pl-3"
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder="Password: 123456"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View className="my-3">
                    <ButtonYellow
                        onPress={async () => {
                            await loginWithEmailAndPassword(email, password)
                                .then(() => {
                                    
                                })
                                .catch((err) => {
                                    
                                    if (
                                        err.message === "Firebase: Error (auth/user-not-found)."
                                    ) {
                                        alert(
                                            "Esta cuenta no se encuentra registrada, porfavor revise sus datos o de click al boton Registrate"
                                        );
                                    } 
                                    else if(err.message === "Firebase: Error (auth/wrong-password)." || err.message === "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."){
                                        err.message = "contraseña incorrecta, intentalo nuevamente o si la olvidó, puede cambiarla haciendo click abajo"
                                        setSeOlvido(true)
                                    }
                                     alert(err.message);
                                });
                        }}
                        text="Acceder"
                    />
                </View>

                       {/* OLVIDASTE TU CONTRASEÑA */}
                       {SeOlvido?
                       <View style={styles.footerView}>
                    <Text style={styles.footerText}>
                        Olvidaste{" "}
                        <Text onPress={()=>{ enviarReseteoPasswordPorMail(email).then(()=>alert("Se a enviado un email a su correo electronico con un link para cambiar la contraseña")).catch((err)=> alert(err.message));}} style={styles.footerLink}>
                            Tu Contraseña?
                        </Text>
                    </Text>
                </View>:null}
                        {/* OLVIDASTE TU CONTRASEÑA */}

                <View style={styles.footerView}>
                    <Text style={styles.footerText}>
                        No tenés una cuenta?{" "}
                        <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                            Regístrate acá
                        </Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}
