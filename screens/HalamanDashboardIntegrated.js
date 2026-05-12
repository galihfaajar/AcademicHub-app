import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from '../navigation/HomeStack';
import HalamanEksplorasi from "./HalamanEksplorasi";
import HalamanProfil from "./HalamanProfil";
import JadwalKuliah from "./JadwalKuliah";

const Tab = createBottomTabNavigator();

function MenuTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => {
        const titleMap = {
          HomeTab: "Beranda",
          Eksplorasi: "Eksplorasi",
          Profil: "Profil",
          JadwalKuliah: "Jadwal",
        };
        
        return {
          title: titleMap[route.name] || "Menu",
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
          headerShown: true,
          headerStyle: { backgroundColor: "#1F4E79" },
          headerTintColor: "#FFFFFF",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.getParent()?.toggleDrawer()}
              style={{ marginLeft: 15 }}
            >
              <Text style={{ fontSize: 24, color: "#FFFFFF" }}>☰</Text>
            </TouchableOpacity>
          ),
        };
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
      />
      <Tab.Screen
        name="Eksplorasi"
        component={HalamanEksplorasi}
      />
      <Tab.Screen
        name="Profil"
        component={HalamanProfil}
      />
      <Tab.Screen
        name="JadwalKuliah"
        component={JadwalKuliah}
      />
    </Tab.Navigator>
  );
}

export default function HalamanDashboardIntegrated({ session, onLogout }) {
  const [showMenu, setShowMenu] = React.useState(false);

  if (showMenu) {
    return <MenuTabNavigator />;
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeCard}>
        <Text style={styles.greetingText}>Selamat datang</Text>
        <Text style={styles.adminText}>Admin</Text>
        
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nama</Text>
            <Text style={styles.infoValue}>{session.nama}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{session.email}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Role</Text>
            <Text style={styles.infoValue}>{session.role}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Waktu Login</Text>
            <Text style={styles.infoValue}>
              {new Date(session.loginAt).toLocaleString('id-ID')}
            </Text>
          </View>
        </View>

        {/* Menu Navigation Buttons */}
        <Text style={styles.menuTitle}>Menu Utama</Text>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setShowMenu(true)}
        >
          <Text style={styles.menuButtonIcon}>📱</Text>
          <View style={styles.menuButtonContent}>
            <Text style={styles.menuButtonText}>Akses Menu Lengkap</Text>
            <Text style={styles.menuButtonSubText}>Jelajahi semua fitur aplikasi</Text>
          </View>
          <Text style={styles.arrowIcon}>›</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Keluar Aplikasi</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F4E79',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    elevation: 10,
    width: '100%',
    maxWidth: 400,
  },
  greetingText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  adminText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1F4E79',
    textAlign: 'center',
    marginBottom: 25,
  },
  infoBox: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },
  infoRow: {
    paddingVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  infoLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F4E79',
    marginBottom: 12,
  },
  menuButton: {
    backgroundColor: '#1F4E79',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    marginBottom: 15,
  },
  menuButtonIcon: {
    fontSize: 28,
    marginRight: 15,
  },
  menuButtonContent: {
    flex: 1,
  },
  menuButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuButtonSubText: {
    color: '#BDD7EE',
    fontSize: 12,
  },
  arrowIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
