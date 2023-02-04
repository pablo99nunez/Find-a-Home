import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { ReportPets } from '../../Redux/Actions';

export const ReportPet = (props) => {
    const [visible, setVisible] = React.useState(false);
    const [input, setInput] = React.useState('');

const report = () =>{
    ReportPets(props.id, input)
}

    return (
        <View style={styles.container}>
          
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
            <Button 
                title='!'
                onPress={() => setVisible(true)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    title: {
        fontSize:20, 
        marginBottom:20,
        backgroundColor:'red',
        color:'white',
        padding:15,
        borderRadius:30,
    },
});
