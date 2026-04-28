import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { hapus } from "../utils/storage";

export default function Logout({ navigation }) {
  useEffect(() => {
    const doLogout = async () => {
      await hapus("@session_login");
      navigation.replace("Auth");
    };
    doLogout();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#1F4E79" />
    </View>
  );
}
