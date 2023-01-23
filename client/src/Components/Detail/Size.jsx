import React from 'react'
import { View, Image} from 'react-native'

export const Size = (props) => {
  const{size} = props

  return (
    <View className='flex flex-row items-end'>
      <Image className='h-9 w-9' source={size === 'Small'? require('../../images/perro_rosa.png') : require('../../images/perro_negro.png')} />
      <Image className='h-12 w-12' source={size === 'Medium'? require('../../images/perro_rosa.png') : require('../../images/perro_negro.png')} />
      <Image className='h-14 w-14' source={size === 'Large'? require('../../images/perro_rosa.png') : require('../../images/perro_negro.png')} />
    </View>
  )
}
