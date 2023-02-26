import { View, Text, Image, Modal, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function ImageModal({ imageUrl, isOpen, onClose }: Props) {
  return (
    <Modal visible={isOpen} transparent={true} onRequestClose={onClose}>
      <View
        style={{ flex: 1 }}
        onTouchEnd={onClose}
        className="bg-black/[.8] w-full h-full"
      >
        <View
          className="w-full h-full"
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text className="text-grey-300">Tocá para cerrar</Text>
          <View className=" w-[80%] h-72">
            <Image
              source={{ uri: imageUrl }}
              className="rounded"
              style={{ flex: 1, height: undefined, width: undefined }}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
