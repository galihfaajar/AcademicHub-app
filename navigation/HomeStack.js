import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import DaftarMahasiswa from "../screens/DaftarMahasiswa";
import HalamanDetail from "../screens/HalamanDetail";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1F4E79" },
        headerTintColor: "#FFFFFF",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Home"
        component={DaftarMahasiswa}
        options={({ navigation }) => ({
          title: "Beranda",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Text style={{ fontSize: 24, color: "#FFFFFF", paddingRight: 15 }}>☰</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Detail"
        component={HalamanDetail}
        options={{ title: "Detail" }}
      />
    </Stack.Navigator>
  );
}
