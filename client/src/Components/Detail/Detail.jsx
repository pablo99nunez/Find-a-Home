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

export default function Detail({ route, navigation }) {
  const { profilePic, name, createdAt, gallery, description } = route.params;

export default function Detail({route, navigation}){
  
  const {profilePic, name , createdAt, gallery, description}= route.params

  const days = calculateAdoptionDays(createdAt)

  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['55%', '70%'], []);
  const [open, setOpen] = useState(-1)
  // callbacks
  const handleSheetChanges = useCallback((index) => {
  }, []);
  
  return(
    <View> 
      <View className='bg-[#acacac] h-full'>
        <ImageBackground style={styles.profilePic} source={{uri: profilePic}}>
          <LinearGradient colors={['#00000000', '#acacac']} style={{height : '100%', width : '100%'}}>
            <View>

              <View >
                  <HeaderDetail onPress={()=> navigation.goBack()} days={days}/>
              </View>

              <View className='h-40'>
                  <Text className='text-[#f5c936] text-4xl text-center my-6'>{name.toUpperCase()}</Text>
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
        <Text className='text-2xl text-center'>{description}</Text>
        <ButtonYellow text='Adoptar' onPress={()=> setOpen(0)}/>
      </View>


      <BottomSheet
      ref={bottomSheetRef}
      index={open}
      snapPoints={snapPoints}
      keyboardBehavior="fillParent"
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
    height: 350
  },
  gallery:{ 
    width: 90, 
    height: 90 , 
    marginLeft: 25
  }
})


