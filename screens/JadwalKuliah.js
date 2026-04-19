import React from "react";
import { SectionList, View, Text, StyleSheet } from "react-native";

const jadwalKuliah = [
  {
    id: "1",
    title: "Senin",
    data: [
      {
        id: "1-1",
        jam: "08:00 - 09:40",
        matkul: "Pemrograman Mobile",
        ruang: "Lab Komputer 1",
      },
      {
        id: "1-2",
        jam: "10:00 - 11:40",
        matkul: "Kecerdasan Buatan",
        ruang: "Ruang 201",
      },
    ],
  },
  {
    id: "2",
    title: "Selasa",
    data: [
      {
        id: "2-1",
        jam: "08:00 - 09:40",
        matkul: "Basis Data Lanjut",
        ruang: "Lab Komputer 2",
      },
      {
        id: "2-2",
        jam: "13:00 - 14:40",
        matkul: "Jaringan Komputer",
        ruang: "Ruang 105",
      },
    ],
  },
  {
    id: "3",
    title: "Rabu",
    data: [
      {
        id: "3-1",
        jam: "09:00 - 11:30",
        matkul: "Sistem Operasi",
        ruang: "Ruang 203",
      },
      {
        id: "3-2",
        jam: "13:00 - 15:30",
        matkul: "Manajemen Proyek TI",
        ruang: "Ruang 102",
      },
      {
        id: "3-3",
        jam: "15:30 - 17:10",
        matkul: "Arsitektur Enterprise",
        ruang: "Ruang 104",
      },
    ],
  },
  {
    id: "4",
    title: "Kamis",
    data: [
      {
        id: "4-1",
        jam: "08:00 - 10:30",
        matkul: "UI/UX Design",
        ruang: "Lab Multimedia",
      },
      {
        id: "4-2",
        jam: "13:00 - 14:40",
        matkul: "Statistika Inferensial",
        ruang: "Ruang 304",
      },
    ],
  },
  {
    id: "5",
    title: "Jumat",
    data: [], // Kosong untuk mengetes state renderSectionFooter
  },
  {
    id: "6",
    title: "Sabtu",
    data: [], // kosong, akan muncul "Tidak ada jadwal"
  },
  {
    id: "7",
    title: "Minggu",
    data: [], // kosong, akan muncul "Tidak ada jadwal"
  },
];

const namaHari = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];
const hariIni = namaHari[new Date().getDay()];

export default function JadwalKuliah() {
  return (
    <View style={styles.container}>
      <SectionList
        sections={jadwalKuliah}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.jamKotak}>
              <Text style={styles.jam}>{item.jam.split(" - ")[0]}</Text>
              <Text style={styles.jamKecil}>{item.jam.split(" - ")[1]}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.matkul}>{item.matkul}</Text>
              <Text style={styles.ruang}>Ruang: {item.ruang}</Text>
            </View>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View
            style={[
              styles.sectionHeader,
              section.title === hariIni && styles.sectionHeaderAktif,
            ]}
          >
            <Text
              style={[
                styles.sectionTitle,
                section.title === hariIni && styles.sectionTitleAktif,
              ]}
            >
              {section.title}
              {section.title === hariIni ? "  (Hari Ini)" : ""}
            </Text>
            <Text
              style={[
                styles.sectionJumlah,
                section.title === hariIni && styles.sectionJumlahAktif,
              ]}
            >
              {section.data.length} mata kuliah
            </Text>
          </View>
        )}
        renderSectionFooter={({ section }) =>
          section.data.length === 0 ? (
            <View style={styles.sectionKosong}>
              <Text style={styles.kosongTeks}>Tidak ada jadwal</Text>
            </View>
          ) : null
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.headerList}>
            <Text style={styles.headerJudul}>Jadwal Kuliah</Text>
            <Text style={styles.headerSub}>Semester Genap 2026/2027</Text>
          </View>
        }
        stickySectionHeadersEnabled={true}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  headerList: {
    padding: 24,
    backgroundColor: "#1F4E79",
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#F39C12",
  },
  headerJudul: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 14,
    color: "#BDD7EE",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#34495E",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sectionHeaderAktif: {
    backgroundColor: "#F39C12",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  sectionTitleAktif: {
    color: "#FFFFFF",
  },
  sectionJumlah: {
    fontSize: 12,
    color: "#ECF0F1",
  },
  sectionJumlahAktif: {
    color: "#FFFFFF",
  },
  item: {
    flexDirection: "row",
    padding: 14,
    backgroundColor: "#FFF",
  },
  jamKotak: {
    width: 70,
    alignItems: "center",
    marginRight: 12,
  },
  jam: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2E75B6",
  },
  jamKecil: {
    fontSize: 11,
    color: "#AAA",
    marginTop: 2,
  },
  detail: {
    flex: 1,
  },
  matkul: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1F4E79",
  },
  ruang: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  sectionKosong: {
    padding: 14,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  kosongTeks: {
    color: "#CCC",
    fontStyle: "italic",
  },
});
