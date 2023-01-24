import React from "react";
import { useState } from "react";
import {firebase} from '../../firebase/config'
import axios from 'axios';


import * as ImagePicker from 'expo-image-picker';
export const usePet = () =>{

    const [crear, setCrear] = useState({
        name: "",
        description: "",
        age: "",
        size: "",
        profilePic: ""
      })
      const [image, setImage] = useState(null)
      const [uploading, setUploading] = useState(false)
    
    
    
      const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
          uploadImage()
        }
      };
    
      const uploadImage = async () => {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function() {
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', image, true);
          xhr.send(null);
        })
        const ref = firebase.storage().ref().child(`Pictures/${crear.name}`)
        const snapshot = ref.put(blob)
        snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{
            setUploading(true)
          },
          (error) => {
            setUploading(false)
            console.log(error)
            blob.close()
            return 
          },
          () => {
            snapshot.snapshot.ref.getDownloadURL().then((url) => {
              setUploading(false)
              console.log("Download URL: ", url)
              setCrear({...crear, profilePic:url})
              console.log(crear.profilePic)
              blob.close()
              return url
            })
          }
          )
      
        }
    
    
      const HandleSubmit = async () => {
        let info = JSON.stringify(crear);
        let url = `http://${BASE_URL_IP}/pet`;
        try {
          await axios({
            method: 'post',
            url: url,
            headers: { 'Content-Type': 'application/json' },
            data: crear
          });
          setCrear({
            name: "",
            description: "",
            age: "",
            size: "",
            profilePic: ""
          });
          alert("Creo que se creo");
        } catch (error) {
          console.error(error);
        }
      };
      return{
        HandleSubmit, pickImage,image, crear, setCrear
      }
}