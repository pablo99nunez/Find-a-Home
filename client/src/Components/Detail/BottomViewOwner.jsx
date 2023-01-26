import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export const BottomViewOwner = ({solicitudes}) => {
  return (
    <View>
      <BottomSheetView>
        <FlatList 
        keyExtractor={(item) => item.message}
        data={solicitudes}
        renderItem={({ item }) => (
          <TouchableOpacity>
           <Text>
            {item.message}
           </Text>
          </TouchableOpacity>
        )}/>
      </BottomSheetView>
    </View>
  )
}
