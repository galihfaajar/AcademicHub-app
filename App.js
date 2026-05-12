import "react-native-gesture-handler";
import { useState, useEffect } from 'react'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, ActivityIndicator, TouchableOpacity, Text } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

// Import Screens
import HalamanLogin from './screens/HalamanLogin'; 
import HalamanDashboardIntegrated from './screens/HalamanDashboardIntegrated'; 
import TabNavigator from "./navigation/TabNavigator";
import HalamanTentang from "./screens/HalamanTentang";
import HalamanPengaturan from "./screens/HalamanPengaturan";
import JadwalKuliah from "./screens/JadwalKuliah";
import DaftarProduk from "./screens/DaftarProduk";
import TodoPersisten from "./screens/TodoPersisten";
import PengaturanPersisten from "./screens/PengaturanPersisten";
import FormRegistrasi from "./screens/FormRegistrasi";
import DemoLifecycle from "./screens/DemoLifecycle";
import SearchDebounce from "./screens/SearchDebounce";
import DashboardPolling from "./screens/DashboardPolling";
import DaftarMahasiswaAsync from "./screens/DaftarMahasiswaAsync";



const Stack = createNativeStackNavigator(); 
const Drawer = createDrawerNavigator();
const SESSION_KEY = '@user_session'; 

// --- Komponen MainApp (Drawer) ---
function MainApp({ session, onLogout }) {
  return (
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
        name="Dashboard"
        options={{ 
          title: "Beranda",
          headerShown: false,
        }}
      >
        {() => <HalamanDashboardIntegrated session={session} onLogout={onLogout} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Tentang"
        component={HalamanTentang}
        options={{ title: "Tentang" }}
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
      <Drawer.Screen
        name="Todo"
        component={TodoPersisten}
        options={{ title: "Todo List" }}
      />
      <Drawer.Screen
        name="PengaturanPersisten"
        component={PengaturanPersisten}
        options={{ title: "Pengaturan Praktikum" }}
      />
      <Drawer.Screen
        name="PengaturanApp"
        component={HalamanPengaturan}
        options={{ title: "Pengaturan Aplikasi" }}
      />
      <Drawer.Screen
        name="DemoLifecycle"
        component={DemoLifecycle}
        options={{ title: "Demo Lifecycle" }}
      />
      <Drawer.Screen
        name="SearchDebounce"
        component={SearchDebounce}
        options={{ title: "Search Debounce" }}
      />
      <Drawer.Screen
        name="DashboardPolling"
        component={DashboardPolling}
        options={{ title: "Dashboard Polling" }}
      />
      <Drawer.Screen
        name="DaftarMahasiswaAsync"
        component={DaftarMahasiswaAsync}
        options={{ title: "Daftar Mahasiswa (Async)" }}
      />


    </Drawer.Navigator>
  );
}

export default function App() { 
  const [isLoading, setLoading] = useState(true); 
  const [userSession, setSession] = useState(null); 
  
  // Cek session tersimpan saat app pertama dibuka 
  useEffect(() => { 
    const cekSession = async () => { 
      try {
        const raw = await AsyncStorage.getItem(SESSION_KEY); 
        if (raw) setSession(JSON.parse(raw)); 
      } catch (e) {
        console.error("Gagal memuat sesi", e);
      } finally {
        setLoading(false); 
      }
    }; 
    cekSession(); 
  }, []); 
  
  const handleLogout = async () => {
    await AsyncStorage.removeItem(SESSION_KEY); 
    setSession(null); 
  };

  const handleLoginBerhasil = async (userData) => {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(userData)); 
    setSession(userData); 
  };

  // Tampilkan loading saat cek session 
  if (isLoading) { 
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1F4E79' }}> 
        <ActivityIndicator size='large' color='#FFFFFF' /> 
      </View>
    ); 
  } 
  
  return ( 
    <NavigationContainer> 
      <Stack.Navigator screenOptions={{ headerShown: false }}> 
        {userSession ? ( 
          // Sudah login — langsung ke MainApp (Drawer)
          <Stack.Screen name='MainApp'> 
            {() => <MainApp session={userSession} onLogout={handleLogout} />} 
          </Stack.Screen> 
        ) : ( 
          // Belum login — ke halaman login 
          <Stack.Screen name='Login'> 
            {() => <HalamanLogin onLoginBerhasil={handleLoginBerhasil} />} 
          </Stack.Screen> 
        )} 
      </Stack.Navigator> 
    </NavigationContainer> 
  ); 
}
