import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, FlatList,
  ActivityIndicator, StyleSheet, TouchableOpacity
} from 'react-native';
import { useDebounce } from '../hooks/useDebounce';

// Simulasi pencarian ke API
const simulasiCari = (query) => {
  const semuaData = [
    'Pemrograman Mobile',
    'Pemrograman Web',
    'Basis Data',
    'Kecerdasan Buatan',
    'Jaringan Komputer',
    'Sistem Operasi',
    'Algoritma & Struktur Data',
    'Rekayasa Perangkat Lunak',
  ];
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(semuaData.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      ));
    }, 500);
  });
};

export default function SearchDebounce() {
  const [query, setQuery]       = useState('');
  const [hasil, setHasil]       = useState([]);
  const [isSearching, setSearch]= useState(false);
  const [delay, setDelay]       = useState(500);

  // MATERI 4.3
  const debouncedQuery = useDebounce(query, delay);

  // Effect ini hanya berjalan saat debouncedQuery berubah
  // (yaitu setelah delay ms user berhenti mengetik)
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setHasil([]);
      setSearch(false);
      return;
    }

    setSearch(true);
    simulasiCari(debouncedQuery).then(data => {
      setHasil(data);
      setSearch(false);
    });
  }, [debouncedQuery]);

  // Tampilkan loading indicator segera saat user mulai mengetik
  useEffect(() => {
    if (query.trim() && query !== debouncedQuery) {
      setSearch(true);
    }
  }, [query]);

  return (
    <View style={styles.container}>
      <Text style={styles.judul}>🔍 Cari Mata Kuliah</Text>
      <Text style={styles.subjudul}>
        Debounce delay: <Text style={styles.highlight}>{delay}ms</Text>
      </Text>

      {/* Kontrol delay debounce */}
      <View style={styles.delayRow}>
        {[300, 500, 1000].map(d => (
          <TouchableOpacity
            key={d}
            style={[styles.delayBtn, delay === d && styles.delayBtnAktif]}
            onPress={() => setDelay(d)}
          >
            <Text style={[styles.delayTeks, delay === d && styles.delayTeksAktif]}>
              {d}ms
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder='Ketik nama mata kuliah...'
        placeholderTextColor='#AAA'
      />

      {isSearching && (
        <View style={styles.searching}>
          <ActivityIndicator size='small' color='#2E75B6' />
          <Text style={styles.searchingTeks}>Mencari... (menunggu {delay}ms debounce)</Text>
        </View>
      )}

      <FlatList
        data={hasil}
        keyExtractor={(item, i) => String(i)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTeks}>📚 {item}</Text>
          </View>
        )}
        ListEmptyComponent={
          !isSearching && query.trim() ? (
            <Text style={styles.kosong}>Tidak ada hasil untuk '{query}'</Text>
          ) : !query.trim() ? (
            <Text style={styles.kosongDefault}>Mulai ketik untuk mencari mata kuliah</Text>
          ) : null
        }
      />

      {/* Info box tentang useDebounce */}
      <View style={styles.infoBox}>
        <Text style={styles.infoJudul}>ℹ️ Materi 4.3 — Custom Hook</Text>
        <Text style={styles.infoTeks}>
          Komponen ini menggunakan custom hook{' '}
          <Text style={styles.kode}>useDebounce(query, {delay})</Text>
          {'\n'}alih-alih setTimeout langsung di dalam komponen.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, padding: 16, paddingTop: 20, backgroundColor: '#F5F5F5' },
  judul:           { fontSize: 22, fontWeight: 'bold', color: '#1F4E79', marginBottom: 4 },
  subjudul:        { fontSize: 13, color: '#888', marginBottom: 10 },
  highlight:       { color: '#2E75B6', fontWeight: 'bold' },

  delayRow:        { flexDirection: 'row', gap: 8, marginBottom: 12 },
  delayBtn:        { flex: 1, borderWidth: 1.5, borderColor: '#2E75B6', borderRadius: 8, padding: 8, alignItems: 'center' },
  delayBtnAktif:   { backgroundColor: '#2E75B6' },
  delayTeks:       { color: '#2E75B6', fontWeight: 'bold', fontSize: 13 },
  delayTeksAktif:  { color: '#FFF' },

  input:           { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 12, fontSize: 15, marginBottom: 12, color: '#333' },
  searching:       { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  searchingTeks:   { color: '#888', fontSize: 13 },

  item:            { backgroundColor: '#FFF', padding: 14, borderRadius: 8, marginBottom: 6, elevation: 1 },
  itemTeks:        { fontSize: 15, color: '#1F4E79' },
  kosong:          { textAlign: 'center', color: '#AAA', marginTop: 20, fontStyle: 'italic' },
  kosongDefault:   { textAlign: 'center', color: '#BBB', marginTop: 20 },

  infoBox:         { backgroundColor: '#E8F4FD', borderRadius: 10, padding: 14, marginTop: 10, borderLeftWidth: 4, borderLeftColor: '#2E75B6' },
  infoJudul:       { fontWeight: 'bold', color: '#1F4E79', marginBottom: 6 },
  infoTeks:        { color: '#444', fontSize: 13, lineHeight: 20 },
  kode:            { fontFamily: 'monospace', color: '#2E75B6', fontWeight: 'bold' },
});
