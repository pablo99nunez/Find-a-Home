
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BottomSheetTextInput, BottomSheetView} from '@gorhom/bottom-sheet';
import { ButtonYellow } from '../Buttons/Buttons';



const BottomView = () => {

  const [sent, setSent] = useState(false)
  
  // renders
  return (
      !sent? <View>
        <BottomSheetTextInput style={styles.input} multiline/>
        <ButtonYellow text='Enviar Solicitud' onPress={()=> setSent(true)}/>
      </View> :
      <View>
        <BottomSheetView>
          <Text className='text-2xl text-center my-9'>¡Solicitud enviada!</Text>
          <Text className={text}>El dueño ha sido notificado y se le han compartido tus datos de contacto</Text>
          <Text className={text}>Si está interesado se contactará contigo.</Text>
          <Text className={text}>¡Muchas gracias!</Text>
        </BottomSheetView>
      </View>

  );
};

const text = 'text-xl text-center my-3'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#d9d9d9'
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 20,
    padding: 8,
    backgroundColor: '#1e1e1e',
    width: '80%',
    height:250,
    alignSelf: 'center',
    color: '#D9D9D9'
  },
});

export default BottomView;