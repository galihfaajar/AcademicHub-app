import React from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; 
  
export default function HalamanUtama({ session, onLogout }) { 
  return ( 
    <View style={styles.container}> 
      <View style={styles.kartu}> 
        <Text style={styles.judul}>Selamat Datang!</Text> 
        <Text style={styles.nama}>{session.nama}</Text> 
         
        <View style={styles.infoBox}> 
          <Text style={styles.infoTeks}>Email: {session.email}</Text> 
          <Text style={styles.infoTeks}>Role: {session.role}</Text> 
          <Text style={styles.infoTeks}> 
            Waktu Login: {new Date(session.loginAt).toLocaleString('id-ID')} 
          </Text> 
        </View> 
  
        <TouchableOpacity style={styles.tombolLogout} onPress={onLogout}> 
          <Text style={styles.tombolLogoutTeks}>Keluar Aplikasi</Text> 
        </TouchableOpacity> 
      </View> 
    </View> 
  ); 
} 
  
const styles = StyleSheet.create({ 
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#1F4E79' }, 
  kartu:     { backgroundColor: '#FFF', borderRadius: 20, padding: 30, alignItems: 'center', elevation: 10 }, 
  judul:     { fontSize: 18, color: '#666' }, 
  nama:      { fontSize: 26, fontWeight: 'bold', color: '#1F4E79', marginVertical: 10 }, 
  infoBox:   { width: '100%', backgroundColor: '#F8F9FA', padding: 15, borderRadius: 10, marginVertical: 20 }, 
  infoTeks:  { fontSize: 14, color: '#555', marginBottom: 5 }, 
  tombolLogout: { backgroundColor: '#D32F2F', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 10 }, 
  tombolLogoutTeks: { color: '#FFF', fontWeight: 'bold' }, 
});
