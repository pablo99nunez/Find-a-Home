import AsyncStorage from '@react-native-async-storage/async-storage';

export const callApiWithAppCheckExample = async () => {
    //obtiene el token
    const tokenLocalStorage = await AsyncStorage.getItem('@accessToken')
    //const tokenLocalStorage = 'asds'
    //hace fetch
    const apiResponse = await fetch('http://192.168.0.235:8080/pet', {
        headers: {
            'Authorization': `Bearer ${tokenLocalStorage}`,
            'X-Firebase-AppCheck': tokenLocalStorage
        }
    }
    )
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
    // consologea respuesta
    console.log({ respuesta: apiResponse });
};