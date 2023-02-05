import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { ReportPets } from '../../Redux/Actions';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const ReportPet = (props) => {
    const [visible, setVisible] = React.useState(false);
    const [input, setInput] = React.useState('');

const report = () =>{
    ReportPets(props.id, input)
}

    return (
        <View>
          
            <DialogInput 
                isDialogVisible={visible}
                title={"Reportar mascota"}
                message={"¿Ves algo mal en esta publicacion?"}
                hintInput ={"Ingresa tu reporte"}
                submitInput={ (inputText) => {
                    setInput(inputText),
                    setVisible(false);
                    report()
                }}
                closeDialog={() => setVisible(false)}>
            </DialogInput>
            <TouchableOpacity onPress={() => setVisible(true)}>
                <Icon name="alert-box" size={60} color={"#AB4E68"}/>
            </TouchableOpacity>
        </View>
    );
}