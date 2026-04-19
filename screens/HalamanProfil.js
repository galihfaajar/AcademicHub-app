// screens/HalamanProfil.js
// Halaman tab Profil — Praktikum B
// Menampilkan profil diri mahasiswa

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const profilMahasiswa = {
  nama: "Galih Fajar Nugroho",
  nim: "247411017",
  prodi: "Sains Data",
  angkatan: "2024",
  ipk: "3.90",
  semester: "4",
  email: "247411017@mhs.uinsaid.ac.id",
  noHp: "08123456789",
  alamat: "Surakarta, Jawa Tengah",
  inisial: "GFN",
};

const statistik = [
  { label: "SKS Diambil", nilai: "98", ikon: "📖" },
  { label: "Semester", nilai: "4", ikon: "📅" },
  { label: "IPK", nilai: "3.90", ikon: "⭐" },
  { label: "Kehadiran", nilai: "100%", ikon: "✅" },
];

const menuProfil = [
  { id: "1", judul: "Transkrip Nilai", ikon: "📝", sub: "Lihat rekap nilai" },
  { id: "2", judul: "Kartu Mahasiswa", ikon: "🪪", sub: "KTM Digital" },
  {
    id: "3",
    judul: "Riwayat Pembayaran",
    ikon: "💳",
    sub: "Tagihan & pembayaran",
  },
  { id: "4", judul: "Ubah Password", ikon: "🔒", sub: "Keamanan akun" },
  { id: "5", judul: "Bantuan", ikon: "❓", sub: "FAQ & kontak support" },
];

export default function HalamanProfil() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Profil */}
      <View style={styles.headerProfil}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTeks}>{profilMahasiswa.inisial}</Text>
          </View>
          <View style={styles.badgeAktif}>
            <Text style={styles.badgeAktifTeks}>Aktif</Text>
          </View>
        </View>
        <Text style={styles.namaProfil}>{profilMahasiswa.nama}</Text>
        <Text style={styles.nimProfil}>{profilMahasiswa.nim}</Text>
        <View style={styles.badgeProdi}>
          <Text style={styles.badgeProdiTeks}>{profilMahasiswa.prodi}</Text>
        </View>
      </View>

      {/* Statistik */}
      <View style={styles.gridStatistik}>
        {statistik.map((stat, idx) => (
          <View key={idx} style={styles.kartuStatistik}>
            <Text style={styles.statIkon}>{stat.ikon}</Text>
            <Text style={styles.statNilai}>{stat.nilai}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Info Kontak */}
      <View style={styles.kartuKontak}>
        <Text style={styles.kartuJudul}>Informasi Kontak</Text>
        <View style={styles.barisKontak}>
          <Text style={styles.kontakIkon}>📧</Text>
          <Text style={styles.kontakTeks}>{profilMahasiswa.email}</Text>
        </View>
        <View style={styles.barisKontak}>
          <Text style={styles.kontakIkon}>📱</Text>
          <Text style={styles.kontakTeks}>{profilMahasiswa.noHp}</Text>
        </View>
        <View style={styles.barisKontak}>
          <Text style={styles.kontakIkon}>📍</Text>
          <Text style={styles.kontakTeks}>{profilMahasiswa.alamat}</Text>
        </View>
      </View>

      {/* Menu Profil */}
      <View style={styles.seksiMenu}>
        <Text style={styles.judulSeksi}>Menu</Text>
        {menuProfil.map((menu) => (
          <TouchableOpacity
            key={menu.id}
            style={styles.itemMenu}
            activeOpacity={0.75}
          >
            <Text style={styles.menuIkon}>{menu.ikon}</Text>
            <View style={styles.menuInfo}>
              <Text style={styles.menuJudul}>{menu.judul}</Text>
              <Text style={styles.menuSub}>{menu.sub}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tombol Keluar */}
      <View style={styles.seksiKeluar}>
        <TouchableOpacity style={styles.tombolKeluar} activeOpacity={0.8}>
          <Text style={styles.tombolKeluarTeks}>🚪 Keluar / Logout</Text>
        </TouchableOpacity>
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
  headerProfil: {
    backgroundColor: "#1F4E79",
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#2E75B6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.4)",
  },
  avatarTeks: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  badgeAktif: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "#1F4E79",
  },
  badgeAktifTeks: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "bold",
  },
  namaProfil: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  nimProfil: {
    fontSize: 13,
    color: "#BDD7EE",
    marginBottom: 10,
  },
  badgeProdi: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  badgeProdiTeks: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  gridStatistik: {
    flexDirection: "row",
    padding: 12,
    gap: 8,
  },
  kartuStatistik: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    elevation: 2,
  },
  statIkon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statNilai: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F4E79",
  },
  statLabel: {
    fontSize: 10,
    color: "#888",
    textAlign: "center",
    marginTop: 2,
  },
  kartuKontak: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 12,
    marginBottom: 12,
    elevation: 2,
  },
  kartuJudul: {
    fontSize: 13,
    fontWeight: "700",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  barisKontak: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  kontakIkon: {
    fontSize: 16,
    marginRight: 10,
    width: 24,
  },
  kontakTeks: {
    fontSize: 13,
    color: "#444",
    flex: 1,
  },
  seksiMenu: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  judulSeksi: {
    fontSize: 13,
    fontWeight: "700",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  itemMenu: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },
  menuIkon: {
    fontSize: 20,
    marginRight: 12,
    width: 28,
    textAlign: "center",
  },
  menuInfo: {
    flex: 1,
  },
  menuJudul: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F4E79",
  },
  menuSub: {
    fontSize: 11,
    color: "#888",
    marginTop: 1,
  },
  chevron: {
    fontSize: 22,
    color: "#BDD7EE",
    fontWeight: "bold",
  },
  seksiKeluar: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  tombolKeluar: {
    backgroundColor: "#FFF0F0",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFCDD2",
  },
  tombolKeluarTeks: {
    color: "#C62828",
    fontWeight: "bold",
    fontSize: 14,
  },
});
