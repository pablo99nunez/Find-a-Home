import React from "react";
import { View } from "react-native";
import WebView from "react-native-webview"
import { useSelector } from "react-redux";
import { amountDonate } from "../../Redux/Actions";
import { Donacion } from "../../Redux/Actions";

const MercadoPago = (props) => {    
    const link = useSelector((state) => state.paymentLink)
  console.log(props.route.params)
    const handleNavigationStateChange = (navState) => {
        console.log('vasadasdasds',navState);
      if (navState.url.includes("/success")) {
        //redirija a un componente que diga algo asi como Gracias por donar!
        //props.true
        Donacion(props.route.params)
        props.navigation.navigate("UserDetail");
        alert("Gracias por donar")
      }
      if (navState.url.includes("/pending")) {
          
          props.navigation.goBack();
          alert("Gracias por donar")
      }
      if (navState.url.includes("/failure")) {

        props.navigation.navigate("Prices");
        alert("Hubo un error")

      }

    };
  
    return (
      <View>
        <View style={{width: '100%', height: '100%'}}>
          <WebView
            source={{uri: link}}
            onNavigationStateChange={handleNavigationStateChange}
          />
        </View>
      </View>
    );
  };
  
  export default MercadoPago;