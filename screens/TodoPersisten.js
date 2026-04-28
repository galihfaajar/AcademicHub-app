import { useState, useEffect, useCallback } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ScrollView } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useFocusEffect } from '@react-navigation/native';
import { ambil } from '../utils/storage';
  
const STORAGE_KEY = '@todos_list'; 
const KEY_PREFERENSI = '@preferensi_user';
const KATEGORI = ['Pekerjaan', 'Belajar', 'Pribadi'];
  
export default function TodoPersisten() { 
  const [todos, setTodos]   = useState([]); 
  const [input, setInput]   = useState(''); 
  const [kategoriTerpilih, setKategoriTerpilih] = useState('Pekerjaan');
  const [filterKategori, setFilterKategori] = useState('Semua');
  const [isLoading, setLoading] = useState(true); 
  const [prefs, setPrefs] = useState({ temaDarkMode: false, ukuranFont: 'sedang' });

  // LOAD: Muat data saat pertama kali buka
  useEffect(() => { 
    const muatTodos = async () => { 
      try { 
        const rawTodos = await AsyncStorage.getItem(STORAGE_KEY); 
        if (rawTodos !== null) setTodos(JSON.parse(rawTodos)); 
      } catch (e) { 
        Alert.alert('Error', 'Gagal memuat data tersimpan'); 
      } finally { 
        setLoading(false); 
      } 
    }; 
    muatTodos(); 
  }, []); 

  // Muat Preferensi (Dark Mode & Font) setiap kali halaman difokuskan
  useFocusEffect(
    useCallback(() => {
      const muatPrefs = async () => {
        try {
          const rawPrefs = await ambil(KEY_PREFERENSI);
          if (rawPrefs) setPrefs(rawPrefs);
        } catch (e) {
          console.error("Gagal memuat preferensi", e);
        }
      };
      muatPrefs();
    }, [])
  );
  
  // SAVE: Simpan otomatis setiap todos berubah 
  useEffect(() => { 
    if (isLoading) return; 
    const simpanData = async () => { 
      try { 
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); 
      } catch (e) { 
        Alert.alert('Error', 'Gagal menyimpan data'); 
      } 
    }; 
    simpanData(); 
  }, [todos]); 
  
  const tambah = () => { 
    if (!input.trim()) return; 
    const baru = { 
      id: Date.now().toString(), 
      teks: input.trim(), 
      selesai: false, 
      kategori: kategoriTerpilih 
    }; 
    setTodos(prev => [...prev, baru]); 
    setInput(''); 
  }; 
  
  const toggle = (id) => { 
    setTodos(prev => prev.map(t => t.id === id ? { ...t, selesai: !t.selesai } : t)); 
  }; 
  
  const hapus = (id) => { 
    Alert.alert('Hapus', 'Yakin hapus tugas ini?', [ 
      { text: 'Batal', style: 'cancel' }, 
      { text: 'Hapus', style: 'destructive', onPress: () => setTodos(prev => prev.filter(t => t.id !== id)) }, 
    ]); 
  }; 

  // Filter Logic
  const filteredTodos = filterKategori === 'Semua' 
    ? todos 
    : todos.filter(t => t.kategori === filterKategori);

  // Dynamic Styles
  const bg = prefs.temaDarkMode ? '#1A1A2E' : '#F5F5F5';
  const fg = prefs.temaDarkMode ? '#FFFFFF' : '#1F4E79';
  const cardBg = prefs.temaDarkMode ? '#16213E' : '#FFFFFF';
  const inputBg = prefs.temaDarkMode ? '#0F3460' : '#FFFFFF';
  const inputText = prefs.temaDarkMode ? '#FFFFFF' : '#333';
  
  const getFontSize = (ukuran) => {
    switch (ukuran) {
      case 'kecil': return 14;
      case 'besar': return 22;
      default:      return 18;
    }
  };
  const fs = getFontSize(prefs.ukuranFont);
  
  if (isLoading) return <View style={[styles.tengah, { backgroundColor: bg }]}><Text style={{ color: fg }}>Memuat...</Text></View>; 
  
  return ( 
    <View style={[styles.container, { backgroundColor: bg }]}> 
      <Text style={[styles.judul, { color: fg, fontSize: fs + 7 }]}>Tugas Saya ({todos.filter(t => !t.selesai).length} tersisa)</Text> 
      
      {/* Input Section */}
      <View style={[styles.inputCard, { backgroundColor: cardBg }]}>
        <View style={styles.inputRow}> 
          <TextInput 
            style={[styles.input, { backgroundColor: inputBg, color: inputText, fontSize: fs }]} 
            value={input} 
            onChangeText={setInput} 
            placeholder='Tambah tugas baru...' 
            placeholderTextColor={prefs.temaDarkMode ? '#888' : '#AAA'}
            onSubmitEditing={tambah} 
            returnKeyType='done' 
          /> 
          <TouchableOpacity style={styles.tombolTambah} onPress={tambah}> 
            <Text style={styles.tombolTeks}>+</Text> 
          </TouchableOpacity> 
        </View>

        {/* Category Selector for New Todo */}
        <View style={styles.chipRow}>
          {KATEGORI.map(kat => (
            <TouchableOpacity 
              key={kat} 
              onPress={() => setKategoriTerpilih(kat)}
              style={[styles.chip, kategoriTerpilih === kat && styles.chipAktif, { backgroundColor: kategoriTerpilih === kat ? '#2E75B6' : (prefs.temaDarkMode ? '#0F3460' : '#EEE') }]}
            >
              <Text style={[styles.chipTeks, kategoriTerpilih === kat && styles.chipTeksAktif, { fontSize: fs - 3 }]}>{kat}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Filter Section */}
      <Text style={[styles.labelFilter, { color: fg, fontSize: fs }]}>Filter Kategori:</Text>
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {['Semua', ...KATEGORI].map(kat => (
            <TouchableOpacity 
              key={kat} 
              onPress={() => setFilterKategori(kat)}
              style={[styles.filterChip, filterKategori === kat && styles.filterChipAktif, { borderColor: fg }]}
            >
              <Text style={[styles.filterChipTeks, filterKategori === kat && styles.filterChipTeksAktif, { color: filterKategori === kat ? '#FFF' : fg, fontSize: fs - 2 }]}>{kat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList 
        data={filteredTodos} 
        keyExtractor={item => item.id} 
        renderItem={({ item }) => ( 
          <View style={[styles.item, { backgroundColor: cardBg }, item.selesai && styles.itemSelesai]}> 
            <TouchableOpacity onPress={() => toggle(item.id)} style={{ flex: 1 }}> 
              <View>
                <Text style={[styles.itemTeks, { color: fg, fontSize: fs }, item.selesai && styles.itemTeksSelesai]}> 
                  {item.selesai ? '☑ ' : '☐ '}{item.teks} 
                </Text> 
                <Text style={[styles.itemKategori, { color: prefs.temaDarkMode ? '#BDD7EE' : '#2E75B6', fontSize: fs - 4 }]}>{item.kategori}</Text>
              </View>
            </TouchableOpacity> 
            <TouchableOpacity onPress={() => hapus(item.id)}> 
              <Text style={styles.tombolHapus}>Hapus</Text> 
            </TouchableOpacity> 
          </View> 
        )} 
        ListEmptyComponent={<Text style={[styles.kosong, { fontSize: fs }]}>Belum ada tugas.</Text>} 
        contentContainerStyle={{ paddingBottom: 20 }}
      /> 
    </View> 
  ); 
} 
  
const styles = StyleSheet.create({ 
  container:      { flex: 1, padding: 16, paddingTop: 50 }, 
  tengah:         { flex: 1, justifyContent: 'center', alignItems: 'center' }, 
  judul:          { fontWeight: 'bold', marginBottom: 16 }, 
  inputCard:      { padding: 12, borderRadius: 12, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  inputRow:       { flexDirection: 'row', gap: 8, marginBottom: 12 }, 
  input:          { flex: 1, borderWidth: 1, borderColor: '#DDD', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 }, 
  tombolTambah:   { backgroundColor: '#2E75B6', borderRadius: 8, width: 44, justifyContent: 'center', alignItems: 'center' }, 
  tombolTeks:     { color: '#FFF', fontSize: 24, fontWeight: 'bold' }, 
  chipRow:        { flexDirection: 'row', gap: 8 },
  chip:           { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15, borderWidth: 1, borderColor: 'transparent' },
  chipAktif:      { borderColor: '#2E75B6' },
  chipTeks:       { color: '#888' },
  chipTeksAktif:  { color: '#FFF', fontWeight: 'bold' },
  labelFilter:    { fontWeight: 'bold', marginBottom: 10 },
  filterRow:      { marginBottom: 16 },
  filterChip:     { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  filterChipAktif:{ backgroundColor: '#1F4E79', borderColor: '#1F4E79' },
  filterChipTeks: { fontWeight: '500' },
  filterChipTeksAktif: { color: '#FFF' },
  item:           { flexDirection: 'row', alignItems: 'center', borderRadius: 8, padding: 12, marginBottom: 8, elevation: 1 }, 
  itemSelesai:    { opacity: 0.6 }, 
  itemTeks:       { fontWeight: '500' }, 
  itemTeksSelesai:{ textDecorationLine: 'line-through', color: '#AAA' }, 
  itemKategori:   { marginTop: 4, fontWeight: 'bold' },
  tombolHapus:    { color: '#D32F2F', fontSize: 13, fontWeight: '600' }, 
  kosong:         { textAlign: 'center', color: '#AAA', marginTop: 40, fontStyle: 'italic' }, 
});
