import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const LEBAR_LAYAR = Dimensions.get("window").width;
// (lebar layar) - (padding kiri+kanan 8+8) - (gap antar kolom 8) dibagi 2
const LEBAR_KARTU = (LEBAR_LAYAR - 8 - 8 - 8) / 2;

// Nomor 2 — Data produk dengan minimal 8 item + field kategori, warna (placeholder), stok
const dataProduk = [
  {
    id: "1",
    nama: "Laptop Gaming",
    harga: 15000000,
    stok: 5,
    kategori: "Komputer",
    warna: "#2E75B6",
  },
  {
    id: "2",
    nama: "Mouse Wireless",
    harga: 250000,
    stok: 20,
    kategori: "Aksesori",
    warna: "#C55A11",
  },
  {
    id: "3",
    nama: "Keyboard Mech",
    harga: 800000,
    stok: 8,
    kategori: "Aksesori",
    warna: "#375623",
  },
  {
    id: "4",
    nama: 'Monitor 27"',
    harga: 4500000,
    stok: 3,
    kategori: "Komputer",
    warna: "#7B2C8E",
  },
  {
    id: "5",
    nama: "Webcam HD",
    harga: 600000,
    stok: 12,
    kategori: "Aksesori",
    warna: "#8B1A1A",
  },
  {
    id: "6",
    nama: "Router WiFi 6",
    harga: 1200000,
    stok: 7,
    kategori: "Jaringan",
    warna: "#1A5276",
  },
  {
    id: "7",
    nama: "Switch 24 Port",
    harga: 3500000,
    stok: 2,
    kategori: "Jaringan",
    warna: "#784212",
  },
  {
    id: "8",
    nama: "Printer Inkjet",
    harga: 2200000,
    stok: 6,
    kategori: "Cetak",
    warna: "#D35400",
  },
  {
    id: "9",
    nama: "SSD 1TB",
    harga: 1500000,
    stok: 15,
    kategori: "Komputer",
    warna: "#27AE60",
  },
  {
    id: "10",
    nama: "Toner Cartridge",
    harga: 450000,
    stok: 30,
    kategori: "Cetak",
    warna: "#8E44AD",
  },
];

// Nomor 4 — Daftar kategori untuk filter horizontal
const kategori = ["Semua", "Komputer", "Aksesori", "Jaringan", "Cetak"];

export default function DaftarProduk() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterKategori, setFilterKategori] = useState("Semua");

  // Nomor 3 — Loading state dengan useEffect dan simulasi delay 2000ms
  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(() => {
      if (isMounted) {
        setData(dataProduk);
        setLoading(false);
      }
    }, 5000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  // Data yang sudah difilter berdasarkan kategori yang aktif
  const dataFiltered =
    filterKategori === "Semua"
      ? data
      : data.filter((item) => item.kategori === filterKategori);

  // Tampilkan loading indicator
  if (isLoading) {
    return (
      <View style={styles.tengah}>
        <ActivityIndicator size="large" color="#2E75B6" />
        <Text style={styles.loadingTeks}>Memuat data produk...</Text>
      </View>
    );
  }

  // Tampilkan error jika ada
  if (error) {
    return (
      <View style={styles.tengah}>
        <Text style={styles.errorTeks}>Gagal memuat data</Text>
        <Text style={styles.errorSub}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Nomor 4 — FlatList horizontal sebagai filter kategori */}
      {/* Dibungkus View dengan tinggi tetap agar chip tidak melebar vertikal */}
      <View style={styles.chipContainer}>
        <FlatList
          data={kategori}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.chip, filterKategori === item && styles.chipAktif]}
              onPress={() => setFilterKategori(item)}
            >
              <Text
                style={
                  filterKategori === item
                    ? styles.chipTeksAktif
                    : styles.chipTeks
                }
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{
            paddingHorizontal: 12,
            paddingVertical: 10,
            gap: 8,
          }}
        />
      </View>

      {/* Nomor 1 — FlatList grid 2 kolom menggunakan numColumns={2} */}
      <FlatList
        data={dataFiltered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {/* Gambar placeholder berwarna unik per produk */}
            <View style={[styles.gambar, { backgroundColor: item.warna }]}>
              <Text style={styles.gambarTeks}>{item.nama[0]}</Text>
            </View>

            {/* Badge stok — merah jika hampir habis (≤5), hijau jika aman */}
            <View style={[styles.badge, item.stok <= 5 && styles.badgeMenipis]}>
              <Text style={styles.badgeTeks}>Stok: {item.stok}</Text>
            </View>

            <Text style={styles.nama} numberOfLines={2}>
              {item.nama}
            </Text>
            <Text style={styles.harga}>
              Rp {item.harga.toLocaleString("id-ID")}
            </Text>
            <Text style={styles.kategoriBadge}>{item.kategori}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 8, paddingBottom: 30 }}
        columnWrapperStyle={{
          gap: 8,
          marginBottom: 8,
          alignItems: "flex-start",
        }}
        ListEmptyComponent={
          <View style={styles.tengah}>
            <Text style={styles.loadingTeks}>
              Tidak ada produk di kategori ini.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  tengah: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingTeks: {
    color: "#888",
    fontSize: 14,
  },
  errorTeks: {
    color: "#D32F2F",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorSub: {
    color: "#888",
    fontSize: 13,
  },
  // Nomor 4 — Style chip filter
  chip: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  chipAktif: {
    backgroundColor: "#1F4E79",
    borderColor: "#1F4E79",
  },
  chipTeks: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500",
  },
  chipTeksAktif: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  chipContainer: {
    height: 54, // Tinggi tetap agar chip tidak melebar vertikal
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  // Nomor 1 — Style kartu produk grid
  item: {
    width: LEBAR_KARTU, // Lebar tetap (bukan flex:1) agar item ganjil tidak melebar penuh
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  // Nomor 2 — Gambar placeholder warna acak
  gambar: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  gambarTeks: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  // Nomor 2 — Badge stok
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#27AE60",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 6,
  },
  badgeMenipis: {
    backgroundColor: "#E74C3C",
  },
  badgeTeks: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  nama: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1F4E79",
    marginBottom: 4,
    minHeight: 36,
  },
  harga: {
    fontSize: 13,
    color: "#2E75B6",
    fontWeight: "600",
    marginBottom: 4,
  },
  kategoriBadge: {
    fontSize: 11,
    color: "#888",
    fontStyle: "italic",
  },
});
