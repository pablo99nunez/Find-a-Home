import React from "react";
import { View, Text } from "react-native";
import AdminHeader from "./AdminHeader";

const AdminPanel = ({ navigation, route }) => {
  console.log(route.profilePic);
  return (
    <View>
      <AdminHeader navigation={navigation} />
      <View>
        <Text>ADMIN</Text>
      </View>
    </View>
  );
};

export default AdminPanel;
