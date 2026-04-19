// screens/HalamanHome.js
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const dataMahasiswa = [
  {
    id: "1",
    nama: "Andi Wijaya",
    nim: "20230001",
    prodi: "Teknik Informatika",
    angkatan: "2023",
    ipk: "3.85",
    inisial: "AW",
    warna: "#2E75B6",
  },
  {
    id: "2",
    nama: "Sari Indah Permata",
    nim: "20230002",
    prodi: "Sistem Informasi",
    angkatan: "2023",
    ipk: "3.72",
    inisial: "SI",
    warna: "#C55A11",
  },
  {
    id: "3",
    nama: "Budi Santoso",
    nim: "20230003",
    prodi: "Teknik Informatika",
    angkatan: "2023",
    ipk: "3.60",
    inisial: "BS",
    warna: "#375623",
  },
  {
    id: "4",
    nama: "Dewi Rahayu",
    nim: "20230004",
    prodi: "Manajemen Informatika",
    angkatan: "2023",
    ipk: "3.91",
    inisial: "DR",
    warna: "#7B2C8E",
  },
  {
    id: "5",
    nama: "Fajar Nugroho",
    nim: "20230005",
    prodi: "Teknik Komputer",
    angkatan: "2023",
    ipk: "3.55",
    inisial: "FN",
    warna: "#8B1A1A",
  },
  {
    id: "6",
    nama: "Gita Lestari",
    nim: "20230006",
    prodi: "Sistem Informasi",
    angkatan: "2023",
    ipk: "3.78",
    inisial: "GL",
    warna: "#1A5276",
  },
  {
    id: "7",
    nama: "Hendra Saputra",
    nim: "20230007",
    prodi: "Teknik Informatika",
    angkatan: "2023",
    ipk: "3.45",
    inisial: "HS",
    warna: "#784212",
  },
];
export default function HalamanHome({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {dataMahasiswa.map((mhs) => (
        <TouchableOpacity
          key={mhs.id}
          style={styles.kartuMahasiswa}
          onPress={() => navigation.navigate("Detail", { mahasiswa: mhs })}
        >
          <View style={[styles.avatar, { backgroundColor: mhs.warna }]}>
            <Text style={styles.avatarTeks}>{mhs.inisial}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.namaMhs}>{mhs.nama}</Text>
            <Text style={styles.nimMhs}>NIM: {mhs.nim}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  kartuMahasiswa: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarTeks: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoContainer: {
    flex: 1,
  },
  namaMhs: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  nimMhs: {
    fontSize: 14,
    color: "#666",
  },
});
