import React from "react";
import { View } from "react-native";
import WebView from "react-native-webview"
import { useSelector } from "react-redux";
import { amountDonate } from "../../Redux/Actions";

const MercadoPago = (props) => {    
    const link = useSelector((state) => state.paymentLink)

    return (
        <View>
            <View style={{width: '100%', height: '100%'}}>
                <WebView
                source = {{uri: link}}
                // onLoad = {console.log('Loaded!')}
                />
            </View>
        </View>
    )
}

export default MercadoPago