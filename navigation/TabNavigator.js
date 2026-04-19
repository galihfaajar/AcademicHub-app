// navigation/TabNavigator.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, Text } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import HomeStack from "./HomeStack";
import HalamanEksplorasi from "../screens/HalamanEksplorasi";
import HalamanProfil from "../screens/HalamanProfil";
import JadwalKuliah from "../screens/JadwalKuliah";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, size }) => {
          const icons = {
            HomeTab: focused ? "🏠" : "🏡",
            Eksplorasi: focused ? "🔍" : "🔎",
            JadwalKuliah: focused ? "📅" : "🗓️",
            Profil: focused ? "👤" : "👥",
          };
          return (
            <Text style={{ fontSize: size - 4 }}>{icons[route.name]}</Text>
          );
        },
        tabBarActiveTintColor: "#1F4E79",
        tabBarInactiveTintColor: "#AAAAAA",
        headerStyle: { backgroundColor: "#1F4E79" },
        headerTintColor: "#FFFFFF",
        headerTitleAlign: "center",
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.getParent()?.toggleDrawer()}
            style={{ marginLeft: 15 }}
          >
            <Text style={{ fontSize: 24, color: "#FFFFFF" }}>☰</Text>
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: "Beranda",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Eksplorasi"
        component={HalamanEksplorasi}
        options={{
          title: "Eksplorasi",
        }}
      />
      <Tab.Screen
        name="Profil"
        component={HalamanProfil}
        options={{
          title: "Profil",
        }}
      />
      <Tab.Screen
        name="JadwalKuliah"
        component={JadwalKuliah}
        options={{
          title: "Jadwal",
        }}
      />
    </Tab.Navigator>
  );
}
