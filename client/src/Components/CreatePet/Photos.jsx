import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native'
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../firebase/config";
import { ButtonYellow } from '../Buttons/Buttons';
import { FlatList } from 'react-native-gesture-handler';

export const Photos = ({name , crear, setCrear}) => {
  
  const [uploading, setUploading] = useState(false);
  

  const pickImage = async (imageType) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      }).catch((err) => {
        alert(err.message);
      });

      if (!result.canceled) {
        await uploadImage(result.assets[0].uri, imageType).catch((err) => {
          alert(err.message);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async (imageURI, imageType) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", imageURI, true);
      xhr.send(null);
    });
    const ref = firebase
      .storage()
      .ref()
      .child(`Pictures/${Date.now()}-${name}`);
    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          if(imageType === 'profile') {setCrear({ ...crear, profilePic: url})}
          else{ setCrear({...crear, gallery: [...crear.gallery, url]})}
          blob.close();
          return url;
        });
      }
    );
  };
  return (
    <View>
      <View>
        <Text className='text-2xl font-extralight mb-3'>Foto</Text>
      </View>
      <TouchableOpacity onPress={() => pickImage('profile')}>
          {!crear.profilePic ? 
            <Image
              source={require("../../images/camera.png")}
              className='w-72 h-52 mx-auto rounded-md'
            />
          : 
            <Image
              source={{ uri: crear.profilePic }}
              className='w-72 h-52 mx-auto rounded-md'
            />
          }
        </TouchableOpacity>
        {crear.profilePic? <TouchableOpacity 
        onPress={()=> setCrear({...crear, profilePic: ''})}
        className='bg-[#77747470] w-6 h-6 rounded-full mx-auto mt-3'
        >
            <Text className='text-center'>X</Text>
          </TouchableOpacity> : null}
        {crear.gallery?.length > 0 ?
          <View>
            <Text className='text-2xl font-extralight my-3'>Galeria</Text> 
            <FlatList
                    horizontal={true}
                    keyExtractor={(item, index) => name + index}
                    data={crear.gallery}
                    renderItem={({ item }) => (
                      <View>
                        <Image className='w-24 h-20 mb-3 mx-2 rounded-md' source={{ uri: item }} />
                        <TouchableOpacity 
                        onPress={()=> setCrear({...crear, gallery: [...crear.gallery.filter((pic) => pic !== item)]})}
                        className='bg-[#77747470] w-6 h-6 rounded-full mx-auto mt-3'
                        >
                          <Text className='text-center'>X</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  ></FlatList>
          </View>
        : null }
          {crear.profilePic && crear.gallery.length < 6? <View className='mt-3'>
          <ButtonYellow  text={'Agregar otra'} onPress={()=> { pickImage('gallery')} }/>
        </View>: null}
    </View>
  )
}
