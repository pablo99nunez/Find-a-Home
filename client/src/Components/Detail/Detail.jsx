import React ,{ useCallback, useMemo, useRef, useState }from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "react-native-gesture-handler";
import { ButtonYellow } from "../Buttons/Buttons";
import { calculateAdoptionDays } from "../Funciones/DiasAdopcion";
import { HeaderDetail } from "./HeaderDetail";
import BottomView from "./BottomView";
import BottomSheet from '@gorhom/bottom-sheet';

import { Characteristics } from "./Characteristics";


export default function Detail({route, navigation}){
  
  const {profilePic, name , createdAt, gallery, description, size, age}= route.params

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
                  <Text className='text-[#f5c936] text-4xl text-center my-12'>{name.toUpperCase()}</Text>
              </View>

              <View>
                {gallery? <FlatList horizontal={true} keyExtractor={(name) => name} data={gallery}
                renderItem={({item}) => (
                  <Image style={styles.gallery} source={{uri: item}}/>
                  )}></FlatList> : null}
              </View> 

            </View>
          </LinearGradient>
        </ImageBackground>


        <View className='h-1/4'>
        <Text className='text-2xl text-center my-9'>{description}</Text>
          <Characteristics size={size} age={age}/>
        </View>

        <View className='h-1/3 flex justify-end m-[-30px]'>

        <ButtonYellow text='Adoptar' onPress={()=> setOpen(0)}/>
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
        <BottomView/>
      </BottomSheet>



    </View>
  );
}

const styles = StyleSheet.create({

  profilePic:{ 
    width: '100%', 
    height: 400
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

