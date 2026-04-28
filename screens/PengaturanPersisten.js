import { useState, useEffect } from 'react'; 
import { View, Text, Switch, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native'; 
import { simpan, ambil, hapus } from '../utils/storage';
  
const KEY_PREFERENSI = '@preferensi_user'; 
  
const PREFERENSI_DEFAULT = { 
  temaDarkMode:   false, 
  notifikasi:     true, 
  bahasa:         'Indonesia', 
  ukuranFont:     'sedang', 
  tampilIPK:      true,
}; 
  
export default function PengaturanPersisten() { 
  const [prefs, setPrefs] = useState(PREFERENSI_DEFAULT); 
  
  // Muat preferensi saat pertama kali buka 
  useEffect(() => { 
    const muat = async () => { 
      const data = await ambil(KEY_PREFERENSI); 
      if (data) setPrefs({ ...PREFERENSI_DEFAULT, ...data }); 
    }; 
    muat(); 
  }, []); 
  
  // Simpan saat preferensi berubah 
  const updatePrefs = async (key, value) => { 
    const baru = { ...prefs, [key]: value }; 
    setPrefs(baru); 
    await simpan(KEY_PREFERENSI, baru); 
  }; 

  const resetDefault = async () => {
    Alert.alert('Reset', 'Kembalikan ke pengaturan awal?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: async () => {
          await hapus(KEY_PREFERENSI);
          setPrefs(PREFERENSI_DEFAULT);
        }
      },
    ]);
  };
  
  const bg = prefs.temaDarkMode ? '#1A1A2E' : '#F0F4F8'; 
  const fg = prefs.temaDarkMode ? '#FFFFFF' : '#1F4E79'; 
  const cardBg = prefs.temaDarkMode ? '#16213E' : '#FFFFFF';

  const getFontSize = (ukuran) => {
    switch (ukuran) {
      case 'kecil': return 12;
      case 'besar': return 22;
      default:      return 16;
    }
  };
  const fs = getFontSize(prefs.ukuranFont);
  
  return ( 
    <ScrollView style={[styles.container, { backgroundColor: bg }]}> 
      <Text style={[styles.judul, { color: fg }]}>Pengaturan Persisten</Text> 
  
      <View style={[styles.kartu, { backgroundColor: cardBg }]}>
        {/* Dark Mode */} 
        <View style={styles.baris}> 
          <Text style={[styles.label, { color: fg, fontSize: fs }]}>Mode Gelap</Text> 
          <Switch 
            value={prefs.temaDarkMode} 
            onValueChange={(v) => updatePrefs('temaDarkMode', v)} 
            trackColor={{ false: '#CCC', true: '#2E75B6' }} 
          /> 
        </View> 
    
        {/* Notifikasi */} 
        <View style={styles.baris}> 
          <Text style={[styles.label, { color: fg, fontSize: fs }]}>Notifikasi Push</Text> 
          <Switch 
            value={prefs.notifikasi} 
            onValueChange={(v) => updatePrefs('notifikasi', v)} 
            trackColor={{ false: '#CCC', true: '#2E75B6' }} 
          /> 
        </View>

        {/* Tampilkan IPK */} 
        <View style={styles.baris}> 
          <Text style={[styles.label, { color: fg, fontSize: fs }]}>Tampilkan IPK</Text> 
          <Switch 
            value={prefs.tampilIPK} 
            onValueChange={(v) => updatePrefs('tampilIPK', v)} 
            trackColor={{ false: '#CCC', true: '#2E75B6' }} 
          /> 
        </View>
      </View>
  
      {/* Pilihan Ukuran Font */} 
      <Text style={[styles.labelSeksi, { color: fg, fontSize: fs + 2 }]}>Ukuran Font</Text> 
      <View style={styles.chipRow}> 
        {['kecil', 'sedang', 'besar'].map(uk => ( 
          <TouchableOpacity 
            key={uk} 
            style={[styles.chip, prefs.ukuranFont === uk && styles.chipAktif]} 
            onPress={() => updatePrefs('ukuranFont', uk)} 
          > 
            <Text style={[prefs.ukuranFont === uk ? styles.chipTeksAktif : styles.chipTeks, { fontSize: fs - 2 }]}> 
              {uk.charAt(0).toUpperCase() + uk.slice(1)} 
            </Text> 
          </TouchableOpacity> 
        ))} 
      </View>

      {/* Pilihan Bahasa */} 
      <Text style={[styles.labelSeksi, { color: fg, fontSize: fs + 2 }]}>Bahasa</Text> 
      <View style={styles.chipRow}> 
        {['Indonesia', 'English'].map(bh => ( 
          <TouchableOpacity 
            key={bh} 
            style={[styles.chip, prefs.bahasa === bh && styles.chipAktif]} 
            onPress={() => updatePrefs('bahasa', bh)} 
          > 
            <Text style={[prefs.bahasa === bh ? styles.chipTeksAktif : styles.chipTeks, { fontSize: fs - 2 }]}> 
              {bh} 
            </Text> 
          </TouchableOpacity> 
        ))} 
      </View>

      <TouchableOpacity style={styles.tombolReset} onPress={resetDefault}>
        <Text style={[styles.tombolResetTeks, { fontSize: fs }]}>Reset ke Default</Text>
      </TouchableOpacity>
  
      <View style={{ height: 40 }} />
    </ScrollView> 
  ); 
} 
  
const styles = StyleSheet.create({ 
  container: { flex: 1, padding: 20, paddingTop: 50 }, 
  judul:     { fontSize: 28, fontWeight: 'bold', marginBottom: 24 }, 
  kartu:     { borderRadius: 12, padding: 8, marginBottom: 20, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
  baris:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' }, 
  label:     { fontSize: 16 }, 
  labelSeksi:{ fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  chipRow:   { flexDirection: 'row', gap: 8, marginBottom: 16 }, 
  chip:      { borderWidth: 1, borderColor: '#CCC', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8 }, 
  chipAktif: { borderColor: '#1F4E79', backgroundColor: '#1F4E79' }, 
  chipTeks:  { color: '#666' }, 
  chipTeksAktif: { color: '#FFF', fontWeight: 'bold' }, 
  tombolReset: { marginTop: 40, backgroundColor: '#FFEBEE', padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#FFCDD2' },
  tombolResetTeks: { color: '#D32F2F', fontWeight: 'bold' },
});
