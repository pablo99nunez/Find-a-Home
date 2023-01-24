import React ,{ useCallback, useMemo, useRef, useState }from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "react-native-gesture-handler";
import { ButtonYellow } from "../Buttons/Buttons";
import { calculateAdoptionDays } from "../Funciones/DiasAdopcion";
import { HeaderDetail } from "./HeaderDetail";
import BottomView from "./BottomView";
import BottomSheet from '@gorhom/bottom-sheet';
import { Characteristics } from "./Characteristics";
import { getAuth } from "firebase/auth";




export default function Detail({route, navigation}){

const auth = getAuth();
const user = auth.currentUser;


const solicitarAdopcion = ()=>{
  if (!user) { //ESTO VA ASI (USER) PERO HASTA QUE ESTE FIREBASE IMPLEMENTADO LO DEJAMOS AL REVEZ
    setOpen(0)
  } else {
    navigation.navigate("RegisterFireBase")
  }
}
  
  const {profilePic, name , createdAt, gallery, description, size, age, id}= route.params

  const days = calculateAdoptionDays(createdAt)

  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['55%', '77%'], []);

  const [open, setOpen] = useState(-1)
  // callbacks
  const handleSheetChanges = useCallback((index) => {
  }, []);


  
  return(
    <View> 
      <View className='bg-[#acacac] h-full'>
        <ImageBackground style={styles.profilePic} source={{uri: profilePic}}>
          <LinearGradient colors={['#00000000', '#acacac']} style={{height : '100%', width : '100%'}}>
            <View className='h-1/3'>

              <View >
                  <HeaderDetail onPress={()=> navigation.goBack()} days={days}/>
              </View>


              <View className='h-52'>
                  <Text className='text-[#f5c936] text-4xl text-center'>{name.toUpperCase()}</Text>
              </View>

              <View className="mx-auto">
                {gallery? 
                <FlatList 
                  horizontal={true} 
                  keyExtractor={(name) => name} 
                  data={gallery}
                  renderItem={({item}) => (
                    <Image style={styles.gallery} source={{uri: item}}/>
                  )}>                    
                </FlatList> 
                : 
                <View className="min-h-[120px]">
                </View>}
              </View> 

            </View>
          </LinearGradient>
        </ImageBackground>
        
        
        <View className='h-1/4 flex content-center items-center'>
          <Text className='text-3xl text-center w-11/12 mx-auto my-auto'>
            {description}
          </Text>
        </View>
        <Characteristics size={size} age={age}/>
        
        <View className='h-1/4 flex justify-center'>
          <ButtonYellow text='Adoptar' onPress={()=> solicitarAdopcion()}/>
        </View>


      </View>


      <BottomSheet

      backgroundStyle={styles.containerInput}
      ref={bottomSheetRef}
      index={open}
      snapPoints={snapPoints}

      onChange={handleSheetChanges}
      keyboardBehavior='extend'
      enablePanDownToClose={true}
      onClose={()=> setOpen(-1)}

      >
        <BottomView id={id}/>
      </BottomSheet>



    </View>
  );
}

const styles = StyleSheet.create({

  profilePic:{ 
    width: '100%', 
    height:400
  },
  gallery:{ 
    width: 90, 
    height: 90 , 
    marginLeft: 25,
    borderRadius: 5
  },
  containerInput:{
    backgroundColor: '#d9d9d9'
  }
})

