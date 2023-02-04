import React from 'react'
import { View , FlatList, Text, Image, Dimensions} from 'react-native'
import { useSelector } from 'react-redux'


export const Notifications = () => {
const currentUser = useSelector((state)=> state.currentUser)
const { width, height } = Dimensions.get("screen")

  return (
    <View 
    style={{ height: height , width: width}}
    className='bg-[#d9d9d9] '>
      <FlatList
        keyExtractor={(item) => item.title}
        data={currentUser.Notifications}
        renderItem={({ item }) => (
          <View className='flex flex-row m-3 w-9/12'>
            <Image
            className='h-12 w-14 m-2'
            source={require('../../images/FindAHome.png')}
            />
            <View>
            <Text className='font-light '>{item.title}</Text>
            <Text className='font-extralight text-sm'> {item.body}</Text>
            </View>
          </View>
        )}></FlatList>
    </View>
  )
}
