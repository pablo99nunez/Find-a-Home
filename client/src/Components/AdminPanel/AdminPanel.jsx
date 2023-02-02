import React from "react";
import { View, Text } from "react-native";
import { ButtonAdminToReports } from "../Buttons/Buttons";

const AdminPanel = (props) => {
  console.log(props);
  return (
    <View>
      <View>
        <Text>Admin Panel!</Text>
      </View>
      <View>
        <Text>BOTONES</Text>
        <ButtonAdminToReports />
      </View>
    </View>
  );
};

export default AdminPanel;
