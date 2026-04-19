import "react-native-gesture-handler";
import {
  NavigationContainer,
  DrawerActions,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity, Text } from "react-native";
import TabNavigator from "./navigation/TabNavigator";
import HalamanTentang from "./screens/HalamanTentang";
import HalamanPengaturan from "./screens/HalamanPengaturan";
import JadwalKuliah from "./screens/JadwalKuliah";
import DaftarProduk from "./screens/DaftarProduk";

const Drawer = createDrawerNavigator();

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "HomeTab";

  switch (routeName) {
    case "HomeTab":
      return "Beranda";
    case "Eksplorasi":
      return "Eksplorasi";
    case "Profil":
      return "Profil";
    default:
      return "Beranda";
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={({ navigation }) => ({
          drawerStyle: { backgroundColor: "#1F4E79", width: 260 },
          drawerLabelStyle: { color: "#FFFFFF", fontSize: 15 },
          drawerActiveTintColor: "#F7DF1E",
          drawerInactiveTintColor: "#BDD7EE",
          headerStyle: { backgroundColor: "#1F4E79" },
          headerTintColor: "#FFFFFF",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{ marginLeft: 15 }}
            >
              <Text style={{ fontSize: 24, color: "#FFFFFF" }}>☰</Text>
            </TouchableOpacity>
          ),
        })}
      >
        <Drawer.Screen
          name="Utama"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Tentang"
          component={HalamanTentang}
          options={{ title: "Tentang" }}
        />
        <Drawer.Screen
          name="Pengaturan"
          component={HalamanPengaturan}
          options={{ title: "Pengaturan" }}
        />
        <Drawer.Screen
          name="Jadwal"
          component={JadwalKuliah}
          options={{ title: "Jadwal Kuliah" }}
        />
        <Drawer.Screen
          name="Produk"
          component={DaftarProduk}
          options={{ title: "Daftar Produk" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
