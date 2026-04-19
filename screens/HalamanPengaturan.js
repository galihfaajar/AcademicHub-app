// screens/HalamanPengaturan.js
// Halaman Pengaturan — Praktikum C (Drawer Navigator)

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

export default function HalamanPengaturan() {
  const [notifikasi, setNotifikasi] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSimpan, setAutoSimpan] = useState(true);
  const [bahasa, setBahasa] = useState("Indonesia");

  const pengaturanToggle = [
    {
      id: "1",
      judul: "Notifikasi",
      deskripsi: "Aktifkan push notification",
      ikon: "🔔",
      nilai: notifikasi,
      onChange: setNotifikasi,
    },
    {
      id: "2",
      judul: "Mode Gelap",
      deskripsi: "Tema tampilan gelap",
      ikon: "🌙",
      nilai: darkMode,
      onChange: setDarkMode,
    },
    {
      id: "3",
      judul: "Auto Simpan",
      deskripsi: "Simpan data otomatis",
      ikon: "💾",
      nilai: autoSimpan,
      onChange: setAutoSimpan,
    },
  ];

  const pengaturanMenu = [
    { id: "1", judul: "Bahasa", deskripsi: bahasa, ikon: "🌐" },
    { id: "2", judul: "Ukuran Font", deskripsi: "Normal", ikon: "🔤" },
    {
      id: "3",
      judul: "Cache & Data",
      deskripsi: "Hapus cache aplikasi",
      ikon: "🗑️",
    },
    {
      id: "4",
      judul: "Sinkronisasi",
      deskripsi: "Sinkronkan data akun",
      ikon: "🔄",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerInfo}>
        <Text style={styles.headerSub}>
          Sesuaikan aplikasi sesuai preferensimu
        </Text>
      </View>

      {/* Pengaturan Toggle */}
      <View style={styles.seksi}>
        <Text style={styles.judulSeksi}>Preferensi</Text>
        <View style={styles.kartu}>
          {pengaturanToggle.map((setting, idx) => (
            <View key={setting.id}>
              <View style={styles.barisToggle}>
                <Text style={styles.settingIkon}>{setting.ikon}</Text>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingJudul}>{setting.judul}</Text>
                  <Text style={styles.settingDeskripsi}>
                    {setting.deskripsi}
                  </Text>
                </View>
                <Switch
                  value={setting.nilai}
                  onValueChange={setting.onChange}
                  trackColor={{ false: "#E0E0E0", true: "#BDD7EE" }}
                  thumbColor={setting.nilai ? "#1F4E79" : "#BDBDBD"}
                />
              </View>
              {idx < pengaturanToggle.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Pengaturan Menu */}
      <View style={styles.seksi}>
        <Text style={styles.judulSeksi}>Lainnya</Text>
        <View style={styles.kartu}>
          {pengaturanMenu.map((menu, idx) => (
            <View key={menu.id}>
              <TouchableOpacity style={styles.barisMenu} activeOpacity={0.7}>
                <Text style={styles.settingIkon}>{menu.ikon}</Text>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingJudul}>{menu.judul}</Text>
                  <Text style={styles.settingDeskripsi}>{menu.deskripsi}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
              {idx < pengaturanMenu.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Info Versi */}
      <View style={styles.seksi}>
        <View style={styles.kartuVersi}>
          <Text style={styles.versiJudul}>Aplikasi Mahasiswa</Text>
          <Text style={styles.versiTeks}>Versi 1.0.0 • Build 2024</Text>
          <TouchableOpacity style={styles.tombolUpdate}>
            <Text style={styles.tombolUpdateTeks}>Cek Pembaruan</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  headerInfo: {
    backgroundColor: "#1F4E79",
    padding: 16,
    paddingBottom: 20,
  },
  headerSub: {
    fontSize: 13,
    color: "#BDD7EE",
  },
  seksi: {
    padding: 16,
  },
  judulSeksi: {
    fontSize: 13,
    fontWeight: "700",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  kartu: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  barisToggle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  barisMenu: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  settingIkon: {
    fontSize: 22,
    marginRight: 12,
    width: 30,
    textAlign: "center",
  },
  settingInfo: {
    flex: 1,
  },
  settingJudul: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F4E79",
    marginBottom: 2,
  },
  settingDeskripsi: {
    fontSize: 12,
    color: "#888",
  },
  divider: {
    height: 1,
    backgroundColor: "#F5F5F5",
    marginLeft: 56,
  },
  chevron: {
    fontSize: 22,
    color: "#BDD7EE",
    fontWeight: "bold",
  },
  kartuVersi: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 2,
  },
  versiJudul: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1F4E79",
    marginBottom: 4,
  },
  versiTeks: {
    fontSize: 12,
    color: "#888",
    marginBottom: 14,
  },
  tombolUpdate: {
    backgroundColor: "#EBF3FB",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#BDD7EE",
  },
  tombolUpdateTeks: {
    color: "#1F4E79",
    fontWeight: "600",
    fontSize: 13,
  },
});
