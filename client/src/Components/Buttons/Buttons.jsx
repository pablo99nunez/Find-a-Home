import React from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const LandingButton = (props) => {
  const { onPress } = props;
  return (
    <TouchableOpacity
      className="w-[100%] h-[100%] flex justify-center items-center"
      onPress={onPress}
    >
      <Image
        className="w-[80%] h-[40%]"
        resizeMode="contain"
        source={require("../../images/ButtonLanding.png")}
      />
    </TouchableOpacity>
  );
};

export const ButtonYellow = (props) => {
  const { onPress, text, deshabilitar } = props;
  return (
    <TouchableOpacity
      disabled={deshabilitar}
      className="bg-[#ffc733] w-2/3 self-center rounded-2xl py-4 mb-2.5 shadow-md"
      onPress={onPress}
    >
      <Text
        className="text-center text-2xl"
        style={{ fontFamily: "Roboto_300Light" }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const ButtonCreatePet = (props) => {
  const { onPress } = props;
  return (
    <TouchableOpacity
      className="bg-[#FFC733] items-center justify-center border rounded-full w-[19%] h-[9%] absolute right-[5%] bottom-[5%]"
      onPress={onPress}
    >
      <Image
        className="w-[70%] h-[70%] "
        source={require("../../images/Trust.png")}
      />
    </TouchableOpacity>
  );
};
export const ButtonAdminDashboard = (props) => {
  const { onPress } = props;
  return (
    <TouchableOpacity
      className="bg-[#FFC733] items-center justify-center border rounded-full w-[19%] h-[9%] absolute left-[5%] bottom-[5%]"
      onPress={onPress}
    >
      <Image
        className="w-[70%] h-[70%] "
        source={require("../../images/adminbutton.png")}
      />
    </TouchableOpacity>
  );
};
export const ButtonAdminToReports = (props) => {
  const { onPress } = props;
  return (
    <TouchableOpacity
      className="bg-[#FFC733] items-center justify-center border rounded-full w-[19%] h-[9%] absolute left-[5%] bottom-[5%]"
      onPress={onPress}
    >
      <Image
        className="w-[70%] h-[70%] "
        source={require("../../images/adminbutton.png")}
      />
    </TouchableOpacity>
  );
};

export const EditButton = (props) => {
  const { onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="pencil" className="w-12 h-12" size={50} color={"#FFC733"} />
    </TouchableOpacity>
  );
};

export const DonateButton = (props) => {
  const { onPress } = props;
  return (
    <TouchableOpacity
      className="bg-[#ffc730] w-1/3 self-center rounded-2xl py-2 mb-2.5 shadow-lg"
      onPress={onPress}
      // onPress={()=> navigation.navigate('MercadoPago')} 
    >
      <Text
        className="text-center text-2xl"
        style={{ fontFamily: "Roboto_300Light" }}
      >
        Donar UwU
      </Text>
    </TouchableOpacity>
  );
};
