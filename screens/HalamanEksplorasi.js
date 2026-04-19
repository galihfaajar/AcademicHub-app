// screens/HalamanEksplorasi.js
// Halaman tab Eksplorasi — Praktikum B
// Menampilkan fitur eksplorasi/pencarian sederhana

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const kategori = [
  { id: "1", nama: "Teknik Informatika", ikon: "💻", jumlah: 120 },
  { id: "2", nama: "Sistem Informasi", ikon: "📊", jumlah: 95 },
  { id: "3", nama: "Teknik Komputer", ikon: "🖥️", jumlah: 80 },
  { id: "4", nama: "Manajemen Informatika", ikon: "📋", jumlah: 110 },
  { id: "5", nama: "Ilmu Komputer", ikon: "🔬", jumlah: 75 },
  { id: "6", nama: "Rekayasa Perangkat Lunak", ikon: "⚙️", jumlah: 88 },
];

const fiturPopuler = [
  {
    id: "1",
    judul: "Jadwal Kuliah",
    ikon: "📅",
    deskripsi: "Lihat jadwal minggu ini",
  },
  {
    id: "2",
    judul: "Nilai Akademik",
    ikon: "📝",
    deskripsi: "Cek transkrip nilai",
  },
  {
    id: "3",
    judul: "Beasiswa",
    ikon: "🎓",
    deskripsi: "Info beasiswa tersedia",
  },
  { id: "4", judul: "Perpustakaan", ikon: "📚", deskripsi: "Akses e-library" },
];

export default function HalamanEksplorasi() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Banner Eksplorasi */}
      <View style={styles.banner}>
        <Text style={styles.bannerJudul}>🔍 Eksplorasi</Text>
        <Text style={styles.bannerSub}>
          Temukan informasi akademik yang kamu butuhkan
        </Text>
      </View>

      {/* Fitur Cepat */}
      <View style={styles.seksi}>
        <Text style={styles.judulSeksi}>Akses Cepat</Text>
        <View style={styles.gridFitur}>
          {fiturPopuler.map((fitur) => (
            <TouchableOpacity
              key={fitur.id}
              style={styles.kartuFitur}
              activeOpacity={0.8}
            >
              <Text style={styles.fiturIkon}>{fitur.ikon}</Text>
              <Text style={styles.fiturJudul}>{fitur.judul}</Text>
              <Text style={styles.fiturDeskripsi}>{fitur.deskripsi}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Daftar Prodi */}
      <View style={styles.seksi}>
        <Text style={styles.judulSeksi}>Program Studi</Text>
        {kategori.map((kat) => (
          <TouchableOpacity
            key={kat.id}
            style={styles.kartuProdi}
            activeOpacity={0.75}
          >
            <Text style={styles.prodiIkon}>{kat.ikon}</Text>
            <View style={styles.prodiInfo}>
              <Text style={styles.prodiNama}>{kat.nama}</Text>
              <Text style={styles.prodiJumlah}>{kat.jumlah} mahasiswa</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
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
  banner: {
    backgroundColor: "#2E75B6",
    padding: 24,
    paddingTop: 30,
    paddingBottom: 28,
  },
  bannerJudul: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  bannerSub: {
    fontSize: 13,
    color: "#BDD7EE",
  },
  seksi: {
    padding: 16,
  },
  judulSeksi: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F4E79",
    marginBottom: 12,
  },
  gridFitur: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  kartuFitur: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    width: "47%",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  fiturIkon: {
    fontSize: 28,
    marginBottom: 8,
  },
  fiturJudul: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1F4E79",
    marginBottom: 2,
  },
  fiturDeskripsi: {
    fontSize: 11,
    color: "#888",
  },
  kartuProdi: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  prodiIkon: {
    fontSize: 24,
    marginRight: 12,
  },
  prodiInfo: {
    flex: 1,
  },
  prodiNama: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F4E79",
  },
  prodiJumlah: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  chevron: {
    fontSize: 22,
    color: "#BDD7EE",
    fontWeight: "bold",
  },
});
