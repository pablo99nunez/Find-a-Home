import React from "react";
import { View, Text } from "react-native";
import { ButtonAdminToReports } from "../Buttons/Buttons";
import { AdminHeader } from "./AdminHeader";

const AdminPanel = (props) => {
  console.log(props);
  return (
    <View>
      <AdminHeader />

      <View>
        <Text>ADMIN</Text>
      </View>
    </View>
  );
};

export default AdminPanel;
