
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BottomSheetTextInput, BottomSheetView} from '@gorhom/bottom-sheet';
import { ButtonYellow } from '../Buttons/Buttons';




const BottomView = ({id}) => {

  const [sent, setSent] = useState(false)
  const [message, setMessage] =useState('')
  const sendRequest = ()=> { 
    const newRequest = {
      method: 'PUT',
      headers:{
        "Content-Type": "aplication/json",
        // "Authorization":"Bearer "  ACA VA EL TOKEN
      },
      body:{
        message,
        id
      },

    }
    fetch(`/pet/profile/solicitud`, newRequest )
    .then((response) => response.json())
    .then((data) => setSent(true))
    .catch((err)=> alert(err.message))
  }
  
  // renders
  return (
      !sent? <View>
        <BottomSheetTextInput style={styles.input} onChangeText={(text)=>{ setMessage(text)}} multiline/>
        <ButtonYellow text='Enviar Solicitud' 
        onPress={sendRequest}/>
        <ButtonYellow text='Perfil Usuario' onPress={()=> alert('redireccion perfil dueño')}/>
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