import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native'
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../firebase/config";
import { ButtonYellow } from '../Buttons/Buttons';
import { FlatList } from 'react-native-gesture-handler';

export const Photos = ({name , profile, setProfile}) => {
  
  const [uploading, setUploading] = useState(false);
  

  const pickImage = async () => {
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
        await uploadImage(result.assets[0].uri).catch((err) => {
          alert(err.message);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async (imageURI) => {
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
          //console.log("Download URL: ", url);
          setProfile({ ...profile, profilePic: url});
          blob.close();
          return url;
        });
      }
    );
  };
  return (
    <View>
      <View>
      <Text className='text-2xl font-extralight mb-3'></Text>
        <Text className='text-2xl font-extralight mb-3'>Foto de perfil</Text>
      </View>
      <TouchableOpacity onPress={() => pickImage()}>

            <Image
              source={{ uri: profile.profilePic }}
              className='w-72 h-52 mx-auto rounded-md'
            />
          
        </TouchableOpacity>
 
    </View>
  )
}
