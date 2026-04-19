// screens/HalamanDetail.js
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
export default function HalamanDetail({ navigation, route }) {
  // Ambil params yang dikirim dari HalamanHome
  const { mahasiswa } = route.params;
  return (
    <ScrollView style={styles.container}>
      {/* Avatar + Nama */}
      <View style={styles.headerKartu}>
        <View
          style={[styles.avatarBesar, { backgroundColor: mahasiswa.warna }]}
        >
          <Text style={styles.avatarTeks}>{mahasiswa.inisial}</Text>
        </View>
        <Text style={styles.namaBesar}>{mahasiswa.nama}</Text>
        <Text style={styles.nimHeader}>{mahasiswa.nim}</Text>
      </View>
      {/* Informasi Akademik */}
      <View style={styles.kartuInfo}>
        <Text>Prodi : {mahasiswa.prodi}</Text>
        <Text>Angkatan: {mahasiswa.angkatan}</Text>
        <Text>IPK : {mahasiswa.ipk}</Text>
      </View>
      {/* Tombol Kembali */}
      <TouchableOpacity style={styles.tombolKembali} onPress={() => navigation.goBack()}>
        <Text style={styles.teksTombol}>Kembali ke Daftar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  headerKartu: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  avatarBesar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarTeks: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  namaBesar: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  nimHeader: {
    fontSize: 18,
    color: "#666",
  },
  kartuInfo: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },
  tombolKembali: {
    backgroundColor: "#1F4E79",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  teksTombol: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
