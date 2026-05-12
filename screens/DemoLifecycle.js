import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Komponen anak untuk demonstrasi unmount
function KomponenAnak({ nama }) {
  // MOUNT: Dijalankan sekali saat komponen muncul
  useEffect(() => {
    console.log(`[${nama}] MOUNT: Komponen muncul`);

    // UNMOUNT: Dijalankan saat komponen dihapus
    return () => {
      console.log(`[${nama}] UNMOUNT: Komponen dihapus`);
    };
  }, []);

  // UPDATE: Dijalankan setiap kali 'nama' berubah
  useEffect(() => {
    console.log(`[${nama}] UPDATE: nama berubah menjadi '${nama}'`);
  }, [nama]);

  return (
    <View style={styles.kotak}>
      <Text style={styles.teks}>Komponen: {nama}</Text>
    </View>
  );
}

export default function DemoLifecycle() {
  const [tampil, setTampil] = useState(true);
  const [nama, setNama]     = useState('Alpha');
  const [logs, setLogs]     = useState([]);

  // Override console.log untuk menampilkan log di layar
  useEffect(() => {
    const originalLog = console.log;
    console.log = (...args) => {
      originalLog(...args);
      const msg = args.join(' ');
      setLogs(prev => [{ msg, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 9)]);
    };
    return () => {
      console.log = originalLog;
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.judul}>Demo Lifecycle</Text>

      {tampil && <KomponenAnak nama={nama} />}

      <TouchableOpacity
        style={styles.tombol}
        onPress={() => setTampil(!tampil)}
      >
        <Text style={styles.tombolTeks}>
          {tampil ? '🗑️ Unmount Komponen' : '✅ Mount Komponen'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tombol, styles.tombolUpdate]}
        onPress={() => {
          const urutan = ['Alpha', 'Beta', 'Gamma'];
          const indexSekarang = urutan.indexOf(nama);
          const indexBerikutnya = (indexSekarang + 1) % urutan.length;
          setNama(urutan[indexBerikutnya]);
        }}
      >
        <Text style={styles.tombolTeks}>🔄 Ubah Nama (Trigger Update)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tombol, styles.tombolBersihkan]}
        onPress={() => setLogs([])}
      >
        <Text style={styles.tombolTeks}>🧹 Bersihkan Log</Text>
      </TouchableOpacity>

      {/* Panel Log Visual */}
      <View style={styles.logContainer}>
        <Text style={styles.logJudul}>📋 Console Log Output</Text>
        {logs.length === 0 ? (
          <Text style={styles.logKosong}>Belum ada log. Tekan tombol di atas.</Text>
        ) : (
          logs.map((log, i) => {
            const isMOUNT   = log.msg.includes('MOUNT:') && !log.msg.includes('UNMOUNT:');
            const isUNMOUNT = log.msg.includes('UNMOUNT:');
            const isUPDATE  = log.msg.includes('UPDATE:');
            return (
              <View
                key={i}
                style={[
                  styles.logItem,
                  isMOUNT   && styles.logMount,
                  isUNMOUNT && styles.logUnmount,
                  isUPDATE  && styles.logUpdate,
                ]}
              >
                <Text style={styles.logWaktu}>{log.time}</Text>
                <Text style={styles.logTeks}>{log.msg}</Text>
              </View>
            );
          })
        )}
      </View>

      {/* Tabel Dokumentasi Lifecycle */}
      <View style={styles.tabelContainer}>
        <Text style={styles.logJudul}>📖 Dokumentasi Urutan Lifecycle</Text>
        <View style={styles.tabelHeader}>
          <Text style={[styles.tabelSel, styles.tabelHeaderTeks, { flex: 1.5 }]}>Aksi</Text>
          <Text style={[styles.tabelSel, styles.tabelHeaderTeks, { flex: 2 }]}>Log yang Muncul</Text>
          <Text style={[styles.tabelSel, styles.tabelHeaderTeks, { flex: 1 }]}>Fase</Text>
        </View>
        {[
          { aksi: 'App pertama dibuka', log: '[Alpha] MOUNT\n[Alpha] UPDATE', fase: 'Mount' },
          { aksi: "Tekan 'Ubah Nama' 1x",  log: '[Beta] UPDATE',                 fase: 'Update' },
          { aksi: "Tekan 'Ubah Nama' 2x",  log: '[Gamma] UPDATE',                fase: 'Update' },
          { aksi: "Tekan 'Ubah Nama' 3x",  log: '[Alpha] UPDATE',                fase: 'Update' },
          { aksi: "Tekan 'Unmount'",    log: '[Alpha] UNMOUNT',                fase: 'Unmount' },
          { aksi: "Tekan 'Mount' kembali", log: '[Alpha] MOUNT\n[Alpha] UPDATE', fase: 'Mount' },
        ].map((row, i) => (
          <View key={i} style={[styles.tabelBaris, i % 2 === 0 && styles.tabelBarisBergantian]}>
            <Text style={[styles.tabelSel, { flex: 1.5, color: '#1F4E79' }]}>{row.aksi}</Text>
            <Text style={[styles.tabelSel, { flex: 2, fontFamily: 'monospace', fontSize: 11, color: '#555' }]}>{row.log}</Text>
            <Text style={[styles.tabelSel, { flex: 1, fontWeight: 'bold', color: '#2E75B6' }]}>{row.fase}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, padding: 20, paddingTop: 20, backgroundColor: '#F0F4F8' },
  judul:        { fontSize: 22, fontWeight: 'bold', color: '#1F4E79', marginBottom: 20 },
  kotak:        { backgroundColor: '#DAEEF3', borderRadius: 10, padding: 16, marginBottom: 16 },
  teks:         { fontSize: 16, color: '#1F4E79', fontWeight: 'bold' },
  tombol:       { backgroundColor: '#2E75B6', borderRadius: 8, padding: 12, marginBottom: 10, alignItems: 'center' },
  tombolUpdate: { backgroundColor: '#1F7A5C' },
  tombolBersihkan: { backgroundColor: '#E67E22' },
  tombolTeks:   { color: '#FFF', fontWeight: 'bold', fontSize: 14 },

  // Log Panel
  logContainer: { backgroundColor: '#1A1A2E', borderRadius: 12, padding: 14, marginTop: 10, marginBottom: 16 },
  logJudul:     { color: '#E0E0E0', fontWeight: 'bold', fontSize: 14, marginBottom: 8 },
  logKosong:    { color: '#888', fontStyle: 'italic', fontSize: 13 },
  logItem:      { borderRadius: 6, padding: 8, marginBottom: 5, backgroundColor: '#2A2A3E' },
  logMount:     { borderLeftWidth: 4, borderLeftColor: '#4CAF50' },
  logUnmount:   { borderLeftWidth: 4, borderLeftColor: '#F44336' },
  logUpdate:    { borderLeftWidth: 4, borderLeftColor: '#FF9800' },
  logWaktu:     { color: '#888', fontSize: 10, marginBottom: 2 },
  logTeks:      { color: '#E0E0E0', fontFamily: 'monospace', fontSize: 12 },

  // Tabel
  tabelContainer:       { backgroundColor: '#FFF', borderRadius: 12, overflow: 'hidden', marginBottom: 30, elevation: 2 },
  tabelHeader:          { flexDirection: 'row', backgroundColor: '#1F4E79', padding: 8 },
  tabelHeaderTeks:      { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  tabelBaris:           { flexDirection: 'row', padding: 8, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  tabelBarisBergantian: { backgroundColor: '#F0F8FF' },
  tabelSel:             { fontSize: 12, paddingHorizontal: 4 },
});
