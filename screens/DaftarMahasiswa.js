import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  RefreshControl,
  SafeAreaView,
} from "react-native";

const dataMahasiswaAwal = [
  {
    id: "1",
    nama: "Andi Wijaya",
    nim: "20240001",
    prodi: "Teknologi Pangan",
    angkatan: "2024",
    ipk: "3.85",
    inisial: "AW",
    warna: "#2E75B6",
  },
  {
    id: "2",
    nama: "Sari Indah Permata",
    nim: "20240002",
    prodi: "Bioteknologi",
    angkatan: "2024",
    ipk: "3.72",
    inisial: "SI",
    warna: "#C55A11",
  },
  {
    id: "3",
    nama: "Budi Santoso",
    nim: "20240003",
    prodi: "Ilmu Lingkungan",
    angkatan: "2024",
    ipk: "3.60",
    inisial: "BS",
    warna: "#375623",
  },
  {
    id: "4",
    nama: "Dewi Rahayu",
    nim: "20240004",
    prodi: "Informatika",
    angkatan: "2024",
    ipk: "3.91",
    inisial: "DR",
    warna: "#7B2C8E",
  },
  {
    id: "5",
    nama: "Fajar Nugroho",
    nim: "20240005",
    prodi: "Sains Data",
    angkatan: "2024",
    ipk: "3.55",
    inisial: "FN",
    warna: "#8B1A1A",
  },
  {
    id: "6",
    nama: "Gita Lestari",
    nim: "20240006",
    prodi: "Teknologi Pangan",
    angkatan: "2024",
    ipk: "3.78",
    inisial: "GL",
    warna: "#1A5276",
  },
  {
    id: "7",
    nama: "Hendra Saputra",
    nim: "20240007",
    prodi: "Bioteknologi",
    angkatan: "2024",
    ipk: "3.45",
    inisial: "HS",
    warna: "#784212",
  },
  {
    id: "8",
    nama: "Intan Permatasari",
    nim: "20240008",
    prodi: "Ilmu Lingkungan",
    angkatan: "2024",
    ipk: "3.68",
    inisial: "IP",
    warna: "#D35400",
  },
  {
    id: "9",
    nama: "Joko Anwar",
    nim: "20240009",
    prodi: "Informatika",
    angkatan: "2024",
    ipk: "3.80",
    inisial: "JA",
    warna: "#27AE60",
  },
  {
    id: "10",
    nama: "Kirana Maharani",
    nim: "20240010",
    prodi: "Sains Data",
    angkatan: "2024",
    ipk: "3.95",
    inisial: "KM",
    warna: "#8E44AD",
  },
  {
    id: "11",
    nama: "Lukman Hakim",
    nim: "20240011",
    prodi: "Teknologi Pangan",
    angkatan: "2024",
    ipk: "3.40",
    inisial: "LH",
    warna: "#2C3E50",
  },
  {
    id: "12",
    nama: "Maya Sari",
    nim: "20240012",
    prodi: "Bioteknologi",
    angkatan: "2024",
    ipk: "3.88",
    inisial: "MS",
    warna: "#E67E22",
  },
];

const daftarProdi = [
  "Semua",
  ...new Set(dataMahasiswaAwal.map((item) => item.prodi)),
];

export default function DaftarMahasiswa({ navigation }) {
  const [data, setData] = useState(dataMahasiswaAwal);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProdi, setFilterProdi] = useState("Semua");
  const [isRefreshing, setRefreshing] = useState(false);

  // Simulasi refresh data menggunakan useCallback sesuai materi 1.4
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setData(dataMahasiswaAwal);
      setSearchQuery("");
      setFilterProdi("Semua");
      setRefreshing(false);
    }, 1500);
  }, []);

  // Filter data berdasarkan kata kunci pencarian (nama atau nim) dan prodi
  const dataFiltered = data.filter((item) => {
    const cocokNama =
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nim.includes(searchQuery);
    const cocokProdi = filterProdi === "Semua" || item.prodi === filterProdi;
    return cocokNama && cocokProdi;
  });

  // Komponen untuk me-render setiap item kartu mahasiswa
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.kartuMahasiswa}
      onPress={() => navigation.navigate("Detail", { mahasiswa: item })}
    >
      <View style={[styles.avatar, { backgroundColor: item.warna }]}>
        <Text style={styles.avatarTeks}>{item.inisial}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.namaMhs}>{item.nama}</Text>
        <Text style={styles.nimMhs}>NIM: {item.nim}</Text>
        <Text style={styles.prodiMhs}>{item.prodi}</Text>
      </View>
      <Text style={styles.ipkMhs}>⭐ {item.ipk}</Text>
    </TouchableOpacity>
  );

  // Komponen Empty State saat data tidak ditemukan
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>😕</Text>
      <Text style={styles.emptyTitle}>Data Tidak Ditemukan</Text>
      <Text style={styles.emptyTeks}>
        Coba ubah kata kunci pencarian atau kategori filter.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari nama mahasiswa..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery("")}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>✖</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Horizontal */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={daftarProdi}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const isActive = filterProdi === item;
            return (
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  isActive && styles.filterButtonActive,
                ]}
                onPress={() => setFilterProdi(item)}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive && styles.filterTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>

      {/* FlatList Utama */}
      <FlatList
        data={dataFiltered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyComponent}
        ListHeaderComponent={
          <Text style={styles.total}>
            Menampilkan {dataFiltered.length} mahasiswa
          </Text>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={["#1F4E79"]}
            tintColor={"#1F4E79"}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    color: "#999",
    fontSize: 16,
  },
  filterContainer: {
    marginBottom: 12,
  },
  filterButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  filterButtonActive: {
    backgroundColor: "#1F4E79",
    borderColor: "#1F4E79",
  },
  filterText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  kartuMahasiswa: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarTeks: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoContainer: {
    flex: 1,
  },
  namaMhs: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F4E79",
    marginBottom: 2,
  },
  nimMhs: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  prodiMhs: {
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
  },
  ipkMhs: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F39C12",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F4E79",
    marginBottom: 8,
  },
  emptyTeks: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 32,
  },
  total: {
    fontSize: 13,
    color: "#888",
    paddingHorizontal: 16,
    paddingVertical: 8,
    textAlign: "center",
    marginBottom: 8,
  },
  separator: {
    height: 12, // Spasi digantikan oleh separator ini
    backgroundColor: "transparent",
  },
});
