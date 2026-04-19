// screens/HalamanTentang.js
// Halaman Tentang Aplikasi — Praktikum C (Drawer Navigator)

import { View, Text, StyleSheet, ScrollView } from "react-native";

const fiturAplikasi = [
  {
    ikon: "👥",
    judul: "Manajemen Mahasiswa",
    deskripsi: "Kelola data mahasiswa dengan mudah",
  },
  {
    ikon: "🗂️",
    judul: "Multi Navigator",
    deskripsi: "Stack, Tab, dan Drawer Navigator",
  },
  {
    ikon: "📱",
    judul: "React Native + Expo",
    deskripsi: "Dibangun dengan teknologi modern",
  },
  {
    ikon: "🎨",
    judul: "UI yang Bersih",
    deskripsi: "Desain antarmuka yang intuitif",
  },
];

export default function HalamanTentang() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoIkon}>🎓</Text>
        </View>
        <Text style={styles.namaAplikasi}>Aplikasi Mahasiswa</Text>
        <Text style={styles.versi}>Versi 1.0.0</Text>
        <Text style={styles.deskripsi}>
          Aplikasi manajemen data mahasiswa yang dibangun menggunakan React
          Native dengan Expo sebagai bagian dari praktikum Pemrograman Mobile —
          Pertemuan 3.
        </Text>
      </View>

      {/* Fitur */}
      <View style={styles.seksi}>
        <Text style={styles.judulSeksi}>Fitur Utama</Text>
        {fiturAplikasi.map((fitur, idx) => (
          <View key={idx} style={styles.kartuFitur}>
            <Text style={styles.fiturIkon}>{fitur.ikon}</Text>
            <View style={styles.fiturInfo}>
              <Text style={styles.fiturJudul}>{fitur.judul}</Text>
              <Text style={styles.fiturDeskripsi}>{fitur.deskripsi}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Info Developer */}
      <View style={styles.seksi}>
        <Text style={styles.judulSeksi}>Informasi</Text>
        <View style={styles.kartuInfo}>
          <View style={styles.barisInfo}>
            <Text style={styles.labelInfo}>Mata Kuliah</Text>
            <Text style={styles.nilaiInfo}>Pemrograman Mobile</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.barisInfo}>
            <Text style={styles.labelInfo}>Pertemuan</Text>
            <Text style={styles.nilaiInfo}>3 — Navigasi</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.barisInfo}>
            <Text style={styles.labelInfo}>Teknologi</Text>
            <Text style={styles.nilaiInfo}>React Native + Expo</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.barisInfo}>
            <Text style={styles.labelInfo}>Library</Text>
            <Text style={styles.nilaiInfo}>React Navigation v6</Text>
          </View>
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
  hero: {
    backgroundColor: "#1F4E79",
    padding: 30,
    alignItems: "center",
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  logoIkon: {
    fontSize: 40,
  },
  namaAplikasi: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  versi: {
    fontSize: 12,
    color: "#BDD7EE",
    marginBottom: 14,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 10,
  },
  deskripsi: {
    fontSize: 13,
    color: "#BDD7EE",
    textAlign: "center",
    lineHeight: 20,
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
  kartuFitur: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  fiturIkon: {
    fontSize: 24,
    marginRight: 14,
    width: 32,
    textAlign: "center",
  },
  fiturInfo: {
    flex: 1,
  },
  fiturJudul: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F4E79",
    marginBottom: 2,
  },
  fiturDeskripsi: {
    fontSize: 12,
    color: "#888",
  },
  kartuNavigasi: {
    backgroundColor: "#1A1A2E",
    borderRadius: 10,
    padding: 16,
    elevation: 2,
  },
  kodeNavigasi: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#A8DADC",
    lineHeight: 22,
  },
  kartuInfo: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  barisInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  labelInfo: {
    fontSize: 13,
    color: "#888",
  },
  nilaiInfo: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1F4E79",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
});
